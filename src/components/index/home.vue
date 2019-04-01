<template>
    <div>
        <Row class="titleH" id="zyphjh"><span>资源平衡计划</span></Row>
        <div class="content" style="height:950px">
            <zyphjh></zyphjh>
        </div>
        <Row class="titleH" id="htzzjd"><span>合同组织进度</span></Row>
        <div class="content" style="height:700px">
            <htzzjd></htzzjd>
        </div>
        <Row class="titleH" id="wcqk"><span>完成情况</span></Row>
        <div class="content" style="height:1100px">
            <jswcqk></jswcqk>
        </div>
        <!--<Row class="titleH" style="margin-top: -300px" id="pzgwcqk"><span>品种钢结算完成情况</span></Row>-->
        <!--<div class="content">-->
            <!--<pzgwcqk></pzgwcqk>-->
        <!--</div>-->
        <div @mouseleave="mouseout()">

            <Icon type="ios-apps-outline" class="mainMenu" @mouseover.native="mousein"/>
            <div class="content_div" v-if="isdiv">
                <Anchor show-ink>
                    <AnchorLink href="#zyphjh" title="资源平衡计划" />
                    <AnchorLink href="#htzzjd" title="合同组织进度" />
                    <AnchorLink href="#wcqk" title="结算完成情况" />
                    <!--<AnchorLink href="#pzgwcqk" title="品种钢完成情况" />-->
                </Anchor>
            </div>
        </div>
    </div>
</template>
<script>
    import zyphjh from '../gkfx/zyphjh'
    import htzzjd from '../htzzjd/htjd_pz'
    import jswcqk from '../gkfx/jswcqk'
    // import pzgwcqk from '../gkfx/pzgwcqk'
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
            // pzgwcqk
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
        background:#d4d4d4;
        /*background-color:beige;*/
    }
    .titleH span{
        float: left;
        font-size: 20px;
        font-weight: bold;
        padding-left:10px;
    }
    .content{
        width: 100%;
    }
    li{
        list-style: none;

    }
    .content_div{
        background-color: white;
        position: fixed;
        right: 60px;
        top: 120px;
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
    .mainMenu{
        font-size: 3rem;
        position:fixed;
        _position:absolute;
        right:20px;
        top:120px;
        padding:4px;
        color: #09c;
    }
</style>