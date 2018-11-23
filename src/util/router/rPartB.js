
import Backicon from "../../component/common/backicon";
import cpjmanagement from '../../component/store/cpjmanagement';//彩票机管理
import idmanagement from '../../component/store/idmanagement';//账号管理
import revampstore from '../../component/store/revampstore';//修改门店信息
import joinstore from '../../component/store/joinstore';//新增门店
import joincpj from '../../component/store/joincpj';//新增彩票机
import revampcpj from '../../component/store/revampcpj';//修改彩票机

const headerStyleB={
    backgroundColor: '#2073D3',
}
const headerTitleStyleB={
    color: '#fff'
}

module.exports = {
    cpjmanagement: {
        screen: cpjmanagement,
        navigationOptions: ({ navigation }) => ({
            title: '彩票机管理',
            headerStyle: headerStyleB,
            headerTitleStyle: headerTitleStyleB,
            headerBackImage:Backicon,
            headerBackTitle: '',
        }),
  },
    idmanagement: {
        screen: idmanagement,
        navigationOptions: ({ navigation }) => ({
            title: '账号管理',
            headerStyle: headerStyleB,
            headerTitleStyle: headerTitleStyleB,
            headerBackImage:Backicon,
            headerBackTitle: '',
        }),
    },
    joinstore: {
        screen: joinstore,
        navigationOptions: ({ navigation }) => ({
            title: '新增门店',
            headerStyle: headerStyleB,
            headerTitleStyle: headerTitleStyleB,
            headerBackImage:Backicon,
            headerBackTitle: '',
        }),
    },
    revampstore: {
        screen: revampstore,
        navigationOptions: ({ navigation }) => ({
            title: '修改门店信息',
            headerStyle: headerStyleB,
            headerTitleStyle: headerTitleStyleB,
            headerBackImage:Backicon,
            headerBackTitle: '',
        }),
    },
    joincpj: {
        screen: joincpj,
        navigationOptions: ({ navigation }) => ({
            title: '新增彩票机',
            headerStyle: headerStyleB,
            headerTitleStyle: headerTitleStyleB,
            headerBackImage:Backicon,
            headerBackTitle: '',
        }),
    },
    revampcpj: {
        screen: revampcpj,
        navigationOptions: ({ navigation }) => ({
            title: '修改彩票机',
            headerStyle: headerStyleB,
            headerTitleStyle: headerTitleStyleB,
            headerBackImage:Backicon,
            headerBackTitle: '',
        }),
    }

}