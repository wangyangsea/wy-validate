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
export default {
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
  mounted () {
    console.log(this.value)
  },
  methods: {
    handleChange (e) {
      const val = e.target.value
      this.model = val
      this.$emit('input', val)
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
label {
  margin: 0 10px;
}
</style>
