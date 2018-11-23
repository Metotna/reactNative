
import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, } from 'react-native';
import { Button, Tabs } from 'antd-mobile-rn'
import MachineInfo from '../tabbarReport/component/machineInfo';

@insertStyle('')
export default class Main extends Component {

  constructor(props) {
    super(props);
    // this.handleClick= this.handleClick.bind(this)
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([{ times: '2018.10.15', child: [1, 2, 3] }, { times: '2018.10.15', child: [1,] }, { times: '2018.10.15', child: [] }, { times: '2018.10.15', child: [2, 2, 2] }]),
      dataLoad: ds.cloneWithRows([{ times: '2018.10.05', child: [1, 2, 3] }]),
      dataAll: ds.cloneWithRows([{ times: '2018.10.25', child: [1, 2, 3] }, { times: '2018.10.25', child: [1, 2, 3] }]),
    };
  }


  render() {
    const tabs = [
      { title: '待上传', type: '10' },
      { title: '审核中', type: '20' },
      { title: '全部', type: '' },
    ]
    return (
      <View style="container">
        <Tabs
          tabs={tabs} initialPage={0}
          tabBarUnderlineStyle={{ backgroundColor: "#E7505A" }}
          tabBarActiveTextColor="#E7505A"
          tabBarInactiveTextColor="#666666">
          <View>
            <ListView
              dataSource={this.state.dataSource}
              removeClippedSubviews={false}
              renderRow={(rowData) => <MachineInfo data={rowData} />} />
          </View>
          <View>
            <ListView
              dataSource={this.state.dataLoad}
              renderRow={(rowData) => <MachineInfo data={rowData} />} />

          </View>
          <View>
            <ListView
              dataSource={this.state.dataAll}
              renderRow={(rowData) => <MachineInfo data={rowData} />} />
          </View>
        </Tabs>
      </View>
    );
  }

}

const styles = StyleSheet.create({

});