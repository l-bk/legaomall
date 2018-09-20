<template>
  <div class="orderFL_list">
    <group  style="font-size: 20px;">
        <cell class="user_list_height" title="球场预订订单列表" link="/qcydorderList/3" is-link></cell>
        <cell class="user_list_height" title="赛事活动订单列表" link="/qcydorderList/2" is-link></cell>
        <!--<cell class="user_list_height" title="旅游套餐订单列表" link="/qcydorderList/6" is-link></cell>-->
        <cell class="user_list_height" title="限时特惠订单列表" link="/qcydorderList/1" is-link></cell>
        <cell class="user_list_height" title="包场活动订单列表" link="/qcydorderList/4" is-link></cell>
        <!--<cell class="user_list_height" title="一元夺宝订单列表" link="/qcydorderList/5" is-link></cell>-->
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  components: {
      Group,
      Cell,
    },
}
</script>

<style>
.weui-cells {
  margin: 0!important;
}
.user_list_height{
	height: 2em;
}
</style>
