'use strict'

 const Base={
  Intranet:{
    url:'http://192.168.1.200:8082',
      //url:'http://192.168.1.133:8082',
    desc:"开发环境"
  },
  IntranetCS:{
    url:'http://192.168.1.192:8082',
      //url:'http://192.168.1.133:8082',
    desc:"测试环境"
  },
  IntranetRAP:{
    url:'192.168.1.250:9998/mockjs/11',
    desc:'Rap测试环境'
  },
  IntranetXBT:{
    url:'http://192.168.1.133:8082',
    desc:'测试环境-XBT'
  },
  Internet:{
    url:'https://p.778668.cn:8086',
    desc:'线上环境'
  },
}
export default Base.Intranet
// export default Base.Internet
