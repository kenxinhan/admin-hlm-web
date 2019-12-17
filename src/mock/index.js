import Mock from 'mockjs'

Mock.mock('/api/robcustomers', 'post', function(options){
        return Mock.mock([
            {
                noorder: '12547441177',
                avatar: '111.jpg',
                name: '老王',
                wxnum: 'laowang',
                wxname: '隔壁老王',
                phone: 17651741474,
                sex: 1,
                age: 18,
                recommender: '张三',
                zhusu: '卡怪疯狂噶开始给法国司法',
                area: '深圳市',
                resouce: '百度贴吧',
                custype: '精准客户线索',
                cusprice: 1765,
                adddata: '20189-3-4',
                status: 0,
                buyclinic: '一鸣口腔'
            },
            {
                noorder: '1254744117788888888888888888',
                avatar: '111.jpg',
                name: '老王',
                wxnum: 'laowang',
                wxname: '隔壁老王',
                phone: 17651741474,
                sex: 1,
                age: 18,
                zhusu: '卡怪疯狂噶开始给法国司法',
                area: '深圳市',
                resouce: '百度贴吧',
                custype: '精准客户线索',
                cusprice: 1765,
                singleperson: '李四',
                adddata: '20189-3-4',
                status: 1,
                buyclinic: '一鸣口腔'
            },
            {
                noorder: '12547441177',
                avatar: '111.jpg',
                name: '老王',
                wxnum: 'laowang',
                wxname: '隔壁老王',
                phone: 17651741474,
                sex: 1,
                age: 18,
                zhusu: '卡怪疯狂噶开始给法国司法',
                area: '深圳市',
                resouce: '百度贴吧',
                custype: '精准客户线索',
                cusprice: 1765,
                adddata: '20189-3-4',
                status: 0,
                buyclinic: '一鸣口腔'
            }
        ])
})



Mock.mock('/api/patientlist', 'post', function(options){
    return Mock.mock([
        {
            noorder: '12547441177',
            name: '老王',
            phone: 17651741474,
            sex: 1,
            age: 18,
            pattype: 0,
            initdata: '20189-3-4',
            initdoctor: '李四',
            oneresource: '一鸣口腔',
            tworesource: '一鸣口腔',
            threeresource: '一鸣口腔'
        },
        {
            noorder: '12547441177',
            name: '老王',
            phone: 17651741474,
            sex: 1,
            age: 18,
            pattype: 0,
            initdata: '20189-3-4',
            initdoctor: '李四',
            oneresource: '一鸣口腔',
            tworesource: '一鸣口腔',
            threeresource: '一鸣口腔'
        },
        {
            noorder: '12547441177',
            name: '老王',
            phone: 17651741474,
            sex: 1,
            age: 18,
            pattype: 0,
            initdata: '20189-3-4',
            initdoctor: '李四',
            oneresource: '一鸣口腔',
            tworesource: '一鸣口腔',
            threeresource: '一鸣口腔'
        },
        {
            noorder: '12547441177',
            name: '老王',
            phone: 17651741474,
            sex: 1,
            age: 18,
            pattype: 0,
            initdata: '20189-3-4',
            initdoctor: '李四',
            oneresource: '一鸣口腔',
            tworesource: '一鸣口腔',
            threeresource: '一鸣口腔'
        },
        {
            noorder: '12547441177',
            name: '老王',
            phone: 17651741474,
            sex: 1,
            age: 18,
            pattype: 0,
            initdata: '20189-3-4',
            initdoctor: '李四',
            oneresource: '一鸣口腔',
            tworesource: '一鸣口腔',
            threeresource: '一鸣口腔'
        },
        {
            noorder: '12547441177',
            name: '老王',
            phone: 17651741474,
            sex: 1,
            age: 18,
            pattype: 0,
            initdata: '20189-3-4',
            initdoctor: '李四',
            oneresource: '一鸣口腔',
            tworesource: '一鸣口腔',
            threeresource: '一鸣口腔'
        },
        {
            noorder: '12547441177',
            name: '老王',
            phone: 17651741474,
            sex: 1,
            age: 18,
            pattype: 0,
            initdata: '20189-3-4',
            initdoctor: '李四',
            oneresource: '一鸣口腔',
            tworesource: '一鸣口腔',
            threeresource: '一鸣口腔'
        },
        {
            noorder: '12547441177',
            name: '老王',
            phone: 17651741474,
            sex: 1,
            age: 18,
            pattype: 0,
            initdata: '20189-3-4',
            initdoctor: '李四',
            oneresource: '一鸣口腔',
            tworesource: '一鸣口腔',
            threeresource: '一鸣口腔'
        },
        {
            noorder: '12547441177',
            name: '老王',
            phone: 17651741474,
            sex: 1,
            age: 18,
            pattype: 0,
            initdata: '20189-3-4',
            initdoctor: '李四',
            oneresource: '一鸣口腔',
            tworesource: '一鸣口腔',
            threeresource: '一鸣口腔'
        },
    ])
})