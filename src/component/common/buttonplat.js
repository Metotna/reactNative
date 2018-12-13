import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';

export default class button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title || this.props.children,
      under: this.props.underlayColor || "rgba(32,115,211,.8)",
      loading: this.props.loading || 'none',

    };
  }
  componentWillReceiveProps(nextProps) {
    /* 组件初始化时不调用，组件接受新的props时调用 */
    this.setState({
      loading: nextProps.loading ||"none"
    })
  }

  _PressButton=()=>{
    if(this.state.loading=="none"){
      this.props.onPress()
    }else {
      if(this.state.loading)return 
      this.setState({loading:true})
      this.props.onPress()
    }
  }
  render() {
    return (
      <TouchableHighlight
        onPress={this._PressButton}
        underlayColor={this.state.under}
      >
        <View style={[cs.container, this.props.style]}>
          {
            this.state.loading !="none"
              ? <View style={cs.contchild}>
                <ActivityIndicator style={{ height: 30, width: 30 }} />
                <View style={cs.viewText}>
                  <Text style={[cs.titleText, this.props.textStyle]}>{this.state.title}</Text>
                </View>
              </View>
              : <Text style={[cs.titleText, this.props.textStyle]}>{this.state.title}</Text>
          }
        </View>
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
    height: 30,
    justifyContent: 'center',
  },
  contchild: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewText: {
    height: 30,
    justifyContent: 'center',

  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 14,
  }
});