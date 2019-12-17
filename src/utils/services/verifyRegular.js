/**
 * 使用正则校验常用的信息
*/
import $ from 'jquery'
import { isEmpty } from '@/utils/index'

 // 验证手机号
function isPhoneNo (phone) {
  let pattern = /^1[345789]\d{9}$/
  return pattern.test(phone)
}
// 验证邮箱
function isEmailNo (email) {
  let pattern = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/
  return pattern.test(email)
}

/** 验证名称
  * name    名称,
  * cNum    中文字数,
  * eNum    英文字数
*/
function isName (name, cNum, eNum) {
  let chinaPattern = /[\u4E00-\u9FA5]/
  let englishPattern = /[a-zA-Z]/
  let isTxt = false
  let chinaNum = 0
  let englishNum = 0
  let chinaNameNum = isEmpty(cNum) ? 2 : cNum
  let englishNameNum = isEmpty(eNum) ? 4 : eNum
  for (var i = 0; i < name.length; i++) {
    if (chinaPattern.test(name[i]) === true) {
      chinaNum++
    }
    if (englishPattern.test(name[i]) === true) {
      englishNum++
    }
  }
  if (chinaNum >= chinaNameNum || englishNum >= englishNameNum) {
    isTxt = true
  }
  return isTxt
}

/** element ui 校验方法
  * rule    属性,
  * value    内容,
  * callback    回调方法
*/

function validateEmail (rule, value, callback) {
  if (isEmpty(value)) {
    return callback(new Error('邮箱不能为空'))
  } else if (isEmailNo($.trim(value)) === false) {
    return callback(new Error('请输入正确的邮箱'))
  } else {
    callback()
  }
}
function validatePhone (rule, value, callback) {
  if (isEmpty(value)) {
    return callback(new Error('手机号码不能为空'))
  } else if (isPhoneNo($.trim(value)) === false) {
    return callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}

// 返回在vue模板中的调用接口
export default {
  phone: function (val) {
    return isPhoneNo($.trim(val))
  },
  email: function (val) {
    return isEmailNo($.trim(val))
  },
  name: function (val, cNum, eNum) {
    return isName($.trim(val, cNum, eNum))
  },
  validateEmail: function (rule, value, callback) {
    return validateEmail(rule, value, callback)
  },
  validatePhone: function (rule, value, callback) {
    return validatePhone(rule, value, callback)
  }
}
