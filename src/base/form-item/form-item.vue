<template>
  <div class="form-item">
    <label :class="isRequired ? 'is_required' : ''">{{label}}:</label>
    <slot></slot>
    <p v-if="validateState === 'error'" class="error-text">{{validateMessage}}</p>
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
      validateState: '',
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
      this.$on('on-form-change', this.listenChange)
    },
    /**
     * input失去焦点回调
     */
    listenBlur (val) {
      this.validate('blur')
    },
    /**
     * input失去焦点回调
     */
    listenChange (val) {
      this.validate('change')
    },
    getRules () {
      const rules = this.form.rules[this.prop] || []
      return [].concat(rules)
    },
    getFilterRules (trigger) {
      let rules = this.getRules()
      // return rules.filter(rule => this.prop && rule.trigger === trigger)
      return rules.filter(
        // 这种比较方式的好处： trigger为空 或者匹配成功的情况都为 true
        rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      )
    },
    validate (trigger, callback = function () {}) {
      const rules = this.getFilterRules(trigger)
      if (!rules || !rules.length) {
        return true
      }
      this.validateState = 'validating'
      let descriptor = {}
      descriptor[this.prop] = rules
      const validator = new AsyncValidator(descriptor)
      let model = {}
      model[this.prop] = this.fieldValue
      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''

        callback(this.validateMessage)
      })
    },
    resetField () {
      this.validateState = ''
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
  label {
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
}
</style>
