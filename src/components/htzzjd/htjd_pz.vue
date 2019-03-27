<template>
    <div>
        <div style="width:40%;float:left;">
        <div>
            <Button @click="getJt">集团</Button>
            <Button @click="getXszgs">销售总公司</Button>
            <Button @click="getZgs">子公司</Button>
            <Button @click="getCk">出口</Button>
        </div>
        <div style="border:1px solid #e0e0e0">
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
        </div>
        <div style="margin-left:10%;width:50%;float:right;">
        <div style="float:left;width:40%;">
            <div class="cxTitleStyle">产线</div>
            <div style="border:1px solid #e0e0e0;">
            <div class="pxTitleStyle">前10</div>
            <ul>
                <li class="item-icon-right" v-for="list in CXQ">
                    <div class="titleStyle">{{list.cxtitle}},合同量:{{list.ycl}}万</div>
                    <div class="progressContainer">
                        <div class="progress" :style="{width:list.wcbl*100+'%','background-color':'#3793cf'}">
                            <b>进度:{{list.wcbl*100}}%</b>
                        </div>
                    </div>
                </li>
            </ul>
            </div>
        </div>
        <div style="float:right;width:40%;">
            <div class="cxTitleStyle">产线</div>
            <div style="border:1px solid #e0e0e0;">
                <div class="pxTitleStyle">后10</div>
            <ul>
                <li class="item-icon-right" v-for="list in CXH" style="font-size: 5px">
                    <div class="titleStyle">{{list.cxtitle}},合同量:{{list.ycl}}万</div>
                    <div class="progressContainer">
                        <div class="progress" :style="{width:list.wcbl*100+'%','background-color':'#3793cf'}">
                            <b>进度:{{list.wcbl*100}}%</b>
                        </div>
                    </div>
                </li>
            </ul>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: "htjd_pz",
        data() {
            return {
                lists:[],
                CXQ:[],
                CXH:[],
                Csvj:{
                    flName:"",
                },
                CXQvalue:{
                    flName:"",
                    sort:"0"
                },
                CXHvalue:{
                    flName:"",
                    sort:"1"
                },
            }
        },
        created() {
            this.handleListApproveHistory();
        },
        methods: {
            handleListApproveHistory(){
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

                fetch(this.$store.state.fetchPath + "/allocation/selScheduleByCx", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body:this.utils.formatParams(this.CXQvalue),
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res.length>0?JSON.parse(res):[];
                    this.CXQ =  this.utils.htjdTree(res);
                })

                fetch(this.$store.state.fetchPath + "/allocation/selScheduleByCx", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body:this.utils.formatParams(this.CXHvalue),
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res.length>0?JSON.parse(res):[];
                    this.CXH =  this.utils.htjdTree(res);
                })
            },
            getJt(){
                this.Csvj.flName = '';
                this.CXQvalue.flName = '';
                this.CXQvalue.sort = '0';
                this.CXHvalue.flName = '';
                this.CXHvalue.sort = '1';
                this.handleListApproveHistory();
            },
            getXszgs(){
                this.Csvj.flName = '3';
                this.CXQvalue.flName = '3';
                this.CXQvalue.sort = '0';
                this.CXHvalue.flName = '3';
                this.CXHvalue.sort = '1';
                this.handleListApproveHistory();

            },
            getZgs(){
                this.Csvj.flName = '4';
                this.CXQvalue.flName = '4';
                this.CXQvalue.sort = '0';
                this.CXHvalue.flName = '4';
                this.CXHvalue.sort = '1';
                this.handleListApproveHistory();
            },
            getCk(){
                this.Csvj.flName = '2';
                this.CXQvalue.flName = '2';
                this.CXQvalue.sort = '0';
                this.CXHvalue.flName = '2';
                this.CXHvalue.sort = '1';
                this.handleListApproveHistory();
            }
        }
    }
</script>

<style scoped>
    ul{
        list-style-type:none;
    }
    ul li{
        border-bottom:1px solid #e0e0e0;
        color:#808080;
    }
    button{
        border:none;
        border-radius: 0px;
        border:1px solid #e0e0e0;
        color:blue;
    }
    .titleStyle{
        font-size: 16px;
        text-align: left;
        margin-top:5px;
        margin-left:5px;
    }
    div.progressContainer{
        height: 18px;
        width: 100%;
        border-radius: 10px;
        background-color: #ddd;
        margin-bottom:10px;
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
    .cxTitleStyle{
        border:1px solid #e0e0e0;
        width:100px;
        font-size:18px;
        font-weight: bold;
        color:#808080;
    }
    .pxTitleStyle{
        font-size: 24px;
        font-weight: bold;
        text-align: left;
        border-bottom:1px solid #e0e0e0;
        color:#808080;
    }
</style>
