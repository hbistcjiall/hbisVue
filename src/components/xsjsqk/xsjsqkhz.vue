<template>
    <div>
        <Form :label-width="50">
            <Row>
                <Col span="4">
                    <FormItem label="月份：">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false" v-model="startTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem>
                        <DatePicker type="month" placeholder="终止月份"  :editable="false" :clearable="false" v-model="endTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4">
                    <Button @click="getList()" icon="ios-search" style="margin-right:10px;">查询</Button>
                    <!--<Button @click="downLoad()" icon="ios-cloud-download-outline">导出</Button>-->
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="550" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "xsjsqkhz",
        data() {
            return {
                loading:true,
                startTime:new Date(),
                endTime:new Date(),
                columns: [
                    {
                        title: '序号',
                        align: "center",
                        type:'index',
                    },
                    {
                        title: '钢厂',
                        align: "center",
                        key: 'COMPANYNAME'
                    },
                    {
                        title: '销售量（吨）',
                        align: "center",
                        key: 'FKIMG',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                Math.round(Number(params.row[params.column.key]))
                            )
                        }

                    },
                    {
                        title: '售价（元/吨）',
                        align: "center",
                        key: 'SJ',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                Math.round(Number(params.row[params.column.key]))
                            )
                        }
                    },
                    {
                        title: '销售额（万元）',
                        align: "center",
                        key: 'KZWI6',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                Math.round(Number(params.row[params.column.key]))
                            )
                        }
                    },
                ],
                data: []
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                this.loading = true;
                let startTime='startTime=';
                startTime+=this.utils.formatMonthStart(this.startTime)
                let endTime='&endTime=';
                endTime+=this.utils.formatMonthStart(this.endTime)
                let zt='&zt='
                zt+="2"
                fetch(this.$store.state.fetchPath + "/yxyb/getyxybpz", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime+endTime+zt,
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    this.data = res;
                    this.loading = false;
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
    .ivu-table-cell{
        text-overflow: ellipsis !important;
        word-break: break-all !important;
        padding-left:0px;
        padding-right:0px;
    }
</style>