<template>
  <div class="form-item">
    <label :class="isRequired ? 'is_required form-label' : 'form-label'">{{label ? `${label}:` : ''}}</label>
    <slot></slot>
    <p v-if="validateState" class="error-text">{{validateMessage}}</p>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator'
import Emitter from '@/mixins/emitter'
export default {
  mixins: [Emitter],
  name: 'form-item',
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  inject: ['form'],
  data () {
    return {
      currentValue: '',
      isRequired: false,
      validateState: false,
      ValidateMessage: ''
    }
  },
  mounted () {
    if (this.prop) {
      this.dispatch('w-form', 'on-form-item-add', this)
      this.currentValue = this.fieldValue
      this.isRequired = this.form.rules[this.prop].some(item => item.required)
      this.setInputListen()
    }
  },
  computed: {
    fieldValue () {
      return this.form.modes[this.prop]
    }
  },
  destroyed () {
    this.dispatch('w-form', 'on-form-item-delete', this)
  },
  methods: {
    /**
     * 添加监听input触发事件
     */
    setInputListen () {
      this.$on('on-input-blur', this.listenBlur)
      this.$on('on-input-input', this.listenInput)
      this.$on('on-form-change', this.listenChange)
    },
    /**
     * input失去焦点回调
     */
    listenBlur (val) {
      this.validate('blur')
    },
    /**
     * input输入回调
     */
    listenInput (val) {
      this.validate('input')
    },
    /**
     * input失去焦点回调
     */
    listenChange (val) {
      this.validate('change')
    },
    getFilterRules (trigger) {
      const rules = [...(this.form.rules[this.prop] || [])]
      // 无trigger默认: "blur"
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },
    validate (trigger, callback = function () {}) {
      const rules = this.getFilterRules(trigger)
      if (!rules || !rules.length) {
        return true
      }
      let descriptor = {}
      descriptor[this.prop] = rules
      const validator = new AsyncValidator(descriptor)
      let model = {}
      model[this.prop] = this.fieldValue
      validator.validate(model, { firstFields: true }, (errors, fields) => {
        this.validateState = !!errors
        this.validateMessage = errors ? errors[0].message : ''
        callback(this.validateMessage)
      })
    },
    resetField () {
      this.validateState = false
      this.validateMessage = ''
      this.form.modes[this.prop] = this.currentValue
    }
  }
}
</script>
<style lang="scss" scoped>
.form-item {
  width: 510px;
  position: relative;
  margin: 0 auto 40px;
  > .form-label {
    display: inline-block;
    width: 130px;
    text-align: right;
    margin-right: 30px;
    &.is_required::after {
      content: '*';
      color: red;
    }
  }
}
.error-text {
  font-size: 12px;
  color: red;
  margin: 0;
  position: absolute;
  left: 170px;
  bottom: -20px;
}
</style>
