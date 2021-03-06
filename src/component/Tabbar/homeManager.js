
import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ActivityIndicator, RefreshControl, Dimensions, DeviceEventEmitter, Modal, Image, TouchableHighlight } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tabs } from 'antd-mobile-rn'

import Tab from '../common/tabs'
import * as userActions from '../../util/redux/action/user';
import DateTable from '../tabbarHome/component/dateTable'
import Button from '../common/buttonplat'
var { height, width } = Dimensions.get('window');
@insertStyle('TabbarHomeStyle')
class Main extends Component {
  constructor(props) {
    super(props);
    // this.handleClick= this.handleClick.bind(this)
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      baseData: {},
      hanleComfirm: '',
      hanleUpload: '',
      dataType: 'day',
      dataSource: ds,
      /* day,month,lastmonth */
      refreshing: false,
      listPage: 1,
      listPageSize: 10,
      listStatus: 'Loading',
      listReqing: false,
      modalVisible: false,
    };
    this._dataSource = []
    this._data = {
      day: [],
      month: [],
      lastmonth: [],
    }
  }

  _tabChange = (val) => {
    this.setState({ dataType: val.type, listPage: 1 })
    this._dataSource = []
    this._dataSource = this._data[val.type]
    // console.log(this._dataSource.length)
    if (this._dataSource.length) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this._dataSource)
      })
    } else {
      this._onRefresh(val.type)
    }
  }

  _EndListPush = () => {

    // console.log(`add data`, this.state.listReqing, this.state.listStatus, this.state.listPage)
    if (this.state.listStatus == 'noMore' || this.state.listReqing) return false
    this.setState({ listReqing: true })
    // if(!this._dataSource.length)return 
    http.post('/netbar/report/overViewList', {
      orderby: this.state.dataType,
      pageNumber: this.state.listPage + 1,
      pageSize: this.state.listPageSize,
    }).then(res => {
      // console.log(res)
      if (res && res.status == 200) {
        var listStatus = this.state.listPage == res.data.totalPage ? "noMore" : "goOn";
        this._dataSource = this._dataSource.concat(res.data.entitys);
        // this._data[this.state.dataType] = this._dataSource;
        this.setState({
          listPage: res.data.pageNumber,
          listStatus: listStatus,
          listReqing: false,
          dataSource: this.state.dataSource.cloneWithRows(this._dataSource)
        })
      }
      // console.log(`added data`)
    }).catch(err => {
      this.setState({ listReqing: false })
    })
  }

  _hanleFooter = () => {
    if (this.state.listStatus == "Loading") {
      return <View style={{ height: 35, justifyContent: "center" }}>
        <Text style={{ textAlign: "center", color: "#666" }}>加载中...</Text>
      </View>
    } else if (this.state.listStatus == "noMore") {
      return <View style={{ height: 35, justifyContent: "center" }}>
        <Text style={{ textAlign: "center", color: "#666" }}>暂无更多数据</Text>
      </View>
    } else {
      return <ActivityIndicator style={{ height: 35 }} />
    }
  }

  _onRefresh = (type) => {
    this.setState({
      refreshing: true,
      listPage: 1,
    })
    http.post('/netbar/report/overViewList', {
      orderby: type || this.state.dataType,
      pageNumber: 1,
      pageSize: this.state.listPageSize,
    }).then(res => {
      if (res && res.status == 200) {
        var listStatus = this.state.listPage == res.data.totalPage ? "noMore" : "goOn";
        this._dataSource = res.data.entitys;
        this._data[this.state.dataType] = this._dataSource;
        this.setState({
          refreshing: false,
          listStatus: listStatus,
          dataSource: this.state.dataSource.cloneWithRows(this._dataSource)
        })
      }
    })


    http.post('/netbar/report/overView', {}).then(res => {
      if (res && res.status == 200) {
        this.setState({
          baseData: res.data,
          hanleComfirm: res.data.comfirmCount,
          hanleUpload: res.data.uploadCount,
        })
      }
    })
  }


  _hanleModal = () => {
    this.setState({ modalVisible: false })
  }
  render() {
    const tabs = [
      { title: '昨日排行', type: 'day' },
      { title: '本月排行', type: 'month' },
      { title: '上月排行', type: 'lastmonth' },
    ];
    const style={
      total_title:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8
      },
      total_text:{
        fontSize:14,
        color:"#666"
      },
      fred:{
        color: "#E7505A"
      },
      total:{
        backgroundColor: "#fff",
        marginBottom: 2,
        marginTop: 6
      }
             
    }
    return (
      <View style='container'>
        <ListView style="flex1"
          dataSource={this.state.dataSource}
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            tintColor="#666666"
            title="Loading..."
            titleColor="#666666"
            colors={['#666666']}
            progressBackgroundColor="#f2f3f5"
          />}
          renderHeader={() => <View style={style.total}>
          <DateTable link data={this.state.baseData} />
          <View style={{height:1}} />
          {
            this.state.hanleComfirm || this.state.hanleUpload
              ? <View  style={style.total_title}>
                <View style={{ height: 22, justifyContent: "center" }}>
                  <Text  style={style.total_text}><Text style={style.fred} >{this.state.hanleComfirm}</Text>条报表待审核，<Text style={style.fred}>{this.state.hanleUpload}</Text>家网吧未上传</Text>
                </View>
                <Button title='立即处理' onPress={() => this.props.navigation.navigate('handleReport')} style={styles.btnStyle} textStyle={styles.btnTextStyle} underlayColor="rgba(32,115,211,0.20)" />
                {/* ="small" onClick={ }>立即处理</Button> */}
              </View>
              : <View  style={style.total_title}>
                <Text  style={style.total_text}>暂无需处理数据</Text>
              </View>
          }
        </View >}
          onEndReached={this._EndListPush}
          onEndReachedThreshold={30}
          renderFooter={this._hanleFooter}
          enableEmptySections={true}
          renderRow={(rowData) => <DateTable name={rowData.shopName} data={rowData} showTag={true} />}
          renderSectionHeader={(sectionData, sectionID) => <View style={{ height: 36 }}>
            <Tab tabs={tabs} onChange={this._tabChange} bgColor={"#e8f1fa"} color={"#2073D3"} />
          </View>}
          stickySectionHeadersEnabled={true}
        />
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this._hanleModal} >
          <View style={{ paddingTop: 138, paddingLeft: 26, paddingRight: 26, flex: 1, backgroundColor: "rgba(0,0,0,0.50)", alignItems: 'center', }}>
            <Image style={{ height: 263, width: 323, marginBottom: 35 }} source={require('../../assets/image/my/lead.png')} />
            <TouchableHighlight onPress={() => { this.setState({ modalVisible: false }) }}>
              <Image style={{ height: 30, width: 150 }} source={require('../../assets/image/my/button.png')} />
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }

  componentWillMount() {
    this.Emitter = DeviceEventEmitter.addListener('refreshHomeManager', (data) => {
      if (data == 'refresh') {
        this._onRefresh();
      }
    });
    /* 组件初始化时只调用,整个生命周期只调用一次 */
  }
  componentDidMount() {
    Storage.get('leadShow').then(res => {
      if (!res) this.setState({ modalVisible: true })
    })
    http.post('/netbar/report/overViewList', {
      orderby: this.state.dataType,
      pageNumber: 1,
      pageSize: this.state.listPageSize,
    }).then(res => {
      if (res && res.status == 200) {
        this._dataSource = res.data.entitys;
        this._data[this.state.dataType] = this._dataSource;
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this._dataSource)
        })
      }
    })

    http.loadingPost('/netbar/report/overView', {}).then(res => {
      if (res && res.status == 200) {
        this.setState({
          baseData: res.data,
          hanleComfirm: res.data.comfirmCount,
          hanleUpload: res.data.uploadCount,
        })
      }
    })

    Storage.save("leadShow", "true");
    /* 组件渲染之后调用，只调用一次。 */
  }
  componentWillReceiveProps(nextProps, b) {
    console.log(nextProps, b)
    /* 组件初始化时不调用，组件接受新的props时调用 */
  }
  componentDidUpdate() {
    /* 组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。 */
  }
  componentWillUnmount() {
    this.Emitter.remove();
    /* 组件将要卸载时调用，一些事件监听和定时器需要在此时清除。 */
  }

}

export default connect(
  store => ({
    store: store.userStore
  }),
  dispatch => bindActionCreators(userActions, dispatch)
)(Main);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  btnStyle: {
    width: 80,
    height: 23,
    backgroundColor: "rgba(250,61,86,0.10)",
    borderColor: "#FA3D56",
    borderWidth: 1,
  },
  btnTextStyle: {
    fontSize: 14,
    color: "#FA3D56",
  }
});