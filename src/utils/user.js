import $ from 'jquery'
import { isEmpty } from '@/utils/index'

/* 是否有按钮权限 */
export function hasBtnPower (btKey) {
  var authsKey = window.sessionStorage.getItem('authsKey')
  let key = btKey.replace(/(^\s*)|(\s*$)/g, '')
  if (isEmpty(authsKey)) {
    return false
  } else if (authsKey.indexOf(key) > -1) {
    return true
  } else {
    return false
  }
}

/* Tree树形结构列表展示高度自适应 */
export function TreeHeight () {
  let heightAll = $(window).height()
  $('.treeForm').css('height', (heightAll - 125) + 'px')  // 列表总高度
  $('.treeForm .treeForm-b').css('height', (heightAll - 125) + 'px') // 没有treeForm-t的时候.treeForm-b的高度
  $('.treeForm .treeForm-t').siblings('.treeForm-b').css('height', (heightAll - 170) + 'px')
  $('.treeForm .filter-tree').css('height', (heightAll - 220) + 'px') // 没有treeForm-t的时候.filter-tree的高度
  $('.treeForm .treeForm-t').siblings('.treeForm-b').find('.filter-tree').css('height', (heightAll - 275) + 'px')
}

/* 粘贴信息
  input 的 onPaste方法，监控粘贴
*/
export function pasteMsg ($event) {
  const items = ($event.clipboardData || $event.originalEvent.clipboarData).items
  const types = ($event.clipboardData || $event.originalEvent.clipboarData).types
  // 如果包含文件内容
  if (types.indexOf('Files') > -1) {
    for (let index = 0; index < items.length; index++) {
      const item = items[index]
      if (item.kind === 'file' && item.type.match(/^image/)) {
        this.imgReader(item)
      }
    }
    $event.preventDefault()
  }
}
