<template>
  <div>
    <div class="hongbao_header">
        <div class="hongbao_header_item">
            <p >红包余额（元）</p>
            <p style="font-size: 40px;">{{redPackets}}</p>
        </div>
    
    <div class="hongbao_detail">
        <div class="hongbao_tab">
            <router-link to="/hongbao/HB_get" class="hongbao_tab_link" active-class="active" replace><div>收入明细</div></router-link>
            <router-link to="/hongbao/HB_use" class="hongbao_tab_link" active-class="active" replace><div>消费明细</div></router-link>
            <router-link to="/hongbao/HB_unreceived" class="hongbao_tab_link" active-class="active" replace ><div><img src="../../../static/notgetredpack.png" style="width: 15%;vertical-align: middle;padding-bottom:3% ;" >&nbsp;&nbsp;未领取</div></router-link>
        </div>
        
    </div>
    </div>
    <router-view class="hongbao_routerView" v-on:fun="freshredPackets"></router-view>
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  data(){
      return {
         redPackets:'0',
         
      }
  },

   computed: mapState({ userinfo: state => state.userinfo }),
mounted(){
     this.getredPackets();
},
methods:{
			freshredPackets(fun){
				
					this.redPackets=fun;
			},
     getredPackets(){
     	if(this.userinfo.redPackets!=null)
     	this.redPackets=this.userinfo.redPackets;
     		if(this.userinfo.redPackets==null)
     	this.redPackets=0;
     },
}
}
</script>

<style>
.hongbao_header {
    background-image:url('../../../static/background.jpg');
    background-size:100% 100%; 
    height: 10%;
    color: white;
    text-align: center;
    
    width: 100%;
}
.hongbao_header_item {
    padding-top: 30px;
}
.hongbao_detail {
   
   margin-top: 20px;
   padding-top: 2%;
   padding-bottom: 2%;
    background-color: white;
}
.hongbao_tab {
    display: flex;
    justify-content: center;
    border: 1px solid #2baaed;
    border-radius: 5px;
    height: 40px;
    line-height: 40px;
    flex:0 0 40px;
    margin:0 3%;
}
.hongbao_tab_link {
    width: 50%;
    text-align: center;
    color: #2baaed;
}
.active {
  background-color:#2baaed;
    color: white;
}
.hongbao_routerView {
   /* flex:1 1 auto;*/
  -webkit-overflow-scrolling: touch;
 
   position: absolute;
     overflow-y: scroll;
    overflow-x: hidden;
     height: 67%;
     width:100%;
    
     /*padding-left: 5%;
    margin-right: -20%;
   */
    background-color: white;
}
</style>
