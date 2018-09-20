<template>
	
  <div>
   <div style="position:relative;">
    <div @click=''><swiper loop auto :list="baselist"  style="width:100%;margin:0 auto;" height="9em" dots-class="custom-bottom" dots-position="center"></swiper></div>
    

	</div>
  </div>
</template>

<script>
import { Swiper} from 'vux'


export default {
  components: {
    Swiper
  
  },
 

  data () {
    return {
      baselist:[
     
      ],

    }
  },
mounted:function(){
this.mydata();



},
 
methods: {
    	mydata:function(){
			    	var _this = this;
			     


			      this.$http({
            method:'GET',
//          url:'/restapi/pdm/goods/head',
              url:'/restapi/pdm/goods/head',
            //使用定义的全局变量 用$get()获取
            
            
        }).then(function(data){
            //赋值给alllist数组,
//          alert(data.data.baselist[0].title)
            var baselist = data.data.articles;
            for(var i=0;i<baselist.length;i++){
            	var obj=new Object();
            	obj.url=baselist[i].link;
//          	alert(obj.url);
            	obj.img=baselist[i].image;
            	obj.title=baselist[i].title;
            	_this.baselist.push(obj);
            }
//       
			      
        },function(error){
          alert("error");
        });
    
    },
 
   
},
 
}
</script>

<style scoped>
.copyright {
  font-size: 12px;
  color: #ccc;
  text-align: center;
}
.text-scroll {
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}
.text-scroll p{
  font-size: 12px;
  text-align: center;
  line-height: 30px;
}
.black {
  background-color: #000;
}
.title{
  line-height: 100px;
  text-align: center;
  color: #fff;
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.vux-indicator.custom-bottom {
  bottom: 30px;
  
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
.swiper-demo-img img {
  width: 100%;
}

</style>