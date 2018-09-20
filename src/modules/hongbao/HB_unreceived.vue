<template>
    <div >
        
           
                
                
                <div class="hblItem" v-for="item in redPacketslist">
                	
                    <div class="hblItem_left">
                        <img src="../../../static/redpacketimg.png" alt="">
                    </div>
                    <div class="hblItem_right">
                        <div class="hblItem_right_top">
                            <div style="font-size: 30px;"><span style="font-size: 0.8em;">&#65509;</span>{{item.addNum}}</div>
                            <div class="HBbtn" @click="getredPacket(item)">领取</div>
                        </div>
                       <div style="text-align: center;color:#8b8b8b;font-size: 15px;line-height: 30px;">
					      		  有效期：{{item.createTime}}
					    </div>
                    </div>
                </div>
                
            <div v-if="listlength==1" class="hb_unreceived">
				
			</div>
            
            
            
     </div>
</template>

<script>
import { mapState } from 'vuex'
import { USERINFO_SIGN } from '../../store/userinfo'

import { mapActions } from 'vuex'
export default {
   components:{
   
   
  },
  computed: mapState({ userinfo: state => state.userinfo }),
  data(){
      return {
          redPacketslist:[],
          usedate:'',
          listlength:'',
      }
  },
   
  computed:{
       
      ...mapState({ userinfo: state => state.userinfo })
  },
  mounted(){
      this.getunreceivedredpacketlist();
  },
  methods:{
  	...mapActions([USERINFO_SIGN]),
      getunreceivedredpacketlist(){
      	var _this=this;
          this.$http.get('/restapi/cum/userinfo/getRedpacketList?userId='+this.userinfo.userId+'&sign=1'+'&redState=0')
                .then((response) => {
                   _this.redPacketslist=response.data;
                   
                  if(response.data.length==0){
                  
            	_this.listlength=1;
            }
                  
                    
                })
                .catch(function(response) {
                })
      },
      rerdatereal:function(item){
         if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
      		var _date=new Date(item.createTime.replace(/-/g,'/'));
      		var month=_date.getMonth()+1;
          var _rerdatereal = _date.getFullYear()+'-'+month+'-'+_date.getDate();
          return  _rerdatereal;
      		
      	}
      	else{
      		 var _date=new Date(item.createTime);
      		 var month=_date.getMonth()+1;
          var _rerdatereal = _date.getFullYear()+'-'+month+'-'+_date.getDate();
          return  _rerdatereal;
      	}
      },
      getredPacket(item){
      	var _this=this;
            var _id = item.id;
            var redpacket=item.addNum;
            var name=item.name;
            console.log(_id)
            this.$http.get('/restapi/cum/userinfo/updateReceiveRedpacket?userId='+this.userinfo.userId+'&id='+_id+'&redpacket='+redpacket) 
                .then((response) => {
                	_this.userinfo.redpacket=response.data.redPackets;
                	_this.$emit('fun',response.data.redPackets);
                	
                	_this.USERINFO_SIGN(_this.userinfo);
                	var __this=this;
                    _this.$http.get('/restapi/cum/userinfo/getRedpacketList?userId='+_this.userinfo.userId+'&sign=1'+'&redState=0')
                .then((response) => {
                   __this.redPacketslist=response.data;
                   if(response.data.length==0){
                  	
            	__this.listlength=1;
            }
                    
                })
                .catch(function(response) {
                })
                })
                .catch(function(response) {
                    
                        })
      }
  }
}
</script>

<style>
.hb_unreceived{
	
	
	width: 100%;
	height: 100%;
	margin-left: -5%;
	
	
	/*text-align: center;*/
	
	background: url('../../../static/no_msg.png') no-repeat   65%;
	background-color: white;
}
.hblItem {
    display: flex;
    align-items: center;
    height: 100px;
    width: 100%;
    margin-top: 8px;
   	
}
.hblItem_left {
    height: 100px;
    width: 35%;
    
    
}
.hblItem_left>img {
    height: 100%;
    width: 100%
}
.hblItem_right {
   box-sizing: border-box;
   height: 100px; 
   width: 65%; 
   border: 1px solid #45ceb4;
   border-left: none
}
.hblItem_right_top {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 10px;
    padding: 10px 0;
    color:#45ceb4;
    border-bottom: 1px dashed #ccc
}
.HBbtn {
    padding:0 15px;
    border: 1px solid #45ceb4;
}
</style>
