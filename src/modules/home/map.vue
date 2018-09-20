<template>
	<div class="Map" @click="selectcity" >
		<div v-show='isshow'>
      <flexbox style="background-color: white;height: 40px;padding-left:4%;font-size: 17px;">
      	<flexbox-item><div @click='gotohome'><span style="color:#2baaed;padding-right: 2%;"><</span>选择城市</div></flexbox-item>
      </flexbox >
      <div >
      	
      	<!--<group-title style="color: black;">当前定位</group-title>-->
		<group title="当前定位" style="color: black;">
		
			<cell :title="dircity"> <img slot="icon" src="../../../static/location2.png" style="vertical-align: middle;width: 80%;"></cell>
		</group>
		</div>
		
		
		<group-title style="color: black;">热门城市</group-title>
		    <grid :rows="5" style="background-color: white;">
		      <grid-item v-for="i in cityamount" :key="i">
		        <span  class='cityselect'>{{i.city}}</span>
		      </grid-item>
            </grid>
		
		<group-title style="color: black;" >快速定位</group-title>
		    <grid :rows="5" style="background-color: white;" >
		      <grid-item v-for="i in citycharacter" :key="i">
		      <div class="grid-center" > {{i.name}}</div>
		      </grid-item>
            </grid>
            <group-title style="color: black;"><div >A</div></group-title>
		    <grid :rows="5" style="background-color: white;">
		      <grid-item v-for="i in 1" :key="i">
		        <div class="grid-center">澳门</div>
		      </grid-item>
            </grid>
		
			</div>
	</div>
</template>
<script>
import { Cell, Group,XHeader,Flexbox,FlexboxItem, Grid, GridItem,GroupTitle } from 'vux'

 export default {
 
  components: {
    Group,
    Cell,
    XHeader,
    Flexbox,
    FlexboxItem, 
    Grid, 
    GridItem,
   GroupTitle
  },
  
  data(){
  	return{
	isshow:false,
   dircity:'',
   id:'',
  		
//		selectedcity:this.$root.state.Map.selectedcity,
  		cityamount:[
  		 { city: '北京' },
      { city: '广州' },
      { city: '深圳' },
      { city: '上海' },
      { city: '宁波' },
      { city: '杭州' },
      { city: '成都' },
      { city: '大连' },
     { city: '苏州' },
      { city: '南京' },
       { city: '长沙' },
        { city: '武汉' },
        
         { city: '东莞' },
          { city: '厦门' },
          
           { city: '福州' },
            { city: '青岛' },
             { city: '天津' }, 
             { city: '重庆' },
            { city: '三亚' }
      
      
  		],
  		citycharacter:[
  		{ name: 'A' },
  		{ name: 'B' },
  		{ name: 'C' },
  		{ name: 'D' },
  		{ name: 'E' },
  		{ name: 'F' },
  		{ name: 'G' },
  		{ name: 'H' },
  		{name:'J'},
  		
  		{ name: 'K' },
  		{ name: 'L' },
  		{ name: 'M' },
  		{ name: 'N' },
  		
  		{ name: 'P' },
  		{name:'Q'},
  		{ name: 'R' },
  		{ name: 'S' },
  		{ name: 'T' },
  		
  		
  		{ name: 'W' },
  		{ name: 'X' },
  		{ name: 'Y' },
  		{ name: 'Z' },
  		{ name: '省份' },
  		
  		
  		],
  	}
  },
 
   mounted () {
   this.mapshow();
   this.selectcity();
  },
  methods:{
  	/*快速定位滚动到*/
//	chacterscrolling(){
//		
//		window.name="map";
//  	window.onclick=function(e){ 
//		var evt=e||window.event; 
//		var tar=evt.target||evt.srcElement; 
//		alert(tar.innerHTML);
//		window.scrollTo(0,document.body.scrollHeight);
//		}
//	},
	
	
	/*获取当前定位*/
  mapshow(){
    	var _this=this;
		var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				console.log(r);
				
				_this.dircity=r.address.city;
			}
			else {
				alert('failed'+this.getStatus());
			}        
		},{enableHighAccuracy: true})

        
    },
   
    
    
   /* 城市选择函数*/
    selectcity(){
    	var _this= this;
    	
    	window.onclick=function(e){ 
				var evt=e||window.event; 
				var tar=evt.target||evt.srcElement; 
				
				if( (tar.tagName.toLowerCase()=="label")&&tar.className=="cityselect" || tar.tagName.toLowerCase()=="span"&&tar.className=="cityselect"){ 
    	
    			_this.$emit('fun',tar.innerHTML)
				_this.isshow=false;
			
			
		}
			}
				},
				gotohome(){
					
					
				},
     
  }
 }
</script>
<style>
	.Map{
		width: 100%;
		height: 100%;
		overflow-y: scroll;
	overflow-x: hidden;
	}
.grid-center {
  display: block;
  text-align: center;
  color: black;
 
}	
.cityselect{
	display: block;
  text-align: center;
  color: black;
}
</style>