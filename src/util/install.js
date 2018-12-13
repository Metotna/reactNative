Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "w": this.getDay(), //星期
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };

  var week = [`日`, `一`, `二`, `三`, `四`, `五`, `六`];
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      if (k == 'w') {
        fmt = fmt.replace(RegExp.$1, week[o[k]]);
      } else {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
  }
  return fmt;
}

export const getXWeekDate = (year, weeks, format) => {
  var format = format || 'yyyy/MM/dd'
  var date = new Date(year, "0", "1");
  var time = date.getTime();
  // 获取当前星期几，0：星期一 。。。。        

  var _week = date.getDay();
  //当这一年的1月1日为周日时则本年有54周，否则没有54周，没有则去除第54周的提示        
  if (_week != 0) { //一年53周情况                    
    if (weeks == 54) {
      return '今年没有54周';
    }
    var cnt = 0; // 获取距离周末的天数                  
    if (_week == 0) {
      cnt = 7;
    }
    else if (_week == 1) {
      cnt = 6;
    }
    else if (_week == 2) {
      cnt = 5;
    }
    else if (_week == 3) {
      cnt = 4;
    }
    else if (_week == 4) {
      cnt = 3;
    }
    else if (_week == 5) {
      cnt = 2;
    }
    else if (_week == 6) {
      cnt = 1;
    }
    cnt += 1; //加1表示以星期一为一周的第一天                   
    // 将这个长整形时间加上第N周的时间偏移                   
    time += cnt * 24 * 3600000; //第2周开始时间                 
    var nextYear = new Date(parseInt(year, 10) + 1, "0", "1");
    var nextWeek = nextYear.getDay();
    var lastcnt = 0; //获取最后一周开始时间到周末的天数                   
    if (nextWeek == 0) {
      lastcnt = 6;
    }
    else if (nextWeek == 1) {
      lastcnt = 0;
    }
    else if (nextWeek == 2) {
      lastcnt = 1;
    }
    else if (nextWeek == 3) {
      lastcnt = 2;
    }
    else if (nextWeek == 4) {
      lastcnt = 3;
    }
    else if (nextWeek == 5) {
      lastcnt = 4;
    }
    else if (nextWeek == 6) {
      lastcnt = 5;
    }
    if (weeks == 1) { //第1周特殊处理                       
      // 为日期对象 date 重新设置成时间 time                      
      var start = date.format(format);
      date.setTime(time - 24 * 3600000);
      return [start, date.format(format)]
    }
    else if (weeks == 53) { //第53周特殊处理                        
      var start = time + (weeks - 2) * 7 * 24 * 3600000; //第53周开始时间                      
      var end = time + (weeks - 2) * 7 * 24 * 3600000 + lastcnt * 24 * 3600000 - 24 * 3600000; //第53周结束时间                       
      // 为日期对象 date 重新设置成时间 time                    
      date.setTime(start);
      var _start = date.format(format);
      date.setTime(end);
      var _end = date.format(format);
      return [_start, _end]
    } else {
      var start = time + (weeks - 2) * 7 * 24 * 3600000; //第n周开始时间                       
      var end = time + (weeks - 1) * 7 * 24 * 3600000 - 24 * 3600000; //第n周结束时间                       
      // 为日期对象 date 重新设置成时间 time                      
      date.setTime(start);
      var _start = date.format(format);
      date.setTime(end);
      var _end = date.format(format);
      return [_start, _end]
    }
  } else { //一年54周情况                    
    var cnt = 0; // 获取距离周末的天数                    
    if (_week == 0 && weeks == 1) { //第一周                 
      cnt = 0;
    }
    else if (_week == 0) {
      cnt = 7;
    }
    else if (_week == 1) {
      cnt = 6;
    }
    else if (_week == 2) {
      cnt = 5;
    }
    else if (_week == 3) {
      cnt = 4;
    }
    else if (_week == 4) {
      cnt = 3;
    }
    else if (_week == 5) {
      cnt = 2;
    }
    else if (_week == 6) {
      cnt = 1;
    }
    cnt += 1; //加1表示以星期一为一周的第一天                   
    // 将这个长整形时间加上第N周的时间偏移                 
    time += 24 * 3600000; //第2周开始时间                   
    var nextYear = new Date(parseInt(year, 10) + 1, "0", "1");
    var nextWeek = nextYear.getDay();
    var lastcnt = 0; //获取最后一周开始时间到周末的天数                    
    if (nextWeek == 0) {
      lastcnt = 6;
    }
    else if (nextWeek == 1) {
      lastcnt = 0;
    }
    else if (nextWeek == 2) {
      lastcnt = 1;
    }
    else if (nextWeek == 3) {
      lastcnt = 2;
    }
    else if (nextWeek == 4) {
      lastcnt = 3;
    }
    else if (nextWeek == 5) {
      lastcnt = 4;
    }
    else if (nextWeek == 6) {
      lastcnt = 5;
    }
    if (weeks == 1) { //第1周特殊处理                       
      // 为日期对象 date 重新设置成时间 time                        
      var start = date.format(format);
      date.setTime(time - 24 * 3600000);
      return [start, date.format(format)]
    }
    else if (weeks == 54) { //第54周特殊处理                        var start = time+(weeks-2)*7*24*3600000; //第54周开始时间                        var end = time+(weeks-2)*7*24*3600000+ lastcnt*24*3600000- 24*3600000; //第53周结束时间                       
      // 为日期对象 date 重新设置成时间 time                     
      date.setTime(start);
      var _start = date.format(format);
      date.setTime(end);
      var _end = date.format(format);
      return [_start, _end]
    } else {
      var start = time + (weeks - 2) * 7 * 24 * 3600000; //第n周开始时间                       
      var end = time + (weeks - 1) * 7 * 24 * 3600000 - 24 * 3600000; //第n周结束时间                       
      // 为日期对象 date 重新设置成时间 time                      
      date.setTime(start);
      var _start = date.format(format);
      date.setTime(end);
      var _end = date.format(format);
      return [_start, _end]
    }
  }
}

export const getweek = (z) => {//参数z是"2018-05-07 15:12:36"或者"2018/05/07 15:12:36"
  z = z ? z : new Date()
  var day11 = Date.parse(z);
  var day11 = new Date(day11);
  day11.setMonth(0);
  day11.setDate(1);
  day11.setHours(0);
  day11.setMinutes(0);
  day11.setSeconds(0);//到这里就得到该年的一月一日

  var day11mill = day11.getTime();
  var ori_day = day11.getDay();//该年的一月一日是星期几
  var fill1 = 0;//与星期日相隔的毫秒数
  if (ori_day !== 0) {
    fill1 = ori_day * 60 * 60 * 24 * 1000;
  }

  var now = Date.parse(z);
  now = new Date(now);
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  var nowmill = now.getTime();
  var now_day = now.getDay();
  var fill2 = 0;
  if (now_day !== 0) {
    fill2 = (7 - now_day) * 60 * 60 * 24 * 1000;
  }
  var cha2 = (nowmill - day11mill + fill1 + fill2) / (60 * 60 * 24 * 1000);
  var week = Math.ceil(cha2 / 7);
  if (week < 10) {
    week = "0" + week;
  }
  var year = now.getFullYear();
  return [year, week];
}