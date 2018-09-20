<template>
  <x-dialog v-model="orderphone">
    <div class="changename">
        <div class="CN_card">
            <div class="CN_title">填写手机号</div>
            <div style="text-align: center;">
                <input type="number" class="CN_input" v-model="rewritephone">
            </div>
            <div class="CN_BTN">
                <span class="CN_btnItem" @click="surewrite">
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
            orderphone:false,
            rewritephone:''
        }
    },
    methods:{
        show(){
            this.orderphone = true
        },
        hide(){
            this.orderphone = false
        },
        surewrite(){
            this.$emit('recievePhone',this.rewritephone)
            this.hide();
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
    height: 50px;
    width: 90%;
    border: 1px solid #ccc;
    font-size: 15px;
}
</style>
