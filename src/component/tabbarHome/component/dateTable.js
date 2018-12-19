import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image, Linking } from 'react-native';
import { withNavigation } from 'react-navigation';
import f from '../../../util/filter'
import Icon from 'react-native-vector-icons/FontAwesome'
import {onlineOffShow } from "../../../config"

@insertStyle('HomeComTable')
class Main extends Component {
  constructor(props) {
    super(props);
    // this.handleClick= this.handleClick.bind(this)
    this.state = {
      value: '',
      name1: this.props.total ? '' : '销售:　',
      name2: this.props.total ? '' : '兑奖:　',
      data:this.props.data,
    };
    // console.log(this.props.data)
  } 
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    this.setState({
      data:nextProps.data
    })
    /* 组件初始化时不调用，组件接受新的props时调用 */
  }
  _onPressButton = () => {
    if (this.props.link) return
    this.props.navigation.navigate('NetBarDetail', {
      shopId: this.props.data.shopId,
      otherParam: 'anything you want here',
      title: this.props.name,
    });
  }
  _showData = (f, c) => {
    try {
      if (this.state.data[f][c]!= null){
        // console.log(`${f}.${c}:${this.state.data[f][c]}`)
        return this.state.data[f][c]
      } 
      else return "--"
    }catch(err){
      return "--"
    }
  }

  _timeFormat = (data) => {
    if (data != '--' && data) {
      return new Date(data.replace(/-/g, '/')).format("MM-dd [w]")
    }
    return '--'
  }

  _iconPhone = (phone) => {
    if (!phone) return
    let strPhone = "tel:" + phone;
    Linking.openURL(strPhone);
  }


  render() {
    return (
      <TouchableHighlight onPress={this._onPressButton} underlayColor="#fff">
        <View style={this.props.name ? [styles.container, styles.contbase] : [styles.container2, styles.contbase]} >
          {
            this.props.name ?
              <View style="title">
                <View style="t_nameView">
                  <Text style={["t_name", "fblock3"]}>{this.props.name}</Text>
                </View>
                <TouchableHighlight onPress={() => this._iconPhone(this.props.data.shopPhone)} underlayColor="#fff">
                  <Image style="t_img" source={require('../../../assets/image/img/tell.png')} />
                </TouchableHighlight>
                {/* <Icon name="phone" size={24} color="#267fd8" onPress={this._iconPhone} /> */}
              </View>
              : null
          }
          {/* <View style={["","JCC"]}></View> */}

          <View style={["flexrow", "flex1", "borderB"]}>

            <View style="flex1">
              <View style={["borderB", "padTB6"]}>
                <View style={["h28", "JCC"]}>
                  <Text style={["tr_r", "f16", "fblock6"]}>上月</Text>
                </View>
                <View style={["h24", "JCC"]}>
                  <Text style={["tr_r", "f16", "fblock3"]}>{f.number(this._showData('syReport', 'allSell'))}</Text>
                </View>
                <View style={["h24", "JCC"]}>
                  <Text style={["tr_r", "f16", "fred"]}>{f.number(this._showData('syReport', 'allBonus'))}</Text>
                </View>
              </View>
              <View style={["flexrow", "flex1"]}>
                <View style={["flex1", "padB3"]}>
                  <View style={["h22", "JCC"]}>
                    <Text style={["tr_r", "f13", "fblock6"]}>线上</Text>
                  </View>
                  <View style={["h17", "JCC"]}>
                    <Text style={["tr_r", "f13", "fgreen"]}>{onlineOffShow?f.number(this._showData('syReport', 'onlineSell')):"--"}</Text>
                  </View>
                  <View style={["h17", "JCC"]}>
                    <Text style={["tr_r", "f13", "fred"]}>{onlineOffShow?f.number(this._showData('syReport', 'onlineBonus')):"--"}</Text>
                  </View>
                </View>
                {/* <View style="border10"></View> */}
                <View style={["flex1", "padB3"]}>
                  <View style={["h22", "JCC"]}>
                    <Text style={["tr_r", "f13", "fblock6"]}>线下</Text>
                  </View>
                  <View style={["h17", "JCC"]}>
                    <Text style={["tr_r", "f13", "fblue"]}>{onlineOffShow?f.number(this._showData('syReport', 'offlineSell')):"--"}</Text>
                  </View>
                  <View style={["h17", "JCC"]}>
                    <Text style={["tr_r", "f13", "fred"]}>{onlineOffShow?f.number(this._showData('syReport', 'offlineBonus')):"--"}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style="border15"></View>

            <View style="flex1">
              <View style={["borderB", "padTB6"]}>
                <View style={["h28", "JCC"]}>
                  <Text style={["tr_r", "f16", "fblock6"]}>本月</Text>
                </View>
                <View style={["h24", "JCC"]}>
                  <Text style={["tr_r", "f16", "fblock3"]}>{f.number(this._showData('byReport', 'allSell'))}</Text>
                </View>
                <View style={["h24", "JCC"]}>
                  <Text style={["tr_r", "f16", "fred"]}>{f.number(this._showData('byReport', 'allBonus'))}</Text>
                </View>
              </View>



              <View style={["flexrow", "flex1"]}>
                <View style={["flex1", "padB3"]}>
                  <View style={["h22", "JCC"]}>
                    <Text style={["tr_r", "f13", "fblock6"]}>线上</Text>
                  </View>
                  <View style={["h17", "JCC"]}>
                    <Text style={["tr_r", "f13", "fgreen"]}>{onlineOffShow?f.number(this._showData('byReport', 'onlineSell')):"--"}</Text>
                  </View>
                  <View style={["h17", "JCC"]}>
                    <Text style={["tr_r", "f13", "fred"]}>{onlineOffShow?f.number(this._showData('byReport', 'onlineBonus')):"--"}</Text>
                  </View>
                </View>
                {/* <View style="border10"></View> */}
                <View style={["flex1", "padB3"]}>
                  <View style={["h22", "JCC"]}>
                    <Text style={["tr_r", "f13", "fblock6"]}>线下</Text>
                  </View>
                  <View style={["h17", "JCC"]}>
                    <Text style={["tr_r", "f13", "fblue"]}>{onlineOffShow?f.number(this._showData('byReport', 'offlineSell')):"--"}</Text>
                  </View>
                  <View style={["h17", "JCC"]}>
                    <Text style={["tr_r", "f13", "fred"]}>{onlineOffShow?f.number(this._showData('byReport', 'offlineBonus')):"--"}</Text>
                  </View>
                </View>
              </View>

            </View>

            <View style="border15"></View>

            <View style={["flex1", "padR5"]}>
              <View style={["borderB", "padTB6"]}>
                <View style={["h28", "JCC"]}>
                  <Text style={["tr_r", "f16", "fblock6"]}>{this._timeFormat(this._showData('nearlyReport', 'dateMemo'))}</Text>
                </View>
                <View style={["h24", "JCC"]}>
                  <Text style={["tr_r", "f16", "fblock3"]}>{this.state.name1}{f.number(this._showData('nearlyReport', 'allSell'))}</Text>
                </View>
                <View style={["h24", "JCC"]}>
                  <Text style={["tr_r", "f16", "fred"]}>{this.state.name2}{f.number(this._showData('nearlyReport', 'allBonus'))}</Text>
                </View>
              </View>
              <View style={["flexrow", "flex1"]}>
                <View style={["flex1", "padB3"]}>
                  <View style={["h22", "JCC"]}>
                    <Text style={["tr_r", "f13", "fblock6"]}>线上</Text>
                  </View>
                  <View style={["h17", "JCC"]}>
                    <Text style={["tr_r", "f13", "fgreen"]}>{onlineOffShow?f.number(this._showData('nearlyReport', 'onlineSell')):"--"}</Text>
                  </View>
                  <View style={["h17", "JCC"]}>
                    <Text style={["tr_r", "f13", "fred"]}>{onlineOffShow?f.number(this._showData('nearlyReport', 'onlineBonus')):"--"}</Text>
                  </View>
                </View>
                {/* <View style="border10"></View> */}
                <View style={["flex1", "padB3"]}>
                  <View style={["h22", "JCC"]}>
                    <Text style={["tr_r", "f13", "fblock6"]}>线下</Text>
                  </View>
                  <View style={["h17", "JCC"]}>
                    <Text style={["tr_r", "f13", "fblue"]}>{onlineOffShow?f.number(this._showData('nearlyReport', 'offlineSell')):"--"}</Text>
                  </View>
                  <View style={["h17", "JCC"]}>
                    <Text style={["tr_r", "f13", "fred"]}>{onlineOffShow?f.number(this._showData('nearlyReport', 'offlineBonus')):"--"}</Text>
                  </View>
                </View>
              </View>
              {
                this._showData('nearlyReport', 'status', true) == 10 && this.props.showTag
                  ? <View style="updata">
                    <Text style='f14h20'>{this._timeFormat(this._showData('nearlyReport', 'dateMemo'))}</Text>
                    <Text style='f14h20'>未上传报表</Text>
                    <Text style='f14h20'>请联系负责人</Text>
                  </View>
                  : null
              }
              {
                this._showData('nearlyReport', 'status', true) == 20 && this.props.showTag
                  ? <View style="updata">
                    <Text style='f14h20'>{this._timeFormat(this._showData('nearlyReport', 'dateMemo'))}</Text>
                    <Text style='f14h20'>报表待审核</Text>
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
    height: 185,
    marginBottom: 2,
  },
  container2: {
    height: 148,
  }
});
export default withNavigation(Main)