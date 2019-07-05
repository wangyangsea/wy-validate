<template>
  <label>
    <input
      type="radio"
      :name="name"
      v-model="model"
      :value="currentValue"
      :disabled="disabled"
      @change="handleChange"
    >
    <slot></slot>
  </label>
</template>
<script>
import Emitter from '@/mixins/emitter'
export default {
  mixins: [Emitter],
  name: 'w-radio',
  props: {
    name: {
      type: String
    },
    value: {
      type: [String, Number]
    },
    label: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentValue: this.label,
      model: this.value
    }
  },
  methods: {
    handleChange (e) {
      const val = e.target.value
      this.model = val
      this.$emit('input', val)
      this.dispatch('form-item', 'on-form-change', val)
    }
  }
}
</script>
<style lang="scss" scoped>
label {
  margin: 0 10px;
}
</style>
