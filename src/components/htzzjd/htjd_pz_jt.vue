<template>
    <div style="width:80%;">
        <div style="float:right">
            <div class="CStyle">1%-49%<span style="background: #ed4117;"></span></div>
            <div class="CStyle">5%0-79%<span style="background: #fa9909;"></span></div>
            <div class="CStyle">80%-100%<span style="background: #2ebf6b;"></span></div>
        </div>
        <ul>
            <li class="item-icon-right" v-for="list in lists">
                <div class="titleStyle">{{list.title}}</div>
                <div class="progressContainer">
                    <div class="progress" :style="{width:list.wcbl*100+'%','background-color':'#ed4117'}" v-if="list.wcbl <= 0.49">
                        <b>已产量:{{list.ycl}}吨/{{list.wcbl*100}}%</b>
                    </div>
                    <div class="progress" :style="{width:list.wcbl*100+'%','background-color':'#fa9909'}" v-else-if="list.wcbl >0.49 && list.wcbl <= 0.79">
                        <b>已产量:{{list.ycl}}吨/{{list.wcbl*100}}%</b>
                    </div>
                    <div class="progress" :style="{width:list.wcbl*100+'%','background-color':'#2ebf6b'}" v-else>
                        <b>已产量:{{list.ycl}}吨/{{list.wcbl*100}}%</b>
                    </div>
                </div>
                <div class="progressContainer">
                    <div class="progress" :style="{width:100+'%','background-color':'#33b7f6','margin-top':'5px'}">
                        <b>计划量:{{list.jhl}}吨/100%</b>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "htjd_pz_jt",
        data(){
            return {
                lists:[],
                Csvj:{
                    flName:""
                }
            }
        },
        created() {
            this.handleListApproveHistory();
        },
        methods: {

            // 获取日志记录信息
            handleListApproveHistory() {
                fetch(this.$store.state.fetchPath + "/allocation/selAllocation", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.Csvj),
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res.length>0?JSON.parse(res):[];
                    this.lists =  this.utils.htjdTree(res);
                })
            }
        }
    }
</script>

<style scoped>
    .titleStyle{
        font-size: 24px;
        text-align: left;
        margin-top:10px;
    }
    .spanStyle{
        padding-top:10px;
    }
    div.progressContainer{
        height: 18px;
        width: 100%;
        border-radius: 10px;
        background-color: #ddd;
    }
    div.progress{
        border-radius: 10px;
        height:18px;
        line-height: 18px;
        position:relative;
    }
    b {
        color: #fff;
        font-weight: 100;
        font-size: 12px;
        position: absolute;
        left: 1%;
    }
    .CStyle{
        float:left;
        margin-right:20px;
    }
    .CStyle span{
        display: block;
        width:25px;
        height:10px;
        float:right;
        margin-top:3px;
    }
</style>
