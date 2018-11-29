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

  _onPressButton = () => {
    if (this.props.link) return
    this.props.navigation.navigate('NetBarDetail', {
      itemId: this.props.data.shopId,
      otherParam: 'anything you want here',
      title: this.props.name,
    });
  }
  _showData = (f, c) => {
    try {
      if (this.props.data[f][c]) return this.props.data[f][c]
      else return "--"
    } catch (error) {
      return "--"
    }
  }

  _timeFormat = (data) => {
    if (data != '--' && data) {
      return new Date(data.replace(/-/g, '/')).format("yyyy-MM-dd [w]")
    }
    return '--'
  }

  _iconPhone = () => {
    console.log(this.props.data.shopPhone)
  }


  render() {
    return (
      <TouchableHighlight onPress={this._onPressButton} underlayColor="#fff">
        <View style={this.props.name ? [styles.container, styles.contbase] : [styles.container2, styles.contbase]} >
          {
            this.props.name ?
              <View style="title">
                <Text style={["t_name", "fblock3"]}>{this.props.name}</Text>
                <Icon name="phone" size={24} color="#267fd8" onPress={this._iconPhone} />
              </View>
              : null
          }

          <View style={["table", "borderB"]}>

            <View style="table_td">
              <View style="borderB">
                <Text style={["tr", "tr_h3", "month_t"]}>上月</Text>
                <View style={{ borderTopColor: '#f2f3f5', borderTopWidth: 1, }}>
                  <Text style={["tr", "tr_h3", "month_a"]}>{this._showData('syReport', 'allSell')}</Text>
                  <Text style={["tr", "tr_h3", "month_b"]}>{this._showData('syReport', 'allBonus')}</Text>
                </View>
              </View>
              <View style="table">
                <View style={["table_td"]}>
                  <Text style={["tr", "tr_h2", "child_t"]}>线上</Text>
                  <Text style={["tr", "fgreen", "tr_h2", "child_a"]}>{this._showData('syReport', 'onlineSell')}</Text>
                  <Text style={["tr", "fred", "tr_h2",]}>{this._showData('syReport', 'onlineBonus')}</Text>
                </View>
                <View style="border10"></View>
                <View style={["table_td"]}>
                  <Text style={["tr", "tr_h2", "child_t"]}>线下</Text>
                  <Text style={["tr", "fblue", "tr_h2", "child_a"]}>{this._showData('syReport', 'offlineSell')}</Text>
                  <Text style={["tr", "fred", "tr_h2",]}>{this._showData('syReport', 'offlineBonus')}</Text>
                </View>
              </View>
            </View>

            <View style="border15"></View>

            <View style="table_td">
              <View style="borderB">
                <Text style={["tr", "tr_h3", "month_t"]}>本月</Text>
                <View style={{ borderTopColor: '#f2f3f5', borderTopWidth: 1, }}>
                  <Text style={["tr", "tr_h3", "month_a"]}>{this._showData('byReport', 'allSell')}</Text>
                  <Text style={["tr", "tr_h3", "month_b"]}>{this._showData('byReport', 'allBonus')}</Text>
                </View>
              </View>
              <View style="table">
                <View style={["table_td"]}>
                  <Text style={["tr", "tr_h2", "child_t"]}>线上</Text>
                  <Text style={["tr", "fgreen", "tr_h2", "child_a"]}>{this._showData('byReport', 'onlineSell')}</Text>
                  <Text style={["tr", "fred", "tr_h2",]}>{this._showData('byReport', 'onlineBonus')}</Text>
                </View>
                <View style="border10"></View>
                <View style={["table_td"]}>
                  <Text style={["tr", "tr_h2", "child_t"]}>线下</Text>
                  <Text style={["tr", "fblue", "tr_h2", "child_a"]}>{this._showData('byReport', 'offlineSell')}</Text>
                  <Text style={["tr", "fred", "tr_h2",]}>{this._showData('byReport', 'offlineBonus')}</Text>
                </View>
              </View>
            </View>

            <View style="border15"></View>

            <View style="table_width">
              <View style="borderB">
                <Text style={["tr", "tr_h3", "month_t"]}>{this._timeFormat(this._showData('nearlyReport', 'dateMemo'))}</Text>
                <View style={{ borderTopColor: '#f2f3f5', borderTopWidth: 1, }}>
                  <Text style={["tr", "tr_h3", "month_a"]}>{this.state.name1}{this._showData('nearlyReport', 'allSell')}</Text>
                  <Text style={["tr", "tr_h3", "month_b"]}>{this.state.name2}{this._showData('nearlyReport', 'allBonus')}</Text>
                </View>
              </View>
              <View style="table">
                <View style={["table_td"]}>
                  <Text style={["tr", "tr_h2", "child_t"]}>线上</Text>
                  <Text style={["tr", "fgreen", "tr_h2", "child_a"]}>{this._showData('nearlyReport', 'onlineSell')}</Text>
                  <Text style={["tr", "fred", "tr_h2",]}>{this._showData('nearlyReport', 'onlineBonus')}</Text>
                </View>
                <View style="border10"></View>
                <View style={["table_td"]}>
                  <Text style={["tr", "tr_h2", "child_t"]}>线下</Text>
                  <Text style={["tr", "fblue", "tr_h2", "child_a"]}>{this._showData('nearlyReport', 'offlineSell')}</Text>
                  <Text style={["tr", "fred", "tr_h2",]}>{this._showData('nearlyReport', 'offlineBonus')}</Text>
                </View>
              </View>
              {
                this._showData('nearlyReport', 'status',true) == 10 && this.props.showTag
                  ? <View style="updata">
                    <Text style='f16h20'>{this._timeFormat(this._showData('nearlyReport', 'dateMemo'))}</Text>
                    <Text style='f16h20'>未上传报表</Text>
                    <Text style='f16h20'>请联系负责人</Text>
                    <Text style='f16h20'>进行录入</Text>
                  </View>
                  : null
              }

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
    marginBottom: 6,
  },
  container2: {
    height: 150,
  }
});
export default withNavigation(Main)