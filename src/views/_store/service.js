import Vue from 'vue'

export const ApiGetConfigList = (data) => {
    return Vue.prototype.$http.post('/api/hx/configList.do',{
        shopNo: data.shopNo,
        merchantNo: data.merchantNo,
        lableNo: data.lableNo,
        parentCode: data.parentCode,
    })
}

export const ApiGetRolesList = (data) => {
    return Vue.prototype.$http.post('/api/hx/guid/list.do',{
        shopNo: data.shopNo,
        merchantNo: data.merchantNo,
        roleEnname: data.roleEnname
    })
}

export const ApiGetRoleMenuList = (data) => {
    return Vue.prototype.$http.post('/api/hx/getMenu.do',{
        memberNoGuid: data.memberNoGuid
    })
}

export const ApiGetImMsgNum = (data) => {
    return Vue.prototype.$http.post('/api/hx/im/unreadCount.do',{
        merchantNo: data.merchantNo, 
        memberNoGuid: data.memberNoGuid
    })
}

export const ApiGetRecomClientnum = (data) => {
    return Vue.prototype.$http.post('/api/hx/clue/clientnum.do',{
        memberNoMerchant:  data.memberNoMerchant, 
    })
}


