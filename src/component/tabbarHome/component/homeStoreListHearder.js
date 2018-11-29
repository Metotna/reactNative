import React, { Component } from 'react';
import { Text, View,  } from 'react-native';

@insertStyle('netBarDetail')
export default  class Main extends Component {

  render() {
    return (
      <View style="container">
        <View style={["flexrow", "content"]}>
          <Text style={["flex1", "f14h30", "tAlignL", "fblock3"]}>日期</Text>
          <Text style={["flex1", "f14h30", "tAlignR", "fblock3"]}>线上销售额</Text>
          <Text style={["flex1", "f14h30", "tAlignR", "fblock3"]}>线下销售额</Text>
          <Text style={["flex1", "f14h30", "tAlignR", "fblock3"]}>总销售额</Text>
        </View>
      </View>
    )
  }

}