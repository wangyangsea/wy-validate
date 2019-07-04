import * as constant from './constant'

/**
 * 去除前后空格
 * @param {*} val 字符串
 */
function trim (val) {
  return val.replace(/(^\s*)|(\s*$)/g, '')
}
/**
 * 字符串长度范围验证
 * @param {*} min 最少位数 默认0
 * @param {*} max 最多位数 默认10000
 */
function lengthLimit (min = 0, max = 1000000) {
  if (arguments.length === 0) {
    return
  }
  const isNumber = [...arguments].every(item => typeof item === 'number')
  if (!isNumber) {
    throw new Error('lengthLimit函数参数必须为Number')
  }
  const message = arguments.length === 1 ? `长度必须大于${min}` : `长度必须大于${min}、小于${max}`
  return {
    type: 'string',
    message: message,
    validator: (rule, val) => {
      const value = trim(val)
      return value.length >= min && value.length <= max
    },
    trigger: constant.BLUR
  }
}

// 以下是自定义验证规则

// true/false判断 适合 单选 单多选 select等~
const checked = (rule, value) => value

const isFullName = (rule, val) => {
  const value = trim(val)
  return /\w/.test(value)
}
const hobby = (rule, val) => val.length >= 2

export const loginRules = {
  name: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: constant.BLUR
    },
    {
      type: 'string',
      message: '用户名只能是数字、字母或下划线',
      validator: isFullName,
      trigger: constant.BLUR
    },
    lengthLimit(4, 18)
  ],
  checkedArr: [
    {
      type: 'array',
      message: '至少勾选2项',
      required: true,
      validator: hobby,
      trigger: constant.CHANGE
    }
  ],
  own: [
    {
      type: 'string',
      message: '请勾选用户条款',
      required: true,
      validator: checked,
      trigger: constant.CHANGE
    }
  ],
  email: [
    {
      required: true,
      message: '邮箱不能为空',
      trigger: constant.BLUR
    },
    {
      type: 'email',
      message: '邮箱格式不正确',
      trigger: constant.BLUR
    }
  ]
}
