<template>
	<div style="width:100%;height:100%;border:#ccc solid 1px;position:absolute;" id="dituContent">
		
	</div>
</template>

<script>
	
	
	export default{
		mounted(){
			this.initMap();
//			this.getlocation(window.location.href);
		},
		methods:{
	//创建和初始化地图函数：
     initMap(){
        this.createMap();//创建地图
      
    },
    
    //创建地图函数：
    createMap(){
    	
     // 百度地图API功能
	var map = new BMap.Map("dituContent");

	var point = new BMap.Point(window.sessionStorage.lon,window.sessionStorage.lat);
	var mk = new BMap.Marker(point);
	map.addOverlay(mk);
	map.panTo(point);
	map.centerAndZoom(point,15);


    },
   
    

    
   } 
   
   }
</script>

<style>
</style>