<template>
    <div>
        <Form :label-width="100">
            <Row>
                <Col span="6" v-if="!switchTime">
                    <FormItem label="年份：">
                        <DatePicker type="year" placeholder="请选择年份" :editable="false" :clearable="false" v-model="year" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4"  v-if="switchTime">
                    <FormItem label="月份：">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false" v-model="startTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4" v-if="switchTime">
                    <FormItem>
                        <DatePicker type="month" placeholder="终止月份" :editable="false" :clearable="false" v-model="endTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="3">
                    <FormItem>
                        <i-switch v-model="switchTime" @on-change="changeSwitch">
                            <span slot="open">年</span>
                            <span slot="close">月</span>
                        </i-switch>
                    </FormItem>
                </Col>
                <Col span="5">
                    <FormItem label="责任单位：" style="width:180px">
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
                            <Option value="石钢分公司">石钢分公司</Option>
                            <Option value="衡板分公司">衡板分公司</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4">
                    <Button @click="getList()" icon="ios-search" type="primary" style="margin-right:10px;">查询</Button>
                    <Button @click="downLoad()" icon="ios-cloud-download-outline">导出</Button>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="550" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "pzgjs_zrzt",
        data() {
            return {
                loading:true,
                switchTime:true,
                year:new Date(),
                startTime:new Date(),
                titleYear:'',
                titleMonth:'',
                endTime:new Date(),
                zrbm: '',
                columns:[
                    {
                        title: '责任部门',
                        key: 'COMPANYNAME',
                        align: 'center',
                    },
                    {
                        title: '',
                        key: 'nmjs',
                        align: 'center',
                        children:[
                            {

                                title: '总量',
                                key: 'FKIMG',
                                align: 'center',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {

                                title: '品种钢量',
                                key: 'PZGL',
                                align: 'center',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {

                                title: '比重',
                                key: 'BZ',
                                align: 'center',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        ((Number(params.row[params.column.key]))*100).toFixed(2)+'%'
                                    )
                                }
                            },
                            {

                                title: '目标量',
                                key: 'MBL',
                                align: 'center',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {

                                title: '完成/目标',
                                key: 'WCBL',
                                align: 'center',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)+'%'
                                    )
                                }
                            }

                        ]
                    },
                ],
                data:[]
            }
        },
        mounted() {
            this.getList();
            this.titleMonth = this.utils.formatMonthStart(this.startTime).substring(5,7);
            this.titleYear = this.utils.formatYearStart(this.startTime).substring(0,4);
            this.columns[1].title = this.titleYear+'年'+ this.titleMonth+'月内贸结算'
        },
        methods:{
            changeSwitch(){
                let date=new Date();
                this.switchTime?(this.startTime=date,this.endTime=this.utils.formatMonthEnd()):this.year=date;
                if(this.switchTime == true){
                    this.columns[1].title = this.titleYear+'年'+ this.titleMonth+'月内贸结算'
                }else{
                    this.columns[1].title = this.titleYear+'年内贸结算'
                }
            },
            getList() {
                this.loading = true;
                let params={
                };
                this.zrbm?params.zrbm=this.zrbm:'';
                let startTime='startTime=';
                let endTime='&endTime=';
                this.switchTime?(startTime=startTime+this.utils.formatMonthStart(this.startTime),endTime=endTime+this.utils.formatMonthStart(this.endTime)):(startTime=startTime+ this.utils.formatYearStart(this.year),endTime=endTime+this.utils.formatYearEnd(this.year));
                this.titleMonth = this.utils.formatMonthStart(this.startTime).substring(5,7);
                this.titleYear = this.utils.formatYearStart(this.startTime).substring(0,4);
                if(this.switchTime == true){
                    this.columns[1].title = this.titleYear+'年'+ this.titleMonth+'月内贸结算'
                }else{
                    this.columns[1].title = this.titleYear+'年内贸结算'
                }
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getzrbm", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime+endTime+'&'+this.utils.formatParams(params),
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        return this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res =res && res.length > 0 ? JSON.parse(res) : [];
                    this.data = res;
                    this.loading = false;
                });
            },
            downLoad(){
                this.$refs.table.exportCsv({
                    filename: '结算完成（责任主体）明细'
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