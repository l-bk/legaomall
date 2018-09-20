<template>
	<div class="date" v-show='showmydate'>
		<div style="border: 1px gainsboro solid;margin-top: 5%;margin-left: 2%;margin-right: 2%;">
		<grid >
		  <grid-item style='background-color: white;width: 100%;text-align: center;height:1em;color: gray;line-height: 0em;'>
		    {{year}}年{{month1}}月
		  </grid-item>
		  <!--<grid-item style='background-color:gray;width: 100%;text-align: center;height:1em;color: gray;line-height: 0em;'>
		  	
		  
		  </grid-item>-->
		  
		</grid>
		 <grid :rows="7" >
		 	
		      <grid-item v-for="item in daylist"  style='border: none;height:1em;line-height: 0em;background-color: #EBEBEB;color: grey;text-align: center;'>
		      	{{item.name}}
		      
		      </grid-item>
		 </grid>
		 <grid :rows="7" style='background-color: white;'>
		 	
		      <grid-item v-for="item in 42"   style='border: none;height:1em;line-height: 0em;color: gray;text-align: center;'>
		      	<span :id='item' @click='selectdate(month1)' class='dateselect'></span>
		      <!--v-for="i in dayamount1"-->
		      </grid-item>
		 </grid>
		 </div>
		 
		 
		 
		 
		 <div style="border: 1px gainsboro solid;margin-top: 5%;margin-left: 2%;margin-right: 2%;margin-bottom: 5%;">
		<grid >
		  <grid-item style='background-color: white;width: 100%;text-align: center;height:1em;color: gray;line-height: 0em;'>
		    {{year}}年{{month2}}月
		  </grid-item>
		  <!--<grid-item style='background-color:gray;width: 100%;text-align: center;height:1em;color: gray;line-height: 0em;'>
		  	
		  
		  </grid-item>-->
		  
		</grid>
		 <grid :rows="7" >
		 	
		      <grid-item v-for="item in daylist"  style='border: none;height:1em;line-height: 0em;background-color: #EBEBEB;color: grey;text-align: center;'>
		      	{{item.name}}
		      
		      </grid-item>
		 </grid>
		 <grid :rows="7" style='background-color: white;'>
		 	
		      <grid-item v-for="item in 42"   style='border: none;height:1em;line-height: 0em;color: gray;text-align: center;'>
		      	<span :name='item' @click='selectdate(month2)' class='dateselect'></span>
		     
		      </grid-item>
		 </grid>
		 </div>
		 
		 
		 
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { USERINFO_SIGN } from '../../store/userinfo'
import { mapState } from 'vuex'
import {Grid,GridItem} from 'vux'
	export default{
		components:{
			Grid,GridItem
		},
		data(){
			return{
				showmydate:false,
				nowday:'',
				year:'',
				day1:'',
				day2:'',
				month1:'',
				month2:'',
				dayamount1:'',
				dayamount2:'',
				daylist:[
				{"name":'日'},
				{"name":'一'},
				{"name":'二'},
				{"name":'三'},
				{"name":'四'},
				{"name":'五'},
				{"name":'六'},
				
				
				],
			}
		},
		 computed: mapState({ userinfo: state => state.userinfo }),
		mounted(){
			this.nowdate();
		},
		methods:{
			mGetDate(year, month,num){
				
			    var d = new Date(year, month, num);
			    return d.getDate();
			},
			nowdate(){
				
				var nowdate= new Date();
				var nowday=nowdate.getDate();
				var nowyear=nowdate.getFullYear();
				
				var nowmonth=nowdate.getMonth()+1;
				if(nowmonth!=12){
					var nextmonth=nowmonth+1;
				}
				if(nowmonth==12){
					var nextmonth=1;
				}
				this.nowday=nowday;
				this.month1=nowmonth;
				this.month2=nextmonth;
				this.year=nowyear;
//			    var day = new Date();  
				
				
				this.dayamount1=this.mGetDate(nowyear,nowmonth,'0');
				this.day1=new Date(nowyear,nowmonth-1,'01').getDay();
//				alert(this.day1);
				if(this.nowmonth!=12){
				this.dayamount2=this.mGetDate(nowyear,nextmonth,'0');
//				alert(this.dayamount2);
				this.day2=new Date(nowyear,nextmonth-1,'01').getDay();
				}
				if(this.nowmonth==12){
				this.dayamount2=this.mGetDate(nowyear+1,'1','0');
				
				this.day2=new Date(nowyear+1,'1','01').getDay();
				}
				
				for(var i=1;i<this.dayamount1+1;i++){
					var myvalue1=document.getElementById(this.day1+i);
//				    alert(myvalue.id);
				if(nowday==i){
					myvalue1.innerHTML='today'
					myvalue1.style.color='#2baaed';
					myvalue1.style.marginLeft='-20%';
				}
					if(nowday!=i){myvalue1.innerHTML=i;}
					
					
				}
				for(var i=1;i<this.dayamount2+1;i++){
					var id=this.day2+i;
					var myvalue2=document.getElementsByName(id)[0];
					
//				    alert(myvalue.id);
					myvalue2.innerHTML=i;
					
					
					
				}
			},
			 ...mapActions([USERINFO_SIGN]),
			selectdate(month){
    	var _this= this;
    	
    	window.onclick=function(e){ 
				var evt=e||window.event; 
				var tar=evt.target||evt.srcElement; 
				
				if( (tar.tagName.toLowerCase()=="label")&&tar.className=="dateselect" || tar.tagName.toLowerCase()=="span"&&tar.className=="dateselect"){ 
    	
    	var day=tar.innerHTML;
    	if(tar.innerHTML=='today'){
    		day=_this.nowday;
    	}
//  	 if (month >= 1 && month <= 9) {
//			        month = "0" + month;
//			    }
//			    if (day >= 0 && day <= 9) {
//			        day= "0" + day;
//			    }
		_this.userinfo.year=_this.year;
		_this.userinfo.month=month;
		_this.userinfo.day=day;
		_this.USERINFO_SIGN(_this.userinfo);
		_this.$emit('child-say',true);
		}
			}
				},
				show(){
					this.showmydate=true;
				},
		},
	}
</script>

<style>
	.date{
		width: 100%;
		height: 100%;
	}
	.date_head{
		
		background-color: white;
		width: 95%;
		text-align: center;
		height: 1em;
		color: gray;
		line-height: 1em;
	}
</style>