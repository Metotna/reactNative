
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';
import { Button, SearchBar, Picker } from 'antd-mobile-rn'

import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/style_less'
import styleP from '../../assets/style/script/public_less'
import Icon from "react-native-vector-icons/Entypo";


const cssStyle =Object.assign({},style({}).cpjmanagement,styleP({}).public)
@rn_Less.rnLess(cssStyle)

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: '2',
            pickerValue: [],
        };
    }

    clear = () => {
        this.setState({ value: '' });
    }

    render() {
        return (
            <View style={["cpjmanagementbox"]}>
                <View style={["flexrow","hardebox"]}>
                    <Icon style={"icon"} name="plus" size={32} color="#114FCD" />
                    <Text style={["tjbut"]}>添加彩票机</Text>
                </View>
                <View>
                    <ScrollView>
                        <View style={["ls_box"]}>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>机器编号：</Text>
                                <Text style={["col333","text","fontsize16"]}>01-1234567</Text>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>在售彩种：</Text>
                                <Text style={["col333","text","fontsize16"]}>01-1234567</Text>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>开始营业时间：</Text>
                                <Text style={["col333","text","fontsize16"]}>01-1234567</Text>
                            </View>
                            <View style={["bt_bot","flex1"]}>
                                <Button size={12} style={["but"]} activeStyle={{ backgroundColor: 'red' }}>修改</Button>
                                <Button size={12} style={["but"]} activeStyle={{ backgroundColor: 'red' }}>移除</Button>
                            </View>
                        </View>
                    </ScrollView>
                </View>
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