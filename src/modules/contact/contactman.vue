<template>
	<div class="contactman" >
		<div style="margin-top:40% ;margin-left:30% ;"><img :src="serviceimg">
		</div>
		<div style="margin-left:29% ;font-family: '仿宋';padding-top: 8%;"><p>长按二维码关注乐小妹~</p></div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				serviceimg:''
			}
		},
		mounted(){
			this.contactimg();
		},
		methods:{
			contactimg(){
				this.$http.get('/restapi/cms/article/serviceImg')
				.then((response)=>{
					this.serviceimg=response.data[0].image;
				})
				.catch(function(response){
					
				})
					
			},
		},
	}
</script>

<style>
	.contactman{
		width: 100%;
		height: 100%;
		
		background-color: white;
		position: fixed;
	}
	.contactman img{
		
		
		width:60%;
		height: 60%;
	}
	
</style>