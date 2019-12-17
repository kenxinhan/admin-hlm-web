import Cookies from 'js-cookie'

const TokenKey = 'ticket'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getCookieToken (name) {
  let start = document.cookie.indexOf(name + '=')
  let len = start + name.length + 1
  if ((!start) && (name !== document.cookie.substring(0, name.length))) {
    return null
  }
  if (start === -1) {
    return null
  }
  let end = document.cookie.indexOf(';', len)
  if (end === -1) {
    end = document.cookie.length
  }
  unescape(document.cookie.substring(len, end))
}

export function deleteCookieToken (name, path, domain) {
  if (getCookieToken(name)) {
    document.cookie = name + '=' + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ';expires=Thu,01-Jan-1970 00:00:01 GMT'
  }
}

// deleteCookie("ticket","/","simmtime.com ");
