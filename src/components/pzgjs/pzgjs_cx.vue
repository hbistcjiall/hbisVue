<template>
    <div>
        <Form :label-width="50">
            <Row>
                <Col span="6" v-if="!switchTime">
                    <FormItem label="年份：" style="width:250px">
                        <DatePicker type="year" placeholder="请选择年份" :editable="false" :clearable="false"  v-model="year" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4"  v-if="switchTime">
                    <FormItem label="月份：" style="width:150px">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false" v-model="startTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4" v-if="switchTime" style="margin-left: -40px">
                    <FormItem style="width:150px">
                        <DatePicker type="month" placeholder="终止月份"  :editable="false" :clearable="false" v-model="endTime" style="width:150px"></DatePicker>
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

                <Col span="4">
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
                            <Option v-for="item in cxData" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
        name: "pzgjs_cx",
        data() {
            return {
                dw:'',
                switchTime:true,
                year:new Date(),
                startTime:new Date(),
                endTime:this.utils.formatMonthEnd(),
                cx:'',
                columns: [{
                    title: '单位',
                    key: 'COMPANYNAME',
                    align: 'center',
                    fixed: 'left',
                    isMergeRow: true
                },
                    {
                        title: '产线',
                        key: 'NAME',
                        align: 'center',
                    },
                    {
                        title: '内贸总量',
                        key: 'nmzl',
                        align: 'center',
                        children: [
                            {
                                title: '内贸总量-总量',
                                key: 'FKIMG',
                                align: 'center',
                            },
                            {
                                title: '内贸总量-品种钢',
                                key: 'PZGL',
                                align: 'center',
                            },
                            {
                                title: '内贸总量-比重',
                                key: 'BZ',
                                align: 'center',
                            }
                        ]
                    },
                    {
                        title: '环比',
                        key: 'hb',
                        align: 'center',
                    },
                    {
                        title: '专业公司',
                        key: 'zygs',
                        align: 'center',
                        children: [{
                            title: '专业公司-总量',
                            key: 'ZYFKIMG',
                            align: 'center',
                        },
                            {
                                title: '专业公司-品种钢',
                                key: 'ZYPZGL',
                                align: 'center',
                            },
                            {
                                title: '专业公司-比重',
                                key: 'ZYBZ',
                                align: 'center',
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
                        },
                            {
                                title: '分公司-品种钢',
                                key: 'FGSPZGL',
                                align: 'center'
                            },
                            {
                                title: '分公司-比重',
                                key: 'FGSBZ',
                                align: 'center'
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
                            align: 'center'
                        },
                            {
                                title: '子公司-品种钢',
                                key: 'ZGSPZGL',
                                align: 'center'
                            },
                            {
                                title: '子公司-比重',
                                key: 'ZGSBZ',
                                align: 'center'
                            }
                        ]
                    }
                ],
                data: [],
                cxData:[],
                cxCx:{
                    pz:''
                },
            }
        },
        mounted() {
            this.getList();
            this.getCxData();
        },
        methods: {
            getCxData(){
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getzyjhcxtjcx", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.cxCx),
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    this.cxData = this.utils.getCx(res)
                });
            },
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
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }

                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    this.data = this.utils.mergeRow(res, 'COMPANYNAME');
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