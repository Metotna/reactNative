
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableHighlight, ListView, ActivityIndicator, RefreshControl,
} from 'react-native';
import { Modal,Toast } from 'antd-mobile-rn'

import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/style_less'
import styleP from '../../assets/style/script/public_less'
import Icon from "react-native-vector-icons/Entypo";
import  Button from  '../common/button'

let pageNumber = 1;//当前第几页
let totalPage = 1;//总的页数

const cssStyle =Object.assign({},style({}).cpjmanagement,styleP({}).public)
@rn_Less.rnLess(cssStyle)
class Listbox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.rowData,
        };
    }

    //删除账号
    deleteid(phone){
        Modal.alert('温馨提示', '确认删除账号？', [
            { text: '取消', onPress: () => {}, style: 'cancel' },
            { text: '确定', onPress: () => {
                    this.dopost(phone);
                }},
        ]);
    }

    //rende之后调用
    componentDidMount(){
    }

    dopost =(p)=> {
        http.loadingPost('/netbar//account/delete',{account:p}).then(responseData=>{
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
                    <Text style={["col999","text","fontsize14"]}>姓名：</Text>
                    <Text style={["col333","text","fontsize16"]}>{this.state.data.name}</Text>
                </View>
                <View style={["bgfff","flexrow","ls_conbox"]}>
                    <Text style={["col999","text","fontsize14"]}>账号：</Text>
                    <Text style={["col333","text","fontsize16"]}>{this.state.data.phone}</Text>
                </View>
                <View style={["bgfff","flexrow","ls_conbox"]}>
                    <Text style={["col999","text","fontsize14"]}>最近登陆：</Text>
                    <Text style={["col333","text","fontsize16"]}>{this.state.data.loginTime}</Text>
                </View>
                <View style={["bt_bot","flex1"]}>
                    <Button onPress={() => this.deleteid(this.state.data.phone)} style={["but"]}
                            textStyle={{
                                color:"#666",
                                lineHeight: 22,
                            }}
                            title={'删除'}
                    />
                    <Button style={["but"]}
                            textStyle={{
                                color:"#666",
                                lineHeight: 22,
                            }}
                            title={'重置密码'}
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
            ds:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            shopid:this.props.navigation.getParam('id'),
            listStatus: 'Loading',//控制foot
            refreshing: false,//下拉刷新图标控制
        };
    }

    //rende之后调用
    componentDidMount(){
        this.dopost();
    }

    //上拉加载
    _updata = () =>{
        console.log(pageNumber)
        if(pageNumber > totalPage){
            return false;
        }else {
            this.dopost();
        }
    }


    //下拉刷新
    _onRefresh = () =>{
        pageNumber = 1;
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
        http.loadingPost('/netbar/account/list',{shopId:this.state.shopid}).then(responseData=>{
            /* Storage.saveObj({
                 user:res.data.token,
                 token:res.data.token
             })*/
            console.log(responseData)

            if(responseData.status == '200'){
                let data = responseData.data.entitys;

                let listStatus = pageNumber == responseData.data.totalPage ? "noMore" : "goOn";
                totalPage = responseData.data.totalPage;
                pageNumber ++;

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
                <TouchableHighlight style={{width:'100%'}} onPress={() => this.props.navigation.navigate('idjoin',{shopid: this.state.shopid,dopost:this._onRefresh})}>
                    <View style={["flexrow","hardebox"]}>
                        <Icon style={"icon"} name="plus" size={32} color="#114FCD" />
                        <View style={["textv"]}>
                            <Text style={["tjbut"]}>创建账号</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                {
                    this.state.data.length ?
                        <ListView
                            style={["flatListbox"]}
                            dataSource={this.state.ds.cloneWithRows(this.state.data)}
                            refreshControl={<RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                                tintColor="#666666"
                                title="Loading..."
                                titleColor="#666666"
                                colors={['#666666']}
                                progressBackgroundColor="#f2f3f5"
                            />}
                            renderRow={(rowData, sectionID, rowId) =>
                                <Listbox rowData={rowData} sectionID={sectionID} rowId={rowId} onDopost={this._onRefresh} navigation={this.props.navigation}/>}
                            onEndReachedThreshold={30}
                            onEndReached={this._updata}
                            renderFooter={this._hanleFooter}
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