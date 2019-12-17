export default {
    symbol:{
        1:"BTC",
        2:"BTC_TOKEN",
        3:"LTC",
        4:"ETH",
        5:"ETH_TOKEN"
    },
    symbols:[
        {
            name:"BTC",
            val:"1"
        },
        {
            name:"USDT",
            val:"2"
        },
        // {
        //     name:"LTC",
        //     val:"3"
        // },
        {
            name:"ETH",
            val:"4"
        },
    ],
    DateFormat: {
        "DateTime24": "YYYY-MM-DD HH:mm:ss",
        "DateTime12": "YYYY-MM-DD hh:mm:ss",
        "DateTime": "YYYY-MM-DD HH:mm:ss",
        "Date": "YYYY-MM-DD",
        "Month": "YYYY-MM",
        "Year": "YYYY",
    },
    isVal0: function (rule, value, callback) {
	    if(value<0){
				return callback(new Error('不能小于0'));
        }
        callback()
    },

};
