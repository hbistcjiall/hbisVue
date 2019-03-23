<template>
    <div>
        <Form :label-width="100">
            <Row>
                <Col span="4">
                    <FormItem label="品种：" style="width:120px">
                        <Select v-model="cxhtjdcx.pz" style="width:120px" placeholder="请选择品种">
                            <Option v-for="item in pzData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem style="width:150px" label="计划月份：">
                        <Select style="width:120px"  v-model="cxhtjdcx.yf" placeholder="请选择月份">
                            <Option value="1">1月</Option>
                            <Option value="2">2月</Option>
                            <Option value="3">3月</Option>
                            <Option value="4">4月</Option>
                            <Option value="5">5月</Option>
                            <Option value="6">6月</Option>
                            <Option value="7">7月</Option>
                            <Option value="8">8月</Option>
                            <Option value="9">9月</Option>
                            <Option value="10">10月</Option>
                            <Option value="11">11月</Option>
                            <Option value="12">12月</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4"><Button @click="getList()" icon="ios-search">查询</Button></Col>
            </Row>

        </Form>
        <Table :columns="columns" :data="data" border height="500"></Table>
    </div>
</template>

<script>
    export default {
        name: "cxhtjdpz",
        data() {
            return {
                cxhtjdcx:{
                    pz:'',
                    yf:'1'
                },
                pzData:[],
                columns: [
                    {
                        title: '品种',
                        key: 'NAME',
                        align: 'center',
                        width: 100,
                    },
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
                data: []
            }
        },
        mounted() {
            this.getList();
            fetch(this.$store.state.fetchPath + "/scm-steel-settle/getzyjhcxtjpz", {
                method: "POST",
                headers: this.$store.state.fetchHeader,
                body: '',
                credentials: 'include'
            }).then((res) => {
                if(res.status!=200){
                    this.$Message.error('请求失败！');
                }else{
                    return res.text();
                }
            }).then((res) => {
                res = res && res.length > 0 ? JSON.parse(res) : [];
                this.pzData = this.utils.getPz(res)
            });
        },
        methods: {
            getList() {
                // fetch(this.$store.state.fetchPath + "/scm-steel-settle/getzyjh", {
                //     method: "POST",
                //     headers: this.$store.state.fetchHeader,
                //     body: this.utils.formatParams(this.zyjhcx),
                //     credentials: 'include'
                // }).then((res) => {
                //     if(res.status!=200){
                //         this.$Message.error('请求失败！');
                //     }else{
                //         return res.text();
                //     }
                // }).then((res) => {
                //     res = res && res.length > 0 ? JSON.parse(res) : [];
                //     this.data =  res;
                // });
            }
        }
    }
</script>

<style scoped>
    button{
        background: #3497db;
        color:#fff;
    }
</style>