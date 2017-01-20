function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
function reverse(time,type){
    if(time==null){
        return "";
    }
    var d = new Date(time),month,date,hours,minutes,second;
    var am="";
    if(parseInt(d.getSeconds())<10){
        second="0"+d.getSeconds();
    }else{
        second=d.getSeconds();
    }
    if(parseInt(d.getMinutes())<10){
        minutes="0"+d.getMinutes();
    }else{
        minutes=d.getMinutes();
    }
    if(parseInt(d.getHours())<10){
        hours="0"+d.getHours();
    }else{
        hours=d.getHours();
    }
    if(parseInt(d.getDate())<10){
        date="0"+d.getDate();
    }else{
        date=d.getDate();
    }
    if((d.getMonth()+1)<10){
        month="0"+(d.getMonth()+1);
    }else{
        month=d.getMonth()+1;
    }
    if(type==7){
        return d.getFullYear()+"-"+month+"-"+date+" "+hours;
    }
    if(type==6){
        if(parseInt(d.getHours())<12){
            am=0;
        }else{
            am=1;
            hours=parseInt(d.getHours())-12;
        }
        if(am==0){
            return month+"月"+date+"号";
        }else{
            return month+"月"+date+"号";
        }
    }
    if(type==5){
        if(parseInt(d.getHours())<12){
            am=0;
        }else{
            am=1;
            hours=parseInt(d.getHours())-12;
        }
        if(am==0){
            return month+"月"+date+"号 上午"+hours+":"+minutes;
        }else{
            return month+"月"+date+"号 下午"+hours+":"+minutes;
        }
    }
    if(type==4){
        return month+"."+date;
    }
    if(type==3){
        return d.getFullYear()+"-"+month+"-"+date;
    }
    if(type==2){
        return month+"-"+date+" "+hours+":"+minutes;
    }
    if(type==1){
        return hours+":"+minutes;
    }
    if(type==0){
        return d.getFullYear()+"-"+month+"-"+date+" "+hours+":"+minutes;
    }
    return d.getFullYear()+"-"+month+"-"+date+" "+hours+":"+minutes+":"+second;
}

module.exports = {
    formatTime: formatTime,
    reverse: reverse
}
