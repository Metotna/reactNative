
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TextInput,
    Alert,
    ListView, RefreshControl,ActivityIndicator,DeviceEventEmitter,FlatList
} from 'react-native';
import { Button, SearchBar, Modal,Toast,PickerView } from 'antd-mobile-rn'

import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/style_less'
import styleP from '../../assets/style/script/public_less'
import qs from "query-string";
import Icon from "react-native-vector-icons/Entypo";
import Backicon from "../common/backicon";
import  Buttons from  '../common/button'


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
            viewdata:[]
        };
        //console.log(this.props)
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
            "60": "正常营业",
            "70": "关闭"
        }
        const scheduledataB = {
            "10": "提交建站申请",
            "20": "实地勘查",
            "30": "网吧签合同",
            "40": "装修",
            "41": "福彩签合同",
            "50": "培训",
            "60": "正常营业",
            "70": "关闭"
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
                            <Text style={["fontsize14", "col999"]}>类型：</Text>
                            <Text style={["fontsize14", "col333"]}>{this._ResolveLotOrg(this.state.data.lotOrg)}</Text>
                        </View>
                        <View style={["c_box","flex1","flexrowbet"]}>
                            <Text style={["fontsize14", "col999"]}>业务经理：</Text>
                            <Text style={["fontsize14", "col333"]}>{this.state.data.busManager}</Text>
                        </View>
                    </View>
                    <View style={["flexrowbet"]}>
                        <View style={["c_box","flex1","flexrowbet"]}>
                            <Text style={["fontsize14", "col999"]}>联系人：</Text>
                            <Text style={["fontsize14", "col333"]}>{this.state.data.linkman}</Text>
                        </View>
                        <View style={["c_box","flex1","flexrowbet"]}>
                            <Text style={["fontsize14", "col999"]}>联系方式</Text>
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
            //ds:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            listStatus: 'Loading',//控制foot
            refreshing: false,//下拉刷新图标控制
            pageNumber:1,//当前第几页
            totalPage:1,//总的页数
            shopName:'',
            seasons:[
                [
                    {
                        label: '2013',
                        value: '2013',
                    },
                    {
                        label: '2014',
                        value: '2014',
                    },
                ],
            ],
            value: undefined,
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
        DeviceEventEmitter.emit('refreshHomeManager', 'refresh')
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

    //门店模糊查询
    Search =(v) =>{
        this.state.shopName = v;
        this.state.pageNumber = 1;
        this.state.data = [];
        this.setState({
            refreshing: true,
        })
        this.dopost();
    }

    dopost =()=> {
        http.loadingPost('/netbar/shop/list',{pageNumber:this.state.pageNumber,shopName:this.state.shopName}).then(responseData=>{
            if (responseData && responseData.status == 200) {
                let data = responseData.data.entitys;
                //console.log(responseData)
                let listStatus = this.state.pageNumber == responseData.data.totalPage ? "noMore" : "goOn";

                this.state.pageNumber ++;
                this.state.totalPage = responseData.data.totalPage;


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

    onPickerView = (value) => {
        this.setState({
            value,
        });
    }

    render() {
        return (
            <View style="delbox">
                <View style={["herderbox"]}>
                    <View style="tit">
                        {
                            this.state.viewdata
                                ?
                                <Text style="lh">{this.state.viewdata}</Text>
                                :
                                <Text style="lh"></Text>
                        }
                    </View>
                    <View style={[stylesa.searchbox]}>
                        {/*<Picker
                    selectedValue={this.state.language}
                    style="pic"
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>*/}
                        {/*<SearchBar
                            style="search"
                            value={this.state.value}
                            placeholder="请输入网吧名字"
                            onSubmit={(value) => this.Search}
                            onCancel={this.clear}
                            onChange={(v) => {console.log(v)}}
                            showCancelButton={false}
                            iosreturnKeyType={"search"}
                        />*/}
                       {/* <View style={{width:68,}}>
                            <PickerView
                                onChange={this.onPickerView}
                                value={this.state.value}
                                data={this.state.seasons}
                                cascade={false}
                            />
                        </View>*/}
                        <View style={{flex:1}}>
                            <SearchBar
                                style={[stylesa.search]}
                                placeholder="请输入网吧名字"
                                keyboardType={'default'}
                                returnKeyType={"go"}
                                underlineColorAndroid='transparent'// 下划线透明
                                onSubmit={(value) => this.Search(value)}
                                showCancelButton={false}
                                //onSubmitEditing={(value) => this.Search(value.nativeEvent.text)}
                            />
                        </View>

                        {/*<View style={{width:68,paddingLeft:10,paddingRight:10}}>
                            <Buttons onPress={this._onRefresh} style={{borderRadius:4,width:45,height:25,backgroundColor:'rgba(32,115,211,0.10)'}} textStyle={{
                                fontSize:12,
                                color:'#2073D3'
                            }} title={'查询'}/>
                        </View>*/}

                    </View>
                </View>
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
                                                   onDopost={this._onRefresh} navigation={this.props.navigation}/>}
                    onEndReachedThreshold={0.1}
                    initialNumToRender={5}
                    getItemLayout={(data, index) => ( {length: 136, offset: 136 * index, index} )}
                    keyExtractor={(item, index) => index}
                    onEndReached={this._updata}
                    ListFooterComponent={this._hanleFooter}
                />

            </View>

        );
    }

}

const stylesa = StyleSheet.create({
    searchbox:{
        flex:1,
      height:50,
      backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 6,
    },
    search:{
        fontSize:12,
        height: 25,
        overflow:'hidden',
        textAlign:'center'
    }
});