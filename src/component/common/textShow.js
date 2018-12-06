import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, } from 'react-native';
import { withNavigation } from 'react-navigation';

export default class textShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title || '左标题',
      content: this.props.content || " ",
      under: this.props.underlayColor || "rgba(32,115,211,.8)",
    };
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    this.setState({
      content: nextProps.content
    })
    /* 组件初始化时不调用，组件接受新的props时调用 */
  }
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={[cs.container, this.props.style]} >
        <View style={cs.viewStyle}>
          <View style={cs.textContainera}>
            <Text style={[cs.titleText, this.props.titleStyle]}>{this.state.title}</Text>
          </View>
          <View style={cs.textContainerb}>
            <Text style={[cs.contentText, this.props.contentStyle]}>{this.state.content}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
const cs = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#ffffff',
  },
  viewStyle: {
    flexDirection: 'row',
  },
  textContainera: {
    minWidth: 70,
    height: 18,
    justifyContent: 'center',
  },
  textContainerb: {
    flex: 1,
    height: 18,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 14,
    color: '#999999',
  },
  contentText: {
    color: '#333333',
    fontSize: 16,
  }
});