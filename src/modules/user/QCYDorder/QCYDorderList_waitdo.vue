
<template>
  
    <div>
        <div>
            <div class="OL_Item" v-for="item in waitdo" :key="item.id" @click="gotodetail(item)">
                <div class="OLI_width">
                    <div class="OLI_first">
                        <div class="OLIF_left">
                            <p style="font-size: 0.95em;font-weight: bold;">{{item.stadiumId}}</p>
                            <p style="font-size: 12px;color: #666666">订单编号：{{item.orderId}}</p>
                        </div>
                        <div class="OLIF_right">待打球</div>
                    </div>
                    <div class="OLI_second OLI_first">
                        <div class="OLIS_left">
                            <p v-if="item.orderType!=1">打球时间：{{item.gameDate}}</p>
                         <p v-if="item.orderType==1">可打球时间：{{item.validTime}}</p>
                            <p>打球人数：{{item.gameNum}}</p>
                            <p>下单时间：{{item.createDate}}</p>
                        </div>
                        <div class="OLIS_right">
                            <span style="font-size: 0.8em;">&#65509;</span>{{item.orderPrice}}
                        </div>
                    </div>
                    <div class="OLI_third">
                        <div v-show="item.orderState==='2'">
                            <span style="color:#2baaed;border: 1px solid #2baaed;border-radius: 8px;padding: 5px 15px;" @click.stop="test04">取消成功</span>
                            <span style="color:white;background-color:#2baaed ;border: 1px solid white;border-radius: 8px;padding: 5px 15px;">删除订单</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 
</template>

<script>


export default {
  components:{
    
  },
  props: {
        waitdo: {
          type: Array
        }
      },
    methods:{
    gotodetail(item){
        this.$router.push({ name:'订单详情', params: { id:item.orderId }})
    },
    test04(ite){
        alert('点击')
        
    }
  }
}
</script>

<style>

</style>
