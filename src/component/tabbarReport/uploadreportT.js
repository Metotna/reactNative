
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Button, InputItem,List } from 'antd-mobile-rn'

import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/style_less'
import styleP from '../../assets/style/script/public_less'
import CameraButton from '../../util/PickerImages'
import Storage from "../../util/asyncStorage";
import Backicon from "../common/backicon";

const headerStyleB={
    backgroundColor: '#2073D3',
}
const headerTitleStyleB={
    color: '#fff'
}

const cssStyle =Object.assign({},style({}).uploadreport,styleP({}).public)
@rn_Less.rnLess(cssStyle)

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pdata: this.props.navigation.state.params.pdata,
        };
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        let tit = '';
        if(params.path == 't'){
            tit = '上传销售报表';
        }else if(params.path == 'a'){
            tit = '上传缴款报表';
        }

        return {
            title: tit,
            headerStyle: headerStyleB,
            headerTitleStyle: headerTitleStyleB,
            headerBackImage:Backicon,
        };
    };

    //rende之后调用
    componentDidMount(){
        //console.log(this.props)
    }

    onFileUpload = async (file, fileName) => {
        const token = await Storage.get('token');
        //let formData = new FormData();//如果需要上传多张图片,需要遍历数组,把图片的路径数组放入formData中
        let files = {uri: file, type: 'multipart/form-data', name: 'image.png'};   //这里的key(uri和type和name)不能改变,
        let params = {
            uploadFile:files,
            token:token,
            module:'netbarCharge',
            id:this.state.pdata.dateMemo+'|'+this.state.pdata.sn,
        }

        //formData.append("uploadFile",files);   //这里的files就是后台需要的key
        //formData.append("token",token);

        http.postForm('/common/upload',params).then(res=>{
            if(res.status == '200'){
                if(this.props.navigation.state.params.path == 't'){
                    this.props.navigation.navigate('ReportUpload_a', {
                        img:res.data,
                        pdata: this.props.navigation.state.params.pdata
                    });
                }else if(this.props.navigation.state.params.path == 'a'){
                    this.props.navigation.navigate('ReportUpload_b', {
                        img:res.data,
                        pdata: this.props.navigation.state.params.pdata
                    });
                }


            }
        }).catch(err=>{
            console.log(err)
        })

    }

    render() {
        return (
            <View style={["pagebox"]}>
                <View style={["herderbox"]}>
                    <Text style={["text"]}>第二步：请上传
                    <Text style={["col"]}>{this.state.pdata.dateMemo} 缴款报表</Text>
                    </Text>
                    <Text style={["text"]}>机器编号：
                        <Text style={["col"]}>{this.state.pdata.sn}</Text>
                    </Text>
                </View>
                <View style={["imgbox"]}>
                    <CameraButton onFileUpload={this.onFileUpload} />
                </View>
            </View>
        );
    }

}