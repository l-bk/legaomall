<template>
  <div>
    <div class="wallet_header">
        <div class="wallet_header_item">
            <p>余额（元）</p>
            <p style="font-size: 40px;">{{userinfo.commission}}</p>
            <div style="display: flex;justify-content: center;align-items: center">
                <img src="../../../static/recharge.png" alt="" style="height: 20px;width: 20px;padding-right: 5px;">
                <span style="font-size: 12px;line-height: 30px;" @click="gotorecharge">立即充值 >></span>
            </div>
        </div>
    
    <div class="wallet_detail">
        <div class="tab">
            <router-link to="/wallet/wallet_payDetail" class="tab_link" active-class="active" replace><div>消费明细</div></router-link>
            <router-link to="/wallet/wallet_rechargeDetail" class="tab_link" active-class="active" replace><div>充值明细</div></router-link>
        </div>
        
    </div>
    </div>
    <router-view class="wallet_routerView"></router-view>
  </div>
</template>

<script>
	import { mapState } from 'vuex'
export default {
   methods: {
       gotorecharge() {
           this.$router.push('/rechargepage')
       }
   },
   computed: {
   
   	...mapState({ userinfo: state => state.userinfo}),
   },
}
</script>

<style>
.wallet_header {
	width: 100%;
	
    height:10%;
    color: white;
    text-align: center;
    background-image:url('../../../static/background.jpg');
    
}
.wallet_header_item {
    padding-top: 20px;
}
.wallet_detail {
    height: auto;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    padding-top: 15px;
    background-color: white;
}
.tab {
    display: flex;
    justify-content: center;
    border: 1px solid #2baaed;
    border-radius: 5px;
    height: 40px;
    line-height: 40px;
    flex:0 0 40px;
    margin:0 2%;
}

.tab_link {
    width: 50%;
    text-align: center;
    color: #2baaed;
}
.active {
  background-color:#2baaed;
    color: white;
}
.wallet_routerView {
	-webkit-overflow-scrolling: touch;
	
   overflow-y: scroll;
    overflow-x: hidden;
   position: absolute;
   height: 67%;
   width: 100%;
    background-color: white;
   
}
</style>
