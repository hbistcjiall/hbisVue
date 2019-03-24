<template>
    <div>
        <Table :columns="columns" :data="data" border height="500"></Table>
    </div>
</template>

<script>
    export default {
        name: "pzgwcqk",
        data() {
            return {
                byValue:{},
                columns: [
                    {
                        title: '合计',
                        key: 'nmzl',
                        align: 'center',
                        width: 100,
                        children: [
                            {
                                title: '计划量',
                                key: 'FKIMG',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '合同量',
                                key: 'PZGL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '完成比例',
                                key: 'BZ',
                                align: 'center',
                                width: 100,
                            }
                        ]
                    },
                    {
                        title: '销售总公司',
                        key: 'zygs',
                        align: 'center',
                        children: [{
                            title: '计划量',
                            key: 'ZYFKIMG',
                            align: 'center',
                            width: 100
                        },
                            {
                                title: '合同量（专业公司）',
                                key: 'ZYPZGL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '合同量（分公司）',
                                key: 'ZYPZGL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '完成比例',
                                key: 'ZYBZ',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '进度',
                                key: 'ZYBZ',
                                align: 'center',
                                width: 100,
                            }
                        ]
                    },
                    {
                        title: '子公司（技术中心、事业部）',
                        key: 'fgs',
                        align: 'center',
                        children: [{
                            title: '计划量',
                            key: 'FGSFKIMG',
                            align: 'center',
                            width: 100
                        },
                            {
                                title: '合同量',
                                key: 'FGSPZGL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '完成比例',
                                key: 'FGSBZ',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '进度',
                                key: 'FGSBZ',
                                align: 'center',
                                width: 100
                            }
                        ]
                    },
                    {
                        title: '出口',
                        key: 'fgs',
                        align: 'center',
                        children: [{
                            title: '计划量',
                            key: 'FGSFKIMG',
                            align: 'center',
                            width: 100
                        },
                            {
                                title: '合同量',
                                key: 'FGSPZGL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '完成比例',
                                key: 'FGSBZ',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '进度',
                                key: 'FGSBZ',
                                align: 'center',
                                width: 100
                            }
                        ]
                    },
                ],
            }
        },
        mounted() {
            fetch(this.$store.state.fetchPath + "/protocolAccountDetails/resourceplanthrid", {
                method: "POST",
                headers: this.$store.state.fetchHeader,
                body:this.utils.formatParams(this.byValue),
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
                this.resDatas3 =  res;
                for(var i=0;i<this.resDatas3.length;i++){
                    this.resDatas3[i].BILI = this.resDatas3[i].BILI;
                }
            })
        },
        methods: {
        }
    }
</script>

<style scoped>
    button{
        background: #3497db;
        color:#fff;
    }
</style>