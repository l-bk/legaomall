<template>
 
    <div>
        <div class="OL_Item" v-for="item in allt" :key="item.id" @click="gotodetail(item)">
            <div class="OLI_width">
                <div class="OLI_first">
                    <div class="OLIF_left">
                        <div style="font-size: 0.95em;font-weight: bold;width:100%;">{{item.stadiumId}}</div>
                        <div style="font-size: 12px;color: #666666">订单编号：{{item.orderId}}</div>
                    </div>
                    <div class="OLIF_right" v-if="item.orderState==='0'">待处理</div>
                    <div class="OLIF_right" v-if="item.orderState==='1'">待打球</div>
                    <div class="OLIF_right" v-if="item.orderState==='2'">已完成</div>
                    <div class="OLIF_right" v-if="item.orderState==='3'">已取消</div>
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
                    <div v-show="item.orderState==='2'||item.orderState==='3'">
                        <span style="color:white;background-color:#2baaed ;border: 1px solid white;border-radius: 8px;padding: 5px 15px;"@click.stop="test04(item)">删除订单</span>
                    </div>
                    <div v-show="item.orderState==='0'">
                        <span style="color:white;background-color:#2baaed ;border-radius: 8px;padding: 5px 15px;" @click.stop="rewriteorder(item)">修改订单</span>
                        <span style="color:white;background-color:#2baaed ;border-radius: 8px;padding: 5px 15px;" @click.stop="cancelorder(item)">取消订单</span>
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
      allt: {
      }
    },
    mounted:function(){
        console.log(this.allt)
    },
    methods:{
        gotodetail(item){
            this.$router.push({ name:'订单详情', params: { id:item.orderId }})
        },
        rewriteorder(item){
//          alert('修改订单')
           this.$router.push({ name:'订单修改', params: { id:item.orderId }})
        },
        cancelorder(item){
           this.$http.get('/restapi/cum/myorder/deleteMyOrders?orderId='+item.orderId+'&userId='+item.userId+'&orderType='+item.orderType)
                .then((response) => {
                    this.$emit('child-say',response.data.orderLists);
                })
                .catch(function(response) {
                })
        },
        test04(item){
            console.log(item.timexd)
            alert(item.timexd)
            
        }
    }
}
</script>

<style>

</style>
