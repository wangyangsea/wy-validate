<template>
  <label>
    <span>
      <input
        v-if="group"
        type="checkbox"
        :value="label"
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
    label: {
      type: [String, Number, Boolean]
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  data () {
    return {
      currentValue: this.value,
      model: [],
      group: false,
      parent: null
    }
  },
  watch: {
    value (val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel()
      } else {
        throw new Error('Value should be trueValue or falseValue')
      }
    }
  },
  mounted () {
    this.parent = findComponentUpward(this, 'w-checkbox-group')
    if (this.parent) {
      this.group = true
    }
    if (this.group) {
      this.parent.updateModel(true)
    } else {
      this.updateModel()
    }
  },
  methods: {
    handleChange (e) {
      if (this.disabled) {
        return
      }
      const checked = e.target.checked
      this.currentValue = checked
      const value = checked ? this.trueValue : this.falseValue
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
