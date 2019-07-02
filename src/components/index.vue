<template>
  <div class="form-box">
    <w-form :rules="validateRules" :modes="validateModes" ref="form">
      <form-item label="姓名" prop="name">
        <w-input name="name" v-model="validateModes.name"/>
      </form-item>
      <form-item label="邮箱" prop="email">
        <w-input name="email" v-model="validateModes.email"/>
      </form-item>
      <button type="button" class="submit_btn" @click="handleSubmit">表单验证</button>
    </w-form>
  </div>
</template>
<script>
import WForm from '@/base/form/form'
import FormItem from '@/base/form-item/form-item'
import WInput from '@/base/input/input'
import Emitter from '@/mixins/emitter'
export default {
  mixins: [Emitter],
  name: 'index',
  components: {
    WForm,
    FormItem,
    WInput
  },
  data () {
    return {
      validateRules: {
        name: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ]
      },
      validateModes: {
        name: '',
        email: ''
      }
    }
  },
  mounted () {
    this.capture('w-input', 'test', 'test')
  },
  methods: {
    handleSubmit () {
      // this.$refs.form.validateAll(valid => {
      //   // console.log(valid)
      //   if (valid) {
      //     alert('验证通过')
      //   }
      // })

      this.$refs.form.validateAll().then(valid => {
        if (valid) {
          alert('验证通过')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.form-box {
  margin-top: 200px;
}
.submit_btn {
  width: 300px;
  height: 40px;
  background: #ff3a3a;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  &:active {
    background: #da2d2d;
  }
}
</style>
