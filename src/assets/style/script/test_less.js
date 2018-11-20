
const { StyleSheet } = require('react-native');

module.exports = function({Theme}){
    const allStyle = StyleSheet.create({
        s0: {
            alignItems: "center",
            bottom: "-3%",
            flex: 1,
            marginTop: 20,
            transform: [{rotate:"30deg"},{scale:1.1}]
        },
        s1: {
            fontSize: 20,
            transform: [{rotate:"30deg"}]
        },
        s2: {
            color: "#000000",
            fontSize: 40
        },
        s3: {
            flex: 1,
            marginBottom: 70,
            marginTop: 60
        },
        s4: {
            backgroundColor: "transparent",
            fontSize: 38
        },
        s5: {
            marginRight: 10
        },
        s6: {
            width: 300
        },
        s7: {
            height: 200,
            width: 300
        }
    });

    return {
        default: {},
        CardExampleStyle: {
            "render-title": allStyle.s0,
            "title-text": allStyle.s1,
            temptext: allStyle.s2,
            container: allStyle.s3,
            title: allStyle.s4,
            button: allStyle.s5,
            card: allStyle.s6,
            "card-image": allStyle.s7,
            "card-image2": allStyle.s7
        }
    };
};
