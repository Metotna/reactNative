import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView } from 'react-native';


@insertStyle('netBarDetail')
export default class Main extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    console.log(navigation.getParam('itemId', 'NO-ID'), 1111)
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: ds.cloneWithRows(['2018-05-21', '2018-05-22', '2018-05-23', '2018-05-24', '2018-05-25', '2018-05-26', '2018-05-27']),
    };
    // this.handleClick= this.handleClick.bind(this)
  }
  _hanleList = (rowData, index) => {
    return (
      <View style={index % 2 ? ss.listCotEven : ss.listCotOdd}>
        <Text style={[ss.flexText, ss.tul]} onPress={() => this.props.navigation.navigate('NetBarDay', {
          time: rowData,
        })}>{rowData}</Text>
        <Text style={[ss.flexText, ss.tAr, ss.tblue]}>77777.88</Text>
        <Text style={[ss.flexText, ss.tAr, ss.tgreen]}>22222.22</Text>
        <Text style={[ss.flexText, ss.tAr]}>99999.99</Text>
      </View>
    )
  }
  render() {
    return (
      <View style="container">
        <View style={["flexrow", "content"]}>
          <Text style={["flex1", "f14h30", "tAlignL", "fblock3"]}>日期</Text>
          <Text style={["flex1", "f14h30", "tAlignR", "fblock3"]}>线下销售额</Text>
          <Text style={["flex1", "f14h30", "tAlignR", "fblock3"]}>线上销售额</Text>
          <Text style={["flex1", "f14h30", "tAlignR", "fblock3"]}>总销售额</Text>
        </View>
        <View style="border10h" />
        <View style={["flex1",]}>
          <ListView 
          dataSource={this.state.data} 
          removeClippedSubviews={false}
          renderRow={(rowData, a, index) => (
            <View style={index % 2 ? ss.listCotEven : ss.listCotOdd}>
              <Text style={[ss.flexText, ss.tul]} onPress={() => this.props.navigation.navigate('NetBarDay', {
                time: rowData,
              })}>{rowData}</Text>
              <Text style={[ss.flexText, ss.tAr, ss.tblue]}>77777.88</Text>
              <Text style={[ss.flexText, ss.tAr, ss.tgreen]}>22222.22</Text>
              <Text style={[ss.flexText, ss.tAr]}>99999.99</Text>
            </View>
          )} />
          <View style="border10h" />

        </View>
      </View>
    )
  }
}

const ss = StyleSheet.create({
  icon: {
    marginLeft: 5,
  },
  listCotOdd: {
    flexDirection: "row",
    height: 30,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "#F3F3F3"
  },
  listCotEven: {
    flexDirection: "row",
    height: 30,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "#ffffff"
  },
  flexText: {
    flex: 1,
    fontSize: 14,
    height: 30,
    lineHeight: 30,
    color: '#333333',
  },
  tAr: {
    textAlign: "right"
  },
  tgreen: {
    color: "#6DC3C4"
  },
  tblue: {
    color: "rgba(17,79,205,1)"
  },
  tul: {
    textDecorationLine: "underline"
  }
})