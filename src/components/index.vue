<template>
  <div class="form-box">
    <w-form :rules="validateRules" :modes="validateModes" ref="form">
      <form-item label="姓名" prop="name">
        <w-input name="name" v-model="validateModes.name"/>
      </form-item>
      <form-item label="邮箱" prop="email">
        <w-input name="email" v-model="validateModes.email"/>
      </form-item>
      <form-item label="专业" prop="professional">
        <div style="width: 342px;display:inline-block;text-align: left;">
          <w-select v-model="validateModes.professional">
            <option
              v-for="(item, index) in options"
              :key="index"
              :value="item.value"
              :disabled="item.disabled"
            >{{item.text}}</option>
          </w-select>
        </div>
      </form-item>
      <form-item label="性别" prop="sex">
        <div style="width: 342px;display:inline-block;text-align: left;">
          <w-radio
            v-for="(item, index) in sexArr"
            v-model="validateModes.sex"
            name="sex"
            :key="index"
            :label="index"
          >{{item}}</w-radio>
        </div>
      </form-item>
      <form-item label="兴趣爱好" prop="checkedArr">
        <w-checkbox-group v-model="validateModes.checkedArr">
          <w-checkbox
            v-for="(item,index) in checkboxText"
            :key="index"
            :single-value="item.value"
            :disabled="item.disabled"
          >
            {{item.text}}
          </w-checkbox>
        </w-checkbox-group>
      </form-item>
      <form-item label="用户协议" prop="own">
        <w-checkbox
          name="own"
          v-model="validateModes.own"
          style="width: 342px;display:inline-block; color:blue;text-align: left;"
        >
          <a href="javascript:;" style="color:#2793ff; text-decoration: underline">《我是用户协议协议》</a>
        </w-checkbox>
      </form-item>
      <button type="button" class="submit_btn" @click="handleSubmit">表单验证</button>
    </w-form>
    <br>
    <br>
    <br>
    <div class="select-box"></div>
  </div>
</template>
<script>
import WForm from '@/base/form/form'
import FormItem from '@/base/form-item/form-item'
import WInput from '@/base/input/input'
import WCheckbox from '@/base/checkbox/checkbox'
import WRadio from '@/base/radio/radio'
import WCheckboxGroup from '@/base/checkbox/checkbox-group'
import WSelect from '@/base/select/select'
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
    WCheckboxGroup,
    WRadio,
    WSelect
  },
  ha: 'rha',
  data () {
    return {
      validateRules: loginRules,
      validateModes: {
        name: 'ergou',
        email: '',
        sex: '0',
        checkedArr: [],
        own: 0,
        professional: ''
      },
      checkboxText: [
        {
          text: '电影',
          value: 0,
          disabled: false
        },
        {
          text: '跑步',
          value: 1,
          disabled: false
        },
        {
          text: '运动',
          value: 2,
          disabled: false
        },
        {
          text: '逛街',
          value: 3,
          disabled: false
        },
        {
          text: '看书',
          value: 4,
          disabled: false
        }
      ],
      sexArr: ['男', '女', '保密'],
      options: [
        {
          value: '111',
          text: '自动化',
          disabled: true
        },
        {
          value: '222',
          text: '计算机',
          disabled: false
        },
        {
          value: '333',
          text: '信息安全',
          disabled: false
        },
        {
          value: '444',
          text: '幼师',
          disabled: false
        }
      ]
    }
  },
  watch: {
    'validateModes.own' (val) {
      // console.log(val)
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.form.validateAll().then(valid => {
        if (valid) {
          alert('验证通过')
          console.log(this.validateModes)
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
