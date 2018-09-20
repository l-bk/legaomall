<template>
	<div>
	
	
	<div v-show='showfilter'>
       <div id="masker" @click='hidefilter'></div>
      	
      	<div class="showcondition" @click='sendcondition' v-if='id==0'>
      
       <div class='condition_style'>默认</div>
       <div class='condition_style'>距离最近</div>
		</div>
		
		
		<div class="showcondition" @click='sendcondition' v-if='id==1'>
		<div class='condition_style'>默认</div>
		<div class='condition_style'>价钱最低</div>
		
		<div class='condition_style'>500以下</div>
        <div class='condition_style'>500-1000</div>
        <div class='condition_style'>1000-2000</div>
        <div class='condition_style'>2000以上</div>
       
     
		</div>
		
		<div class="showcondition" @click='sendcondition' v-if='id==2'>
       <div class='condition_style'>不限</div>
       <div class='condition_style'>林克斯</div>
       <div class='condition_style'>山地</div>
       <div class='condition_style'>森林</div>
		</div>
		
		
		<div class="showcondition" @click='sendcondition' v-if='id==3' style='height: 350px;overflow-y: auto;overflow-x: hidden;-webkit-overflow-scrolling: touch;'>
       <div class='condition_style'>不限</div>
       <div class='condition_style'>早场特惠</div>
       <div class='condition_style'>下午特惠</div>
       <div class='condition_style'>高球日</div>
       <div class='condition_style'>女士日</div>
       <div class='condition_style'>青少年日</div>
       <div class='condition_style'>老年日</div>
        <div class='condition_style'>男女同组</div>
         <div class='condition_style'>团体</div>
		</div>
		
		<div class="showcondition" @click='sendcondition' v-if='id==4' style='height: 350px;overflow-y: auto;overflow-x: hidden;-webkit-overflow-scrolling: touch;'>
       <div class='condition_style'>周一</div>
       <div class='condition_style'>周二</div>
       <div class='condition_style'>周三</div>
       <div class='condition_style'>周四</div>
       <div class='condition_style'>周五</div>
       <div class='condition_style'>周六</div>
       <div class='condition_style'>周日</div>
		</div>
		
		
		
		
		
		<div class="showcondition1" @click='' v-if='id==5' style='height: auto;overflow-x: hidden;width:100%;background-color: gainsboro;'>
     	
     	 <flexbox :gutter='0' wrap='wrap' style='background-color: white;height: 6em;width: 100%;' v-show='boxtotal'>
     	 	<flexbox-item :span='1/3'v-show='box1'>
     	 		<div class="condition_box" id='box_1' ><span ></span><img src="../../../static/cancel_select.png" @click="cancelselect('box1')"></div>
     	 	</flexbox-item :span='1/3'>
     	 	<flexbox-item :span='1/3' v-show='box2'>
     	 		<div class="condition_box" id='box_2' ><span></span><img src="../../../static/cancel_select.png" @click="cancelselect('box2')"></div>
     	 	</flexbox-item>
     	 	<flexbox-item :span='1/3'v-show='box3'>
     	 		<div class="condition_box" id='box_3' ><span></span><img src="../../../static/cancel_select.png" @click="cancelselect('box3')"> </div>
     	 	</flexbox-item>
     	 	<flexbox-item v-show='box4'>
     	 		<div class="condition_box" id='box_4' ><span></span><img src="../../../static/cancel_select.png" @click="cancelselect('box4')"></div>
     	 	</flexbox-item>
     	 </flexbox>
     	
     	 <flexbox :gutter='0' wrap='wrap'>
     	 	<flexbox-item :span='1/3'>
     	 	<div style="height: 200px;width: 100%;">
	     	 	<div class='filtertotal' style="background-color: white;" id="preference_type" @click='changetype(1)'>特惠类型<img src="../../../static/select.png" ></div>	
	     	 	<div class='filtertotal' id="date_type" @click='changetype(2)'>选择星期 <img src=""></div>	
	     	 	<div class='filtertotal' id="distance_type" @click='changetype(3)'>默认排序 <img src=""></div>	
	     	 	<div class='filtertotal' id="price_type" @click='changetype(4)'>价格区间 <img src=""></div>	
     	 	</div>
     	 	</flexbox-item>
     	 	<flexbox-item :span='2/3'>
     	 		<div class="filter_con" v-if='filter_id==1' id="type_select" @click="selectFilterCondition('type_select')">
     	 			<div class='condition_style'><span>不限</span><img src="../../../static/right_select.png"></div>
				   <div class='condition_style'><span>早场特惠</span> <img src="../../../static/right_select.png"></div>
				   <div class='condition_style'><span>下午特惠</span><img src="../../../static/right_select.png"></div>
				   <div class='condition_style'><span>高球日</span><img src="../../../static/right_select.png"></div>
				   <div class='condition_style'><span>女士日</span><img src="../../../static/right_select.png"></div>
				   <div class='condition_style'><span>青少年</span><img src="../../../static/right_select.png">日</div>
				   <div class='condition_style'><span>老年日</span><img src="../../../static/right_select.png"></div>
				   <div class='condition_style'><span>男女同组</span><img src="../../../static/right_select.png"></div>
				   <div class='condition_style'><span>团体</span><img src="../../../static/right_select.png"></div>
     	 		</div>
     	 		<div class="filter_con" v-if='filter_id==2' id="date_select" @click="selectFilterCondition('date_select')">
     	 			 <div class='condition_style'><span>周一</span><img src="../../../static/right_select.png"></div>
				       <div class='condition_style'><span>周二</span><img src="../../../static/right_select.png"></div>
				       <div class='condition_style'><span>周三</span><img src="../../../static/right_select.png"></div>
				       <div class='condition_style'><span>周四</span><img src="../../../static/right_select.png"></div>
				       <div class='condition_style'><span>周五</span><img src="../../../static/right_select.png"></div>
				       <div class='condition_style'><span>周六</span><img src="../../../static/right_select.png"></div>
				       <div class='condition_style'><span>周日</span><img src="../../../static/right_select.png"></div>
     	 		</div>
     	 		<div class="filter_con" v-if='filter_id==4' id="price_select" @click="selectFilterCondition('price_select')">
     	 			 <div class='condition_style'><span>500-1000</span><img src="../../../static/right_select.png"></div>
				       <div class='condition_style'><span>2000以上</span><img src="../../../static/right_select.png"></div>
				       <div class='condition_style'><span>500以下</span><img src="../../../static/right_select.png"></div>
				       <div class='condition_style'><span>1000-2000</span><img src="../../../static/right_select.png"></div>
     	 		</div>
     	 		
     	 		<div class="filter_con" v-if='filter_id==3' id="distance_select" @click="selectFilterCondition('distance_select')">
     	 			<div class='condition_style'><span>价钱最低</span><img src="../../../static/right_select.png"></div>
			       <div class='condition_style'><span>默认</span><img src="../../../static/right_select.png"></div>
			       <div class='condition_style'><span>距离最近</span><img src="../../../static/right_select.png"></div>
     	 		</div>
     	 	</flexbox-item>
     	 </flexbox>
     	 
     	 <div style="height: 50px;width: 100%;line-height: 50px;text-align: center;padding-left: 10%;">
     	 	<flexbox :gutter='0' wrap='wrap'>
     	 		<flexbox-item :span='1/3'>
     	 			<div @click='hidefilter'>取消</div>
     	 		</flexbox-item >
     	 		<flexbox-item :span='1/3'>
     	 		<div @click='resetcondition'>重置条件</div>
     	 		</flexbox-item >
     	 		<flexbox-item :span='1/3'>
     	 			<div @click='filter_done'>完成</div>
     	 		</flexbox-item >
     	 	</flexbox >
     	 </div>
     	
		</div>
		
     
   </div>
	
	
	</div>
</template>

<script>
import {Flexbox,FlexboxItem} from 'vux'	
export default {

components:{Flexbox,FlexboxItem},
   data(){
   	return{
   		showfilter:false,
   		id:'',//此id为显示那种条件选择。
   		filter_id:'1',//筛选时所用于判断显示右边那个模块
   		box1:false,
   		box2:false,
   		box3:false,
   		box4:false,
   		boxtotal:false,
   	}
   },
   methods:{
   	hidefilter(){/*点击空白处隐藏筛选条件框*/
   		this.showfilter=false;
   	},
   	sendcondition(){
   		var _this=this;
   		window.onclick=function(e){ 
				var evt=e||window.event; 
				var tar=evt.target||evt.srcElement; 
				
				if( (tar.tagName.toLowerCase()=="div")&&tar.className=="condition_style" ){ 
    	
    	_this.$emit('child-say',{'condition':tar.innerHTML,'id':_this.id});
		
		}
			}
   	},
   	changetype(id){//改变筛选按钮左边的样式函数
   		var preference_type=document.getElementById('preference_type');
   		var date_type=document.getElementById('date_type');
   		var distance_type=document.getElementById('distance_type');
   		var price_type=document.getElementById('price_type');
   		if(id==1){
   			preference_type.style.backgroundColor='white';
   			date_type.style.backgroundColor='gainsboro';
   			distance_type.style.backgroundColor='gainsboro';
   			price_type.style.backgroundColor='gainsboro';
   			
   			preference_type.children[0].src='../../../static/select.png';
   			date_type.children[0].src='';
   		    distance_type.children[0].src='';
   			price_type.children[0].src='';
   			this.filter_id=1;
   		}
   		if(id==2){
   			preference_type.style.backgroundColor=' gainsboro';
   			date_type.style.backgroundColor='white';
   			distance_type.style.backgroundColor='gainsboro';
   			price_type.style.backgroundColor='gainsboro';
   			
   			preference_type.children[0].src='';
   			date_type.children[0].src='../../../static/select.png';
   		    distance_type.children[0].src='';
   			price_type.children[0].src='';
   			this.filter_id=2;
   		}
   		if(id==3){
   			preference_type.style.backgroundColor='gainsboro';
   			date_type.style.backgroundColor='gainsboro';
   			distance_type.style.backgroundColor='white';
   			price_type.style.backgroundColor='gainsboro';
   			
   			
   			preference_type.children[0].src='';
   			date_type.children[0].src='';
   		    distance_type.children[0].src='../../../static/select.png';
   			price_type.children[0].src='';
   			this.filter_id=3;
   		}
   		if(id==4){
   			preference_type.style.backgroundColor='gainsboro';
   			date_type.style.backgroundColor='gainsboro';
   			distance_type.style.backgroundColor='gainsboro';
   			price_type.style.backgroundColor='white';
   			
   			
   			preference_type.children[0].src='';
   			date_type.children[0].src='';
   		    distance_type.children[0].src='';
   			price_type.children[0].src='../../../static/select.png';
   			this.filter_id=4;
   		}
   		
   		
   	},
   	
   	selectFilterCondition(idName){
   		var _this=this;
   		window.onclick=function(e){ 
				var evt=e||window.event; 
				var tar=evt.target||evt.srcElement; 
				
				if( (tar.tagName.toLowerCase()=="div")&&tar.className=="condition_style" ){ 
			   
			   _this.boxtotal=true;
			  
			   //填充条件框
			   if(idName=='type_select'){
			   	_this.box1=true;
			   	var box_1=document.getElementById('box_1');
			   
			   	box_1.children[0].innerHTML=tar.children[0].innerHTML;
			   	
			   	
			   }
			   if(idName=='date_select'){
			   	 	_this.box2=true;
			   	var box_2=document.getElementById('box_2');
			   	box_2.children[0].innerHTML=tar.children[0].innerHTML;
			  
			   }
			   if(idName=='price_select'){
			   	_this.box3=true;
			   	var box_3=document.getElementById('box_3');
			   	box_3.children[0].innerHTML=tar.children[0].innerHTML;
			   	
			   }
			   if(idName=='distance_select'){
			   	_this.box4=true;
			   	var box_4=document.getElementById('box_4');
			   	box_4.children[0].innerHTML=tar.children[0].innerHTML;
			   	
			   }
			   
			   //控制勾选样式
			   var id=document.getElementById(idName);
					 
					  var childNodes=id.childNodes;
					  for(var index=0;index<childNodes.length;index++){
					    if(childNodes[index].nodeType==1){
					      childNodes[index].children[1].style.display="none";
			    }
			  }
					  tar.children[1].style.display="block";
		
		}
			}
   		  
   	},
   	cancelselect(id){//取消选择筛选条件
   		var _this=this;
   		window.onclick=function(e){ 
				var evt=e||window.event; 
				var tar=evt.target||evt.srcElement; 
				
				if( (tar.tagName.toLowerCase()=="img")&&tar.parentNode.className=="condition_box" ){ 
	    	
			    	if(id=='box1'){
			    		_this.box1=false;
			    	}
			    	if(id=='box2'){
			    		_this.box2=false;
			    	}
			    	if(id=='box3'){
			    		_this.box3=false;
			    	}
			    	if(id=='box4'){
			    		_this.box4=false;
			    	}
			    	if(_this.box1==false&&_this.box2==false&&_this.box3==false&&_this.box4==false){
			    		_this.boxtotal=false;
			    	}
			
		}
			}
   	},
   	resetcondition(){//重置条件
   		this.box1=false;this.box2=false;this.box3=false;this.box4=false;this.boxtotal=false;
   	},
   	filter_done(){//筛选完成
   		this.$emit('child-say',{'condition':'筛选','id':this.id});
   		this.showfilter=false;
   	},
   	
   },
 }
</script>

<style lang="less" scoped>
@import '~vux/src/styles/close';
#masker{
	position: fixed;
	width: 100%;
	height:100%;
	background-color:black ;
		top:0;
		opacity:0.3;
		z-index:9;
		overflow: hidden;
}
.showcondition{
	top:15%;
	text-align: left;
	padding-left: 4%;
	width: 100%;
	z-index:99;
	position: fixed;
	background-color: white;
	color: gray;
	
}
.condition_style{
	padding-right: 4%;
	padding-bottom: 4%;
	padding-top: 4%;
	border-bottom: 1px gainsboro solid;
}
.condition_style img{
	display: none;
}
.filtertotal{
	padding-left: 10%;
	
	padding-bottom: 8%;
	padding-top: 8%;
	font-size: 1em;
}
.filter_con{
	
	height: 200px;
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	-webkit-overflow-scrolling: touch;
	background-color: white;
	padding-left: 4%;
	}
	.showcondition1{
		top:15%;
	text-align: left;
	
	width: 100%;
	z-index:99;
	position: fixed;
	background-color: white;
	color: gray;
	}
	#preference_type img,#date_type img ,#distance_type img, #price_type img{
		margin-left: 10%;
	}
	
	#type_select div img,#date_select div img,#price_select div img,#distance_select div img,{
		float: right;
		padding-right: 10%;
	}
	.condition_box{
		margin-left: 5%;
		margin-right: 10%;
		width: 7em;
		height: 2em;
		line-height: 2em;
		border-radius: 0.5em;
		border:1px orange solid ;
		text-align: center;
	}
	.condition_box img{
		float: right;
		
		
	}
</style>