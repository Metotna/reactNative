
const { StyleSheet } = require('react-native');

module.exports = function({Theme}){
    const allStyle = StyleSheet.create({
        s0: {
            backgroundColor: "#ddd"
        },
        s1: {
            backgroundColor: "#fff",
            height: 44,
            marginBottom: 6
        },
        s2: {
            height: 25,
            width: 25
        },
        s3: {
            height: 25
        },
        s4: {
            backgroundColor: "#FFF7DE",
            height: 30
        },
        s5: {
            lineHeight: 30,
            paddingLeft: 10
        },
        s6: {
            backgroundColor: "#fff",
            height: 130
        },
        s7: {
            paddingBottom: 15,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 15
        },
        s8: {
            flexDirection: "row",
            justifyContent: "space-between"
        },
        s9: {
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0
        },
        s10: {
            paddingBottom: 4,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 4
        },
        s11: {
            borderBottomWidth: 0,
            borderColor: "#eee",
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 1,
            flexDirection: "row-reverse",
            paddingBottom: 5,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 5
        },
        s12: {
            borderColor: "#DDDDDD",
            borderRadius: 12,
            borderStyle: "solid",
            borderWidth: 1,
            height: 24,
            marginLeft: 10,
            width: 65
        },
        s13: {
            marginBottom: 6
        },
        s14: {
            backgroundColor: "#fff",
            marginBottom: 6
        },
        s15: {
            marginTop: 6
        },
        s16: {
            color: "#114FCD",
            fontSize: 16,
            height: 44,
            lineHeight: 44
        },
        s17: {
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
            height: 44,
            paddingBottom: 0,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 0
        },
        s18: {
            lineHeight: 44,
            minWidth: 72
        },
        s19: {
            backgroundColor: "#fff",
            borderBottomWidth: 0,
            borderColor: "#eee",
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 1,
            flexDirection: "row-reverse",
            height: 47,
            paddingBottom: 11,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 11
        },
        s20: {
            flex: 1
        },
        s21: {
            height: 44,
            width: 250
        },
        s22: {
            lineHeight: 44,
            textAlign: "left",
            width: 75
        },
        s23: {
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
            height: 60,
            paddingBottom: 6,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 6
        },
        s24: {
            backgroundColor: "#ddd",
            color: "#666",
            height: 34,
            lineHeight: 34,
            paddingLeft: 12
        },
        s25: {
            backgroundColor: "#114FCD",
            borderRadius: 0,
            borderWidth: 0,
            color: "#fff",
            height: 48,
            lineHeight: 48
        },
        s26: {
            borderWidth: 0,
            height: 48,
            lineHeight: 44,
            width: 250
        }
    });

    return {
        default: {},
        detail: {
            delbox: allStyle.s0,
            searchbox: allStyle.s1,
            pic: allStyle.s2,
            search: allStyle.s3,
            tit: allStyle.s4,
            lh: allStyle.s5,
            mdlist: allStyle.s6,
            ls_t: allStyle.s7,
            a_1: allStyle.s8,
            ls_con: allStyle.s9,
            c_box: allStyle.s10,
            ls_bot: allStyle.s11,
            but: allStyle.s12
        },
        cpjmanagement: {
            cpjmanagementbox: allStyle.s0,
            ls_box: allStyle.s13,
            hardebox: allStyle.s14,
            icon: allStyle.s15,
            tjbut: allStyle.s16,
            ls_conbox: allStyle.s17,
            text: allStyle.s18,
            bt_bot: allStyle.s19,
            but: allStyle.s12
        },
        revampstore: {
            revampstore: allStyle.s20,
            ls_box: allStyle.s13,
            inputbox: allStyle.s21,
            ls_conbox: allStyle.s17,
            text: allStyle.s22,
            ls_conboxrw: allStyle.s23,
            title2: allStyle.s24,
            but: allStyle.s25,
            textareaItem: allStyle.s26,
            martop: allStyle.s15
        },
        joincpj: {
            ls_conbox: allStyle.s17,
            text: allStyle.s22,
            inputbox: allStyle.s21
        }
    };
};
