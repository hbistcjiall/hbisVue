<template>
    <div>
        <Row class="titleH"><span>资源平衡计划</span></Row>
        <div class="content">
            <zyphjh></zyphjh>
        </div>
        <Row class="titleH"><span>合同组织进度</span></Row>
        <div class="content">
            <htzzjd></htzzjd>
        </div>
        <Row class="titleH"><span>完成情况</span></Row>
        <div class="content">
            <jswcqk></jswcqk>
        </div>
        <Row class="titleH" style="margin-top: -300px"><span>品种钢结算完成情况</span></Row>
        <div class="content">
            <pzgwcqk></pzgwcqk>
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
        components:{
            zyphjh,
            htzzjd,
            jswcqk,
            pzgwcqk
        },
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
</style>