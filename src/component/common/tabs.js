import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, FlatList } from 'react-native';
const { width, height } = Dimensions.get('window');

export default class textShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title || '左标题',
      content: this.props.content || " ",
      under: this.props.underlayColor || "rgba(32,115,211,.8)",
      choose: "0",
      oldChoose:0,
    };
    this.fisrt = true;
    this.list = this.props.tabs||[{ title: 'tab1' }, { title: 'tab2' }, { title: 'tab3' }]
    this.underWidth = (width / this.list.length) * .7;
    this.underLeft = (width / this.list.length) * 0.15
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    /* 组件初始化时不调用，组件接受新的props时调用 */
  }
  componentWillUpdate(props,state){
    // console.log(props,state)
  }
  componentDidUpdate(objectprevProps, objectprevState) {
    // console.log(objectprevProps,objectprevState)
    // if(!this.fisrt){ this.props.onChange(this.props.tabs[this.state.choose])}
    // this.fisrt=false;
  }
  _choose = (val) => {
    if(val==this.state.choose) return 
    this.setState({ choose: val })
    if(this.props.onChange){
      this.props.onChange(this.props.tabs[val])
    }
  }
  render() {
    const cs = {
      container: {
        height: 35,
        backgroundColor: '#fff',
        flexDirection: 'row'
      },
      listView: {
        flex: 1,
        height: 35,
        justifyContent: "center",
      },
      list: {
        textAlign: "center",
        fontSize: 16,
        color: "#666666"
      },
      choose: {
        color: "#E7505A",
        textAlign: "center",
        fontSize: 16,
      },
      underline: {
        position: "absolute",
        bottom: 0,
        left: this.underLeft,
        right: 0,
        height: 2,
        width: this.underWidth,
        backgroundColor: "red"
      }
    }
    return (
      // 
      <View style={cs.container} >

        <TouchableHighlight style={cs.listView} onPress={() => this._choose("0")} underlayColor="rgba(256,256,256,0.3)" >
          <View style={cs.listView}>
            {
              this.state.choose == 0
                ? <View style={cs.underline} />
                : null
            }
            <Text style={this.state.choose == 0 ? cs.choose : cs.list}>{this.list[0].title}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={cs.listView} onPress={() => this._choose("1")} underlayColor="rgba(256,256,256,0.3)">
          <View style={cs.listView}>

            {
              this.state.choose == 1
                ? <View style={cs.underline} />
                : null
            }
            <Text style={this.state.choose == 1 ? cs.choose : cs.list}>{this.list[1].title}</Text>
          </View>
        </TouchableHighlight>

        {
          this.list[2]
            ? <TouchableHighlight style={cs.listView} onPress={() => this._choose("2")} underlayColor="rgba(256,256,256,0.3)">
              <View style={cs.listView}>
                {
                  this.state.choose == 2
                    ? <View style={cs.underline} />
                    : null
                }
                <Text style={this.state.choose == 2 ? cs.choose : cs.list}>{this.list[2].title}</Text>
              </View>
            </TouchableHighlight>
            : null
        }
        
        {
          this.list[3]
            ? <TouchableHighlight style={cs.listView} onPress={() => this._choose("3")} underlayColor="rgba(256,256,256,0.3)">
              <View style={cs.listView}>
                {
                  this.state.choose == 3
                    ? <View style={cs.underline} />
                    : null
                }
                <Text style={this.state.choose == 3 ? cs.choose : cs.list}>{this.list[3].title}</Text>
              </View>
            </TouchableHighlight>
            : null
        }
      </View>
    );
  }
}
