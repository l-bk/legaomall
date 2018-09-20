<template>
  <div id="app" >
  	
    <router-view v-on:fun="showtabbbar"></router-view>
    <div v-show="isshowBar">
    	
      <tabbar class="vux-demo-tabbar" icon-class="vux-center"  slot="bottom">
        <tabbar-item :link="{path:'/home'}" :selected="this.$route.path==='/home'">
          <span slot="icon"><img src="../static/home.png" alt=""></span>
          <span slot="icon-active"><img src="../static/homeSelect.png" alt=""></span>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item >
        	
          <span slot="icon"><a :href="tel"><img src="../static/phone.png" alt=""></a></span>
          <span slot="icon-active"><a :href="tel"><img src="../static/phoneSelect.png" alt=""></a></span>
          
          <span slot="label">联系</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/hongbao'}" :selected="this.$route.path==='/hongbao'">
          <span slot="icon"><img src="../static/hongbao.png" alt=""></span>
          <span slot="icon-active"><img src="../static/hongbaoSelect.png" alt=""></span>
          <span slot="label">红包</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/user'}" :selected="this.$route.path==='/user'">
          <span slot="icon"><img src="../static/user.png" alt=""></span>
          <span slot="icon-active"><img src="../static/userSelect.png" alt=""></span>
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, XHeader} from 'vux'

export default {
  name: 'app',
  components: {
    Tabbar,
    TabbarItem,
    XHeader
  },
  
  data(){
  	return{
  		tel:'',	
  		showBar:false,
  		showBar2:true,
  		
  	}
  },
  
computed:{
	isshowBar() {
      if ((/home$/.test(this.$route.path)&&this.showBar2)||/block_Booking$/.test(this.$route.path)||/golfactivity$/.test(this.$route.path)||/hotpurchase$/.test(this.$route.path)||(/booking$/.test(this.$route.path)&&this.showBar2)||/contact$/.test(this.$route.path)||(/discount$/.test(this.$route.path)&&this.showBar2)||/user$/.test(this.$route.path)) {
       this.showBar=true;
       return this.showBar;
       
      }
       this.showBar=false;
      return this.showBar;
    },
    
},
mounted(){
	this.getphonenum();
},
  methods:{
  		
  	showtabbbar(fun){
  		this.showBar2=fun;
  		
  	},
  	getphonenum(){
  		var _this=this;
  		this.$http.get('/restapi/cms/article/serviceImg')
				.then((response)=>{
					var id=response.data[0].id;
				_this.$http.get('/restapi/cms/article/selectContact?id='+id)
				.then((response)=>{
					
					_this.tel='tel:'+response.data.contact;
				
				})
				.catch(function(response){
					
				})
				})
				.catch(function(response){
					
				})
  	},
  },
  
}

</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html, body {
  height: 100%;
  width: 100%;
  font-family: '微软雅黑';

  margin:0;
  background: #ebebeb;
  
  

}

input {
    border-radius: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
}

/*修改vux样式*/
.weui-tabbar__label {
  font-size: 12px!important;
}
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
  color: #2baaed!important;
  
}
.weui-label {
    width: 6.8em!important;
     
}
.vux-number-selector {
  background-color: white!important;
  height:25px!important;
}
.vux-number-input{
	height:25px!important;
}
.vux-number-selector svg {
  color: white!important
}
</style>
