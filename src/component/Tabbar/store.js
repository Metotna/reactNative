
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TextInput,
    Alert,
    ListView,
} from 'react-native';
import { Button, SearchBar, Picker } from 'antd-mobile-rn'

import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/style_less'
import styleP from '../../assets/style/script/public_less'
import qs from "query-string";

let pageNumber = 1;//当前第几页
let totalPage = 0;//总的页数


const cssStyle =Object.assign({},style({}).detail,styleP({}).public)
@rn_Less.rnLess(cssStyle)
class Listbox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.rowData,
        };
    }
    render(){
        return(
            <View style="mdlist">
                <View style="ls_t">
                    <View style="a_1">
                        <Text style="fontsize16">{this.state.data.shopName}</Text>
                        <Text style={["fontsize14", "col666"]}>{this.state.data.schedule}</Text>
                    </View>
                </View>
                <View style="ls_con">
                    <View style={["flexrowbet"]}>
                        <View style={["c_box","flex1","flexrowbet"]}>
                            <Text style={["fontsize14", "col666"]}>类型：</Text>
                            <Text style={["fontsize14", "col333"]}>{this.state.data.lotOrg}</Text>
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
                    <Button onClick={() => this.props.navigation.navigate('revampstore',{id:this.state.data.id})} size={12} style={["but"]} activeStyle={{ backgroundColor: '#114FCD' }}>修改</Button>
                    <Button onClick={() => this.props.navigation.navigate('cpjmanagement',{id:this.state.data.id})} size={12} style={["but"]} activeStyle={{ backgroundColor: '#114FCD' }}>彩票机</Button>
                    <Button size={12} style={["but"]} activeStyle={{ backgroundColor: 'red' }}>删除</Button>
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
            ds:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        };
    }

    clear = () => {
        this.setState({ value: '' });
    }

    //rende之后调用
    componentDidMount(){
        this.dopost();
    }


    _renderFooter(){
        if (this.state.showFoot === 1) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }
    //上拉加载
    _updata =()=> {
        if(pageNumber > totalPage){
            return false;
        }else {
            //console.log(pageNumber)
            this.dopost();
        }
    }
    Search =(v) =>{
        Alert.alert(v)
    }

    dopost =()=> {
        http.post('/netbar/shop/list',{pageNumber:pageNumber}).then(responseData=>{
            /* Storage.saveObj({
                 user:res.data.token,
                 token:res.data.token
             })*/
            console.log(responseData)
            let data = responseData.data.entitys;
            let dataBlob = [];
            pageNumber ++;
            totalPage = responseData.data.totalPage;
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
            <View style="delbox">
                <View style={["herderbox"]}>
                    <View style="tit">
                        <Text style="lh">XXX个提交建站申请，XXX个实地勘察，XXX个正常营业</Text>
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