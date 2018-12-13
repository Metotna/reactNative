import React, { Component } from 'react';
import { Text, View, } from 'react-native';
import { withNavigation } from 'react-navigation';

@insertStyle('netBarDetail')
 class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title || false,
      list: this.props.list || false,
      data: this.props.data,
      indexs: this.props.index || 0,
    };
  }

  render() {
    const style = {
      listColor: {
        flexDirection: "row",
        height: 30,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 7,
        paddingBottom: 7,
        backgroundColor: this.state.title ? "#ffffff" : (this.state.indexs % 2 ? "#f4f5f4" : "#ffffff")
      }
    }
    return (
      <View style="container">
        {
          !this.state.list
            ? <View style={style.listColor}>
              <Text style={["flistText","tAlignL"]}>日期</Text>
              <Text style={["flistText"]}>线上销售额</Text>
              <Text style={["flistText"]}>线下销售额</Text>
              <Text style={["flistText"]}>总销售额</Text>
            </View>
            : <View style={style.listColor}>
              <Text style={["flistText","tAlignL","tunderline"]} onPress={() => this.props.navigation.navigate('NetBarDay', {
            time: this.state.data.dateMemo})}>{this.state.data.dateMemo}</Text>
              <Text style={["flistText","fgreen"]}>{this.state.data.onlineSell}</Text>
              <Text style={["flistText","fblue"]}>{this.state.data.offlineSell}</Text>
              <Text style={["flistText"]}>{this.state.data.allSell}</Text>
            </View>
        }
      </View>
      //   <View >
      //   <View style={index % 2 ? styles.listCotOdd : styles.listCotEven}>
          // <Text style={[styles.flexText, styles.tul]} onPress={() => this.props.navigation.navigate('NetBarDay', {
          //   time: rowData.dateMemo,
          // })}>{rowData.dateMemo}</Text>
      //     <Text style={[styles.flexText, styles.tAr, styles.tgreen]}>{rowData.onlineSell}</Text>
      //     <Text style={[styles.flexText, styles.tAr, styles.tblue]}>{rowData.offlineSell}</Text>
      //     <Text style={[styles.flexText, styles.tAr]}>{rowData.allSell}</Text>
      //   </View>
      //   <View style={{ height: 1, backgroundColor: "#EEE" }} />
      // </View>
    )
  }

}
export default withNavigation(Main)