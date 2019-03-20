<template>
    <div>
        <Form :label-width="180">
            <Row>
                <Col span="6">
                    <FormItem label="月份：" style="width:150px">
                        <DatePicker type="month" placeholder="请选择月份" v-model="month" style="width:120px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="责任单位：" style="width:150px">
                        <Select v-model="zrbm" style="width:120px" placeholder="请选择责任单位">
                            <Option value="">全部</Option>
                            <Option value="热板公司">热板公司</Option>
                            <Option value="冷板公司">冷板公司</Option>
                            <Option value="宽厚板公司">宽厚板公司</Option>
                            <Option value="棒线公司">棒线公司</Option>
                            <Option value="型材公司">型材公司</Option>
                            <Option value="唐钢分公司">唐钢分公司</Option>
                            <Option value="邯钢分公司">邯钢分公司</Option>
                            <Option value="宣钢分公司">宣钢分公司</Option>
                            <Option value="承钢分公司">承钢分公司</Option>
                            <Option value="舞钢分公司">舞钢分公司</Option>
                            <Option value="石钢公司">石钢公司</Option>
                            <Option value="衡板公司">衡板公司</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4">
                    <Button @click="getList()">查询</Button>
                </Col>
            </Row>
        </Form>
        <Table :columns="columns" :width="900" :data="data" border height="500"></Table>
    </div>
</template>

<script>
    export default {
        name: "ydzrdw",
        data() {
            return {
                month: '',
                zrbm: '',
                columns:[
                    {
                        title: '责任部门',
                        key: 'COMPANYNAME',
                        align: 'center',
                        width: 150
                    },
                    {
                        title: '2019年1月内贸结算',
                        key: 'nmjs',
                        align: 'center',
                        width: 750,
                        children:[
                            {

                                title: '总量',
                                key: 'FKIMG',
                                align: 'center',
                                width: 150,
                            },
                            {

                                title: '品种钢量',
                                key: 'PZGL',
                                align: 'center',
                                width: 150,
                            },
                            {

                                title: '比重',
                                key: 'BZ',
                                align: 'center',
                                width: 150,
                            },
                            {

                                title: '目标量',
                                key: 'MBL',
                                align: 'center',
                                width: 150,
                            },
                            {

                                title: '完成/目标',
                                key: 'PZGL/MBL',
                                align: 'center',
                                width: 150,
                            }

                        ]
                    },
                ],
                data:[]
            }
        },
        mounted() {
            this.getList();
        },
        methods:{
            getList() {

                let params={
                    zt:1// 1：按月查询,2:按年查询
                };
                this.zrbm?params.zrbm=this.zrbm:'';
                this.month?params.month=this.utils.formatMonth(this.month):'';
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getzrbm", {
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