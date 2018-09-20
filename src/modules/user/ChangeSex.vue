<template>
    <x-dialog v-model="changesex" :hideOnBlur="true">
        <div  class="changesex">
            <div class="CS_card">
                    <div class="CS_title">选择性别</div>
                    <div class="CS_content" @click="changesexMan">
                        <img src="../../../static/man.png" alt="">
                        <p>男</p>
                    </div>
                    <div class="CS_content" style="border-top: 1px solid #d4cdcd" @click="changesexWoman">
                        <img src="../../../static/woman.png" alt="">
                        <p>女</p>
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
            changesex:false,
            sex:""
        }
    },
    methods:{
        show(){
            this.changesex = true
        },
        hide(){
            this.changesex = false;
        },
       changesexMan(){
           this.sex="1";
           this.postsex()
       },
       changesexWoman(){
           this.sex="2";
           this.postsex();
       },
       
       postsex(){
       		var _this=this;
            var _sex= this.sex
            console.log(_sex)
            this.$http.post('/restapi/cum/userinfo/updatesex', {sex:_sex})
                .then((response) => {
                	 
                	this.$emit('child-say',response.data.sex);
                    _this.hide();
                    
                })
       }
    }
}
</script>

<style>
.changesex {
    display: flex;
    justify-content: center;
    align-items: center
}
.CS_card {
    width: 100%;
    background-color: white;
}
.CS_title {
    width: 100%;
    height: 33%;
    color: white;
    background-color:#2baaed;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
}
.CS_content{
    display:flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    color: #3e3e3e;
}
.CS_content>img{
    width: 24px;
    height: 24px;
    padding-right: 10px;
}

</style>
