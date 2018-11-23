
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
import { Button, Checkbox } from 'antd-mobile-rn'

import rn_Less from 'rn-less/src/runtime';
import style from '../../assets/style/script/style_less'
import styleP from '../../assets/style/script/public_less'
import Radio from '../common/radio'

const AgreeItem = Checkbox.AgreeItem;
const CheckboxItem = Checkbox.CheckboxItem;


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

    onChange = (val) => {
        alert(val);
    }

    render() {
        const data = [
            { value: 0, label: '竞彩' },
            { value: 1, label: '数字彩' },
            { value: 2, label: '高频' },
        ];
        return (
            <View>
                <View>
                    <View style={["bgfff","flexrow","ls_conbox"]}>
                        <Text style={["col999","text","fontsize14"]}>网吧名称：</Text>
                        <View>
                            <TextInput
                                style={["inputbox"]}
                                placeholder={'请输入门店名称'}
                            />
                        </View>
                    </View>
                    <View style={["bgfff","flexrow","ls_conbox"]}>
                        <Text style={["col999","text","fontsize14"]}>在售彩种：</Text>
                        <View style={["flexrow"]}>
                            {data.map(i => (
                                <CheckboxItem
                                    style={{ flexDirection:'row',
                                        flexWrap:'wrap',
                                        alignItems:'flex-start',
                                        flex:1,
                                        backgroundColor:'#ffffff',
                                        paddingTop:10,
                                        width:120
                                    }}
                                    key={i.value} onChange={() => this.onChange(i.value)}>
                                    {i.label}
                                </CheckboxItem>
                            ))}
                        </View>
                    </View>
                    <View style={["bgfff","flexrow","ls_conbox"]}>
                        <Text style={["col999","text","fontsize14"]}>开始营业时间：</Text>
                        <View>
                            <TextInput
                                style={["inputbox"]}
                                placeholder={'请输入门店名称'}
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <Button onPress={() => this.props.navigation.navigate('cpjmanagement')} size={'20'} style={["but"]}>保存</Button>
                </View>
            </View>

        );
    }

}

const styles = StyleSheet.create({
});