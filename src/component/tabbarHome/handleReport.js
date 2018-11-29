
import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, ActivityIndicator, RefreshControl, FlatList } from 'react-native';
import { Tabs } from 'antd-mobile-rn'
import Icon from 'react-native-vector-icons/FontAwesome'


@insertStyle('HandleReport')
class ViewAudit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleCount: 0,
    };
  }
  render() {
    return (
      <View style='tab_list'>
        <ScrollView style='tab_list'>

          {
            this.state.handleCount
              ? <View>
                <Text style={{ lineHeight: 35, fontSize: 14, color: "#666666", textAlign: "center" }}>暂无待审核数据</Text>
              </View>
              : <View>
                <Text style="title_warn">剩余5条待处理...</Text>
                <View style="content_imga" />
                <View style='border15h' />
                <View style="cont_bor">
                  <View style="flexrow">
                    <Text style={["text_left", "f16h30", "fblock9"]}>起止时间：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>2018.03.26(四) 至 2018.03.26(四)</Text>
                  </View>
                  <View style="flexrow">
                    <Text style={["text_left", "f16h30", "fblock9"]}>门店编号：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>01-012345</Text>
                  </View>
                </View>
                <View style='border10h' />
                <View style="cont_bor">
                  <View style="flexrow">
                    <View style={["flexcol", "flex1"]}>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>总销售：</Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}>888888</Text>
                      </View>
                      <View style="flexrow">
                        <Text style={["text_left", "f16h30", "fblock9"]}>线上销售：</Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}>8888.88</Text>
                      </View>
                      <View style="flexrow">
                        <Text style={["text_left", "f16h30", "fblock9"]}>线上兑奖：</Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}>8888.88</Text>
                      </View>
                      <View style="flexrow">
                        <Text style={["text_left", "f16h30", "fblock9"]}>取消：</Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}>8888.88</Text>
                      </View>
                      <View style="flexrow">
                        <Text style={["text_left", "f16h30", "fblock9"]}>应缴款：</Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}>8888.88</Text>
                      </View>
                    </View>
                    <View style={["flexcol", "flex1"]}>
                      <View style={["flex1", "flexrow"]}>
                        <Text style={["text_left", "f16h30", "fblock9"]}>总兑奖：</Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}>888888</Text>
                      </View>
                      <View style="flexrow">
                        <Text style={["text_left", "f16h30", "fblock9"]}>线下销售：</Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}>8888.88</Text>
                      </View>
                      <View style="flexrow">
                        <Text style={["text_left", "f16h30", "fblock9"]}>线下兑奖：</Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}>8888.88</Text>
                      </View>
                      <View style="flexrow">
                        <Text style={["text_left", "f16h30", "fblock9"]}>实退：</Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}>8888.88</Text>
                      </View>
                      <View style="flexrow">
                        <Text style={["text_left", "f16h30", "fblock9"]}></Text>
                        <Text style={["flex1", "f16h30", "fblock3"]}></Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style="content_imga" />
                <View style='border15h' />
                <View style="cont_bor">
                  <View style="flexrow">
                    <Text style={["text_left", "f16h30", "fblock9"]}>起止时间：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>2018.03.26(四) 至 2018.03.26(四)</Text>
                  </View>
                  <View style="flexrow">
                    <Text style={["text_left", "f16h30", "fblock9"]}>门店编号：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>01-124568</Text>
                  </View>
                </View>
                <View style='border10h' />
                <View style="cont_bor">
                  <View style="flexrow">
                    <Text style={["text_left2", "f16h30", "fblock9"]}>银行卡充值：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>888888.88</Text>
                  </View>
                  <View style="flexrow">
                    <Text style={["text_left2", "f16h30", "fblock9"]}>支付宝充值：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>4578.22</Text>
                  </View>
                  <View style="flexrow">
                    <Text style={["text_left2", "f16h30", "fblock9"]}>微信充值：</Text>
                    <Text style={["flex1", "f16h30", "fblock3"]}>885214.22</Text>
                  </View>
                </View>
              </View>
          }
        </ScrollView>
        <View style="bottom_btn">
          <View style="btnView">
            <Text style="btns">联系上传人</Text>
            <View style='border10_b'></View>
            <Text style="btns">审核不通过</Text>
            <View style='border10_b'></View>
            <Text style="btns">审核通过</Text>
          </View>
        </View>
      </View>
    )
  }

}

@insertStyle('HandleReport')
class ViewUpload extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this._dataSource = [{ child: [1, 2, 34] }]
    this.state = {
      dataSource: ds.cloneWithRows(this._dataSource),
      refreshing: false,
      listPage: 1,
      listStatus: 'Loading',
      listReqing: false,
    };
    this.listPageSize = 20
  }
  componentWillMount() {
    this.setState({
      refreshing: true,
      listPage: 1,
    })
    http.post('/netbar/report/sellDetailList', {
      status: 10,
      pageNumber: 1,
      pageSize: this.listPageSize,
    }).then(res => {
      this._dataSource = this._hanleDate(res.data.entitys)
      var listStatus = this.state.listPage == res.data.totalPage ? "noMore" : "goOn";
      this.setState({
        refreshing: false,
        listStatus: listStatus,
        dataSource: this.state.dataSource.cloneWithRows(this._dataSource)
      })
    })
  }

  _hanleDate(data){
    if(!data)return []
    let _Ary =[]
    for (var i = 0;i<data.length;i++){
      let d =data[i]
      if(!_Ary.length){
        _Ary.push({
          shopId:d.shopId,
          shop:d.shop,
          data:[{
            dateMemo:d.dateMemo,
            sn:d.sn
          }]
        })
      }else {
        let l = _Ary[_Ary.length-1]
        if(l.shopId==d.shopId){
          if(l.data[l.data.length-1].dateMemo==d.dateMemo){
            l.data[l.data.length-1].sn=l.data[l.data.length-1].sn+','+d.sn
          }else{
            l.data.push({
              dateMemo:d.dateMemo,
              sn:d.sn
            })
          }
        }else {
          _Ary.push({
            shopId:d.shopId,
            shop:d.shop,
            data:[{
              dateMemo:d.dateMemo,
              sn:d.sn
            }]
          })
        }
      }
    }
    return _Ary
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true,
      listPage: 1,
    })
    http.post('/netbar/report/sellList', {
      shopId: this.shopId,
      timeLevel: 'day',
      pageNumber: 1,
      pageSize: this.listPageSize,
    }).then(res => {
      console.log(res)
      if (res && res.status == 200) {
        var listStatus = this.state.listPage == res.data.totalPage ? "noMore" : "goOn";
        this._dataSource = res.data.entitys;
        this.setState({
          refreshing: false,
          listStatus: listStatus,
          dataSource: this.state.dataSource.cloneWithRows(this._dataSource)
        })
      }
    })
  }

  _onEndReached = () => {
    console.log(`_onEndReached`)
  }

  _renderFooter = () => {
    if (this.state.listStatus == "noMore") {
      return <Text style={{ lineHeight: 35, textAlign: "center", color: "#666", marginBottom: 6 }}>暂无更多数据</Text>
    } else {
      return <ActivityIndicator style={{ height: 35 }} />
    }
  }

  render() {
    return (
      <ListView style="tab_list"
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
        onEndReachedThreshold={30}
        onEndReached={this._onEndReached}
        renderFooter={this._renderFooter}
        removeClippedSubviews={false}
        enableEmptySections={true}
        renderRow={(rowData) => (
          <View>
            <ViewUploadTitle name={rowData.shop}/>
            <FlatList
              data={rowData.data}
              // keyExtractor={(item, index) => item.id}
              renderItem={({ item }) => <ViewUploadList  data={item} />}
            />
          </View>
        )} />
    )
  }
}

@insertStyle('HandleReport')
class ViewUploadTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleCount: 0,
    };
  }
  render() {
    return (
      <View style="up_title">
        <Text style="up_text">{this.props.name}</Text>
        <Icon name="phone" size={17} color="#333" />
      </View>
    )
  }
}

@insertStyle('HandleReport')
class ViewUploadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleCount: 0,
    };
  }
  render() {
    return (
      <View>
        <View style={["flexrow"]}>
          <Text style={["up_text", "up_list", "fblock3"]}>{this.props.data.dateMemo}</Text>
          <View style="border10" />
          <Text style={["up_text", "up_list", "flex1", "fblock3"]}>{this.props.data.sn}</Text>
        </View>
        <View style="border10h" />
      </View>
    )
  }
}

@insertStyle('HandleReport')
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataStatus: 10,
    };
    this.dataSource = [];
  }

  _tabChange = (val) => {
    this.setState({ dataStatus: val.type })
  }

  _saveDataSource = (val) => {
    this.dataSource = val;
  }

  render() {
    const tabs = [
      { title: '待审核', type: 20 },
      { title: '未上传', type: 10 },
    ];
    return (
      <View style='container'>
        <View style={{ height: 42 }}>
          <Tabs tabs={tabs} initialPage={1} tabBarUnderlineStyle={{ backgroundColor: "#E7505A" }} tabBarActiveTextColor="#E7505A" onChange={this._tabChange} tabBarInactiveTextColor="#666666"></Tabs>
        </View>
        <View style='tab_list'>
          {
            this.state.dataStatus == 20
              ? <ViewAudit />
              : <ViewUpload save={this._saveDataSource} data={this.dataSource} />
          }
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});