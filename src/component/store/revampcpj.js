
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
import {List, DatePicker} from 'antd-mobile-rn'

import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/style_less'
import styleP from '../../assets/style/script/public_less'
import CheckBox from '../common/RnCheckbox'
import  Button from  '../common/button'
import Radio from "../common/radio";
import moment from 'moment';
import qs from 'query-string'


const cssStyle =Object.assign({},style({}).joincpj,styleP({}).public)
@rn_Less.rnLess(cssStyle)

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:{
                sn:'',
                openTime:'',
                sellLot:'',
                shopId:'',
                withdrawal:''
            },
            deftime: new Date(),
            sn: this.props.navigation.getParam('sn'),
            withdrawal:'',
            Change:[
                { value: 1, label: '竞彩' ,checked:false},
                { value: 2, label: '数字彩' ,checked:false},
                { value: 3, label: '高频' ,checked:false},
            ]
        };
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
    //彩种处理
    sellLot = (arr) => {
        let str = '';
        arr.map(i => {
            if(i.checked){
                str += String(i.value) + ',';
            }
        })
        return str.replace(/,$/gi,"");
    }

    //提现处理
    selwithdrawal = (str) => {
        let a = false;
        console.log(str)
        if(str == '1'){
            a = true;
        }else if(str == '2'){
            a = false;
        }
        return a;
    }
    //查询
    getdetail(){
        http.post('/netbar/machine/detail',{
            sn:this.state.sn
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
                this.state.deftime = this.state.data.openTime;//修改open时间
                const sellLotArr = this.state.data.sellLot.split(",");
                sellLotArr.map(i =>{
                    this.state.Change.map((x,id) => {
                        if(x.value == i){
                            this.state.Change[id].checked = true;
                        }
                    })
                })
                let withdrawal = '';
                if(this.state.data.withdrawal){
                    withdrawal = '1';//修改open时间
                }else {
                    withdrawal = '2';//修改open时间
                }
                //console.log(withdrawal)

                this.setState({
                    data:this.state.data,
                    deftime:new Date(moment(this.state.data.openTime).format()),
                    Change:this.state.Change,
                    withdrawal:withdrawal
                })
                setTimeout(() =>{
                    console.log(this)
                    this.setState({
                        withdrawal:withdrawal
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
        this.state.data.openTime = moment(this.state.deftime).format('YYYY-MM-DD HH:mm:ss');
        this.state.data.sellLot = this.sellLot(this.state.Change);
        if(!this.checkdata(this.state.data)){
            return false;
        }
        this.state.data.withdrawal = this.selwithdrawal(this.state.data.withdrawal);
        http.post('/netbar/machine/edit',this.state.data).then(res=>{
            /* Storage.saveObj({
                 user:res.data.token,
                 token:res.data.token
             })*/
            console.log(res)
            if(res.status == '200'){
                Alert.alert(res.msg);
                this.props.navigation.navigate('cpjmanagement');
            }
        }).catch(err=>{
            console.log(err)
        })
        console.log(this.state.data)
    }

    //rende之后调用
    componentDidMount(){
        this.getdetail();
        console.log(this.props.navigation.getParam('sn'));
    }

    //checkbox选择器
    onChange = (checked,val,id) => {
        this.state.Change[id].checked = !checked;
        this.setState({
            Change:this.state.Change
        })
    }
    //时间选择器
    onChangeDate = (value) => {
        let seldate = moment(value).format('YYYY-MM-DD HH:mm:ss');
        this.setState({
            deftime:value,
            data: Object.assign({}, this.state.data, {openTime: seldate})
        });

    }

    render() {
        return (
            <View>
                <View>
                    <View style={["bgfff","flexrow","ls_conbox"]}>
                        <Text style={["col999","text","fontsize14"]}>机器编号：</Text>
                        <View>
                            <TextInput
                                style={["inputbox"]}
                                placeholder={'请输入机器编号'}
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => {
                                    this.setState({
                                        data: Object.assign({}, this.state.data, {sn: text})
                                    })
                                }}
                                value={this.state.data.sn}
                            />
                        </View>
                    </View>
                    <View style={["bgfff","flexrow","ls_conbox"]}>
                        <Text style={["col999","text","fontsize14"]}>在售彩种：</Text>
                        <View style={["flexrow"]}>
                            {this.state.Change.map((i,id) => (
                                <CheckBox
                                    key={i.value}
                                    label={i.label}
                                    containerStyle={{width:90,  flexDirection: 'row', margin:0}}
                                    labelStyle={{width:60, lineHeight:26}}
                                    checked={i.checked}
                                    onChange={() => this.onChange(i.checked,i.value,id)}
                                />
                            ))}
                        </View>
                    </View>
                    <View style={["bgfff","flexrow","ls_conbox"]}>
                        <Text style={["col999","text","fontsize14"]}>提现开通：</Text>
                        {this.state.withdrawal
                            ?
                            <Radio
                            selectedValue={this.state.withdrawal}
                            onValueChange={(id) => {
                                this.state.withdrawal = id;
                                this.state.data.withdrawal = id;
                            }}
                            style={{ flexDirection:'row',
                                flexWrap:'wrap',
                                alignItems:'flex-start',
                                flex:1,
                                backgroundColor:'#ffffff',
                                paddingTop:10
                            }}
                        >
                            <Text value="1">开通</Text>
                            <Text value="2">未开通</Text>
                        </Radio>
                            :
                            <Text></Text>
                        }
                    </View>
                    <View style={["bgfff"]}>
                        <List>
                            <DatePicker
                                value={this.state.deftime}
                                mode="date"
                                minDate={new Date(2015, 1, 1)}
                                maxDate={new Date(2026, 12, 31)}
                                onChange={this.onChangeDate}
                                format="YYYY-MM-DD"
                            >
                                <List.Item arrow="horizontal">开始营业时间：</List.Item>
                            </DatePicker>
                        </List>
                    </View>
                </View>
                <View style={["butbox"]}>
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