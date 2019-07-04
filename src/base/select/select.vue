<template>
  <select v-model="currentValue" @change="handleChange">
    <option value>全部</option>
    <slot></slot>
  </select>
</template>
<script>
import Emitter from '@/mixins/emitter'
export default {
  mixins: [Emitter],
  name: 'WSelect',
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  methods: {
    handleChange (e) {
      const val = e.target.value
      this.currentValue = val
      this.$emit('input', val)
      this.dispatch('form-item', 'on-form-change', val)
    }
  }
}
</script>
<style lang="scss" scoped>
select {
  width: 240px;
  height: 40px;
  background: #fff;
  border-color: #dedede;
  font-size: 14px;
  outline: none;
}
</style>
