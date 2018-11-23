import rn_Less from 'rn-less/src/runtime';
import stylePublic from './script/public_less'
import style1 from './script/async_less'

function expmle(param) {
  let styleAry = [style1, stylePublic]
  if (param) {
    let _t = [];
    for (var key in styleAry) {
      try {
        _t.push(styleAry[key]({})[param])
      } catch (error) { }
    }
    if (_t.length) {
      let _temp = {}
      for (var x in _t) {
        _temp = Object.assign({}, _temp, _t[x])
      }
      var cssStyle = Object.assign({},_temp,stylePublic({}).public);
    } else {
      var cssStyle = stylePublic({}).public
    }
    // var cssStyle = Object.assign({}, style({}).TabbarHomeStyle, styleP({}).public)
  } else {
    var cssStyle = stylePublic({}).public
  }
  return rn_Less.rnLess(cssStyle)
}

global.insertStyle = expmle