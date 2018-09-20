<template>
    <div style="">
    	<canvas id="canvas"></canvas>
        <popup v-model="showFlag" height="180px" is-transparent>
            <div class="PopupItems">
                    <div class="popupitem">
                        <p class="GHTXbtn">更换头像</p>
                        <p class="CKTXbtn"  @click="showpreviewer">查看大头像</p>
                        <form id="imgform"  method="POST" enctype="multipart/form-data" style="opacity: 0">
                            <input  id="file"
                                    name="img"
                                    accept="image/*" 
                                    type="file" 
                                    value="更换头像" 
                                    style="width: 99%;height: 48px;opacity: 0;position: absolute;top: 2px;left: 2px;"
                                    @change="GHimage"
                                    >
                        </form>
                    </div>
            </div>
            <div class="QXbtn" @click="hide">
                    <p style="height: 50px;line-height: 50px;color: #3b3b3b">取消</p>
            </div>
        </popup>
        <previewer :list="list" ref="previewer" ></previewer>
    </div>
</template>

<script>

import { Popup, Group, Cell,Previewer  } from 'vux'
import { mapState } from 'vuex'
export default {
    components:{
        Popup,
        Group,
        Cell,
        Previewer 
    },
    data(){
    return {
        showFlag:false,
        img01src:'',
        list: [{
        src: '',
        w: 600,
        h: 400
      }],
    }
},
computed: {
  	...mapState({ userinfo: state => state.userinfo }),
  	
  },
    // mounted:function(){
    //     this.readAsDataURL()
    // },

    methods:{
        GHimage() {
//          alert('123')
            this.uploadimg()
        },
        show() {
            this.showFlag = true;
        },
        hide() {
             this.showFlag = false;
        },
        showpreviewer(){
        	this.list[0].src=this.userinfo.headimgurl;
            this.$refs.previewer.show()
        },
        uploadimg(){
            var uploadimg = document.getElementById("imgform")
//          var formdata = new FormData(uploadimg);
//          var _formdata=JSON.stringify(formdata);
//          this.$http.post('/restapi/cum/userinfo/uploadImg', _formdata)
//              .then((response) => {
//                  
//                  alert('123');
//              })
 var oData = new FormData(uploadimg); //新建一个formData对象  
          
  oData.append("userId", this.userinfo.userId); //在这可以向表单添加额外的数据，这里没有添加  
      
          var oReq = new XMLHttpRequest();   
                //XMLHttpRequest 对象用于在后台与服务器交换数据。该对象的好处：  
                //在不重新加载页面的情况下更新网页  
                //在页面已加载后从服务器请求数据  
                //在页面已加载后从服务器接收数据  
                //在后台向服务器发送数据  
          oReq.open("POST", "/restapi/cum/userinfo/uploadImg", true);
          var _this=this;
          oReq.onload = function(oEvent) {  
            if (oReq.status == 200) {  
            	console.log(JSON.parse(oReq.response).imgUrl);
                _this.$emit('imgurl',JSON.parse(oReq.response).imgUrl);
            } else {  
              alert("更改头像失败！");  
            }  
          };  
          
          oReq.send(oData);       



        }
    }
}

</script>

<style>
.PopupItems {
    width: 95%;
    height:100px;
    margin:10px auto;
    border-radius:5px;
    text-align: center;
    color: #2baaed;
    font-size: 20px;
}
.popupitem {
    width: 100%;
    background-color:#fff;
    border-radius:5px;
    position: relative
}
.GHTXbtn {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #d4cdcd
}
.CKTXbtn {
    height: 50px;
    line-height: 50px;
}
.QXbtn {
   width: 95%;
   background-color:#fff;
   height:50px;
   margin:0 auto;
   border-radius:5px;
   text-align: center;
   font-size: 20px; 
}
</style>
