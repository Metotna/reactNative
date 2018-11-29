import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, } from 'react-native';
import { withNavigation } from 'react-navigation';

export default class textShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title || '左标题',
      content: this.props.content || "内容",
      under: this.props.underlayColor || "rgba(32,115,211,.8)",
    };
  }
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={[cs.container, this.props.style]} >
        <View style={cs.viewStyle}>
          <Text style={[cs.titleText, this.props.titleStyle]}>{this.state.title}</Text>
          <Text style={[cs.contentText, this.props.contentStyle]}>{this.state.content}</Text>
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
  viewStyle:{
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 14,
    color: '#999999',
    minWidth: 70,
    lineHeight:15,
  },
  contentText: {
    flex:1,
    color: '#333333',
    fontSize: 16,
    lineHeight:16,
  }
});