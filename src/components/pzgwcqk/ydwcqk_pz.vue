<template>
    <div>
        <Form :label-width="180">
            <Row>
                <Col span="6">
                    <FormItem label="月份：" style="width:150px">
                        <DatePicker type="month" placeholder="请选择月份"  v-model="month" style="width:120px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="品种：" style="width:150px">
                        <Select v-model="pz" style="width:120px" placeholder="请选择品种">
                            <Option value="">全部</Option>
                            <Option value="冷板">冷板</Option>
                            <Option value="热板">热板</Option>
                            <Option value="棒线">棒线</Option>
                            <Option value="宽厚板">宽厚板</Option>
                            <Option value="型带">型带</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4"><Button @click="getList()">查询</Button></Col>
            </Row>

        </Form>
        <Table :columns="columns" :data="data" border height="500"></Table>
    </div>
</template>

<script>
    export default {
        name: "ydwcqk_pz",
        data() {
            return {
                month:'',
                pz:'',
                columns: [{
                    title: '品种',
                    key: 'VARIETY',
                    align: 'center',
                    width: 100,
                    fixed: 'left'
                },
                    {
                        title: '内贸总量',
                        key: 'nmzl',
                        align: 'center',
                        width: 100,
                        children: [
                            {
                                title: '内贸总量-总量',
                                key: 'FKIMG',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '内贸总量-品种钢',
                                key: 'PZGL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '内贸总量-比重',
                                key: 'BZ',
                                align: 'center',
                                width: 100,
                            }
                        ]
                    },
                    {
                        title: '环比',
                        key: 'hb',
                        align: 'center',
                        width: 100,
                    },
                    {
                        title: '专业公司',
                        key: 'zygs',
                        align: 'center',
                        children: [{
                            title: '专业公司-总量',
                            key: 'ZYFKIMG',
                            align: 'center',
                            width: 100
                        },
                            {
                                title: '专业公司-品种钢',
                                key: 'ZYPZGL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '专业公司-比重',
                                key: 'ZYBZ',
                                align: 'center',
                                width: 100,
                            }
                        ]
                    },
                    {
                        title: '分公司',
                        key: 'fgs',
                        align: 'center',
                        children: [{
                            title: '分公司-总量',
                            key: 'FGSFKIMG',
                            align: 'center',
                            width: 100
                        },
                            {
                                title: '分公司-品种钢',
                                key: 'FGSPZGL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '分公司-比重',
                                key: 'FGSBZ',
                                align: 'center',
                                width: 100
                            }
                        ]
                    },
                    {
                        title: '子公司',
                        key: 'zgs',
                        align: 'center',
                        children: [{
                            title: '子公司-总量',
                            key: 'ZGSFKIMG',
                            align: 'center',
                            width: 100
                        },
                            {
                                title: '子公司-品种钢',
                                key: 'ZGSPZGL',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '子公司-比重',
                                key: 'ZGSBZ',
                                align: 'center',
                                width: 100
                            }
                        ]
                    }
                ],
                data: []
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {

                let params={
                    zt:1// 1：按月查询,2:按年查询
                };
                this.pz?params.pz=this.pz:'';
                this.month?params.month=this.utils.formatMonth(this.month):'';
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getndpz", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(params),
                    credentials: 'include'
                }).then((res) => {
                    return res.text();
                }).then((res) => {
                    res = res.length > 0 ? JSON.parse(res) : [];
                    this.data = res;
                });
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