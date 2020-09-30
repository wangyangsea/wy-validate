<template>
  <label>
    <span>
      <input
        v-if="group"
        type="checkbox"
        :value="singleValue"
        :disabled="disabled"
        v-model="model"
        @change="handleChange"
      >
      <input
        v-else
        type="checkbox"
        :disabled="disabled"
        :checked="currentValue"
        @change="handleChange"
      >
    </span>
    <slot></slot>
  </label>
</template>
<script>
import Emitter from '@/mixins/emitter'
import { findComponentUpward } from '@/utils/assist'
export default {
  mixins: [Emitter],
  name: 'w-checkbox',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    singleValue: {
      type: [String, Number, Boolean]
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: 1
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: 0
    }
  },
  data () {
    return {
      currentValue: '',
      model: [],
      group: false,
      parent: null
    }
  },
  watch: {
    value: {
      handler: function (val) {
        this.$nextTick(() => {
          if (!this.group) { // 无group情形
            if (val === this.trueValue || val === this.falseValue) {
              this.updateModel()
            } else {
              throw new Error('Value should be trueValue or falseValue')
            }
          }
        })
      },
      immediate: true
    }
  },
  mounted () {
    this.parent = findComponentUpward(this, 'w-checkbox-group')
    if (this.parent) {
      this.group = true
    }
  },
  methods: {
    handleChange (e) {
      if (this.disabled) return
      const value = e.target.checked ? this.trueValue : this.falseValue
      this.$emit('input', value)
      if (this.group) {
        this.parent.change(this.model)
      } else {
        this.$emit('on-change', value)
        this.dispatch('form-item', 'on-form-change', value)
      }
    },
    updateModel () {
      this.currentValue = this.value === this.trueValue
    }
  }
}
</script>
<style lang="scss" scoped>
input[type='checkbox'] {
  margin: 0 10px;
}
</style>
