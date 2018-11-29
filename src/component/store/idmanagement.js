
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    TouchableHighlight, ListView,
} from 'react-native';
import { Modal,Toast } from 'antd-mobile-rn'

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

    dopost =(p)=> {
        http.post('/netbar//account/delete',{account:p}).then(responseData=>{
            /* Storage.saveObj({
                 user:res.data.token,
                 token:res.data.token
             })*/

            if(responseData.status == '200'){
                Toast.success('删除成功！', 3);
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
                    <Button onPress={() => this.deleteid(this.state.data.phone)} style={["but"]}
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
        http.post('/netbar/account/list',{shopId:this.state.shopid}).then(responseData=>{
            /* Storage.saveObj({
                 user:res.data.token,
                 token:res.data.token
             })*/
            console.log(responseData)

            if(responseData.status == '200'){
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
            }
        }).catch(err=>{
            console.log(err)
        })
        console.log(this.state.data)
    }

    render() {
        return (
            <View style={["cpjmanagementbox"]}>
                <TouchableHighlight style={{width:'100%'}} onPress={() => this.props.navigation.navigate('idjoin',{shopid: this.state.shopid})}>
                    <View style={["flexrow","hardebox"]}>
                        <Icon style={"icon"} name="plus" size={32} color="#114FCD" />
                        <Text style={["tjbut"]}>创建账号</Text>
                    </View>
                </TouchableHighlight>
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
            /*<View style="delbox">
                <View style="tit">
                    <Text style="lh">XXX个提交建站申请，XXX个实地勘察，XXX个正常营业</Text>
                </View>
                <View style="mdlist">
                    <View style="ls_t">
                        <View style="a_1">
                            <Text style="fontsize16">绍兴彩票店</Text>
                            <Text style={["fontsize14", "col666"]}>提交建站申请</Text>
                        </View>
                    </View>
                    <View style="ls_con">
                        <View style={["flexrowbet"]}>
                            <View style={["c_box","flex1","flexrowbet"]}>
                                <Text style={["fontsize14", "col666"]}>类型：</Text>
                                <Text style={["fontsize14", "col333"]}>福彩</Text>
                            </View>
                            <View style={["c_box","flex1","flexrowbet"]}>
                                <Text style={["fontsize14", "col666"]}>业务经理：</Text>
                                <Text style={["fontsize14", "col333"]}>王强</Text>
                            </View>
                        </View>
                        <View style={["flexrowbet"]}>
                            <View style={["c_box","flex1","flexrowbet"]}>
                                <Text style={["fontsize14", "col666"]}>联系人：</Text>
                                <Text style={["fontsize14", "col333"]}>王小二</Text>
                            </View>
                            <View style={["c_box","flex1","flexrowbet"]}>
                                <Text style={["fontsize14", "col666"]}>联系方式</Text>
                                <Text style={["fontsize14", "col333"]}>151236273627</Text>
                            </View>
                        </View>
                    </View>
                    <View style={["ls_bot","flex1"]}>
                        <Button size={12} style={["but"]} activeStyle={{ backgroundColor: 'red' }}>账号</Button>
                        <Button size={12} style={["but"]} activeStyle={{ backgroundColor: 'red' }}>修改</Button>
                        <Button size={12} style={["but"]} activeStyle={{ backgroundColor: 'red' }}>彩票机</Button>
                        <Button size={12} style={["but"]} activeStyle={{ backgroundColor: 'red' }}>删除</Button>
                    </View>
                </View>
            </View>*/

        );
    }

}

const styles = StyleSheet.create({
});