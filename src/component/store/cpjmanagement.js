
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    ListView, RefreshControl, ActivityIndicator, FlatList, TouchableHighlight
} from 'react-native';

import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/style_less'
import styleP from '../../assets/style/script/public_less'
import Icon from "react-native-vector-icons/Entypo";
import  Button from  '../common/button'
import { Modal,Toast } from 'antd-mobile-rn'


const cssStyle =Object.assign({},style({}).cpjmanagement,styleP({}).public)
@rn_Less.rnLess(cssStyle)
class Listbox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.rowData,
        };
        //console.log(this.props)
    }
    //删除彩票机
    deleteid(p){
        Modal.alert('温馨提示', '确认删除彩票机？', [
            { text: '取消', onPress: () => {}, style: 'cancel' },
            { text: '确定', onPress: () => {
                    this.dopost(p);
                }},
        ]);
    }

    //彩种解析
    _ResolveSellLot =(x) =>{
        const lot = {
            "1": "竞彩",
            "2": "数字彩",
            "3": "高频"

        };
        let str ="";
        x.split(",").map(v => {
            str += lot[v] + '、';
        })
        return str.replace(/、$/gi,"");
    }

    dopost =(p)=> {
        http.loadingPost('/netbar//machine/delete',{sn:p}).then(responseData=>{
            /* Storage.saveObj({
                 user:res.data.token,
                 token:res.data.token
             })*/

            if(responseData.status == '200'){
                Toast.show('删除成功！', 3);
                this.props.onDopost();
            }
        }).catch(err=>{
            console.log(err)
        })
        console.log(this.state.data)
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
                    <Text style={["col333","text","fontsize16"]}>{this._ResolveSellLot(this.state.data.sellLot)}</Text>
                </View>
                <View style={["bgfff","flexrow","ls_conbox"]}>
                    <Text style={["col999","text","fontsize14"]}>开始营业时间：</Text>
                    <Text style={["col333","text","fontsize16"]}>{this.state.data.openTime}</Text>
                </View>
                <View style={["bt_bot","flex1"]}>
                    <Button onPress={() => this.props.navigation.navigate('revampcpj',{sn: this.state.data.sn,dopost:this.props.dopost})} style={["but"]}
                            textStyle={{
                                color:"#666",
                                lineHeight: 22,
                            }}
                            title={'修改'}
                    />
                    <Button onPress={() => this.deleteid(this.state.data.sn)} style={["but"]}
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
            //ds:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            shopid:this.props.navigation.getParam('id'),
            listStatus: 'Loading',//控制foot
            refreshing: false,//下拉刷新图标控制
            pageNumber:1,//当前第几页
            totalPage:1,//总的页数
        };
    }

    //rende之后调用
    componentDidMount(){
        this.dopost();
    }

    //上拉加载
    _updata = () =>{
        if(this.state.pageNumber > this.state.totalPage){
            return false;
        }else {
            this.dopost();
        }
    }

    //下拉刷新
    _onRefresh = () =>{
        this.state.pageNumber = 1;
        this.state.data = [];
        this.setState({
            refreshing: true,
        })
        this.dopost();
    }

    _hanleFooter = () => {
        if (this.state.listStatus == "Loading") {
            return <Text style={{ lineHeight: 35, textAlign: "center", color: "#666" }}>加载中...</Text>
        } else if (this.state.listStatus == "noMore") {
            return <Text style={{ lineHeight: 35, textAlign: "center", color: "#666", marginBottom: 6 }}>暂无更多数据</Text>
        } else {
            return <ActivityIndicator style={{ height: 35 }} />
        }
    }

    dopost =()=> {
        http.loadingPost('/netbar/machine/list',{shopId:this.state.shopid,pageNumber:this.state.pageNumber}).then(responseData=>{
            /* Storage.saveObj({
                 user:res.data.token,
                 token:res.data.token
             })*/
            //console.log(responseData)
            if (responseData && responseData.status == 200) {
                let data = responseData.data.entitys;

                let listStatus = this.state.pageNumber == responseData.data.totalPage ? "noMore" : "goOn";
                this.state.totalPage = responseData.data.totalPage;
                this.state.pageNumber ++;

                this.setState({
                    //复制数据源
                    data: this.state.data.concat(data),
                    //dataArray:this.state.dataArray.concat(dataBlob),
                    listStatus: listStatus,
                    refreshing: false,
                });
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        return (
            <View style={["cpjmanagementbox"]}>
                <TouchableHighlight style={{width:'100%'}} onPress={() => this.props.navigation.navigate('joincpj',{shopid: this.state.shopid,dopost:this._onRefresh})}>
                    <View style={["flexrow","hardebox"]}>
                        <Icon style={"icon"} name="plus" size={32} color="#114FCD" />
                        <View style={["textv"]}>
                            <Text style={["tjbut"]}>添加机器</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <FlatList
                    style={["flatListbox"]}
                    data={this.state.data}
                    refreshControl={<RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        tintColor="#666666"
                        title="Loading..."
                        titleColor="#666666"
                        colors={['#666666']}
                        progressBackgroundColor="#f2f3f5"
                    />}
                    renderItem={(item) => <Listbox rowData={item.item}
                                                   dopost={this._onRefresh} navigation={this.props.navigation}/>}
                    onEndReachedThreshold={0.1}
                    initialNumToRender={5}
                    getItemLayout={(data, index) => ( {length: 186, offset: 186 * index, index} )}
                    keyExtractor={(item, index) => index}
                    onEndReached={this._updata}
                    ListFooterComponent={this._hanleFooter}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
});