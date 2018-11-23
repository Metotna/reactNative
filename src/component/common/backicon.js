import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class Main extends Component {
  constructor(props) {
    super(props);
    // this.handleClick= this.handleClick.bind(this)
  }

  render() {
    return (
      <Image style={styles.icon} source={require('../../assets/image/backicon.png')} />
    )
  }
}
const styles = StyleSheet.create({
  icon: {
    marginLeft: 5,
  },
})