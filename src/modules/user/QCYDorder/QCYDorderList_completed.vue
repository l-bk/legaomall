<template>
  
    <div>
        <div>
            <div class="OL_Item" v-for="item in complete" :key="item.id" @click="gotodetail(item)">
                <div class="OLI_width">
                    <div class="OLI_first">
                        <div class="OLIF_left">
                            <p style="font-weight: bold;font-size: 0.95em;">{{item.stadiumId}}</p>
                            <p style="font-size: 12px;color: #666666">订单编号：{{item.orderId}}</p>
                        </div>
                        <div class="OLIF_right">已完成</div>
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
                        <div>
                            <span style="color:white;background-color:#2baaed ;border-radius: 8px;padding: 5px 15px;"@click.stop="test04">删除订单</span>
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
      complete: {
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
