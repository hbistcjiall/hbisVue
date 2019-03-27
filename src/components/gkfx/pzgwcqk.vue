<template>
    <div>
        <div class="searchDate">
            <ul>
                <li v-for="(item, index) in searchV" v-on:click="getTime(index,$event)"
                    v-bind:addClass="{ dateStyle:index==datev}">{{ item.text }}</li>
            </ul>
        </div>
        <div style="overflow: hidden;" class="PZGC">
            <ul style="width:100px;float:right;">
                <li v-for="(todo, index) in todos" v-on:click="tabsClick(index,$event)"
                    v-bind:class="{ blue:index==active}"> {{ todo.text }}</li>
            </ul>
        </div>
        <Table :columns="columns" :data="resDatas" border height="500">
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
                datev:0,
                active:0,
                zt:1,
                todos: [
                    { text: '品种' },
                    { text: '钢厂' },
                ],
                searchV: [
                    { text: '本月' },
                    { text: '上月' },
                    { text: '本年' },
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
                this.datev=index;
                let params = {
                    zt:this.zt
                }
                let startTime='startTime=';
                let endTime='&endTime=';
                switch (index) {
                    case 0:
                        startTime=startTime+this.utils.formatMonthStart();
                        endTime=endTime+this.utils.formatMonthEnd();

                        break;
                    case 1:
                        startTime=startTime+this.utils.formatMonthBefore();
                        endTime=endTime+this.utils.formatMonthStart();
                        break;
                    case 2:
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
    .dateStyle{
        background: red;
    }
    .searchDate ul li{
        width:100px;
        height:30px;
        background: #f3f4f7;
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
    .searchDate{
        overflow: hidden;
    }
    .searchDate ul{
        width: 330px;
        margin: 0 auto;
    }
</style>

