export default {
    params(data){
        let query = []
        Object.keys(data).forEach((field)=>{
            if(data[field]){
                query.push(field + '=' + data[field])
            }
        })
        return query.join('&')
    },
    timeToDate(time){
        let date = new Date()
        date.setTime(time)
        let Y = date.getFullYear(),
        m = date.getMonth()+1,
        d = date.getDate()
        return Y + '-' + m + '-' + d
    },
    timeToDateTime(time){
        let date = new Date()
        date.setTime(time)
        let Y = date.getFullYear(),
        m = (date.getMonth()+1),
        d = date.getDate(),
        H = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds()
        return Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s
    }
}