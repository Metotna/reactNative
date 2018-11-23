
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TextInput,
    Alert,
} from 'react-native';
import { Button, SearchBar, Picker } from 'antd-mobile-rn'

import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/style_less'
import styleP from '../../assets/style/script/public_less'


const cssStyle =Object.assign({},style({}).detail,styleP({}).public)
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
            <View style="delbox">
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
                        onSubmit={(value: any) => Alert.alert(value)}
                        onCancel={this.clear}
                        onChange={this.onChange}
                        showCancelButton={false}
                    />
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
                        <Button onClick={() => this.props.navigation.navigate('idmanagement')} size={12} style={["but"]} activeStyle={{ backgroundColor: 'red' }}>账号</Button>
                        <Button onClick={() => this.props.navigation.navigate('revampstore')} size={12} style={["but"]} activeStyle={{ backgroundColor: 'red' }}>修改</Button>
                        <Button onClick={() => this.props.navigation.navigate('cpjmanagement')} size={12} style={["but"]} activeStyle={{ backgroundColor: 'red' }}>彩票机</Button>
                        <Button size={12} style={["but"]} activeStyle={{ backgroundColor: 'red' }}>删除</Button>
                    </View>
                </View>
            </View>

        );
    }

}

const styles = StyleSheet.create({
});