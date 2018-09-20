<template>
    <div style="height: 100%;width: 100%;">
        <div class="user_header">
            <div class="user_info">
                <div class="user_info_left"> 
                    <img class="user_avatar" :src="headimgurl" alt="" @click="gotochangeimg">
                    <span class="qd_button01"  @click="showQD" v-if="user.signStat==0"><img src="../../../static/signup.png" style="vertical-align: middle;margin-top: -5%;margin-right: 8%;"><span >每日签到</span></span>
                    <span class="qd_button" v-if="user.signStat==1"><img src="../../../static/signup.png" style="vertical-align: middle;margin-top: -5%;margin-right: 8%;">今日已签到</span>
                </div>
                <div class="user_info_right">
                    <p class="userId" v-if='user.userName'>{{user.userName}}<img src="../../../static/level.svg" style="vertical-align: middle;"></p>
                    <p class="tj_code">推荐码：{{userinfo.referralCode}}</p>
                </div>
            </div>
            <div class="user_card">
                    <div slot="content" class="card-demo-flex card-demo-content01">
                        <div class="card_item" @click="gotowallet">
                            <span>{{user.commission}}</span>
                            <p>钱包</p>
                        </div>
                        <div class="card_item" @click="gotohongbao">
                            <span>{{user.redPackets}}</span>
                            <p>红包</p>
                        </div>
                        <div class="card_item" @click="gotointegral">
                            <span>{{user.point}}</span>
                            <p>积分</p>
                        </div>
                    </div>
            </div>
        </div>
        
        <div class="userdata">
            
				<div class="UserDataitem" @click="gotoorder">
					<div class="UDIlabel"><img src="../../../static/order.png" alt="">我的订单</div>
					
					<div style="margin-right: -5%;"><cell title='查看所有订单' is-link></cell></div>
				</div>
				<div class="UserDataitem" @click="showCN">
					<div class="UDIlabel"><img src="../../../static/friend.png" alt="">姓名</div>
                    
					<div style="margin-right: -5%;"><cell :title='user.userName' is-link></cell></div>
				</div>
				<div class="UserDataitem" @click="showCX">
					<div  class="UDIlabel"><img src="../../../static/sex.png" alt="">性别</div>
					<div style="margin-right: -5%;">
                        
					<div v-if="user.sex==='2'" style="margin-right: -5%;"><cell title='女' is-link></cell></div>
					<div v-if="user.sex==='1'" style="margin-right: -5%;"><cell title='男' is-link></cell></div>
					<div v-if="user.sex==='0'" style="margin-right: -5%;"><cell title='保密' is-link></cell></div>
                        
                       
                    </div>
                    <!--<div v-if="user.sex==='1'"><span>男</span> <span class="color02">&nbsp; ></span></div>
                    <div v-if="user.sex==='0'"><span>保密</span> <span class="color02">&nbsp; ></span></div>-->
                   
				</div>
                <div class="UserDataitem" @click="showBP">
					<div  class="UDIlabel"><img src="../../../static/phone1.png" alt="">绑定手机</div>
					
					<div  style="margin-right: -5%;"><cell :title='user.phone' is-link></cell></div>
				</div>
				
				
				
				<div class="UserDataitem_changepass" @click="gotochangepass">
					<div  class="UDIlabel"><img src="../../../static/changepass.png" alt="" style="padding-top: 2.5%;">钱包支付密码设置</div>
					<div  style="margin-right: -5%;"><cell  is-link></cell></div>
				</div>
            
		</div>
        <v-showqd ref="showqd" ></v-showqd>
        <v-changename ref="changename" v-on:child-say="changename"></v-changename>
        <v-changesex ref="changesex" v-on:child-say="changesex"></v-changesex>
        <v-bphone ref="bindphone" v-on:child-say="changephone"></v-bphone>
        <v-changeimg ref="changeimg" v-on:imgurl="changeimage"></v-changeimg>
        <toast v-model="notbindphone" type='text' width='auto' :time="1000" is-show-mask text="您还没绑定电话号码" position="middle" ></toast>
    </div>
</template>

<script>
import VChangename from './ChangeName'
import VChangesex from './ChangeSex'
import VBphone from './BindingPhone'
import VChangeimg from './ChangeImg'
import VShowqd from './QianDaologo'
import { Card, Group, Cell,XDialog,Toast  } from 'vux'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import { ORDERMSG_SIGN } from '../../store/ordermsg'
import { USERINFO_SIGN } from '../../store/userinfo'
export default {
  components: {
      Card,
      Toast,
      Group,
      Cell,
      XDialog,
      VChangename,
      VChangesex,
      VBphone,
      VChangeimg,
      VShowqd
    },
  data() {
      return {
          user:[],
          bindphone:false,
          notbindphone:false,//没绑定就弹窗提示。
          headimgurl:''//用户头像
          
          
      }
  },
  mounted:function(){
    
      this.getuserdata();
      
  },
 created (){
 	this.$vux.loading.show({
        text: 'Loading'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
      }, 1000)
 },
  computed: {
  	...mapState({ userinfo: state => state.userinfo }),
  	...mapState({ ordermsg: state => state.ordermsg }),
  },
  methods: {
  	...mapActions([ORDERMSG_SIGN]),
  	...mapActions([USERINFO_SIGN]),
  	changeimage(imgurl){
  		this.headimgurl=imgurl;
  		this.userinfo.headimgurl=imgurl;
  		window.localStorage.headimgurl=imgurl;
  		this.USERINFO_SIGN(this.userinfo);
  		this.$refs.changeimg.hide();
  	},
  	changename(name){
  		this.user.userName=name;
  		this.userinfo.lianxiPerson=name;
  		window.localStorage.lianxiPerson=name;
  		this.USERINFO_SIGN(this.userinfo);
  		
  	},
  	changesex(sex){
  		this.user.sex=sex;
  		this.userinfo.sex=sex;
  		
  		this.USERINFO_SIGN(this.userinfo);
  		
  		
  		
  	},
  	changephone(phone){
  		this.user.phone=phone;
  		this.userinfo.lianxiNum=phone;
  		window.localStorage.lianxiNum
  		this.USERINFO_SIGN(this.userinfo);
  	},
  	
      gotowallet(){
          this.$router.push('/wallet');
      },
      gotointegral(){
          this.$router.push('/integral');
      },
      gotohongbao(){
          this.$router.push('/hongbao');
      },
      gotoorder(){
          this.$router.push('/orderFL');
      },
      gotochangeimg(){
          this.$refs.changeimg.show();
      },
      recieveBPflag(f){
          this.bindphone = f;
      },
      showCN(){
          this.$refs.changename.show()
      },
      showCX(){
          this.$refs.changesex.show()
      },
      showBP(){
      	if(!this.user.phone){
      		this.$refs.bindphone.show();
      	}
      	else
      	{
      		this.$refs.bindphone.recommomedshow=false;
      		this.$refs.bindphone.show();
      	}
          
      },
      showQD(){
          this.qiandaoclick(this.user,this.$refs.showqd);
      },

      getuserdata(){
      	var user_id=this.userinfo.userId;
      	var _this=this;
            this.$http.get('/restapi/cum/userinfo/login?user_id='+user_id)
                .then((response) => {
                    _this.user = response.data;
                    _this.headimgurl=response.data.avatarImg;
                    _this.userinfo.headimgurl=response.data.avatarImg;
                    
                    _this.userinfo.point=response.data.point;
                    _this.userinfo.redPackets=response.data.redPackets;
                    _this.userinfo.commission=response.data.commission;
                    _this.userinfo.lianxiNum=response.data.phone;
                    _this.userinfo.signStat=response.data.signStat;
                    window.localStorage.headimgurl=response.data.avatarImg;
                    window.localStorage.redPackets=response.data.redPackets;
                    window.localStorage.signStat=response.data.signStat;
                    window.localStorage.payPassword=response.data.payPassword;
//                  alert(window.localStorage.redPackets);
                    _this.USERINFO_SIGN(_this.userinfo);
                     _this.$refs.changename.userName=_this.user.userName;
                })
                .catch(function(response) {
                })
      },

      gotochangepass(){
      
      	if(this.user.phone!=""){
      		this.$router.push('changepassword');
      	}
      	if(this.user.phone==""){
      		
      		this.notbindphone=true;
      		
      	}
      	
      },
     
  }
}
</script>

<style>

.user_header {
    background-image:url('../../../static/background.jpg');
    background-size:100% 100%; 
}
.user_info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 10px;
}
.user_info_left {
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 30px;
}
.user_avatar {
    height: 80px;
    width: 80px;
    border-radius: 50px;
    margin-bottom: 15px;
}
.qd_button01 {
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
   /* font-weight: 500;*/
    padding: 2px 10px;
    border-radius: 15px;
    font-size: 0.7em;
    width:60%;
    
}
.qd_button {
    background-color: rgb(179, 179, 179);
    color: white;
   
    padding: 2px 10px;
    border-radius: 15px;
    font-size: 0.7em;
    width:70%;
}
.user_info_right {
	padding-top: 15.5%;
}
.userId {
    font-family: '微软雅黑';
    font-size: 22px;
    font-weight: bolder;
    color: white;
    letter-spacing:3px;
}
.tj_code {
    font-size: 15px;
    color: white;
    padding:15px 0;
}
.user_card {
    /*margin: 10px 0;*/
}
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-demo-content01 :first-child {
    border: none;
}
.card-padding {
  padding: 15px;
}
.card_item {
    flex: 1;
    text-align: center;
    font-size: 15px;
    color: white;
    border-left: 0.5px solid white;
}
/*.user_list {
    height: auto;
    color: #666666;
    margin-bottom: 70px;
    background-color: white
}
.user_list>div {
    margin: 0 5px;
}
.user_list_height {
    height: 35px;
}*/
.userdata {
	position: absolute;
	/*overflow-y: auto;*/
	height: auto;
	width: 100%;
    
    background-color: white;
    color:rgb(179, 179, 179)
}
.UserDataitem {
    /*width: 92%;*/
    height: 50px;
    align-items: center;
    margin:0px 20px ;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.1px solid #d4cdcd;

}
.UserDataitem_changepass {
    /*width: 92%;*/
    height: 50px;
    align-items: center;
    margin:0px 20px ;
    display: flex;
    justify-content: space-between;
   

}
.UDIlabel {
    font-size: 15px;
    color:#3b3b3b;
    display: flex;
}
.UDIlabel>img{
   padding-top: 5%;
    padding-right: 5px;
    height: 18px;
    vertical-align: middle;
}
.UserDataitem {
    font-size: 12px;
}
</style>

