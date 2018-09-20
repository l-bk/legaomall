<template>
	<div class="golfactivity" id='golfactivity'> 
	
	
	            
						
						
						<div v-for="(item,index) in golflist" style="border-bottom:1px gainsboro solid;">
							
							<div @click="gotogolfactivitydetail(item)">
						<flexbox :gutter="0" wrap="wrap">
							<flexbox-item  :span="2/8">
							<div v-if="item.matchLogo==null||item.matchLogo==''" style="margin-left: 15%;width:70%;height: 4em;border-radius:0.2em ;border:1px gainsboro solid;margin-top: -25%;background-color: whitesmoke;"><img src="http://img0.imgtn.bdimg.com/it/u=4165043449,2715842553&fm=23&gp=0.jpg" style="width:90%;height: 3.5em;border-radius: 4em;vertical-align: middle;margin-left: 5%;margin-top: 5%;"></div>
							<div v-if="item.matchLogo!=null&&item.matchLogo!=''" style="margin-left: 15%;width:70%;height: 4em;border-radius:0.2em ;border:1px gainsboro solid;margin-top: -25%;background-color: whitesmoke;"><img :src="item.matchLogo" style="width:90%;height: 3.5em;border-radius: 4em;vertical-align: middle;margin-left: 5%;margin-top: 5%;"></div>

							</flexbox-item>
							<flexbox-item  :span="5/8" >
								<div style="padding-top: 5%;">
								<flexbox  orient="vertical" :gutter="0" >
									
								<flexbox-item><div style="font-size: 1em;" class="fontstyle" :id='index'></div></flexbox-item>
								<flexbox-item>
									<div style="margin-bottom: 6%;">
								<div style="font-size: 0.9em;float: left;color: darkgray;">赛事时间：{{item.matchDate}}</div>
								<div style="color: red;float: right;font-size: 1em;margin-right: -15%;"><span style="font-size: 0.7em;">&#65509;</span>{{item.price}}</div>
								</div>
								</flexbox-item>
								
								<flexbox-item><div style="vertical-align: middle;font-size: 0.9em;color: darkgray;">已报名人数：{{item.applyNumber}}</div></flexbox-item>
								
								<flexbox-item><div style="float: right;font-size: 0.9em;border: 1px #2baaed solid; height:2em;line-height:2em;width: 5em;border-radius: 0.2em;color: #2baaed;text-align:center;margin-right: -15%;margin-bottom: 5%;" >立即报名</div></flexbox-item>
								
							</flexbox>
							</div>
							</flexbox-item>
						</flexbox>
						</div>
						
						</div>
						<load-more :show-loading="true" background-color="#fbf9fe" v-if='isshow==true'></load-more>
						
						<div v-if="reach_bottom==true" style="padding-bottom: 3%;text-align: center;color: gray;"><divider>亲！到底了~</divider></div>
						<div v-if="listlength==1" class="golfactivity_none">
							<p>暂无赛事信息~</p>
						</div>			
								
	            
				
				
		
	
	
	

	
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { USERINFO_SIGN } from '../../store/userinfo'
	import { mapState } from 'vuex'
	import { Flexbox, FlexboxItem,Divider,LoadMore} from 'vux'
	export default{
		components:{Flexbox, FlexboxItem,Divider,LoadMore},
		data () {
    return {
      showList1: true,
      scrollTop: 0,
      onFetching: false,
      bottomCount: 20,
      golflist:[],
      listlength:'',
      page:1,
      isshow:false,
      nomorelist:false,
      reach_bottom:false,
     
    }
  },
  computed: {
  	...mapState({ userinfo: state => state.userinfo }),
  	
  },
  mounted(){
  	this.golfacitvitydata();
  	window.addEventListener('scroll',this.isbottom,true);
  
  },
  updated(){
		this.writetitle(this.golflist,0,'赛事');
	},
  methods:{
  	...mapActions([USERINFO_SIGN]),
  	isbottom(){
  		if(this.$route.name=='赛事活动'){
  		var scrollTop=document.getElementById('golfactivity').scrollTop;
  		var offsetHeight=document.getElementById('golfactivity').offsetHeight;
  		var scrollHeight=document.getElementById('golfactivity').scrollHeight;
//		console.log(scrollHeight-scrollTop-offsetHeight);
		if(((scrollHeight-scrollTop-offsetHeight)==3||(scrollHeight-scrollTop-offsetHeight)<3)&&this.nomorelist==false){
			this.isshow=true;
			this.page=this.page+1;
			this.golfacitvitydata();
			
			

			
		}
		
		}
  	},
  	golfacitvitydata:function(){
			    	var _this = this;
			    

			      this.$http({
            method:'GET',

            url:'/restapi/match/matchdate/list?page='+this.page
            //使用定义的全局变量 用$get()获取
           
            
        }).then(function(data){
            if(_this.userinfo.userId==undefined){
           	
           	_this.userLogin(_this.userinfo,_this.USERINFO_SIGN);
           }
            var  golflist = data.data.MatchData;
            if(golflist.length==0){
            	
            	_this.nomorelist=true;
            	_this.reach_bottom=true;
            }
            _this.isshow=false;
            _this.golflist.push.apply(_this.golflist,golflist);
            
           
         if(_this.golflist.length==0){
            	_this.listlength=1;
            }
            
			

			      
        },function(error){
          alert("error");
        });
    
    },
  
    gotogolfactivitydetail(item){
    	
    	this.$router.push('/home/golfactivitydetail/'+item.id);
    },
   
  },
	}
</script>

<style>
	.fontstyle{
	
    	
     color:black;
    width:110%;
    
		}
	.golfactivity{
		width: 100%;
		
		background-color: white;
		height: 100%;
	
		position: absolute;
 		overflow-y:auto;
		-webkit-overflow-scrolling: touch;
		
	}
	.golfactivity_body{
		/*margin-top: -5%;*/
	}
	.golfactivity_none{
	width: 100%;
	height: 100%;
	text-align: center;
	
	background: url('http://120.24.249.13:38080/userfiles/blocknone.png') no-repeat center;
	background-color: white;
}
.golfactivity_none p{
	padding-top: 100%;
	color: gainsboro;
	padding-left: 10%;
}
</style>