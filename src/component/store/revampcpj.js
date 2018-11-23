
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
import { Button, TextareaItem } from 'antd-mobile-rn'

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
                                        placeholder={'请输入联系人姓名'}
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
                                    <Text value="0" style={{fontSize:'16'}}>自营</Text>
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
                            <View style={["bgfff","flexrow","ls_conboxrw"]}>
                                <Text style={["col999","text","fontsize14"]}>详细地址：</Text>
                                <View>
                                    <TextareaItem
                                        autoHeight={'rows'}
                                        rows={2}
                                        placeholderTextColor={'#ccc'}
                                        style={["textareaItem"]}
                                        placeholder={'请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元室等'}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>联系人：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入联系人姓名'}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>联系方式：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入联系人手机号'}
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
                                        placeholder={'请输入名称'}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>银行账号：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入账号'}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>银行名称：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入银行名称'}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>联系人：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入姓名'}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox","martop"]}>
                                <Text style={["col999","text","fontsize14"]}>登陆账号：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入联系人姓名'}
                                    />
                                </View>
                            </View>
                            <View style={["bgfff","flexrow","ls_conbox"]}>
                                <Text style={["col999","text","fontsize14"]}>默认密码：</Text>
                                <View>
                                    <TextInput
                                        style={["inputbox"]}
                                        placeholder={'请输入联系人姓名'}
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
});