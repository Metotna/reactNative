
import React, { Component } from 'react';
import { KeyboardAvoidingView, Dimensions, StyleSheet, ScrollView, Keyboard, View } from 'react-native'
const { width, height } = Dimensions.get('window');

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      keyboardHeight: 0,
    }
  }
  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }
  keyboardWillShow = (event) => {
    this.setState({
      show: true,
      keyboardHeight: event.startCoordinates.height
    })
  };
  keyboardWillHide = (event) => {
    this.setState({
      show: false,
      keyboardHeight: 0,
    })
  }

  render() {
    return (
      <View style={[{ flex: 1 }, this.props.scroll]}>
        {this.props.children}
        <View style={{ height: this.state.keyboardHeight, opacity: 0 }}></View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  outerContainer: {
    height: height
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },

});
