<template>
  <div>
    <div>
        <tab :line-width="1" custom-bar-width="60px" active-color='#2baaed' v-model="index">
        <tab-item :selected="tabsel === item" v-for="item in orderDtab" @click="tabsel = item">{{item}}</tab-item>
        </tab>
    </div>
    <div  v-if="index==0"><orderdetail-dtl></orderdetail-dtl></div>
    <div  v-if="index==1"><orderdetail-trk></orderdetail-trk></div>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'
import OrderdetailDtl from './OrderDetail_Dtl.vue'
import OrderdetailTrk from './OrderDetail_Trk.vue'

export default {
  components:{
    Tab,
    TabItem,
    OrderdetailDtl,
    OrderdetailTrk
  },
  data(){
    return {
      index:0,
      tabsel:'订单详情',
      orderDtab:['订单详情','订单追踪']
    }
  }
}
</script>

<style>

</style>
