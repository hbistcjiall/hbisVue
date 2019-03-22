<template>
    <div style="width:80%;">
        <ul>
            <li class="item-icon-right" v-for="list in lists">
                <div class="titleStyle">{{list.cxtitle}}</div>
                <div class="cxStyle">产线:{{list.ycl}}万</div>
                <div class="progressContainer">
                    <div class="progress" :style="{width:list.wcbl*100+'%','background-color':'#3793cf'}">
                        <b>进度:{{list.wcbl*100}}%</b>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                lists:[],
                Csvj:{
                    sort:"0"
                }
            }
        },
        created() {
            this.handleListApproveHistory();
        },
        methods: {

            // 获取日志记录信息
            handleListApproveHistory() {
                fetch(this.$store.state.fetchPath + "/allocation/selScheduleByCx", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body:this.utils.formatParams(this.Csvj),
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
                    window.console.log(this.lists)
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
        margin-left:10px;
    }
    .cxStyle{
        font-size: 16px;
        text-align: left;
        margin-left:10px;
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
        position: relative;
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
