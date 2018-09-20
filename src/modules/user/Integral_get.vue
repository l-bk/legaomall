<template>
   
        <div class="integralget_list">
            <div class="integralget_listItem" v-for="item in intergraldata">
                <div class="igli_left">
                    <div class="igli_left_title" >{{item.name}}</div>
                    <div class="igli_left_time" v-if="item.createTime">{{item.createTime}}</div>
                    <!--<div class="igli_left_time" v-if="!item.createTime">{{{2017-5-16 18:00}}}</div>-->
                </div>
                <div class="igli_right">+{{item.addNum}}</div>
            </div>
             <div v-if="listlength==1" class="integral_none">
				
			</div>
        </div>
   
</template>

<script>

 import { mapState } from 'vuex'

 

export default {
	 components:{
  
  },
	data(){
		return{
			intergraldata:[],
			listlength:''
		}
	},
	mounted(){this.getintegraldata()},
	 computed: {
  	...mapState({ userinfo: state => state.userinfo }),
  	...mapState({ ordermsg: state => state.ordermsg }),
  },
  methods:{
  	  getintegraldata(){
      	var user_id=this.userinfo.userId;
            this.$http.get('/restapi/cum/userinfo/getPointList?userId='+user_id)
                .then((response) => {
                    this.intergraldata=response.data;
                     if(this.intergraldata.length==0){
                  
            		this.listlength=1;
            }
                })
                .catch(function(response) {
                })
      },
  }
}

</script>

<style>
.integralget_list {
    background-color: white;
  
}
.integralget_listItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 3%;
    padding-right: 3%;
    line-height: 30px;
    background-color: white;
    border-bottom: 0.5px solid #ccc;
}
.igli_left{
	width: 70%;
	padding-right: 1%;
}
.igli_left_title {
    font-size: 1em;
  

}
.igli_left_time {
    color: #999999;
   
     font-size: 0.9em;
}
.igli_right {
	width: 30%;
    font-size: 1.6em;
    color: #2baaed;
    text-align: right;
     padding-right: 1%;
}
.integral_none{
	
	
	width: 100%;
	height: 100%;
	
	
	
	
	
	background: url('../../../static/no_msg.png') no-repeat   50% 30%;
	background-color: white;
}
</style>
