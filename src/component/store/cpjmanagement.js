
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    Alert, ListView,
} from 'react-native';

import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/style_less'
import styleP from '../../assets/style/script/public_less'
import Icon from "react-native-vector-icons/Entypo";
import  Button from  '../common/button'

let pageNumber = 1;//当前第几页
let totalPage = 0;//总的页数

const cssStyle =Object.assign({},style({}).cpjmanagement,styleP({}).public)
@rn_Less.rnLess(cssStyle)
class Listbox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.rowData,
        };
        console.log(this.props)
    }
    render(){
        return(
            <View style={["ls_box"]}>
                <View style={["bgfff","flexrow","ls_conbox"]}>
                    <Text style={["col999","text","fontsize14"]}>机器编号：</Text>
                    <Text style={["col333","text","fontsize16"]}>{this.state.data.sn}</Text>
                </View>
                <View style={["bgfff","flexrow","ls_conbox"]}>
                    <Text style={["col999","text","fontsize14"]}>在售彩种：</Text>
                    <Text style={["col333","text","fontsize16"]}>{this.state.data.sellLot}</Text>
                </View>
                <View style={["bgfff","flexrow","ls_conbox"]}>
                    <Text style={["col999","text","fontsize14"]}>开始营业时间：</Text>
                    <Text style={["col333","text","fontsize16"]}>{this.state.data.openTime}</Text>
                </View>
                <View style={["bt_bot","flex1"]}>
                    <Button onPress={() => this.props.navigation.navigate('revampcpj',{sn: this.state.data.sn})} style={["but"]}
                            textStyle={{
                                color:"#666",
                                lineHeight: 22,
                            }}
                            title={'修改'}
                    />
                    <Button onPress={() => this.props.navigation.navigate('revampcpj',{sn: this.state.data.sn})} style={["but"]}
                            textStyle={{
                                color:"#666",
                                lineHeight: 22,
                            }}
                            title={'移除'}
                    />
                </View>
            </View>
        )
    }
}

@rn_Less.rnLess(cssStyle)

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            isRefreshing:false,//下拉控制
            ds:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            shopid:this.props.navigation.getParam('id'),
        };
    }

    //rende之后调用
    componentDidMount(){
        const { navigation } = this.props;
        const id = this.props.navigation.getParam('id');
        this.dopost();
    }

    //上拉加载
    _updata(){
        console.log(pageNumber)
        if(pageNumber >= totalPage){
            return false;
        }else {
            this.dopost();
        }
    }

    dopost =()=> {
        http.post('/netbar/machine/list',{shopId:this.state.shopid}).then(responseData=>{
            /* Storage.saveObj({
                 user:res.data.token,
                 token:res.data.token
             })*/
            console.log(responseData)
            let data = responseData.data.entitys;
            let dataBlob = [];
            pageNumber ++;

            console.log(data)

            this.setState({
                //复制数据源
                data: this.state.data.concat(data),
                //dataArray:this.state.dataArray.concat(dataBlob),
                isLoading: false,
                isRefreshing:false,
            });
        }).catch(err=>{
            console.log(err)
        })
        console.log(this.state.data)
    }

    render() {
        return (
            <View style={["cpjmanagementbox"]}>
                <View style={["flexrow","hardebox"]}>
                    <Icon style={"icon"} name="plus" size={32} color="#114FCD" />
                    <Text style={["tjbut"]} onPress={() => this.props.navigation.navigate('joincpj',{shopid: this.state.shopid})}>添加彩票机</Text>
                </View>
                {
                    this.state.data.length ?
                        <ListView
                            style={["flatListbox"]}
                            dataSource={this.state.ds.cloneWithRows(this.state.data)}
                            renderRow={(rowData, sectionID, rowId) => <Listbox rowData={rowData} sectionID={sectionID}
                                                                               rowId={rowId} navigation={this.props.navigation}/>}
                            onEndReachedThreshold={30}
                            onEndReached={this._updata}
                        />
                        :
                        <View></View>
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
});