
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    Image
} from 'react-native';
import { Button, InputItem,List } from 'antd-mobile-rn'

import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/style_less'
import styleP from '../../assets/style/script/public_less'
import CameraButton from '../../util/PickerImages'


const cssStyle =Object.assign({},style({}).uploadreport,styleP({}).public)
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

    onFileUpload(file, fileName){
        console.log(file,fileName)
        let formData = new FormData();//如果需要上传多张图片,需要遍历数组,把图片的路径数组放入formData中
        let files = {uri: file, type: 'multipart/form-data', name: 'image.png',bill:1809201859370001,token:'EC18E8C8EA7D418AB51E06AD8BAB372D'};   //这里的key(uri和type和name)不能改变,
        formData.append("files",files);   //这里的files就是后台需要的key

        fetch('http://192.168.1.200:8082/shopCharge/cachePic',{
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data',
            },
            body:formData,
        })
            .then((response) => response.text() )
            .then((responseData)=>{

                console.log('responseData',responseData);
            })
            .catch((error)=>{console.error('error',error)});

    }

    render() {
        return (
            <View style={["pagebox"]}>
                <View style={["herderbox"]}>
                    <Text style={["text"]}>第一步：请上传
                    <Text style={["col"]}>2018.03.29 时段报表</Text>
                    </Text>
                    <Text style={["text"]}>机器编号：
                        <Text style={["col"]}>01-123456</Text>
                    </Text>
                </View>
                <View style={["imgbox"]}>
                    <CameraButton onFileUpload={this.onFileUpload} />
                </View>
            </View>
        );
    }

}