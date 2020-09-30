<template>
  <div class="checkbox-group">
    <slot></slot>
  </div>
</template>
<script>
import Emitter from '@/mixins/emitter'
import { findComponentsDownward } from '@/utils/assist'
export default {
  mixins: [Emitter],
  name: 'w-checkbox-group',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      childrens: []
    }
  },
  watch: {
    value (val) {
      this.updateModel(true)
    }
  },
  mounted () {
    this.updateModel(true)
  },
  methods: {
    updateModel (update) {
      this.childrens = findComponentsDownward(this, 'w-checkbox')
      if (this.childrens.length > 0) {
        const { value } = this
        this.childrens.forEach(child => {
          child.model = value
          // 这部分代码的作用是？
          // if (update) {
          //   child.currentValue = value.indexOf(child.singleValue) >= 0
          //   child.group = true
          // }
        })
      }
    },
    change (data) {
      this.$emit('input', data)
      this.$emit('on-change', data)
      this.dispatch('form-item', 'on-form-change', data)
    }
  }
}
</script>
<style lang="scss" scoped>
.checkbox-group {
  display: inline-block;
  text-align: left;
}
</style>
