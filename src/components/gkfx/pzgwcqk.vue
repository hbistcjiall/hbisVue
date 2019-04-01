<template>
    <div>
        <Row style="width:330px;margin:0px auto;">
            <div @click="getTime(0)" type="primary" :class="{ 'class-a': isA, 'class-b': isB}">本月</div>
            <div @click="getTime(1)" type="primary" :class="{ 'class-c': isC, 'class-d': isD}">上月</div>
            <div @click="getTime(2)" type="primary" :class="{ 'class-e': isE, 'class-f': isF}">本年</div>
        </Row>
        <div style="overflow: hidden;" class="PZGC">
            <ul style="width:100px;float:right;">
                <li v-for="(todo, index) in todos" v-on:click="tabsClick(index,$event)"
                    v-bind:class="{ blue:index==active}"> {{ todo.text }}</li>
            </ul>
        </div>
        <Table :loading="loading" :columns="columns" :data="resDatas" border height="500">
            <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
            </template>
        </Table>
    </div>
</template>

<script>
    export default {
        name: "pzgwcqk",
        data() {
            return {
                isA: true,
                isB: false,
                isC: true,
                isD: false,
                isE: true,
                isF: false,
                loading:true,
                active:0,
                zt:1,
                todos: [
                    { text: '品种' },
                    { text: '钢厂' },
                ],
                resDatas : [],
                resDatas1 : [],
                columns: [
                    {
                        title: '总量',
                        key: 'zl',
                        align: 'center',
                        children: [
                            {
                                title: '品种',
                                key: 'NAME',
                                align: 'center',
                            },
                            {
                                title: '完成量',
                                key: 'JSL',
                                align: 'center',
                            },
                        ]
                    },
                    {
                        title: '品种钢量',
                        key: 'pzgl',
                        align: 'center',
                        children: [{
                            title: '品种钢',
                            key: 'PZGL',
                            align: 'center',
                        },{
                            title: '完成比例',
                            key: 'WCL',
                            align: 'center',
                        },
                        ]
                    }
                ],
            }
        },
        mounted() {
            this.getTime(0,1);
        },
        methods: {
            getTime(index){
                let params = {
                    zt:this.zt
                }
                let startTime='startTime=';
                let endTime='&endTime=';
                switch (index) {
                    case 0:
                        this.isA= false;
                        this.isB= true;
                        this.isC= true;
                        this.isD= false
                        this.isE= true;
                        this.isF= false;
                        startTime=startTime+this.utils.formatMonthStart();
                        endTime=endTime+this.utils.formatMonthEnd();
                        break;
                    case 1:
                        this.isA= true;
                        this.isB= false;
                        this.isC= false;
                        this.isD= true
                        this.isE= true;
                        this.isF= false;
                        startTime=startTime+this.utils.formatMonthBefore();
                        endTime=endTime+this.utils.formatMonthStart();
                        break;
                    case 2:
                        this.isA= true;
                        this.isB= false;
                        this.isC= true;
                        this.isD= false
                        this.isE= false;
                        this.isF= true;
                        startTime=startTime+ this.utils.formatYearStart(new Date());
                        endTime=endTime+this.utils.formatYearEnd(new Date());
                        break;
                }
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getpzgjswc", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body:startTime+endTime+'&'+this.utils.formatParams(params),
                    credentials:'include'
                })
                    .then((res) => {
                        if(res.status!=200){
                            this.$Message.error('请求失败！');
                        }else{
                            return res.text();
                        }
                    }).then((res) => {
                    res = res&&res.length>0?JSON.parse(res):[]
                        this.resDatas =  res;
                        this.loading = false;
                })

            },
            tabsClick(index){
                this.active=index;
                this.zt = this.active+1;
                this.getTime(0,this.zt);
                if(index ==0){
                    this.columns[0].children[0].title = '品种'
                }else if(index == 1){
                    this.columns[0].children[0].title = '钢厂'
                }
            },
        }
    }
</script>
<style scoped>
    ul{
        list-style: none;
    }
    .PZGC ul li{
        font-size: 16px;
        cursor: pointer;
        float:left;
        margin-right:5px;
    }
    .PZGC ul li:first-child{
        border-right:1px solid #000;
        padding-right:5px;
    }
    .blue {color: #2175bc;}
    .class-a,.class-c,.class-e{
        width:100px;
        height:30px;
        background: #f2f3f7;
        border:none;
        color:#6c819b;
        margin-right:10px;
        cursor: pointer;
        float:left;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        border-radius: 3px;
        font-weight: bold;
    }
    .class-b,.class-d,.class-f{
        width:100px;
        height:30px;
        background: #d2d9e3;
        border:none;
        color:#6c819b;
        margin-right:10px;
        cursor: pointer;
        float:left;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        border-radius: 3px;
        font-weight: bold;
    }
</style>

