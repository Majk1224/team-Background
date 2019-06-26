import React,{Component} from 'react'
import axios from 'axios'
import {connect} from "dva"

class UploadPictures extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <canvas ref='canvas'/>
                <input type='file'/>
            </div>
        );
    }
    upLoad(){
        let that=this;
        // console.log(this.props)
        let src=this.props.history.location.query.src;
       let canvas=this.refs.canvas;
       // 1.设置画布的宽高
       canvas.width = 512;
       canvas.height = 288;
       let ctx = canvas.getContext('2d');
        // 2.绘制背景图
        var img = new Image();
        this.xhr = axios({
            method: 'post',
            url: 'http://123.206.55.50:11000/tobase64',
            data: {url: src}
        }).then(body=>{
            // console.log('body...', body);
            img.src = body.data.data.base64;
        }).catch(e=>{
            console.log('e..', e);
        })
        img.onload = function(){
            ctx.drawImage(img, 0, 0, 48, 48, 0, 0, 512, 288);
        }
            // 3.监听图片上传
            var ele = document.querySelector('input');
            ele.onchange = function(e){
              
                let files = e.target.files;
                // 创建一个fileReader       
                for (let i=0,len=files.length; i<len;i++){
                    var reader = new FileReader();
                    reader.onload = function(){
                        // console.log('result...', this.result);
                        // 4.绘制上传的图片
                        var avatar = new Image();
                        avatar.src = this.result;
                        avatar.onload = function(){
                            ctx.drawImage(avatar, 0, 0, 300, 300, 185, 88, 160,160);
                            // 5.合成一张图片
                            var result = canvas.toDataURL('jpg', 0.8);
                            // console.log('result...', result);
                            that.props.setAvatar({
                                result
                            },function(){
                                that.props.history.push('/classList/addQuestion')
                            })
                             
                        }
                    }
                    reader.readAsDataURL(files[i]);
                }
            }
    }
    componentDidMount(){
         this.upLoad()
    }
    componentWillUnmount(){
        // this.xhr.abort()
    }
}
const mapStateToProps=state=>{
    return {
      ...state
    }
  }
  const mapDispatchToProps=dispatch=>{
    return {
      setAvatar(payload,ck){
        dispatch({
          type:'user/setAvatar',
          payload
        })
        ck()
      }
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(UploadPictures)