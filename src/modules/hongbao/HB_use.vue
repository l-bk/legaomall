<template>
    
      
        <div style=" margin-bottom: 5%;">
          <div class="pay_list_item" v-for="item in usedredpacketlist">
            <div class="pay_title"> {{ item.name }}</div>
            <div class="pay_detail">
              <p class="pay_detail_time">{{ rerdatereal(item.createTime)}}</p>
              <p class="pay_detail_money">{{ item.addNum }}</p>
            </div>
          </div>
          
          <div v-if="listlength==1" class="hb_unreceived">
				
			</div>
        </div>
      
    
</template>

<script>

import { mapState } from 'vuex'
export default {
  components:{
   
  },
  computed:{...mapState({ userinfo: state => state.userinfo })},  
  data() {
    return {
    	usedredpacketlist:[],
    	listlength:''
     
    }
  },
  mounted(){
  	this.getusedredpacketlist();
  },
   methods:{
      getusedredpacketlist(){
      	var _this=this;
          this.$http.get('/restapi/cum/userinfo/getRedpacketList?userId='+this.userinfo.userId+'&sign=2'+'&redState=1')
                .then((response) => {
                   
                    _this.usedredpacketlist=response.data;
                    if(_this.usedredpacketlist.length==0){
                  
            	_this.listlength=1;
            }
                })
                .catch(function(response) {
                })
      },
      
      
  },
}
</script>

<style>
.pay_list_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5%;
  padding-right: 5%;
  line-height: 30px;
  border-bottom: 0.5px solid #ccc;
  
}
.pay_title {
  font-size: 1em;
  color: #454545;
  width: 80%;
}
.pay_detail {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.pay_detail_time {
  font-size: 0.8em;
  color: #999999;
}
.pay_detail_money {
  font-size: 1.5em;
  font-weight: bolder;
  color: #2baaed;
}
.hb_unreceived{
	
	
	width: 100%;
	height: 100%;
	margin-left: -5%;
	
	
	/*text-align: center;*/
	
	background: url('../../../static/no_msg.png') no-repeat   65%;
	background-color: white;
}
</style>
