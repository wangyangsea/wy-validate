<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="value"
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
  watch: {
    value (ov, nv) {
      // console.log(ov, nv)
    }
  },
  mounted () {},
  methods: {
    inputBlur () {
      this.dispatch('form-item', 'on-input-blur', this.value)
    },
    inputChange (e) {
      this.$emit('input', e.target.value)
      this.dispatch('form-item', 'on-input-input', e.target.value)
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
