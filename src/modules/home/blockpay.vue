<template>
	<div>
  <div class="PAYpage" v-show='PAYpageshow'>
   
    
    <div style="background-color: #ebebeb;height:2.2em;width:100%;line-height: 2.2em;color:black;padding-left: 4%;">预订信息</div>
    
    
    <div style="width: 100%;padding: 2%;font-size: 1em;">
    	<div style="padding-left:2%;font-size: 1.1em;" class='blockpay_fontstyle'>{{OrderData.stadiumId}}</div>
    	<div @click='gototime'class='blockdpaytimeselect'>
    		
        <cell title='开球时间：' is-link><span style="color:#2baaed ;">{{OrderData.gameDate}}</span></cell>
        
    	</div>
    	
    	<div class="num" >
    		<flexbox :gutter="0" wrap="wrap">
    		
    			<flexbox-item style="padding-left:2%;">
    				<div >打球人数</div>
    				<div style="color:#2baaed;"><span style="font-size: 0.8em;">&#65509;</span>{{OrderData.productPrice}}*<span style="font-size: 0.7em;">{{OrderData.gameNum}}</span></div>
    			</flexbox-item>
    			
    			
    			<flexbox-item>
    				<div style="margin-right: -80%;margin-left: 10%;text-align: center;display: block;">
    				
    				<x-number :value='1' v-model="OrderData.gameNum" @on-change="change" :min='1' :max='10' :step='1' style="height: 40px;"></x-number>

    				</div>
    			</flexbox-item>
    		 <flexbox-item><div style="float: right;padding-right: 15%;color:#2baaed;">/份</div></flexbox-item>	
    		 
    		 </flexbox>
    	</div>
  
  
  <div style="width: 100%;margin-left: -1.5%;">
    
    	 
    	 	<div >
    	 	<div @click="changein(1)"><cell title="联系人：" is-link ><span style='color:#2baaed ;'>{{OrderData.lianxiPerson}}</span></cell></div>
      
      <div @click="changein(2)"><cell title="手机号:" is-link><span style='color:#2baaed ;'>{{OrderData.lianxiNum}}</span></cell></div>
      <div @click="changein(3)"><cell title="备注:" is-link> {{OrderData.note}}</cell></div>
      </div>
    	
      </div>
    </div>
    
    
<div style="background-color: #ebebeb;width:100%;height: 2.2em;line-height: 2.2em;color:black;padding-left: 4%;">支付方式</div>    
    <div>
        <div class="HBDK" >
            <div class="block_HBDK_lable">
                <img src="../../../static/notgetredpack.png" style="width: 11%;">
                <span>红包抵扣</span>
            </div>
            
                <x-switch title="" v-model="HBDK" style="height: 40px;" @on-change='changeswitch'></x-switch>
            
        </div>
        <div class="HBDKvalue HBDK" v-show="HBDK">
        	<flexbox :gutter="0" wrap="wrap">
            <flexbox-item><div style="font-size: 0.7em;"> 红包余额<span style="color: #2baaed;"><span style="font-size: 0.8em;">&#65509;</span>{{redPackets}}</span>，可抵用<span style="color: #2baaed;"><span style="font-size: 0.8em;">&#65509;</span>{{hongbaovalue}}</span></div></flexbox-item>
           
            <flexbox-item> <span style="text-align: center;display: block;font-size: 0em;margin-top: 3%;" class="hongbaodeduction">
    				
    				<x-number :value="hongbaovalue"  @on-change="change1" :min='0' :max="redPackets" fillable :step='1' style="height: 40px;"></x-number>
    				</span>
    				</flexbox-item>
    				</flexbox>
        </div>
        
        <group class="block_ZFFSgroup">
            <radio title="title" :options="options" v-model="ZFFS"></radio>
        </group> 
    </div>
    <div class="block_payDetail">
        <div>
            <span>产品金额</span>
            <span class="colortext"><span style="font-size: 0.8em;">&#65509;</span>{{OrderData.gameNum*OrderData.productPrice}}</span>
        </div>
        <div>
            <span>红包抵扣</span>
            <span class="colortext"><span style="font-size: 0.8em;">&#65509;</span>{{hongbaovalue}}</span>
        </div>
    </div>
    <div class="SurePay">
        <div class="SP_label">
            <span>总额：</span>
            <span class="colortext" v-if='HBDK==true&&hongbaovalue>0'><span style="font-size: 0.8em;">&#65509;</span>{{OrderData.gameNum*OrderData.productPrice-hongbaovalue}}</span>
             <span class="colortext" v-if='HBDK==false||hongbaovalue==0'><span style="font-size: 0.8em;">&#65509;</span>{{OrderData.gameNum*OrderData.productPrice}}</span>
        </div>
        <div class="SP_btn" @click="pay">确定付款</div>
   </div>
  

 <div v-transfer-dom>
      <x-dialog v-model="showname" class="dialog-demo">
      	<div id="nameinput">
		   		<div  style="background-color: #2baaed;width: 100%;line-height: 2em;height:2em;text-align: center;color:white;font-size: 1.3em;">
		   	 修改姓名
		   	 </div>
		   	<div style="text-align: center;border-radius: 0.2em;color:#ebebeb;font-size: 1.1em;margin-top: 5%;">
		   		<input style="width: 90%; height: 3em;outline: none;font-size: 1em;border: 1px gainsboro solid;border-radius: 0.2em;text-indent:4%;" placeholder="以英文或汉字，限4-16个长度" v-model="OrderData.lianxiPerson">
		   		<div style="font-size: 0.8em;text-align: left;padding-left: 4%;padding-right: 4%;color: gray;">以英文或汉字，限4-16个字符，一个汉字为2个字符</div>
		   		<div style="margin-top:5% ;"><button style="width: 35%;font-size: 0.9em;color: white;height: 2.5em;background-color: #2baaed;outline: none;border: 1px #2baaed solid;border-radius: 0.2em;" @click="changeout(1)">确定</button></div>
		   	</div>
		  </div> 
  
      </x-dialog>
   </div>
  
  
 
  
  <div v-transfer-dom>
      <x-dialog v-model="showtel" class="dialog-demo">
      	<div id="telinput">
		   		<div  style="background-color: #2baaed;width: 100%;line-height: 2em;height:2em;text-align: center;color:white;font-size: 1.3em;">
		   	 修改电话
		   	 </div>
		   	<div style="text-align: center;border-radius: 0.2em;color:#ebebeb;font-size: 1.1em;margin-top: 5%;">
		   		<input style="width: 90%; height: 3em;outline: none;font-size: 1em;border: 1px gainsboro solid;border-radius: 0.2em;text-indent:4%;" placeholder="以英文或汉字，限4-16个长度" v-model="OrderData.lianxiNum">
		   		<div style="font-size: 0.8em;text-align: left;padding-left: 4%;padding-right: 4%;color: gray;">以英文或汉字，限4-16个字符，一个汉字为2个字符</div>
		   		<div style="margin-top:5% ;"><button style="width: 35%;font-size: 0.9em;color: white;height: 2.5em;background-color: #2baaed;outline: none;border: 1px #2baaed solid;border-radius: 0.2em;" @click="changeout(2)">确定</button></div>
		   	</div>
		  </div> 
      </x-dialog>
   </div>
   
   
   
   
   <div v-transfer-dom>
      <x-dialog v-model="showremark" class="dialog-demo">
      	<div id="addressinput">
        <div  style="background-color: #2baaed;width: 100%;height:2em;text-align: center;line-height:2em;color:white;font-size: 1.3em;">
		   	 修改备注
		   	 </div>
		   	<div style="text-align: center;border-radius: 0.2em;color:#ebebeb;font-size: 1.1em;margin-top: 5%;">
		   		<input style="width: 90%; height: 3em;outline: none;font-size: 1em;border: 1px gainsboro solid;border-radius: 0.2em;text-indent: 4%;" placeholder="以英文或汉字，限4-16个长度" v-model="OrderData.note">
		   		<div style="font-size: 0.8em;text-align: left;padding-left: 4%;padding-right: 4%;color: gray;">以英文或汉字，限4-16个字符，一个汉字为2个字符</div>
		   		<div style="margin-top:5% ;"><button style="width: 35%;font-size: 0.9em;color: white;height: 2.5em;background-color: #2baaed;outline: none;border: 1px #2baaed solid;border-radius: 0.2em;" @click="changeout(3)">确定</button></div>
		   	</div>
		   	</div>
      </x-dialog>
   </div>
  
  
  <softkeybord ref="keybord"></softkeybord>
  <setpaypassdialog ref="dialog"></setpaypassdialog>
  </div>


<timeselect ref='showtime' v-on:child-say="showtime"></timeselect>
</div>
</template>

<script>
import { Group,XSwitch,XNumber,Radio,Flexbox, FlexboxItem,Cell,Datetime,XDialog, TransferDomDirective as TransferDom} from 'vux'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import { ORDERMSG_SIGN } from '../../store/ordermsg'
import { USERINFO_SIGN } from '../../store/userinfo'

export default {
	directives: {
    TransferDom
  },
   computed: {
   	...mapState({ ordermsg: state => state.ordermsg}),
   	...mapState({ userinfo: state => state.userinfo}),
   },

  components:{
      Group,
      XSwitch,
      XNumber,
      Radio,
      Flexbox, 
      FlexboxItem,
       Group,
       Cell,
      Datetime,
      XDialog,
     Softkeybord:resolve => {require(['./softkeybord.vue'], resolve)},
     Timeselect:resolve => {require(['./timeselect.vue'], resolve)},
      Setpaypassdialog:resolve => {require(['./setpaypassdialog.vue'], resolve)}
  },
  data (){
      return {
      	OrderData:{stadiumId:"",fuStadiumId:"",gameDate:"",productPrice:"",gameNum:1,orderPrice:"",lianxiPerson:"",lianxiNum:"",note:"填写备注",orderState:"0",payWay:"0",orderType:"4",userId:"",validTime:'',activityId:''},
      	showremark:false,
      	showname:false,
      	showtel:false,
      	timevalue:'2015-11-12',
      	dateformat:'YYYY-MM-DD HH:mm:00',
      	redPackets:'',
      	PAYpageshow:true,
      	
      
      hongbaovalue:0,
     
          HBDK:false,
          QBZF:true,
          WSZF:true,
          HBDKvalue:'',
          ZFFS:'001',
          options:[
              {
                icon: '../../../static/walletlogo.png',
                key: '001',
                value: '钱包支付'
              },
              {
                icon: '../../../static/wechatpay.png',
                key: '002',
                value: '微信支付'
              },
              {
                icon: '../../../static/pay.png',
                key: '003',
                value: '线下支付'
              },
          ]
      }
  },
  mounted(){
  	this.getOrderData();
  },
  methods:{
  	...mapActions([USERINFO_SIGN]),
  	gototime(){
  		this.rerdatereal(this.OrderData.gameDate,1)
  		 
		
		this.$refs.showtime.show();
  		this.PAYpageshow=false;  
  	},
  	showtime(sign){
  		
		this.PAYpageshow=true; 
		this.$refs.showtime.showmytime=false;
	
    this.OrderData.gameDate=this.userinfo.year+'-'+this.userinfo.month+"-"+this.userinfo.day+' '+this.userinfo.time+':00';
    this.ordermsg.gameDate=this.userinfo.year+'-'+this.userinfo.month+"-"+this.userinfo.day+' '+this.userinfo.time+':00';
		var mydate=new Date(this.ordermsg.gameDate);
    var time=mydate.getHours();
    if(time>=14)
    {
    	this.OrderData.productPrice=this.ordermsg.maxPrice;
    	this.ordermsg.productPrice=this.ordermsg.maxPrice;
    	this.OrderData.orderPrice=this.ordermsg.productPrice;
    }
    if(time<14)
    {
    	this.OrderData.productPrice=this.ordermsg.minPrice;
    		this.ordermsg.productPrice=this.ordermsg.minPrice;
    		this.OrderData.orderPrice=this.ordermsg.productPrice;
    }
  	this.ORDERMSG_SIGN(this.ordermsg);
  	    
  	},
  	 rerdatereal(item,id){
	 	/*id=1,表示返回的是月和日*/
  	 	if(id==1){
  	 			if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
      		var _date=new Date(item.replace(/-/g,'/'));
      		var month=_date.getMonth()+1;
      		var daytime=_date.getDate();
      		var year=_date.getFullYear();
      		this.userinfo.year=year;
			this.userinfo.month=month;
			this.userinfo.day=daytime;
			this.USERINFO_SIGN(this.userinfo);
      		if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (daytime >= 0 && daytime <= 9) {
			        daytime= "0" + daytime;
			    }
          var _rerdatereal = month+'-'+daytime;
          return  _rerdatereal;
      		
      	}
      	else{
      		 var _date=new Date(item);
         var month=_date.getMonth()+1;
      		var daytime=_date.getDate();
      		var year=_date.getFullYear();
      		this.userinfo.year=year;
			this.userinfo.month=month;
			this.userinfo.day=daytime;
			this.USERINFO_SIGN(this.userinfo);
      		if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (daytime >= 0 && daytime <= 9) {
			        daytime= "0" + daytime;
			    }
          var _rerdatereal =month+'-'+daytime;
          return  _rerdatereal;
      	}
         
  	 	}
  	 	
  	 	/*id=2,表示返回的是星期几*/
  	 	if(id==2){
  	 			if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
      		var _date=new Date(item.replace(/-/g,'/'));
      		var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六"); 
      		var _rerdatereal=dayNames[_date.getDay()];
          
          return  _rerdatereal;
      		
      	}
      	else{
      		 var _date=new Date(item);
      		 var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六"); 
          var _rerdatereal = dayNames[_date.getDay()];
          return  _rerdatereal;
      	}
         
  	 	}
  	 	
  	 	
  	 	/*id=3,表示返回的是小时*/
  	 	if(id==3){
  	 			if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
      		var _date=new Date(item.replace(/-/g,'/'));
      		
      		var _rerdatereal=_date.getHours();
          
          return  _rerdatereal;
      		
      	}
      	else{
      		 var _date=new Date(item);
      		var _rerdatereal=_date.getHours();
          return  _rerdatereal;
      	}
         
  	 	}
      
      },
  	changeswitch(val){
  		if(val==true){
  			this.$http.get('/restapi/cum/red/redzong?user_id='+this.userinfo.userId)
                .then((response) => {
                    this.redPackets=response.data.redPackets;
                })
                .catch(function(response) {
                })
  		}
  	},
  	...mapActions([ORDERMSG_SIGN]),
  	getOrderData(){
			var myDate = new Date();
			
			var year= myDate.getFullYear();
			
			this.year=year;
			this.OrderData.stadiumId=this.ordermsg.stadiumId;
			this.OrderData.orderPrice=this.ordermsg.productPrice;
			this.OrderData.productPrice=this.ordermsg.productPrice;
			this.OrderData.gameDate=this.ordermsg.gameDate;
			this.OrderData.userId=this.ordermsg.userId;
			this.OrderData.lianxiNum=this.ordermsg.lianxiNum;
			this.OrderData.lianxiPerson=this.ordermsg.lianxiPerson;
			this.OrderData.activityId=this.ordermsg.activityId;
		},
  	 changein(item){
    if(item==1)
    	this.showname=true;
    	if(item==2)
    	this.showtel=true;
    	if(item==3)
    	this.showremark=true;
    	
    },
     changeout(item){
    	if(item==1)
    	this.showname=false;
    	if(item==2)
    	this.showtel=false;
    	if(item==3)
    	this.showremark=false;
    },
  	
  		pay(){
  			
  			if(window.localStorage.payPassword!=''){
  			this.OrderData.orderPrice=this.OrderData.gameNum*this.OrderData.productPrice;
  			if(this.ZFFS=='001'||this.ZFFS=='002'){
  				this.OrderData.payWay==0;
  			}
  			if(this.ZFFS=='003'){
  				this.OrderData.payWay=1;
  				this.OrderData.orderState=1;
  			}
  			
  				
  			
  			
  				
  			
  			var _OrderData = this.OrderData;
			var OrderDatajson = JSON.stringify(_OrderData);
			
			var _this=this;
			if(this.ordermsg.orderId==""){
				this.$http.post('/restapi/cum/myorder/createOrderByUserId',OrderDatajson)
                .then((response) => {
					_this.ordermsg.orderId=response.data.orderId;
					
			 if(_this.ZFFS!='003'){
			 	if(_this.HBDK==true){
       					_this.ordermsg.orderPrice=_this.OrderData.orderPrice-_this.hongbaovalue;
       					_this.ordermsg.minusRedpacket=_this.hongbaovalue;
       					 _this.ORDERMSG_SIGN(_this.ordermsg);
       					 this.$refs.keybord.minusRedpacket=_this.hongbaovalue;
                   if(_this.ZFFS=='001'){
       					 	 this.$refs.keybord.showpay=true;
       					
       					 }
       					 
       					 if(_this.ZFFS=='002'){
       						_this.jsApiCall(response.data.orderId,_this.userinfo.userId,_this.ordermsg);
       					}
       				}
       				if(_this.HBDK==false){
       					_this.ordermsg.orderPrice=_this.OrderData.orderPrice;
                  
                   _this.ORDERMSG_SIGN(_this.ordermsg);
                   
                   
                   if(_this.ZFFS=='001'){
       					 	 this.$refs.keybord.showpay=true;
       					
       					 }
       					 
       					 if(_this.ZFFS=='002'){
       						_this.jsApiCall(response.data.orderId,_this.userinfo.userId,_this.ordermsg);
       					}
       				}
			 }
			 		_this.ordermsg.orderId=response.data.orderId;
			 if(_this.ZFFS=='003'){
			 	
			 	
                   
                   
                  _this.$router.push('/home/ordercompleted');
       				
			 }
       			
                })
			}
			if(this.ordermsg.orderId!=""){
				
				var _this=this;
				this.ordermsg.minusRedpacket=this.hongbaovalue;
       					
				this.OrderData.orderId=this.ordermsg.orderId;
				
				this.ordermsg.orderPrice=this.OrderData.orderPrice-this.hongbaovalue;
				 this.ORDERMSG_SIGN(this.ordermsg);
				 var TbCumMyOrder = JSON.stringify(this.OrderData);
				 this.$http.post('/restapi/cum/myorder/updateOrderInfo', TbCumMyOrder)
                .then((response) => {
                	if(_this.ZFFS=='003'){
				 	
                   
                   
                  _this.$router.push('/home/ordercompleted');
       				
				 }
				 
				 if(_this.ZFFS!='003'){
				 	if(_this.HBDK==true){
       					
       					 this.$refs.keybord.minusRedpacket=_this.hongbaovalue;
                   if(_this.ZFFS=='001'){
       					 	 this.$refs.keybord.showpay=true;
       					
       					 }
       					 
       					 if(_this.ZFFS=='002'){
       						_this.jsApiCall(_this.ordermsg.orderId,_this.userinfo.userId,_this.ordermsg);
       					}
       				}
       				if(this.HBDK==false){
       					_this.ordermsg.orderPrice=_this.OrderData.orderPrice;
                  
                   _this.ORDERMSG_SIGN(_this.ordermsg);
                   
                   
                   if(_this.ZFFS=='001'){
       					 	 this.$refs.keybord.showpay=true;
       					
       					 }
       					 
       					 if(_this.ZFFS=='002'){
       						_this.jsApiCall(_this.ordermsg.orderId,_this.userinfo.userId,_this.ordermsg);
       					}
       				}
				 }
                })
				 
				
			}
			}
  			else{
          	this.$refs.dialog.showdialog=true;
				this.$refs.dialog.title='您还没设置钱包支付密码!';
				this.$refs.dialog.path='/changepassword';
				this.$refs.dialog.handlename='前往设置';
  			}
			
    },
    ...mapActions([ORDERMSG_SIGN]),

change (val) {
		 	
     this.OrderData.gameNum=val;
     this.ordermsg.gameNum=val;
     this.ORDERMSG_SIGN(this.ordermsg);
     this.OrderData.orderPrice =  this.OrderData.productPrice*this.OrderData.gameNum;
     
   },
   change1 (val) {
if(this.OrderData.gameNum*this.OrderData.productPrice>val||this.OrderData.gameNum*this.OrderData.productPrice==val){
		this.hongbaovalue=val;
	}
  	else{
  		this.hongbaovalue=this.OrderData.gameNum*this.OrderData.productPrice;
  	}
   },

    changenamein(){
    	var  nameinput = document.getElementById("nameinput");
    	var  msaker1 = document.getElementById("msaker1");
    	nameinput.style.display="block";
    masker1.style.display="block";
    },
     changenameout(){
    	var  nameinput = document.getElementById("nameinput");
    	var  msaker1 = document.getElementById("msaker1");
    	nameinput.style.display="none";
    	 masker1.style.display="none";
    },
     changetelin(){
    	var  telinput = document.getElementById("telinput");
    	var  msaker1 = document.getElementById("msaker1");
    	telinput.style.display="block";
    masker1.style.display="block";
    },
     changetelout(){
    	var  telinput = document.getElementById("telinput");
    	var  msaker1 = document.getElementById("msaker1");
    	telinput.style.display="none";
    	 masker1.style.display="none";
    },
     changeaddressin(){
    	var  addressinput = document.getElementById("addressinput");
    	var  msaker1 = document.getElementById("msaker1");
    	addressinput.style.display="block";
    masker1.style.display="block";
    },
     changeaddressout(){
    	var  addressinput = document.getElementById("addressinput");
    	var  msaker1 = document.getElementById("msaker1");
    	addressinput.style.display="none";
    	 masker1.style.display="none";
    },
  	
  },
}
</script>

<style>
.colortext {
    color: #2baaed;
}
.blockpay_fontstyle{
	
     white-space: normal;
    	
     color:black;
    width:92%;
    
		}
.PAYpage {
    margin-bottom: 50px;
    background-color: #ebebeb;
    
    overflow-y:auto ;
    overflow-x: hidden;
    
}
.PAYpage>div {
    background-color: white;
}
.paypage_title {
    background-color: white;
    padding: 10px 20px;
    border-bottom: 0.5px solid #ccc;
}
.label {
    width: 26%;
    color:#727272
}
.instructions_mes {
    width: 75%!important;
}
.paypage_detail {
    background-color: white;
    margin-bottom: 10px;
}
.paypage_detail:first-child {
    padding-top: 10px;
}
.paypage_detail>div {
    display: flex;
    padding:5px 20px;
}
.HBDK {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    margin-left: -1%;
}
.block_HBDK_lable {
   display: flex;
    align-items: center;
    color: #000000;
    width: 50%;
    padding-left: 5.5%;
    
}
.block_HBDK_lable>img {
     
    padding-right: 5%;
  
}
.HBDKvalue {
    padding-left: 20px;
}
.block_ZFFSgroup {
    width:100%;
    
   
    
}
.block_payDetail>div {
	margin-top: 2%;
    display: flex;
    justify-content: space-between;
   padding-right: 4%;
   margin-left: 4%;
   margin-bottom: 4%;
}
.SurePay {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: 0;
} 
.SP_label {
    width: 65%;
    height: 100%;
    line-height: 50px;
    background-color: white;
    display: flex;
    justify-content: space-around;
   
}
.SP_btn {
    flex: 1;
    background-color:#2baaed;
    color: white;
    text-align: center;
    line-height: 50px;
}
.num button{
	width: 100%;
	height: 2em;
	background-color: white;
	outline: none;
	border:1px #ebebeb solid;
	border-radius: 0.5em ;
	
	
	
}
.hongbaodeduction button{
	width: 100%;
	height: 2.2em;
	background-color: white;
	outline: none;
	border:1px #ebebeb solid;
	border-radius: 0.2em ;
	
	
}
#masker1{
	position: fixed;
	width: 100%;
	height:100%;
	background-color:black ;
		top:0;
		opacity:0.7;
		z-index:999;
		overflow: hidden;
		display: none;
}
#nameinput,#telinput,#addressinput{
	
	width: 100%;
	height:14em;
	background-color: white;
		border-radius: 0.5em;
	
}
.blockdpaytimeselect{
	 margin-left: -2%;
	/* margin-top: -4%;*/
}
.blockpaymsg {margin-left: 1%;}
/********** 全局样式*************************** */
.weui-cell {
    margin: 0!important
}
</style>
