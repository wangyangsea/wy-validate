<template>
  <div class="form-box">
    <w-form :rules="validateRules" :modes="validateModes" ref="form">
      <form-item label="姓名" prop="name">
        <w-input name="name" v-model="validateModes.name"/>
      </form-item>
      <form-item label="邮箱" prop="email">
        <w-input name="email" v-model="validateModes.email"/>
      </form-item>
      <form-item label="兴趣爱好" prop="checkedArr">
        <w-checkbox-group v-model="validateModes.checkedArr">
          <w-checkbox v-for="(item,index) in checkboxText" :key="index" :label="item">{{item}}</w-checkbox>
        </w-checkbox-group>
      </form-item>
      <form-item label="用户协议" prop="own">
        <w-checkbox name="own" v-model="validateModes.own" style="width:300px; color:blue">
          <a href="javascript:;" style="color:#2793ff; text-decoration: underline">《我是用户协议协议》</a>
        </w-checkbox>
      </form-item>
      <button type="button" class="submit_btn" @click="handleSubmit">表单验证</button>
    </w-form>
  </div>
</template>
<script>
import WForm from '@/base/form/form'
import FormItem from '@/base/form-item/form-item'
import WInput from '@/base/input/input'
import WCheckbox from '@/base/checkbox/checkbox'
import WCheckboxGroup from '@/base/checkbox/checkbox-group'
import Emitter from '@/mixins/emitter'
import { loginRules } from '@/utils/validateRules'
export default {
  mixins: [Emitter],
  name: 'index',
  components: {
    WForm,
    FormItem,
    WInput,
    WCheckbox,
    WCheckboxGroup
  },
  data () {
    return {
      validateRules: loginRules,
      validateModes: {
        name: '',
        email: '',
        checkedArr: [],
        own: false
      },
      checkboxText: ['电影', '跑步', '运动', '逛街', '看书']
    }
  },
  watch: {
    own (val) {
      console.log(val)
    }
  },
  mounted () {
    // this.capture('w-input', 'test', 'test')
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
    },
    reset () {
      this.checkedArr = [].concat(this.checkboxText)
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
