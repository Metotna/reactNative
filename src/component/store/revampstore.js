
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    TextInput
} from 'react-native';
import { TextareaItem ,Picker,List,Toast} from 'antd-mobile-rn'


import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/style_less'
import styleP from '../../assets/style/script/public_less'
import Radio from '../common/radio'
import  Button from  '../common/button'
import district from '../common/ssq'

import qs from 'query-string'
import Storage from "../../util/asyncStorage";
import Keyboard from "../common/keyboard";


const cssStyle =Object.assign({},style({}).revampstore,styleP({}).public)
@rn_Less.rnLess(cssStyle)


export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:{
                address:'',
                area:'',
                bank:'',
                linkPhone:'',
                linkman:'',
                lotOrg:'',
                schedule:'',
                shopName:'',
                workType:'',
                id:this.props.navigation.getParam('id'),
            },
            lotOrg:'',
            workType:'',
            datab:{
                name:'',
                bank:'',
                cardno:'',
                phone:'',
            },
            value: ["110000","110100","110108"],
            adddata: district,
            schedule:'',
            scheduledata:[],
            scheduledataA:[
                {
                    "label": "请选择",
                    "value": ""
                },
                {
                    "label": "提交建站申请",
                    "value": "10"
                },
                {
                    "label": "实地勘查",
                    "value": "20"
                },
                {
                    "label": "网吧签合同",
                    "value": "30"
                },
                {
                    "label": "与体彩签合同",
                    "value": "40"
                },
                {
                    "label": "装修",
                    "value": "41"
                },
                {
                    "label": "申领机器",
                    "value": "42"
                },
                {
                    "label": "培训",
                    "value": "50"
                },
                {
                    "label": "正常营业",
                    "value": "60"
                }
            ],
            scheduledataB:[
                {
                    "label": "请选择",
                    "value": ""
                },
                {
                    "label": "提交建站申请",
                    "value": "10"
                },
                {
                    "label": "实地勘查",
                    "value": "20"
                },
                {
                    "label": "网吧签合同",
                    "value": "30"
                },
                {
                    "label": "装修",
                    "value": "40"
                },
                {
                    "label": "福彩签合同",
                    "value": "41"
                },
                {
                    "label": "培训",
                    "value": "50"
                },
                {
                    "label": "正常营业",
                    "value": "60"
                }
            ]
        };
    }

    onSchedule = (schedule) => {
        console.log(schedule)
        this.state.data.schedule = schedule[0];
        this.setState({ schedule });
    }

    onChange = (value) => {
        this.state.data.area = JSON.stringify(value);
        this.setState({ value });
    }

    //rende之后调用
    componentDidMount(){
        this.getdetail()
    }

    //非空检查
    checkdata =(obj)=>{
        for (var prop in obj) {
            if(!obj[prop]){
                console.log(prop)
                Toast.show('请补充完整数据提交');
                return false;
            }
        }
        return true;
    }
    //进度数据转换
    scheduleCl=(str)=>{
        let data = [
            {
                "label": "请选择",
                "value": ""
            },
            {
                "label": "提交建站申请",
                "value": "10"
            },
            {
                "label": "实地勘查",
                "value": "20"
            },
            {
                "label": "网吧签合同",
                "value": "30"
            },
            {
                "label": "与体彩签合同",
                "value": "40"
            },
            {
                "label": "装修",
                "value": "41"
            },
            {
                "label": "申领机器",
                "value": "42"
            },
            {
                "label": "培训",
                "value": "50"
            },
            {
                "label": "正常营业",
                "value": "60"
            }
        ];
        data.map(x =>{
            if(x.text === str[0]){
                this.state.data.schedule = x.value;
            }
        })
        return true;
    }
    //查询
    getdetail(){
        http.loadingPost('/netbar/shop/detail',{
            shopId:this.state.data.id,
        }).then(res=>{
            /* Storage.saveObj({
                 user:res.data.token,
                 token:res.data.token
             })*/
            console.log(res)
            if(res.status == '200'){

                const data = res.data;
                for(let i in this.state.data){
                    this.state.data[i] = data[i];
                }
                const datab = JSON.parse(data.bank);
                const schedule = [];
                schedule.push(String(this.state.data.schedule));
                if(this.state.data.lotOrg == 1){
                    this.setState({
                        scheduledata:this.state.scheduledataA,
                    })
                }else {
                    this.setState({
                        scheduledata:this.state.scheduledataB,
                    })
                }
                this.setState({
                    data:this.state.data,
                    schedule:schedule,
                    datab:datab,
                    value: JSON.parse(data.area),
                })
                setTimeout(() =>{
                    this.setState({
                        workType:String(this.state.data.workType),
                        lotOrg:String(this.state.data.lotOrg)
                    })
                },50)
                //this.props.navigation.navigate('Store')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    //修改提交
    dopost =()=> {
        this.state.data.account = this.state.data.linkPhone;
        this.state.data.bank = JSON.stringify(this.state.datab);
        //this.scheduleCl(this.state.data.schedule);
        //console.log(this.state.data.schedule);
        if(!this.checkdata(this.state.data)){
            return false;
        }
        if(!this.checkdata(this.state.datab)){
            return false;
        }
        http.loadingPost('/netbar/shop/edit',this.state.data).then(res=>{
            /* Storage.saveObj({
                 user:res.data.token,
                 token:res.data.token
             })*/
            console.log(res)
            if(res.status == '200'){
                Toast.show('修改成功',3)
                this.props.navigation.state.params.dopost();
                this.props.navigation.goBack();
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    //设置进度模式-1体彩，2福彩
    _setSchedule =(id) =>{
        //console.log(id)
        if(id == 1){
            this.setState({
                scheduledata:this.state.scheduledataA,
                schedule:['0']
            })
        }else {
            this.setState({
                scheduledata:this.state.scheduledataB,
                schedule:['0']
            })
        }
    }

    render() {
        return (
            <Keyboard>
                <View style={["revampstore"]}>
                    <ScrollView>
                        <View style={{marginTop:6}}>
                            <View style={["ls_box"]}>
                                <View style={["bgfff","flexrow","ls_conbox"]}>
                                    <View style={["textv"]}>
                                        <Text style={["text"]}>网吧名称：</Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            style={["inputbox"]}
                                            placeholder={'请输入网吧名字'}
                                            underlineColorAndroid="transparent"
                                            onChangeText={(text) => {
                                                this.setState({
                                                    data: Object.assign({}, this.state.data, {shopName: text})
                                                })
                                            }}
                                            value={this.state.data.shopName}
                                        />
                                    </View>
                                </View>
                                <View style={["bgfff","flexrow","ls_conbox"]}>
                                    <View style={["textv"]}>
                                        <Text style={["text"]}>合作方式：</Text>
                                    </View>
                                    {
                                        this.state.workType
                                            ?
                                            <Radio
                                                selectedValue={this.state.workType}
                                                onValueChange={(id) => {
                                                    this.state.workType = id;
                                                    this.state.data.workType = id;
                                                }}
                                                style={{ flexDirection:'row',
                                                    flexWrap:'wrap',
                                                    alignItems:'flex-start',
                                                    flex:1,
                                                    backgroundColor:'#ffffff',
                                                    paddingTop:10
                                                }}
                                            >
                                                <Text value="1">自营</Text>
                                                <Text value="2">联营</Text>
                                            </Radio>
                                            :
                                            <Text></Text>
                                    }
                                </View>
                                <View style={["bgfff","flexrow","ls_conbox"]}>
                                    <View style={["textv"]}>
                                        <Text style={["text"]}>网吧类型：</Text>
                                    </View>
                                    {
                                        this.state.lotOrg
                                            ?
                                            <Radio
                                                onValueChange={(id) => {
                                                    this.state.lotOrg = id;
                                                    this.state.data.lotOrg = id;
                                                    this._setSchedule(id);
                                                }}
                                                selectedValue = {this.state.lotOrg}
                                                style={{ flexDirection:'row',
                                                    flexWrap:'wrap',
                                                    alignItems:'flex-start',
                                                    flex:1,
                                                    backgroundColor:'#ffffff',
                                                    paddingTop:10
                                                }}
                                            >
                                                <Text value="1">体彩</Text>
                                                <Text value="2">福彩</Text>
                                            </Radio>
                                            :
                                            <Text></Text>
                                    }

                                </View>
                                <View style={["bgfff"]}>
                                    <View style={["pickerbox"]}>
                                        <List>
                                            <Picker
                                                data={this.state.scheduledata}
                                                cols={1}
                                                value={this.state.schedule}
                                                onChange={this.onSchedule}
                                            >
                                                <List.Item arrow="horizontal">
                                                    进度：
                                                </List.Item>
                                            </Picker>
                                        </List>
                                        {/*<Text style={["pickertext"]} onPress={this._show_Picker}>{this.state.data.schedule}</Text>*/}
                                    </View>
                                </View>
                                <View style={["bgfff"]}>
                                    <View>
                                        <List>
                                            <Picker
                                                data={this.state.adddata}
                                                cols={3}
                                                value={this.state.value}
                                                onChange={this.onChange}
                                            >
                                                <List.Item arrow="horizontal">
                                                    所在地区：
                                                </List.Item>
                                            </Picker>
                                        </List>
                                        {/*<TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入所在地区'}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => {
                                            this.setState({
                                                data: Object.assign({}, this.state.data, {area: text})
                                            })
                                        }}
                                    />*/}
                                    </View>
                                </View>
                                <View style={["bgfff","flexrow","ls_conboxrw"]}>
                                    <View style={["textv"]}>
                                        <Text style={["text"]}>详细地址：</Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            style={["textareaItem"]}
                                            placeholder={'请输入详细地址信息，如道路、门牌号、单元室等'}
                                            underlineColorAndroid="transparent"
                                            onChangeText={(text) => {
                                                this.setState({
                                                    data: Object.assign({}, this.state.data, {address: text})
                                                })
                                            }}
                                            value={this.state.data.address}
                                        />
                                    </View>
                                </View>
                                <View style={["bgfff","flexrow","ls_conbox"]}>
                                    <View style={["textv"]}>
                                        <Text style={["text"]}>联系人：</Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            style={["inputbox"]}
                                            placeholder={'请输入联系人姓名'}
                                            underlineColorAndroid="transparent"
                                            onChangeText={(text) => {
                                                this.setState({
                                                    data: Object.assign({}, this.state.data, {linkman: text})
                                                })
                                            }}
                                            value={this.state.data.linkman}
                                        />
                                    </View>
                                </View>
                                <View style={["bgfff","flexrow","ls_conbox"]}>
                                    <View style={["textv"]}>
                                        <Text style={["text"]}>联系方式：</Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            style={["inputbox"]}
                                            placeholder={'请输入联系人手机号'}
                                            underlineColorAndroid="transparent"
                                            keyboardType="phone-pad"
                                            onChangeText={(text) => {
                                                this.setState({
                                                    data: Object.assign({}, this.state.data, {linkPhone: text})
                                                })
                                            }}
                                            value={this.state.data.linkPhone}
                                        />
                                    </View>
                                </View>
                                <View style={["title2box"]}>
                                    <Text style={"title2"}>请绑定门店结算账户信息</Text>
                                </View>
                                <View style={["bgfff","flexrow","ls_conbox"]}>
                                    <View style={["textv"]}>
                                        <Text style={["text"]}>持卡人：</Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            style={["inputbox"]}
                                            placeholder={'请输入名称'}
                                            underlineColorAndroid="transparent"
                                            onChangeText={(text) => {
                                                this.setState({
                                                    datab: Object.assign({}, this.state.datab, {name: text})
                                                })
                                            }}
                                            value={this.state.datab.name}
                                        />
                                    </View>
                                </View>
                                <View style={["bgfff","flexrow","ls_conbox"]}>
                                    <View style={["textv"]}>
                                        <Text style={["text"]}>银行账号：</Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            style={["inputbox"]}
                                            placeholder={'请输入银行账号'}
                                            underlineColorAndroid="transparent"
                                            keyboardType="phone-pad"
                                            onChangeText={(text) => {
                                                this.setState({
                                                    datab: Object.assign({}, this.state.datab, {cardno: text})
                                                })
                                            }}
                                            value={this.state.datab.cardno}
                                        />
                                    </View>
                                </View>
                                <View style={["bgfff","flexrow","ls_conbox"]}>
                                    <View style={["textv"]}>
                                        <Text style={["text"]}>银行名称：</Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            style={["inputbox"]}
                                            placeholder={'请输入银行名称'}
                                            underlineColorAndroid="transparent"
                                            onChangeText={(text) => {
                                                this.setState({
                                                    datab: Object.assign({}, this.state.datab, {bank: text})
                                                })
                                            }}
                                            value={this.state.datab.bank}
                                        />
                                    </View>
                                </View>
                                <View style={["bgfff","flexrow","ls_conbox"]}>
                                    <View style={["textv"]}>
                                        <Text style={["text"]}>联系号码：</Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            style={["inputbox"]}
                                            placeholder={'请输入联系号码'}
                                            underlineColorAndroid="transparent"
                                            onChangeText={(text) => {
                                                this.setState({
                                                    datab: Object.assign({}, this.state.datab, {phone: text})
                                                })
                                            }}
                                            value={this.state.datab.phone}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View>
                        <Button onPress={this.dopost} style={{borderRadius:0}} textStyle={{
                            lineHeight: 36,
                            fontSize:17
                        }} title={'保存'}/>
                    </View>
                </View>
            </Keyboard>

        );
    }

}

const styles = StyleSheet.create({
});

/*

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    Alert,
    TextInput
} from 'react-native';
import { Button, InputItem,List } from 'antd-mobile-rn'

import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/style_less'
import styleP from '../../assets/style/script/public_less'
import Radio from '../common/radio'


const cssStyle =Object.assign({},style({}).revampstore,styleP({}).public)
@rn_Less.rnLess(cssStyle)

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: '2',
            pickerValue: [],
            part2Value:'2'
        };
    }


    clear = () => {
        this.setState({ value: '' });
    }

    render() {
        return (
            <View style={["revampstore"]}>
                <ScrollView>
                    <View style={{marginTop:6}}>
                        <View style={["ls_box"]}>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>网吧名称：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>合作方式：</Text>
                                <Radio
                                    selectedValue={this.state.initId}
                                    onValueChange={(id,item) => this.setState({initId: id,initItem:item})}
                                    style={{ flexDirection:'row',
                                        flexWrap:'wrap',
                                        alignItems:'flex-start',
                                        flex:1,
                                        backgroundColor:'#ffffff',
                                        paddingTop:10
                                    }}
                                >
                                    <Text value="0" style={{fontSize:16}}>自营</Text>
                                    <Text value="1">联营</Text>
                                </Radio>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>网吧类型：</Text>
                                <Radio
                                    selectedValue={this.state.initId}
                                    onValueChange={(id,item) => this.setState({initId: id,initItem:item})}
                                    style={{ flexDirection:'row',
                                        flexWrap:'wrap',
                                        alignItems:'flex-start',
                                        flex:1,
                                        backgroundColor:'#ffffff',
                                        paddingTop:10
                                    }}
                                >
                                    <Text value="0">体彩</Text>
                                    <Text value="1">福彩</Text>
                                </Radio>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>进度：</Text>
                                <Text style={["col333","text","fontsize16"]}>正常营业</Text>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>所在地区：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>详细地址：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>联系人：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>联系方式：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={"title2"}>请绑定门店结算账户信息</Text>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>持卡人：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>银行账号：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>银行名称：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>联系人：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View>
                    <Button onPress={() => this.props.navigation.navigate('cpjmanagement')} size={'20'} style={["but"]}>保存</Button>
                </View>
            </View>

        );
    }

}

const styles = StyleSheet.create({
});*/
