export const _mmAddress = (data,values,CodeToText) => {
    if( values[0] ) {
        data['provinceCode'] = values[0]
        data['province']  = CodeToText[values[0]]
    } else {
        data['provinceCode'] = ''
        data['province']  = ''
    }
    if( values[1] ) {
        data['cityCode'] = values[1]
        data['city']  = CodeToText[values[1]]
    } else {
        data['cityCode'] = ''
        data['city']  = ''
    }

    if( values[2] ) {
        data['areaCode'] = values[2]
        data['area']  = CodeToText[values[2]]
    } else {
        data['areaCode'] = ''
        data['area']  = ''
    }
    return data
}


export const _mmGetAge = (birthday) => {  
    let age;  
    const birthdayArr = birthday.split('-');  
    const birthdayYear = birthdayArr[0];  
    const birthdayMonth = birthdayArr[1];  
    const birthdayDay = birthdayArr[2];  
    const today = new Date();  
    const nowYear = today.getFullYear();  
    const nowMonth = today.getMonth() + 1;  
    const nowDay = today.getDate();  
    if (nowYear === birthdayYear) {    
      age = 0; // 同年 则为0岁  
    } else {    
      const ageDiff = nowYear - birthdayYear; // 年之差  
      if (ageDiff > 0) {     
       if (nowMonth === birthdayMonth) {       
         const dayDiff = nowDay - birthdayDay; // 日之差
         if (dayDiff < 0) {         
           age = ageDiff - 1;       
         } else {          
          age = ageDiff;        
         }     
        } else {       
         const monthDiff = nowMonth - birthdayMonth; // 月之差        
         if (monthDiff < 0) {         
           age = ageDiff - 1;        
         } else {          
           age = ageDiff;        
         }     
       }    
      } else {     
        age = 0; // 返回-1 表示出生日期输入错误 晚于今天    
      }  
    } 
  return age; // 返回周岁年龄
  }

export const _mmScrollTo = (ele, speed) => {
    if(!speed) speed = 300;
    if(!ele){
      $("html,body").animate({scrollTop:0},speed);
    }else{
      $("html,body").animate({scrollTop: $(ele).offset().top},speed);
    }
}


