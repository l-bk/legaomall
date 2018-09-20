<template>
  <x-dialog v-model="changename" :hideOnBlur="true">
    <div class="changename">
        <div class="CN_card">
            <div class="CN_title">修改姓名</div>
            <div style="text-align: center;">
                <input type="text" class="CN_input" v-model="userName">
            </div>
            <div style="color:rgb(179, 179, 179);width: 90%;padding-left: 5%;padding-right:5%;text-align: left; ">
                以英文或汉字，限4-16个长度 以英文或汉字
            </div>
            <div class="CN_BTN">
                <span class="CN_btnItem" @click="surechange">
                    确定
                </span>
            </div>
            </div>
        </div>
  </x-dialog>
</template>

<script>
import {XDialog  } from 'vux'

export default {
    components:{
        XDialog
    },
    data(){
        return {
            changename:false,
            userName:''
        }
    },
   
   
    methods:{
    	
    
        show(){
            this.changename = true
        },
        hide(){
            this.changename = false;
        },
        surechange(){
            this.postusername()
        },
        postusername(){
            var _username= this.userName
            this.$http.post('/restapi/cum/userinfo/updateusername', {userName:_username})
                .then((response) => {
                    
                    

										this.$emit('child-say',response.data.userName);
                    
                   
                    this.hide();
                })
        }
    }
}
</script>

<style>
.changename {
    display: flex;
    justify-content: center;
    align-items: center
}
.CN_card {
    width: 100%;
    background-color: white;
}
.CN_title {
    color: white;
    background-color:#2baaed;
    height: 55px;
    font-size: 20px;
    line-height: 55px;
    text-align: center;
    margin-bottom: 10px;
}
.CN_BTN {
    height: 60px;
    text-align: center;
    line-height: 50px;
}
.CN_btnItem {
    padding: 8px 30px;
    background-color:#2baaed;
    color:white;
    border-radius: 6px;
    margin-top: 5px;
}
.CN_input{
    height: 45px;
    width: 90%;
    border: 1px solid #ccc;
    font-size: 18px;
    text-indent: 4%;
}
</style>
