
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    TextInput,
    DeviceEventEmitter
} from 'react-native';
import {Picker, List, Toast} from 'antd-mobile-rn'


import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/style_less'
import styleP from '../../assets/style/script/public_less'
import Radio from '../common/radio'
import  Button from  '../common/button'
import district from '../common/ssq'
import Keyboard from '../common/keyboard'

import qs from 'query-string'
import Storage from "../../util/asyncStorage";


const cssStyle =Object.assign({},style({}).revampstore,styleP({}).public)
@rn_Less.rnLess(cssStyle)


export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:{
                account:'',
                address:'',
                area:JSON.stringify(["110000","110100","110108"]),
                bank:'',
                linkPhone:'',
                linkman:'',
                lotOrg:1,
                schedule:['0'],
                shopName:'',
                workType:1,
                pwd:'123456',
            },
            datab:{
                name:'',
                bank:'',
                cardno:'',
                phone:'',
            },
            value: ["110000","110100","110108"],
            adddata: district,
            schedule:['0'],
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
        this.state.data.schedule = schedule[0];
        this.setState({ schedule });
    }

    onChange = (value) => {
        this.state.data.area = JSON.stringify(value);
        this.setState({ value });
    }

    //rende之后调用
    componentDidMount(){
        this._setSchedule(this.state.data.lotOrg);
        //console.log(this.props.navigation.state)
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
        http.post('/netbar/shop/edit',this.state.data).then(res=>{
            /* Storage.saveObj({
                 user:res.data.token,
                 token:res.data.token
             })*/
            console.log(res)
            if(res.status == '200'){
                DeviceEventEmitter.emit('refreshShopList', 'suc');//添加广播
                this.props.navigation.goBack();
            }
        }).catch(err=>{
            console.log(err)
        })
        //console.log(this.state.data)
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
                                        />
                                    </View>
                                </View>
                                <View style={["bgfff","flexrow","ls_conbox"]}>
                                    <View style={["textv"]}>
                                        <Text style={["text"]}>合作方式：</Text>
                                    </View>
                                    <Radio
                                        selectedValue={this.state.initId}
                                        onValueChange={(id) => {
                                            this.setState({
                                                data: Object.assign({}, this.state.data, {workType: id})
                                            })
                                        }}
                                        selectedValue = '1'
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
                                </View>
                                <View style={["bgfff","flexrow","ls_conbox"]}>
                                    <View style={["textv"]}>
                                        <Text style={["text"]}>网吧类型：</Text>
                                    </View>
                                    <Radio
                                        onValueChange={(id) => {
                                            this._setSchedule(id);
                                            this.setState({
                                                data: Object.assign({}, this.state.data, {lotOrg: id})
                                            })
                                        }}
                                        selectedValue = '1'
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
                                    </View>
                                </View>
                                <View style={["bgfff","flexrow","ls_conboxrw"]}>
                                    <View style={["textv"]}>
                                        <Text style={["text"]}>详细地址：</Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            autoHeight={'rows'}
                                            placeholderTextColor={'#ccc'}
                                            style={["textareaItem"]}
                                            placeholder={'请输入详细地址信息，如道路、门牌号、单元室等'}
                                            underlineColorAndroid="transparent"
                                            onChangeText={(text) => {
                                                this.setState({
                                                    data: Object.assign({}, this.state.data, {address: text})
                                                })
                                            }}
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
                                        />
                                    </View>
                                </View>
                                <View style={["bgfff","flexrow","ls_conbox","martop"]}>
                                    <View style={["textv"]}>
                                        <Text style={["text"]}>登陆账号：</Text>
                                    </View>
                                    <View>
                                        <Text style={["text"]}>{this.state.data.linkPhone}</Text>
                                    </View>
                                </View>
                                <View style={["bgfff","flexrow","ls_conbox"]}>
                                    <View style={["textv"]}>
                                        <Text style={["text"]}>默认密码：</Text>
                                    </View>
                                    <View>
                                        <Text style={["text"]}>123456</Text>
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