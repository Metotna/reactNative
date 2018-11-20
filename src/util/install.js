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
function rnLess(style) {
  const React = require('react');
  if (!React.rnLessOriginalCreateElement) {//save original createElement
    React.rnLessOriginalCreateElement = React.createElement;
  }
  return function (target) {
    const originalRender = target.prototype.render;

    target.prototype.render = function (...renderArgs) {
      //1. proxy the createElement
      React.createElement = fakeCreate;
      //2. start rendering
      const ret = originalRender.apply(this, renderArgs);
      //3. restore the createElement
      React.createElement = React.rnLessOriginalCreateElement;
      return ret;
    };
  };
  //replace style string with the real style(number)
  function fakeCreate(...args) {
    if (args && args[1] && args[1].style) {
      if (typeof args[1].style === 'string') {
        args[1].style = [args[1].style];
      }
      if (Array.isArray(args[1].style)) {
        args[1].style.forEach((styleName, i) => {
          if (typeof styleName === 'string') {
            if (style[styleName]) {
              args[1].style[i] = style[styleName];
            } else {
              console.warn(`can't find style`, styleName);
            }
          }
        });
      }
    }
    return React.rnLessOriginalCreateElement.apply(this, args);
  }
}
module.exports = rnLess