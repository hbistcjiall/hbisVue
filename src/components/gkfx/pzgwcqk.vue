<template>
    <div>
        <div>
            <button @click="getTime(1)">本月</button>
            <button @click="getTime(2)">上月</button>
            <button @click="getTime(3)">本年</button>
            <button @click="getTime(1,1)">品种</button>
            <button @click="getTime(1,2)">钢厂</button>
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
                resDatas : [],
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
            this.getTime(1,1);
        },
        methods: {
            getTime(e,zt){
                let params = {}
                if(zt!=undefined){
                    params.zt = zt
                }else{
                    params.zt = '1'
                }


                let startTime='startTime=';
                let endTime='&endTime=';
                switch (e) {
                    case 1:
                        startTime=startTime+this.utils.formatMonthStart();
                        endTime=endTime+this.utils.formatMonthEnd();
                        break;
                    case 2:
                        window.console.log(new Date(new Date().getFullYear()+'-'+new Date().getMonth()-1));
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
            }
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
    }
</style>