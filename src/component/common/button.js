import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, } from 'react-native';
import { withNavigation } from 'react-navigation';

export default class button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title || '测试',
      under: this.props.underlayColor || "rgba(32,115,211,.8)",
    };
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress || this._PressButton}
        underlayColor={this.state.under}
        style={[cs.container, this.props.style]}
      >
        <Text style={[cs.titleText, this.props.textStyle]}>{this.state.title}</Text>
      </TouchableHighlight>
    );
  }
}
const cs = StyleSheet.create({
  container: {
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: '#2073D3',
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 14,
  }
});