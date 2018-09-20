<template>
  <div style="height: 100%;background-color: black;">
    123
  </div>
</template>

<script>

export default {
  
}
</script>

<style>

</style>
<template>
    
      <div class="pay_list">
          <div class="pay_list_item" v-for="item in rechargedatalist">
            <div class="pay_title"> {{ item.name }}</div>
            <div class="pay_detail">
              <p class="pay_detail_time">{{ rerdatereal(item.createTime) }}</p>
              <p class="pay_detail_money">+{{ item.addNum }}</p>
            </div>
          </div>
          
           <div v-if="listlength==1" class="wallet_none">
				
			</div>
        </div>
     
</template>

<script>

import { mapState } from 'vuex'
export default {
  components:{

  },
  data (){
    return {
      rechargedatalist:[],
      listlength:''
    }
  },
  mounted(){
  	this.getrechargedata();
  },
  computed: {
   
   	...mapState({ userinfo: state => state.userinfo}),
   },
  methods:{
  	 getrechargedata(){
      	var user_id=this.userinfo.userId;
            this.$http.get('/restapi/cum/userinfo/getWalletList?sign=1&userId='+user_id)//充值sign为1
                .then((response) => {
                   this.rechargedatalist=response.data;
                   if(this.rechargedatalist.length==0){
                  
            		this.listlength=1;
            }
                })
                .catch(function(response) {
                })
      },
       
  }
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
  font-size:1em;
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
  font-size: 25px;
  font-weight: bolder;
  color: #2baaed;
}
.wallet_none{
	
	
	width: 100%;
	height: 100%;
	margin-left: -5%;
	
	
	/*text-align: center;*/
	
	background: url('../../../static/no_msg.png') no-repeat   65%;
	background-color: white;
}
</style>
