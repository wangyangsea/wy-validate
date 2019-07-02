<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="currentValue"
    @blur="inputBlur"
    @input="inputChange"
  >
</template>
<script>
import Emitter from '@/mixins/emitter'
export default {
  mixins: [Emitter],
  name: 'w-input',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  mounted () {},
  methods: {
    inputBlur () {
      this.dispatch('form-item', 'on-input-blur', this.currentValue)
    },
    inputChange (e) {
      this.currentValue = e.target.value
      this.$emit('input', this.currentValue)
    }
  }
}
</script>
<style lang="scss" scoped>
input {
  padding: 10px 20px;
  border: 1px solid #dedede;
  border-radius: 4px;
  outline: none;
  width: 300px;
  font-size: 14px;
}
</style>
