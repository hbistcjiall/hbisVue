<template>
    <div>
        <div>
            <button @click="getTime(1)">本月</button>
            <button @click="getTime(2)">上月</button>
            <button @click="getTime(3)">本年</button>
        </div>
        <Tabs type="card" @on-click="tabsClick()" :animated="false" v-model="active">
            <TabPane label="品种">
                <Table :columns="columns" :data="resDatas" border height="500">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                </Table>
            </TabPane>
            <TabPane label="钢厂">
                <Table :columns="columns1" :data="resDatas" border height="500">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                </Table>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    export default {
        name: "pzgwcqk",
        data() {
            return {
                active:0,
                zt:1,
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
                columns1: [
                    {
                        title: '总量',
                        key: 'zl',
                        align: 'center',
                        children: [
                            {
                                title: '钢厂',
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
            this.getTime(1,1);
        },
        methods: {
            getTime(e){
                let params = {
                    zt:this.zt
                }
                let startTime='startTime=';
                let endTime='&endTime=';
                switch (e) {
                    case 1:
                        startTime=startTime+this.utils.formatMonthStart();
                        endTime=endTime+this.utils.formatMonthEnd();
                        break;
                    case 2:
                        startTime=startTime+this.utils.formatMonthBefore();
                        endTime=endTime+this.utils.formatMonthStart();
                        break;
                    case 3:
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
            tabsClick(){
                this.zt = this.active+1;
                this.getTime(1,this.zt);
            },
        }
    }
</script>

<style scoped>
    button{
        background: #3497db;
        color:#fff;
        width:100px;
        height:30px;
        margin-left:20px;
        outline: none;
        border:none;
        cursor: pointer;
    }
</style>