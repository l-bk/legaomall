<template>
  <div>
    <div>
        <tab :line-width="1" custom-bar-width="60px" active-color='#2baaed' v-model="index">
            <tab-item :selected="tabsel === '1'"  @click="tabsel = '1'">全部({{totallen}})</tab-item>
            <tab-item :selected="tabsel === '2'"  @click="tabsel = '2'">待处理({{waitingnum}})</tab-item>
            <tab-item :selected="tabsel === '3'"  @click="tabsel = '3'">待打球({{waitdonum}})</tab-item>
            <tab-item :selected="tabsel === '4'"  @click="tabsel = '4'">已完成({{completenum}})</tab-item>
        </tab>
    </div>
    
    <div class="order_list">
    <div  v-if="index==0" class="ordershow_up" ><orderlist-all :allt="allthing" v-on:child-say="changeorderlist"></orderlist-all></div>
    <div  v-if="index==1" class="ordershow_up" ><orderlist-waiting :waiting="waiting" v-on:child-say="changeorderlist"></orderlist-waiting></div>
    <div  v-if="index==2" class="ordershow_up" ><orderlist-waitdo :waitdo="waitdo" ></orderlist-waitdo></div>
    <div  v-if="index==3" class="ordershow_up" ><orderlist-complete :complete="complete" ></orderlist-complete></div>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem } from 'vux'
import OrderlistAll from './QCYDorderList_all.vue' //全部
import OrderlistWaiting from './QCYDorderList_waiting.vue' //待处理
import OrderlistWaitdo from './QCYDorderList_waitdo.vue' //待打球
import OrderlistComplete from './QCYDorderList_completed.vue' //已完成
import { mapState } from 'vuex'
import setWechatTitle from '../../../utils/setWechatTitle.js'
export default {
  components: {
    Tab,
    TabItem,
   
    OrderlistAll,
    OrderlistWaiting,
    OrderlistWaitdo,
    OrderlistComplete

  },
  data(){
      return {
          index:0,
          tabsel:'1',
          allthing:[]
      }
  },
  created(){
      this.getorderdata();
  },
computed:{
	    totallen(){
	    	return this.allthing.length
	    },
      waitingnum:function(){
         return this.waiting.length
      },
      waitdonum:function(){
         return this.waitdo.length
      },
       completenum:function(){
         return this.complete.length
      },
      waiting:function(){
          var _waiting=[];
          this.allthing.forEach((item)=>{
            if (item.orderState==='0'){
                _waiting.push(item)
            }
          })
          
          return _waiting;
      },
      waitdo:function(){
          var _waitdo=[];
          this.allthing.forEach((item)=>{
            if (item.orderState==='1'){
                _waitdo.push(item)
            }
          })
          return _waitdo;
      },
      complete:function(){
         var _complete=[];
          this.allthing.forEach((item)=>{
            if (item.orderState==='2'){
                _complete.push(item)
            }
          })
          return _complete;
      },
      ...mapState({ userinfo: state => state.userinfo }),
},
// computed: 
  methods:{
      getorderdata(){
      	if(this.$route.params.id==1){
      		setWechatTitle('特惠订单');
      	}
      	if(this.$route.params.id==2){
      		setWechatTitle('赛事订单');
      	}
      	if(this.$route.params.id==3){
      		setWechatTitle('预订订单');
      	}
      	if(this.$route.params.id==4){
      		setWechatTitle('包场订单');
      	}
      	
      	var user_id=this.userinfo.userId;
           this.$http.get('/restapi/cum/myorder/orList?user_id='+user_id+'&order_type='+this.$route.params.id)
                .then((response) => {
                   
                     this.allthing = response.data;
                     
                    //  alert( _arr instanceof Array  )
                })
                .catch(function(response) {
                    // console.log(response)
                })
      },
//    test05(){
//        return this.waiting.length
//    }
 changeorderlist(list){
 	this.allthing=list;
 },
  }
}
</script>

<style>
.OL_Item {
    margin-bottom: 10px; 
    background-color: white;
}
.OLI_width {
   margin: 0 15px;
}
.OLI_first {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
    border-bottom: 0.5px solid #ccc;
}
.OLIF_right {
    color: #2baaed;
    font-size: 12px;
    
    width: 12%;
}
.OLIS_left {
    font-size: 12px;
    color: #999999
}
.OLIS_right {
    font-size: 20px;
    color: #fd4443;
}
.OLI_third {
    height: 50px;
    text-align: right;
    line-height: 50px;
}
.order_list{
	position: fixed;
	overflow-y: auto;
	 -webkit-overflow-scrolling: touch;
	 height:100%;
	 width: 100%;
	
}
.ordershow_up{
	padding-bottom: 10%;
}
/*****修改vux原生样式*****/
.vux-timeline-item-tail , .vux-timeline-item-color {
    background-color: #2baaed!important
}
.recent {
     color: #2baaed!important
 }
</style>
