import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class Main extends Component {
  constructor(props) {
    super(props);
    // this.handleClick= this.handleClick.bind(this)
  }

  render() {
    return (
      <View style={styles.contanir}>
      <Image style={styles.icon} source={require('../../assets/image/backicon.png')} />

      </View>
    )
  }
}
const styles = StyleSheet.create({
  contanir:{
    height:30,
    width:50,
    justifyContent:"center"
  },
  icon: {
    marginLeft: 10,

  },
})