<template>
    <div>
        <Form :label-width="50">
            <Row>
                <Col span="6" v-if="!switchTime">
                    <FormItem label="年份：" style="width:250px">
                        <DatePicker type="year" placeholder="请选择年份"  v-model="year" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4"  v-if="switchTime">
                    <FormItem label="月份：" style="width:150px">
                        <DatePicker type="month" placeholder="起始月份"  v-model="startTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4" v-if="switchTime">
                    <FormItem style="width:150px">
                        <DatePicker type="month" placeholder="终止月份"  v-model="endTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="3">
                    <FormItem style="width:50px">
                    <i-switch v-model="switchTime" @on-change="changeSwitch">
                        <span slot="open">年</span>
                        <span slot="close">月</span>
                    </i-switch>
                    </FormItem>
                </Col>

                <Col span="5">
                    <FormItem label="单位：" style="width:120px">
                        <Select v-model="dw" style="width:120px" placeholder="请选择单位">
                            <Option value="">全部</Option>
                            <Option value="9580">唐钢</Option>
                            <Option value="9727">邯钢</Option>
                            <Option value="9193">宣钢</Option>
                            <Option value="9196">承钢</Option>
                            <Option value="1932">舞钢</Option>
                            <Option value="8110">石钢</Option>
                            <Option value="8493">衡板</Option>
                            <Option value="7778">邯宝</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="产线：" style="width:120px">
                        <Select style="width:120px"  v-model="cx" placeholder="请选择产线">
                            <Option value="cx1">产线一</Option>
                            <Option value="cx2">产线二</Option>
                            <Option value="cx3">产线三</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4"><Button type="info" @click="getList()">查询</Button></Col>
            </Row>

        </Form>
        <Table :columns="columns" :data="data" border height="500"></Table>
    </div>
</template>

<script>
    export default {
        name: "ndwcqk_cx",
        data() {
            return {
                switchTime:true,
                dw:'',
                year:new Date(),
                startTime:new Date(),
                endTime:this.utils.formatMonthEnd(),
                cx:'',
                columns: [{
                    title: '单位',
                    key: 'COMPANYNAME',
                    align: 'center',
                    width: 100,
                    fixed: 'left',
                    isMergeRow: true
                },
                    {
                        title: '产线',
                        key: 'NAME',
                        align: 'center',
                        width: 100,
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
            changeSwitch(){
                let date=new Date();
                this.switchTime?(this.startTime=date,this.endTime=this.utils.formatMonthEnd()):this.year=date;
            },
            getList() {
                let params={};
                this.dw?params.dw=this.dw:'';
                this.cx?params.cx=this.cx:'';
                let startTime='startTime=';
                let endTime='&endTime=';
                this.switchTime?(startTime=startTime+this.utils.formatMonthStart(this.startTime),endTime=endTime+this.utils.formatMonthStart(this.endTime)):(startTime=startTime+ this.utils.formatYearStart(this.year),endTime=endTime+this.utils.formatYearEnd(this.year));
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getcx", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime+endTime+'&'+this.utils.formatParams(params),
                    credentials: 'include'
                }).then((res) => {
                    return res.text();
                }).then((res) => {
                    res = res.length > 0 ? JSON.parse(res) : [];
                    this.data = this.utils.mergeRow(res, 'COMPANYNAME');
                });
            }
        }
    }
</script>

<style scoped>

</style>