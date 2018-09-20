<template>
    <x-dialog v-model="bindphoneflag" :hideOnBlur="true">   
        <div class="Bphone">
            <div class="BP_card" ref="BPfrom">
                <div class="BP_title">绑定手机号</div>
                <div style="text-align: center;width: 90%">
                    <input type="number" placeholder="请输入您的手机号"  class="BP_input01" autofocus="autofocus" v-model="bindphonerequest.phone" v-on:blur="changeCount">
                    <div v-if="showflag=='2'" class="phoneerro">请输入正确格式手机号</div>
                    <div v-if="showflag=='1'" class="phoneerro">手机号已被占用</div>
                    <div v-if="showflag=='3'" class="phoneerro">手机号不能为空</div>
                </div>
                <div class="BP_yz">
                    <input type="number" placeholder="手机验证码" class="BP_input02" v-model="bindphonerequest.validateCode">
                    <div class="BP_yz_btn" @click="getcode" id="getcode_id1">获取验证码</div>
                    <div class="BP_yz_btn1"  id="getcode_id2">获取验证码</div>
                    
                </div>
                <div v-if="errorCode=='1'" class="phoneerro">验证码错误</div>
                <div v-if="errorCode=='0'" class="phoneerro">验证码过期，请重新获取</div>
                <div class="BP_yz" v-show="recommomedshow">
                    <input type="number" placeholder="输入推荐码（非必填）" class="BP_input02" v-model="bindphonerequest.referralCode">
                    <div class="BP_yz_btn">推荐码</div>
                </div>
                <div class="BP_btn">
                    <span class="BP_btnitem" @click="postbindphone">确定</span>
                </div>
            </div>
        </div>
    </x-dialog>
</template>

<script>
import {XDialog  } from 'vux'
import { mapState } from 'vuex'
export default {
    components:{
        XDialog
    },
    computed:{
    		...mapState({ userinfo: state => state.userinfo }),
    },
    data(){
        return {
           bindphoneflag:false,
           showflag:'0',
           errorCode:'',
           validateCodeMes:0,
           recommomedshow:true,
           bindphonerequest:{
               phone:'',
               validateCode:'',
               referralCode:'',
               userId:''
           }
        }
    },
    created:function(){
        this.resetData = JSON.parse(JSON.stringify(this.bindphonerequest))
    },
    methods:{
        show(){
            this.bindphoneflag = true
        },
        hide(){
            this.bindphoneflag = false;
        },
        changeCount(){
            var _phone=this.bindphonerequest.phone;
            if(!(/^1[34578]\d{9}$/.test(_phone))){ 
                this.showflag = '2';
            }  else {
                this.showflag = '0';
            }
        },

        resetform(){   //清空表单
            this.bindphonerequest = Object.assign(this.bindphonerequest, this.resetData)
        },
        
        getcode(){
        	var _this=this;
            var _phone =this.bindphonerequest.phone;
            var _showflag=this.showflag;
            var getcode_id1=document.getElementById('getcode_id1');
            var getcode_id2=document.getElementById('getcode_id2');
            if(this.bindphonerequest.phone=='')
            {
            	this.showflag=3;
                
            }
            if (_showflag==='0'&&this.validateCodeMes==0&&_phone!=''){
            alert('获取验证码');
             this.$http.post('/restapi/cum/userinfo/getValidateCode',{phone:_phone})
                .then((response) => {
                    console.log(response.data);
                   
                    getcode_id1.style.display='none';
                    getcode_id2.style.display='block';
                })
                .catch(function(response) {
                    // console.log(response)
                })
            }
            
           
            	
            
      },
        postbindphone(){
        	var getcode_id1=document.getElementById('getcode_id1');
            var getcode_id2=document.getElementById('getcode_id2');
            var _showflag=this.showflag;
           var _this=this;
           this.bindphonerequest.userId=this.userinfo.userId;
//          if(_showflag==='0'){
                var _bindphonerequest = this.bindphonerequest;
                var _bindphonerequestJson=JSON.stringify(_bindphonerequest)
                console.log(_bindphonerequest)
                this.$http.post('/restapi/cum/userinfo/validate',_bindphonerequestJson)
                    .then((response) => {
//                      if(response.data.errorCode===null){
//                      console.log('123')
//                      this.hide()
//                      }else {
//                          this.validateCodeMes=response.data.message
//                      }
					_this.errorCode=response.data.errorCode;
					
 					if(response.data.message=='success'){
 						alert('绑定成功');
 						 getcode_id2.style.display='none';
                    getcode_id1.style.display='block';
                    _this.bindphonerequest.phone='';
                    _this.bindphonerequest.validateCode='';
 						this.$emit('child-say',response.data.phone);
					 _this.hide();
 					}
 					if(errorCode=='0'||errorCode=='1'){
 						 getcode_id2.style.display='none';
                    getcode_id1.style.display='block';
 					}
					
                    })
//          }
        }
    }
}
</script>

<style>
.Bphone {
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.BP_card {
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0.5em;
}
.BP_card>div {
    margin-bottom: 10px;
}
.BP_title {
    width: 100%;
    color: white;
    background-color:#2baaed;
    height: 55px;
    font-size: 20px;
    line-height: 55px;
    text-align: center;
}
.BP_input01{
    width: 98%;
    height: 50px;
    border: 1px solid #ccc;
    font-size: 15px;
}
.BP_yz {
    display: flex;
    width: 90%;
}
.BP_input02 {
    width: 60%;
    height: 50px;
    border: 1px solid #ccc;
    font-size: 15px;
}
.BP_yz_btn1{
	width: 40%;
    text-align: center;
    background-color: gainsboro;
    color: white;
    line-height: 50px;
    display: none;
}
.BP_yz_btn {
    width: 40%;
    text-align: center;
    background-color:#2baaed;
    color: white;
    line-height: 50px;
}
.BP_btn {
    width: 90%;
    text-align: center;
    height: 60px;
    line-height: 60px;
}
.BP_btnitem {
    padding: 8px 30px;
    background-color:#2baaed;
    color:white;
    border-radius: 6px;
    margin-top: 10px;
}
.phoneerro {
    width: 90%;
    font-size: 10px;
    color: red;
    text-align: left
}
</style>
