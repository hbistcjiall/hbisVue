<template>
    <div>
        <div style="width:40%;float:left;">
            <div style="width:100%;overflow: hidden">
                <button @click="getJt" :class="{ 'class-a1': isA1, 'class-a2': isA2}">集团</button>
                <button @click="getXszgs" :class="{ 'class-b1': isB1, 'class-b2': isB2}">销售总公司</button>
                <button @click="getZgs" :class="{ 'class-c1': isC1, 'class-c2': isC2}">子公司</button>
                <button @click="getCk" :class="{ 'class-d1': isD1, 'class-d2': isD2}">出口</button>
            </div>
            <div style="border:1px solid #e0e0e0;width:100%;">
                <div style="width:100%;margin-top:10px;overflow: hidden">
                <div style="float:right;">
                     <div class="CStyle">1%-49%<span style="background: #ed4117;"></span></div>
                     <div class="CStyle">5%0-79%<span style="background: #fa9909;"></span></div>
                     <div class="CStyle">80%-100%<span style="background: #2ebf6b;"></span></div>
                </div>
                </div>
                <div>
                    <ul>
                        <li class="item-icon-right" v-for="list in lists">
                            <div class="titleStyle" style="margin-top:10px;">{{list.title}}</div>
                            <div class="progressContainer">
                                <div class="progress" :style="{width:list.wcbl+'%','background-color':'#ed4117'}" v-if="list.wcbl <= 0.49">
                                    <b>已产量:{{list.ycl}}吨/{{list.wcbl}}%</b>
                                </div>
                                <div class="progress" :style="{width:list.wcbl+'%','background-color':'#fa9909'}" v-else-if="list.wcbl >0.49 && list.wcbl <= 0.79">
                                    <b>已产量:{{list.ycl}}吨/{{list.wcbl}}%</b>
                                </div>
                                <div class="progress" :style="{width:list.wcbl+'%','background-color':'#2ebf6b'}" v-else>
                                    <b>已产量:{{list.ycl}}吨/{{list.wcbl}}%</b>
                                </div>
                            </div>
                            <div class="progressContainer" style="margin-bottom:15px;">
                                <div class="progress" :style="{width:100+'%','background-color':'#33b7f6'}">
                                    <b>计划量:{{list.jhl}}吨/100%</b>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
             </div>
        </div>
        <div style="margin-left:10%;width:50%;float:right;">
        <div style="float:left;width:40%;">
            <div class="cxTitleStyle">产线</div>
            <div style="border:1px solid #e0e0e0;">
            <div class="pxTitleStyle">前10</div>
            <ul>
                <li class="item-icon-right" v-for="list in CXQ">
                    <div class="titleStyle">{{list.cxtitle}}<span style="margin-left:10px;">合同量:{{list.ycl}}万</span></div>
                    <div class="progressContainer">
                        <div class="PCtitle">进度:</div>
                        <div class="progress" :style="{width:list.wcbl+'%','background-color':'#3793cf'}">
                            <b style="position: absolute;left:13%">{{list.wcbl}}%</b>
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
                    <div class="titleStyle">{{list.cxtitle}}<span style="margin-left:10px;">合同量:{{list.ycl}}万</span></div>
                    <div class="progressContainer">
                        <div class="PCtitle">进度:</div>
                        <div class="progress" :style="{width:list.wcbl+'%','background-color':'#3793cf'}">
                            <b style="position: absolute;left:13%">{{list.wcbl}}%</b>
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
                isA1: true,
                isA2: false,
                isB1: false,
                isB2: true,
                isC1: false,
                isC2: true,
                isD1: false,
                isD2: true,
                lists:[
                ],
                CXQ:[
                ],
                CXH:[
                ],
                Csvj:{
                    flName:"",
                    date:'2019-03'
                },
                CXQvalue:{
                    flName:"",
                    sort:"1",
                    date:'2019-03'
                },
                CXHvalue:{
                    flName:"",
                    sort:"1",
                    date:'2019-03'
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
                    window.console.log(typeof (this.CXQ))
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
                    this.isA1= true,
                    this.isA2= false,
                    this.isB1= false,
                    this.isB2= true,
                    this.isC1= false,
                    this.isC2= true,
                    this.isD1= false,
                    this.isD2= true
                this.Csvj.flName = '';
                this.CXQvalue.flName = '';
                this.CXQvalue.sort = '1';
                this.CXHvalue.flName = '';
                this.CXHvalue.sort = '1';
                this.CXHvalue.date = '2019-03';
                this.Csvj.date = '2019-03';
                this.CXQvalue.date = '2019-03';
                this.handleListApproveHistory();
            },
            getXszgs(){
                    this.isA1= false,
                    this.isA2= true,
                    this.isB1= true,
                    this.isB2= false,
                    this.isC1= false,
                    this.isC2= true,
                    this.isD1= false,
                    this.isD2= true
                this.Csvj.flName = '3';
                this.CXQvalue.flName = '3';
                this.CXQvalue.sort = '0';
                this.CXHvalue.flName = '3';
                this.CXHvalue.sort = '1';
                this.CXHvalue.date = '2019-03';
                this.Csvj.date = '2019-03';
                this.CXQvalue.date = '2019-03';
                this.handleListApproveHistory();

            },
            getZgs(){
                    this.isA1= false,
                    this.isA2= true,
                    this.isB1= false,
                    this.isB2= true,
                    this.isC1= true,
                    this.isC2= false
                    this.isD1= false,
                    this.isD2= true
                this.Csvj.flName = '4';
                this.CXQvalue.flName = '4';
                this.CXQvalue.sort = '0';
                this.CXHvalue.flName = '4';
                this.CXHvalue.sort = '1';
                this.CXHvalue.date = '2019-03';
                this.Csvj.date = '2019-03';
                this.CXQvalue.date = '2019-03';
                this.handleListApproveHistory();
            },
            getCk(){
                    this.isA1= false,
                    this.isA2= true,
                    this.isB1= false,
                    this.isB2= true,
                    this.isC1= false,
                    this.isC2= true,
                    this.isD1= true,
                    this.isD2= false
                this.Csvj.flName = '2';
                this.CXQvalue.flName = '2';
                this.CXQvalue.sort = '0';
                this.CXHvalue.flName = '2';
                this.CXHvalue.sort = '1';
                this.CXHvalue.date = '2019-03';
                this.Csvj.date = '2019-03';
                this.CXQvalue.date = '2019-03';
                this.handleListApproveHistory();
            }
        }
    }
</script>

<style scoped>
    ul{
        list-style-type: none;
    }
    ul li{
        border-bottom:1px solid #e0e0e0;
        color:#808080;
    }
    button{
        background: none;
        outline:none;
    }
    .class-a1,.class-b1,.class-c1,.class-d1{
        border:none;
        border-radius: 0px;
        border-left:1px solid #e0e0e0;
        border-right:1px solid #e0e0e0;
        border-top:1px solid #e0e0e0;
        color:#808080;
        cursor: pointer;
        float:left;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        width:100px;
        height:30px;
    }
    .class-a2,.class-b2,.class-c2,.class-d2{
        border:none;
        border-radius: 0px;
        color:blue;
        cursor: pointer;
        float:left;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        width:100px;
        height:30px;
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
        position:relative;
        overflow: hidden;
    }
    div.progress{
        border-radius: 10px;
        height:18px;
        line-height: 18px;
    }
    b {
        color: #fff;
        font-weight: 100;
        font-size: 12px;
        position: absolute;
        left: 2%;
    }
    .PCtitle{
        position:absolute;
        left:3%;
        z-index: 10000;
        color:#fff;
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
