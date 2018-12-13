
/**
 * 相机组件使用方法
 * <CameraButton onFileUpload={function(file, fileName)} />
 */
import React from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Platform,
    Image,
    View,
    Text
} from 'react-native'
import ImagePicker from 'react-native-image-picker';
//var ImagePicker = require('react-native-image-picker');

//参数具体文档：https://github.com/react-community/react-native-image-picker/blob/HEAD/docs/Reference.md
const options = {
    title: '选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '图片库',
    cameraType: 'back',//前后摄像头：back--后，front--前
    mediaType: 'photo',//'photo', 'video', or 'mixed' on iOS, 'photo' or 'video' on Android
    videoQuality: 'high',
    durationLimit: 10,//最长录制时间/s
    maxWidth: 600,
    maxHeight: 600,
    aspectX: 2,
    aspectY: 1,
    quality: 0.5,
    angle: 0,
    allowsEditing: false,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class CameraButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            avatarSource:''//图片地址
        }
    }
    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={this.showImagePicker.bind(this)}
                    style={[this.props.style,styles.cameraBtn]}>
                    <View>
                        <Image style={this.state.avatarSource ? styles.image : styles.imagea} source={this.state.avatarSource ? this.state.avatarSource : require('../../assets/image/icon2/paizhao.png')} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    showImagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {

                let source;

                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true}
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true}
                }




                let file;
                if(Platform.OS === 'android'){
                    file = response.uri
                }else {
                    file = response.uri.replace('file://', '')
                }
                this.setState({
                    loading:true,
                    photoslen:this.state.photoslen + 1,
                    avatarSource:source
                });
                this.props.onFileUpload(file,response.fileName||'未命名文件.jpg')
            }
        });
    }
}
const styles = StyleSheet.create({
    cameraBtn: {
        padding:5
    },
    count:{
        color:'#fff',
        fontSize:12
    },
    fullBtn:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    countBox:{
        position:'absolute',
        right:-5,
        top:-5,
        alignItems:'center',
        backgroundColor:'#34A853',
        width:16,
        height:16,
        borderRadius:8,
        justifyContent:'center'
    },
    image:{
        paddingTop:10,
        height:198,
        width:300,
        alignSelf:'center',
    },
    imagea:{
        height:130,
        width:130,
    },

});

export default CameraButton;

/*
/!**
 * 相机组件使用方法
 * <CameraButton onFileUpload={function(file, fileName)} />
 *!/
import React from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Platform,
    Image,
    View,
    Text,
    TouchableHighlight
} from 'react-native'
import ImagePicker from 'react-native-image-picker';
//import ImagePicker from 'react-native-image-crop-picker';
import { Modal } from 'antd-mobile-rn'
//var ImagePicker = require('react-native-image-picker');

//参数具体文档：https://github.com/ivpusic/react-native-image-crop-picker
const options = {
    width: 300,
    height: 400,
    cropping: false,
    cropperChooseText:'确定',
    cropperCancelText:'取消',
    compressImageQuality:0.3,
};
var width = require("Dimensions").get('window').width;
var height = require("Dimensions").get('window').height;

class CameraButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            avatarSource:'',//图片地址
            modalVisible: false
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }


    render() {
        const {type} = this.props;
        let conText;
        if(this.state.photoslen > 0){

        }
        return (
            <View>
                <Modal animationType={"none"} transparent={true} //false弹出整页/true弹出浮出窗口
                       visible={this.state.modalVisible} onRequestClose={() => {
                    alert("Modal has been closed.")
                }}>
                    <View style={styles.Viewone}>

                        <View style={styles.ttextView}>
                            <Text style={styles.text}>请选择</Text>
                        </View>

                        <TouchableHighlight onPress={() => {
                            this.setModalVisible(!this.state.modalVisible)
                            setTimeout(() =>{this._openPicker()},50)
                        }} style={styles.textView}>
                            <Text style={styles.text}>打开相册</Text>

                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => {
                            this.setModalVisible(!this.state.modalVisible)
                            setTimeout(() =>{this._openCamera()},50)
                        }} style={styles.textView}>
                            <Text style={styles.text}>打开相机</Text>

                        </TouchableHighlight>


                        <TouchableHighlight onPress={() => {
                            this.setModalVisible(!this.state.modalVisible)
                        }} style={styles.textView}>
                            <Text style={styles.text}>取消</Text>

                        </TouchableHighlight>

                    </View>
                </Modal>
                <View>
                    {
                        this.state.avatarSource ?
                            <TouchableOpacity
                                onPress={this.showImagePicker.bind(this)}
                                style={[this.props.style,styles.cameraBtn]}>
                                <View>
                                    <Image style={styles.image} source={this.state.avatarSource} />
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={this.showImagePicker.bind(this)}
                                style={[this.props.style,styles.cameraBtn]}>
                                <View>
                                    {/!*<Icon name="md-camera" color="#aaa" size={34}/>*!/}
                                    <Image
                                        style={{height:130,width:130}}
                                        source={require('../../assets/image/icon2/paizhao.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }

    _openCamera = () =>{
        ImagePicker.openCamera(options).then(response => {
            console.log(response);
            try {
                let source = {uri: response.path, isStatic: true};

                /!*if (Platform.OS === 'android') {
                    source = {uri: response.sourceURL, isStatic: true}
                } else {
                    source = {uri: response.sourceURL.replace('file://', ''), isStatic: true}
                }*!/




                let file = response.path;
                /!*if(Platform.OS === 'android'){
                    file = response.sourceURL
                }else {
                    file = response.sourceURL.replace('file://', '')
                }*!/
                this.setState({
                    loading:true,
                    photoslen:this.state.photoslen + 1,
                    avatarSource:source
                });
                this.props.onFileUpload(file,response.filename||'未命名文件.jpg')
            }catch (e) {
                console.log(e)
            }
        });
    }

    _openPicker = () =>{
        ImagePicker.openPicker(options).then(response => {
            console.log(response);
            try {
                let source = {uri: response.path, isStatic: true};

                /!*if (Platform.OS === 'android') {
                    source = {uri: response.sourceURL, isStatic: true}
                } else {
                    source = {uri: response.sourceURL.replace('file://', ''), isStatic: true}
                }*!/




                let file = response.path;
                /!*if(Platform.OS === 'android'){
                    file = response.sourceURL
                }else {
                    file = response.sourceURL.replace('file://', '')
                }*!/
                this.setState({
                    loading:true,
                    photoslen:this.state.photoslen + 1,
                    avatarSource:source
                });
                this.props.onFileUpload(file,response.filename||'未命名文件.jpg')
            }catch (e) {
                console.log(e)
            }
        }).catch(e =>{
            console.log(e)
        });
    }

    showImagePicker() {

        this.setModalVisible(true)

        /!*Modal.operation([
            { text: '相册', onPress: () => this._openPicker() },
            { text: '相机', onPress: () => this._openCamera() },
            { text: '取消', onPress: () => console.log('取消') },
        ]);*!/

        /!*ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {

                let source;

                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true}
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true}
                }




                let file;
                if(Platform.OS === 'android'){
                    file = response.uri
                }else {
                    file = response.uri.replace('file://', '')
                }
                this.setState({
                    loading:true,
                    photoslen:this.state.photoslen + 1,
                    avatarSource:source
                });
                this.props.onFileUpload(file,response.fileName||'未命名文件.jpg')
            }
        });*!/
    }
}
const styles = StyleSheet.create({
    cameraBtn: {
        padding:5
    },
    count:{
        color:'#fff',
        fontSize:12
    },
    fullBtn:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    countBox:{
        position:'absolute',
        right:-5,
        top:-5,
        alignItems:'center',
        backgroundColor:'#34A853',
        width:16,
        height:16,
        borderRadius:8,
        justifyContent:'center'
    },
    image:{
        paddingTop:10,
        height:198,
        width:300,
        alignSelf:'center',
    },

        container: {
            flex: 1,
            backgroundColor: '#fff', //#F0F0F0
        },
        tView: {
            width: width,
            height: 300,
            backgroundColor: "#fff"
        },
        Viewone: {
            width: width*0.7,
            height:300,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center"
        },
        ttextView: {
            marginBottom: 30
        },
        text: {
            fontSize: 20
        },
        textView: {
            width: width*0.7,
            height: 60,
            borderTopWidth: 1,
            borderColor: "#999",
            borderStyle: "solid",
            alignItems: "center",
            justifyContent: "center"
        },
//相册整块View
        photo: {
            flexDirection: "row",
            flexWrap: "wrap",
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "space-between", //space-around
        },
//相册单个View
        photoView: {
            marginBottom: 1,
            backgroundColor: "#F0F0F0"
        },
        imageView: {
            width: width*0.994 / 3,
        height: 120,
        borderColor: "#999",
        borderStyle: "dashed", //solid-dashed-dotted
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
//相册图片
    photoImage: {
    width: width*0.994 / 3,
        height: 120,
        alignItems: "center",
        justifyContent: "center"
},
ImageView: {
    width: 60,
        height: 60,
        borderRadius: 5,
        alignItems: "center",
},
//上传照片图片
Image: {
    width: 50,
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
},
//上传照片文字
photoTxte: {
    color: "#999",
        fontSize: 12
}
});

export default CameraButton;
*/
