<template>
    <x-dialog v-model="showQD" style="position: relative;">
        <div>
            <img src="../../../static/signinLOGO.png" alt="" class="QD_logo">
            <countup :start-val="originalscore" :end-val="latestscore" :duration="2"   class="JFvalue"></countup>
        </div>
        <div class="QDlogo_btn">
            <img src="../../../static/signinLOGO_btn01.png" alt="" >
            <img src="../../../static/signinLOGO_btn02.png" alt="" @click="gotointegral">
        </div>
        <img src="../../../static/close.png" alt="" class="cancelbtn" @click="hide">
    </x-dialog>
</template>

<script>
import { XDialog ,Countup } from 'vux'

export default {
    components:{
        XDialog,Countup
    },
    data(){
        return {
            showQD:false,
            originalscore :10,
            latestscore:1000
            
        }
    },
    methods:{
        show(){
            this.showQD = true
        },
        hide(){
            this.showQD = false
        },
        gotointegral(){
          this.$router.push('/integral');
      },
    }
}
</script>

<style>
.QD_logo {
    width: 100%;
    height: 100%;
}
.QDlogo_btn {
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 20px;
}
.QDlogo_btn>img {
    width: 90px;
    height: 35px;
    margin:0 20px;
}
.cancelbtn{
    height: 50px;
    width: 50px;
    position: absolute;
    top: 30px;
    right: 20px;
}
.JFvalue {
    color: white;
    font-weight: 700;
    font-size: 2.5em;
    position: fixed;
    left: 35%;
    top:45%;
    text-align: center;
}


/*******原生样式***********/
.weui-dialog {
    background-color: rgba(255, 255, 255, 0)!important;
}
</style>
