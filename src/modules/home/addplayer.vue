<template>
	<div v-show='addplayer_show'>
		<div style="padding-left:4% ;background-color: white;padding-top: 3%;padding-bottom: 2%;">
			<span><img src="../../../static/addplayer.png" style="vertical-align: middle;"></span><input placeholder="请输入打球人名字" class='addplayer_input' id='addplayer_input'><button class='addplayer_button' @click="addplayer">添加</button>
		</div>
		<div style="background-color: white;margin-top: 2%;">
			<div style="padding-left:4% ;height:3em;line-height:3em;border-bottom: 1px gainsboro solid;" v-for="item in players">
			<img src='../../../static/right.png' style="vertical-align: middle;"><span style="padding-left: 8%;">{{item}}</span>
		</div>
		</div>
		
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
import { ORDERMSG_SIGN } from '../../store/ordermsg'
	export default{
		data(){
			return{
				players:[],
				addplayer_show:false,
			}
		},
		computed: mapState({ ordermsg: state => state.ordermsg }),
		
		methods:{
			...mapActions([ORDERMSG_SIGN]),
			addplayer(){
				var name=document.getElementById('addplayer_input');
				
				if(name.value!=''||name.value!=null){
					this.ordermsg.lianxiPerson=this.ordermsg.lianxiPerson+','+name.value;
					this.ORDERMSG_SIGN(this.ordermsg);
					name.value='';
					this.$emit('child-say',this.ordermsg.lianxiPerson);
					
					
				}
			},
			
		},
	}
</script>

<style>
	.addplayer_input{
		width: 75%;
		outline: none;
		border: none;
		font-size: 1.1em;
		text-indent: 8%;
		
	}
	.addplayer_button{
		width: 15%;
		background-color: #2baaed;
		outline: none;
		color: white;
		border: none;
		height: 2.5em;
		border-radius: 0.5em;
		
	}
</style>