
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TextInput,
    Alert,
    ListView, RefreshControl,ActivityIndicator,DeviceEventEmitter
} from 'react-native';
import { Button, SearchBar, Picker } from 'antd-mobile-rn'

import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/style_less'
import styleP from '../../assets/style/script/public_less'
import qs from "query-string";
import { Modal,Toast } from 'antd-mobile-rn'
import Icon from "react-native-vector-icons/Entypo";
import Backicon from "../common/backicon";

let pageNumber = 1;//当前第几页
let totalPage = 1;//总的页数

const headerStyleB={
    backgroundColor: '#2073D3',
}
const headerTitleStyleB={
    color: '#fff'
}

const cssStyle =Object.assign({},style({}).detail,styleP({}).public)
@rn_Less.rnLess(cssStyle)
class Listbox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.rowData,
            viewdata:[],
        };
    }

    //删除彩票机
    deleteid(p){
        Modal.alert('温馨提示', '确认删除门店？', [
            { text: '取消', onPress: () => {}, style: 'cancel' },
            { text: '确定', onPress: () => {
                    this.dopost(p);
                }},
        ]);
    }

    dopost =(p)=> {
        http.post('/netbar//shop/delete',{shopId:p}).then(responseData=>{
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

    //类型解析
    _ResolveLotOrg =(x) =>{
        const lot = {
            "1": "体彩",
            "2": "福彩",
        };
        let str = lot[x];
        return str;
    }

    //进度解析
    _ResolveSchedule =(x,id) =>{
        const scheduledataA = {
            "10": "提交建站申请",
            "20": "实地勘查",
            "30": "网吧签合同",
            "40": "与体彩签合同",
            "41": "装修",
            "42": "申领机器",
            "50": "培训",
            "60": "正常营业"
        }
        const scheduledataB = {
            "10": "提交建站申请",
            "20": "实地勘查",
            "30": "网吧签合同",
            "40": "装修",
            "41": "福彩签合同",
            "50": "培训",
            "60": "正常营业"
        }
        let str = "";
        if(x == 1){
            str = scheduledataA[id];
        }else{
            str = scheduledataB[id];
        }
        return str;
    }

    render(){
        return(
            <View style="mdlist">
                <View style="ls_t">
                    <View style="a_1">
                        <Text style={["fontsize16", "hadtext"]}>{this.state.data.shopName}</Text>
                        <Text style={["fontsize14", "col666",'hadtext']}>{this._ResolveSchedule(this.state.data.lotOrg,this.state.data.schedule)}</Text>
                    </View>
                </View>
                <View style="ls_con">
                    <View style={["flexrowbet"]}>
                        <View style={["c_box","flex1","flexrowbet"]}>
                            <Text style={["fontsize14", "col666"]}>类型：</Text>
                            <Text style={["fontsize14", "col333"]}>{this._ResolveLotOrg(this.state.data.lotOrg)}</Text>
                        </View>
                        <View style={["c_box","flex1","flexrowbet"]}>
                            <Text style={["fontsize14", "col666"]}>业务经理：</Text>
                            <Text style={["fontsize14", "col333"]}>{this.state.data.busManager}</Text>
                        </View>
                    </View>
                    <View style={["flexrowbet"]}>
                        <View style={["c_box","flex1","flexrowbet"]}>
                            <Text style={["fontsize14", "col666"]}>联系人：</Text>
                            <Text style={["fontsize14", "col333"]}>{this.state.data.linkman}</Text>
                        </View>
                        <View style={["c_box","flex1","flexrowbet"]}>
                            <Text style={["fontsize14", "col666"]}>联系方式</Text>
                            <Text style={["fontsize14", "col333"]}>{this.state.data.linkPhone}</Text>
                        </View>
                    </View>
                </View>
                <View style={["ls_bot","flex1"]}>
                    <Button onClick={() => this.props.navigation.navigate('idmanagement',{id:this.state.data.id})} size={12} style={["but"]} activeStyle={{ backgroundColor: '#114FCD' }}>账号</Button>
                    <Button onClick={() => this.props.navigation.navigate('revampstore',{id:this.state.data.id,dopost:this.props.onDopost})} size={12} style={["but"]} activeStyle={{ backgroundColor: '#114FCD' }}>修改</Button>
                    <Button onClick={() => this.props.navigation.navigate('cpjmanagement',{id:this.state.data.id})} size={12} style={["but"]} activeStyle={{ backgroundColor: '#114FCD' }}>彩票机</Button>
                    <Button onClick={() => this.deleteid(this.state.data.id)} size={12} style={["but"]} activeStyle={{ backgroundColor: 'red' }}>删除</Button>
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
            listStatus: 'Loading',//控制foot
            refreshing: false,//下拉刷新图标控制
        };
    }

    clear = () => {
        this.setState({ value: '' });
    }


    //rende之前调用
    componentWillMount(){
        //路由监听
        /*this.props.navigation.addListener(
            'didFocus',
            payload =>  {
                this.dopost();
                /!*console.log(payload)
                console.log(this.props.navigation.isFocused())*!/
            }
        );*/
        this.setTitle = DeviceEventEmitter.addListener('refreshShopList', (data)=>{
            if(data == 'suc'){
                this._onRefresh();
            }
        });
    }

    //rende之后调用
    componentDidMount(){
        this.dopost();
    }

    //卸载接受广播的方法
    componentWillUnmount(){
    // DeviceEventEmitter.removeListener();
        this.setTitle.remove();
    }


    //上拉加载
    _updata = () =>{
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



    Search =(v) =>{
        Alert.alert(v)
    }

    dopost =()=> {
        http.loadingPost('/netbar/shop/list',{pageNumber:pageNumber}).then(responseData=>{
            if (responseData && responseData.status == 200) {
                let data = responseData.data.entitys;
                //console.log(data)
                let listStatus = pageNumber == responseData.data.totalPage ? "noMore" : "goOn";

                pageNumber ++;
                totalPage = responseData.data.totalPage;


                this.setState({
                    //复制数据源
                    data: this.state.data.concat(data),
                    listStatus: listStatus,
                    refreshing: false,
                });
            }
        }).catch(err=>{
            console.log(err)
        })
        http.post('/netbar/shop/overView',{}).then(responseData=>{
            if (responseData && responseData.status == 200) {
                this.state.viewdata = responseData.data;
                this.setState({
                    viewdata:this.state.viewdata
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        return (
            <View style="delbox">
                <View style={["herderbox"]}>
                    <View style="tit">
                        {
                            this.state.viewdata
                                ?
                                <Text style="lh">{this.state.viewdata.applyCount}个提交建站申请，{this.state.viewdata.surveyCount}个实地勘察，{this.state.viewdata.normalCount}个正常营业</Text>
                                :
                                <Text style="lh"></Text>
                        }
                    </View>
                    <View style="searchbox">
                        {/*<Picker
                    selectedValue={this.state.language}
                    style="pic"
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>*/}
                        <SearchBar
                            style="search"
                            value={this.state.value}
                            placeholder="请输入网吧名字"
                            onSubmit={(value) => this.Search}
                            onCancel={this.clear}
                            onChange={(v) => {console.log(v)}}
                            showCancelButton={false}
                            iosreturnKeyType={"search"}
                        />
                        {/*<TextInput
                            style={{width:200,height:50}}
                            placeholder="请输入网吧名字"
                            keyboardType={'web-search'}
                            returnKeyType={"search"}
                            onBlur={(value) => this.Search}
                        />*/}
                    </View>
                </View>
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
                        renderRow={(rowData, sectionID, rowId) => <Listbox rowData={rowData} sectionID={sectionID}
                                                                           onDopost={this._onRefresh} rowId={rowId} navigation={this.props.navigation}/>}
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
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 15,
        color: 'blue',
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    content: {
        fontSize: 15,
        color: 'black',
    }
});