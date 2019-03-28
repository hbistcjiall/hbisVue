<template>
    <div>
        <Row class="titleH" id="zyphjh"><span>资源平衡计划</span></Row>
        <div class="content">
            <zyphjh></zyphjh>
        </div>
        <Row class="titleH" id="htzzjd" style="margin-top:50px"><span>合同组织进度</span></Row>
        <div class="content">
            <htzzjd></htzzjd>
        </div>
        <Row class="titleH" id="wcqk"><span>完成情况</span></Row>
        <div class="content">
            <jswcqk></jswcqk>
        </div>
        <Row class="titleH" style="margin-top: -300px" id="pzgwcqk"><span>品种钢结算完成情况</span></Row>
        <div class="content">
            <pzgwcqk></pzgwcqk>
        </div>
        <div @mouseleave="mouseout()">
            <div @click="mousein()"  style="background-color: #134598;width: 180px;float: right;height: 64px;cursor: pointer;;z-index: 1000"  >
                <img src="../../assets/indexImg/xialaanniu.png" style="position: fixed;right: 80px;top: 100px;z-index: 1000;"/>
            </div>
            <div class="content_div" v-if="isdiv">
                <ul class="content_ul">
                    <a href="#zyphjh"><li>资源平衡计划</li></a>
                    <a href="#htzzjd"><li>合同组织进度</li></a>
                    <a href="#wcqk"><li>结算完成情况</li></a>
                    <a href="#pzgwcqk"><li>品种钢完成情况</li></a>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import zyphjh from '../gkfx/zyphjh'
    import htzzjd from '../htzzjd/htjd_pz'
    import jswcqk from '../gkfx/jswcqk'
    import pzgwcqk from '../gkfx/pzgwcqk'
    export default {
        name: "home",
        data(){
            return{
                isdiv:false,
            }
        },
        components:{
            zyphjh,
            htzzjd,
            jswcqk,
            pzgwcqk
        },
        methods:{
            mouseout(){
                this.isdiv=false;
            },
            mousein(){
                this.isdiv=true;
            },

        }
    }
</script>
<style scoped>
    .titleH{
        width: 100%;
        height: 30px;
        margin-bottom: 30px;
        /*background-color:beige;*/
    }
    .titleH span{
        float: left;
        font-size: 24px;
        font-weight: bold;
    }
    .content{
        width: 100%;
        height: 800px;
    }
    li{
        list-style: none;

    }
    .content_div{
        background-color: white;
        position: fixed;
        right: 0px;
        top: 135px;
        width: 180px;
        border: none;
        z-index: 90;
    }
    .content_ul li:hover{
        color: white;
        background-color: #3491ce;
        cursor: pointer;
    }
    .content_div li{
        height: 45px;
        line-height: 45px;
    }
</style>