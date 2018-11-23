import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, } from 'react-native';
import { withNavigation } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome'

@insertStyle('HomeComTable')
class Main extends Component {
  constructor(props) {
    super(props);
    // this.handleClick= this.handleClick.bind(this)
    this.state = {
      value: '',
      name1: this.props.total ? '' : '销售:',
      name2: this.props.total ? '' : '兑奖:',
    };
  }
  // style={["container", "sss"]}
  _onPressButton = () => {
    this.props.navigation.navigate('NetBarDetail',{
      itemId: 86,
      otherParam: 'anything you want here',
      title:this.props.name,
    });
    // DetailList
    console.log(`table touch`)
  }
  iconPhone = () => {
    console.log(`call phone`)
  }
  render() {
    return (
      <TouchableHighlight onPress={this._onPressButton} underlayColor="#fff">
        <View style={this.props.name ? [styles.container, styles.contbase] : [styles.container2, styles.contbase]} >
          {
            this.props.name ?
              <View style="title">
                <Text style="t_name">{this.props.name}</Text>
                <Icon name="phone" size={24} color="red" onPress={() => (this.iconPhone())} />
              </View>
              : null
          }

          <View style={["table", "borderB"]}>

            <View style="table_td">
              <View style="borderB">
                <Text style={["tr", "tr_h3", "month_t"]}>上月</Text>
                <View style={{ borderTopColor: '#f2f3f5', borderTopWidth: 1, }}>
                  <Text style={["tr", "tr_h3", "month_a"]}>888.8万</Text>
                  <Text style={["tr", "tr_h3", "month_b"]}>888.8万</Text>
                </View>
              </View>
              <View style="table">
                <View style={["table_td"]}>
                  <Text style={["tr", "tr_h2", "child_t"]}>线上</Text>
                  <Text style={["tr", "fgreen", "tr_h2", "child_a"]}>88.8万</Text>
                  <Text style={["tr", "fred", "tr_h2",]}>88.8万</Text>
                </View>
                <View style="border10"></View>
                <View style={["table_td"]}>
                  <Text style={["tr", "tr_h2", "child_t"]}>线下</Text>
                  <Text style={["tr", "fblue", "tr_h2", "child_a"]}>88.8万</Text>
                  <Text style={["tr", "fred", "tr_h2",]}>88.8万</Text>
                </View>
              </View>
            </View>

            <View style="border15"></View>

            <View style="table_td">
              <View style="borderB">
                <Text style={["tr", "tr_h3", "month_t"]}>上月</Text>
                <View style={{ borderTopColor: '#f2f3f5', borderTopWidth: 1, }}>
                  <Text style={["tr", "tr_h3", "month_a"]}>888.8万</Text>
                  <Text style={["tr", "tr_h3", "month_b"]}>888.8万</Text>
                </View>
              </View>
              <View style="table">
                <View style={["table_td"]}>
                  <Text style={["tr", "tr_h2", "child_t"]}>线上</Text>
                  <Text style={["tr", "fgreen", "tr_h2", "child_a"]}>88.8万</Text>
                  <Text style={["tr", "fred", "tr_h2",]}>88.8万</Text>
                </View>
                <View style="border10"></View>
                <View style={["table_td"]}>
                  <Text style={["tr", "tr_h2", "child_t"]}>线下</Text>
                  <Text style={["tr", "fblue", "tr_h2", "child_a"]}>88.8万</Text>
                  <Text style={["tr", "fred", "tr_h2",]}>88.8万</Text>
                </View>
              </View>
            </View>

            <View style="border15"></View>

            <View style="table_width">
              <View style="borderB">
                <Text style={["tr", "tr_h3", "month_t"]}>2015/08/26(昨日)</Text>
                <View style={{ borderTopColor: '#f2f3f5', borderTopWidth: 1, }}>
                  <Text style={["tr", "tr_h3", "month_a"]}>{this.state.name1}888.8万</Text>
                  <Text style={["tr", "tr_h3", "month_b"]}>{this.state.name2}888.8万</Text>
                </View>
              </View>
              <View style="table">
                <View style={["table_td"]}>
                  <Text style={["tr", "tr_h2", "child_t"]}>线上</Text>
                  <Text style={["tr", "fgreen", "tr_h2", "child_a"]}>88.8万</Text>
                  <Text style={["tr", "fred", "tr_h2",]}>88.8万</Text>
                </View>
                <View style="border10"></View>
                <View style={["table_td"]}>
                  <Text style={["tr", "tr_h2", "child_t"]}>线下</Text>
                  <Text style={["tr", "fblue", "tr_h2", "child_a"]}>88.8万</Text>
                  <Text style={["tr", "fred", "tr_h2",]}>88.8万</Text>
                </View>
              </View>
            </View>

          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  contbase: {
    backgroundColor: "#fff",
  },
  container: {
    height: 187,
    marginBottom: 15,
  },
  container2: {
    height: 150,
  }
});
export default withNavigation(Main)