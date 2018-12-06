const source = {
  workType: {
    '1': "自营",
    '2': "联营",
  },
  /* 网吧的彩票机类型 */
  schedule:{
    "1":{
      "desc":"体彩",
      "10":"提交建站申请",
      "20":"实地勘查",
      "30":"网吧签合同",
      "40":"与体彩签合同",
      "41":"装修",
      "42":"申领机器",
      "50":"培训",
      "60":"正常营业",
    },
    "2":{
      "desc":"福彩",
      "10":"提交建站申请",
      "20":"实地勘查",
      "30":"网吧签合同",
      "40":"装修",
      "41":"福彩签合同",
      "50":"培训",
      "60":"正常营业",
    }
  },
  sellLot:{
    "1":'竞彩',
    "2":'数字彩',
    "3":'高频彩',
  }
}

export default class filter {
  static workType(val) {
    if (val) {
      let res = source.workType[val]
      return res ? res : val
    }
    return val
  }

  static lotOrgRes(lotorg,schedule){
    if(lotorg){
      let res = ''
      if(schedule){
        res = source.schedule[lotorg][schedule]
        return res ? res : schedule
      }else {
        res = source.schedule[lotorg].desc
        return res ? res : lotorg
      }
    }
    return lotorg
  }
  
  static sellLot(val) {
    if (val) {
      let v = val.split(',')
      let r =[]
      for(var i = 0;i<v.length;i++){
        if(source.sellLot[v[i]]){
          r.push(source.sellLot[v[i]])
        }
      }
      return r.join(',')
    }
    return val
  }

  static number(val){
    var re = /^[0-9]+.?[0-9]*$/;
    if(re.test(val)){
      if(val>10000){
        return (val/10000).toFixed(1)+'万'
      }else{
        return (val*1).toFixed(1)
      }
    }
    return val
  }
}