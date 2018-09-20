<template>
	<div v-show='showmytime'>
		<div style="border: 1px gainsboro solid;margin-left: 1%;margin-right: 1%;">
		<grid >
		  <grid-item style='width: 100%;text-align: center;height:1em;color: gray;line-height: 0em;'>
		    {{userinfo.year}}年{{userinfo.month}}月{{userinfo.day}}日
		  </grid-item>
		 
		  
		</grid>
		
		
		 
		 <grid :rows="4" style='background-color: white;'>
		 	
		      <grid-item v-for="item in timelist"   style='border: none;height:1em;line-height: 0em;color: gray;text-align: center;'>
		      	<span  @click='selecttime' class='timeselect'>{{item.name}}</span>
		     
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
		 computed: mapState({ userinfo: state => state.userinfo }),
		data(){
			return{
				showmytime:false,
				timelist:[
				{'name':'06:00'},{'name':'06:15'},{'name':'06:30'},{'name':'06:45'},
				{'name':'07:00'},{'name':'07:15'},{'name':'07:30'},{'name':'07:45'},
				{'name':'08:00'},{'name':'08:15'},{'name':'08:30'},{'name':'08:45'},
				{'name':'09:00'},{'name':'09:15'},{'name':'09:30'},{'name':'09:45'},
				{'name':'10:00'},{'name':'10:15'},{'name':'10:30'},{'name':'10:45'},
				{'name':'11:00'},{'name':'11:15'},{'name':'11:30'},{'name':'11:45'},
				{'name':'12:00'},{'name':'12:15'},{'name':'12:30'},{'name':'12:45'},
			    {'name':'13:00'},{'name':'13:15'},{'name':'13:30'},{'name':'13:45'},
			    {'name':'14:00'},{'name':'14:15'},{'name':'14:30'},{'name':'14:45'},
			    {'name':'15:00'},{'name':'15:15'},{'name':'15:30'},{'name':'15:45'},
			    {'name':'16:00'},{'name':'16:15'},{'name':'16:30'},{'name':'16:45'},
			    {'name':'17:00'},{'name':'17:15'},{'name':'17:30'},{'name':'17:45'},
			    {'name':'18:00'},{'name':''},{'name':''},{'name':''}
			    
				],
			}
		},
		methods:{
			...mapActions([USERINFO_SIGN]),
			selecttime(){
    	var _this= this;
    	
    	window.onclick=function(e){ 
				var evt=e||window.event; 
				var tar=evt.target||evt.srcElement; 
				
				if( (tar.tagName.toLowerCase()=="label")&&tar.className=="timeselect" || tar.tagName.toLowerCase()=="span"&&tar.className=="timeselect"){ 
//  	        alert(tar.innerHTML);
    	        _this.userinfo.time=tar.innerHTML;
    	        _this.USERINFO_SIGN(_this.userinfo);
    			_this.$emit('child-say',_this.userinfo.time);
				
				
    			
    			
		}
			}
				},
			show(){
				   
				   
					this.showmytime=true;
				},	
			},
		
		
	}
</script>

<style>
</style>