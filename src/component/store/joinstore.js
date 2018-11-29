
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
import { TextareaItem ,Picker,List} from 'antd-mobile-rn'


import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/style_less'
import styleP from '../../assets/style/script/public_less'
import Radio from '../common/radio'
import  Button from  '../common/button'
import district from '../common/ssq'

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
                area:'',
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
                linkman:'',
                bank:'',
                account:''
            },
            value: ["110000","110100","110108"],
            adddata: district,
            schedule:['0'],
            scheduledata:[
                {label:'请选择',value: ''},
                {label:'提交建站申请',value: '1'},
                {label:'实地勘察',value: '2'},
                {label:'与网吧签合同',value: '3'},
                {label:'装修',value: '4'},
                {label:'签合同，申领机器，申请宽带',value: '5'},
                {label:'培训',value: '6'},
                {label:'正常营业',value: '7'},
                {label:'建站失败',value: '100'},
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

    }

    //非空检查
    checkdata =(obj)=>{
        for (var prop in obj) {
            if(!obj[prop]){
                console.log(prop)
                Alert.alert('请补充完整数据提交');
                return false;
            }
        }
        return true;
    }
    //进度数据转换
    scheduleCl=(str)=>{
        let data = [
            {text:'请选择',value: ''},
            {text:'提交建站申请',value: 1},
            {text:'实地勘察',value: 2},
            {text:'与网吧签合同',value: 3},
            {text:'装修',value: 4},
            {text:'签合同，申领机器，申请宽带',value: 5},
            {text:'培训',value: 6},
            {text:'正常营业',value: 7},
            {text:'建站失败',value: 100},
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
        this.state.data.bank = qs.stringify(this.state.datab);
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
                this.props.navigation.navigate('Store')
            }
        }).catch(err=>{
            console.log(err)
        })
        console.log(this.state.data)
    }

    render() {
        return (
            <View style={["revampstore"]}>
                <ScrollView>
                    <View style={{marginTop:6}}>
                        <View style={["ls_box"]}>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text"]}>网吧名称：</Text>
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
                                <Text style={["col999","text"]}>合作方式：</Text>
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
                                <Text style={["col999","text"]}>网吧类型：</Text>
                                <Radio
                                    selectedValue={this.state.initId}
                                    onValueChange={(id) => {
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
                                <Text style={["col999","text"]}>详细地址：</Text>
                                <View>
                                    <TextareaItem
                                        autoHeight={'rows'}
                                        rows={2}
                                        placeholderTextColor={'#ccc'}
                                        style={["textareaItem"]}
                                        placeholder={'请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元室等'}
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
                                <Text style={["col999","text"]}>联系人：</Text>
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
                                <Text style={["col999","text"]}>联系方式：</Text>
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
                            <View>
                                <Text style={"title2"}>请绑定门店结算账户信息</Text>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text"]}>持卡人：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入名称'}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => {
                                            this.setState({
                                                datab: Object.assign({}, this.state.datab, {linkman: text})
                                            })
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text"]}>银行账号：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入银行账号'}
                                        underlineColorAndroid="transparent"
                                        keyboardType="phone-pad"
                                        onChangeText={(text) => {
                                            this.setState({
                                                datab: Object.assign({}, this.state.datab, {account: text})
                                            })
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text"]}>银行名称：</Text>
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
                                <Text style={["col999","text"]}>联系人：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入姓名'}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => {
                                            this.setState({
                                                datab: Object.assign({}, this.state.datab, {linkman: text})
                                            })
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox","martop"]}>
                                <Text style={["col999","text"]}>登陆账号：</Text>
                                <View>
                                    <Text style={["text"]}>{this.state.data.linkPhone}</Text>
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text"]}>默认密码：</Text>
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

        );
    }

}

const styles = StyleSheet.create({
});