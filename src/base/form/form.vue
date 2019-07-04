<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: 'w-form',
  props: {
    rules: {
      type: Object,
      default: () => {}
    },
    modes: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      fields: []
    }
  },
  provide () {
    return {
      form: this
    }
  },
  created () {
    this.$on('on-form-item-add', node => {
      if (node.prop) {
        this.fields.push(node)
      }
    })
    this.$on('on-form-item-delete', node => {
      this.fields.splice(this.fields.indexOf(node), 1)
    })
  },
  methods: {
    resetFields () {
      for (let field of this.fields) {
        field.resetField()
      }
    },
    validateAll (callback) {
      return new Promise(resolve => {
        let valid = true
        let count = 0
        this.fields.forEach(field => {
          field.validate('', errors => {
            if (errors) {
              valid = false
            }
            if (++count === this.fields.length) {
              // 全部完成
              resolve(valid)
              if (typeof callback === 'function') {
                callback(valid)
              }
            }
          })
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
