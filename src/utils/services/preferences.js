/**
 * 使用localStorage记录用户使用偏好
 */
function setItem (key, val) {
  val = JSON.stringify(val)
  window.localStorage.setItem(key, val)
}

function getItem (key) {
  let val = window.localStorage.getItem(key)
  if (val === null) {
    return {}
  } else {
    try {
      val = JSON.parse(val)
    } catch (err) {}
    return val
  }
}

// 返回在vue模板中的调用接口
export default {
  set: function (key, val) {
    return setItem(key, val)
  },
  get: function (key) {
    return getItem(key)
  },
  remove: function (key) {
    return window.localStorage.removeItem(key)
  },
  clear: function () {
    return window.localStorage.clear()
  }
}
