<template>
    <div>
        <Form :label-width="50">
            <Row>
                <Col span="6" v-if="!switchTime">
                    <FormItem label="年份：">
                        <DatePicker type="year" placeholder="请选择年份" :editable="false" :clearable="false"  v-model="year" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4"  v-if="switchTime">
                    <FormItem label="月份：">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false" v-model="startTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4" v-if="switchTime">
                    <FormItem>
                        <DatePicker type="month" placeholder="终止月份"  :editable="false" :clearable="false" v-model="endTime" style="width:150px"></DatePicker>
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

                <Col span="4">
                    <FormItem label="单位：">
                        <Select v-model="dw" placeholder="请选择单位" @on-change="getCx">
                            <Option value="全部">全部</Option>
                            <Option value="9580">河钢唐钢</Option>
                            <Option value="9727">河钢邯钢</Option>
                            <Option value="9193">河钢宣钢</Option>
                            <Option value="9196">河钢承钢</Option>
                            <Option value="1932">河钢舞钢</Option>
                            <Option value="8110">河钢石钢</Option>
                            <Option value="8493">河钢衡板</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6" style="margin-left: 20px">
                    <FormItem label="产线：">
                        <Select  v-model="cx" placeholder="请选择产线" filterable multiple style="width: 235px">
                            <Option v-for="item in cxData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row style="margin-bottom: 20px">
                <Col span="4">
                    <FormItem label="产品等级：" style="width:180px">
                        <Select v-model="zt" style="width:120px" placeholder="请选择品种" @on-change="changeTitle()">
                            <Option value="0">品种钢</Option>
                            <Option value="1">高端产品</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4">
                    <Button @click="getList()" icon="ios-search" style="margin-right:10px;">查询</Button>
                    <Button @click="downLoad()" icon="ios-cloud-download-outline">导出</Button>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="550" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "pzgjs_cx",
        data() {
            return {
                loading:true,
                dw:'全部',
                zt:'0',
                switchTime:true,
                year:new Date(),
                startTime:new Date(),
                endTime:new Date(),
                cx:[],
                columns: [{
                    title: '单位',
                    key: 'COMPANYNAME',
                    align: 'center',
                    fixed: 'left',
                    width:'100',
                    isMergeRow: true
                },
                    {
                        title: '产线',
                        key: 'NAME',
                        align: 'center',
                        width:'100',
                    },
                    {
                        title: '内贸总量',
                        key: 'nmzl',
                        align: 'center',
                        children: [
                            {
                                title: '总量',
                                key: 'FKIMG',
                                width:'100',
                                align: 'center',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            },
                            {
                                title: '品种钢',
                                key: 'PZGL',
                                align: 'center',
                                width:'100',
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
                                width:'90',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])*100).toFixed(2)+'%'
                                    )
                                }

                            }
                        ]
                    },
                    {
                        title: '环比',
                        key: 'HB',
                        align: 'center',
                        width:'90',
                        render: (h, params) => {
                            params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                            return h('span',
                                Number(params.row[params.column.key]).toFixed(2)+'%'
                            )
                        }
                    },
                    {
                        title: '专业公司',
                        key: 'zygs',
                        align: 'center',
                        children: [{
                            title: '总量',
                            key: 'ZYFKIMG',
                            width:'100',
                            align: 'center',
                            render: (h, params) => {
                                params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                return h('span',
                                    Number(params.row[params.column.key]).toFixed(2)
                                )
                            }
                        },
                            {
                                title: '品种钢',
                                key: 'ZYPZGL',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '比重',
                                key: 'ZYBZ',
                                align: 'center',
                                width:'90',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])*100).toFixed(2)+'%'
                                    )
                                }
                            }
                        ]
                    },
                    {
                        title: '分公司',
                        key: 'fgs',
                        align: 'center',
                        children: [{
                            title: '总量',
                            key: 'FGSFKIMG',
                            align: 'center',
                            width:'100',
                            render: (h, params) => {
                                params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                return h('span',
                                    Number(params.row[params.column.key]).toFixed(2)
                                )
                            }
                        },
                            {
                                title: '品种钢',
                                key: 'FGSPZGL',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '比重',
                                key: 'FGSBZ',
                                align: 'center',
                                width:'90',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])*100).toFixed(2)+'%'
                                    )
                                }
                            }
                        ]
                    },
                    {
                        title: '子公司',
                        key: 'zgs',
                        align: 'center',
                        children: [{
                            title: '总量',
                            key: 'ZGSFKIMG',
                            align: 'center',
                            width:'100',
                            render: (h, params) => {
                                params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                return h('span',
                                    Number(params.row[params.column.key]).toFixed(2)
                                )
                            }
                        },
                            {
                                title: '品种钢',
                                key: 'ZGSPZGL',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '比重',
                                key: 'ZGSBZ',
                                align: 'center',
                                width:'90',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])*100).toFixed(2)+'%'
                                    )
                                }
                            }
                        ]
                    }
                ],
                data: [],
                cxData:[],
                cxCx:{
                    companyId:''
                },
            }
        },
        mounted() {
            this.getList();
            this.getCxData();
        },
        methods: {
            getCxData(){
                this.cxCx.companyId = this.dw
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getCxNamePzg", {
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
            getCx(){
                this.getCxData()
            },
            changeSwitch(){
                let date=new Date();
                this.switchTime?(this.startTime=date,this.endTime=this.utils.formatMonthEnd()):this.year=date;
            },
            getList() {
                this.loading = true;
                let params={};
                // this.dw?params.dw=this.dw:'';
                let zt="&zt="+this.zt;
                let dwStr = '&dw='+this.dw;
                let cxArr = '&cx=' +this.cx.toString()
                this.cx?params.cx=this.cx:'';
                let startTime='startTime=';
                let endTime='&endTime=';
                this.switchTime?(startTime=startTime+this.utils.formatMonthStart(this.startTime),endTime=endTime+this.utils.formatMonthStart(this.endTime)):(startTime=startTime+ this.utils.formatYearStart(this.year),endTime=endTime+this.utils.formatYearEnd(this.year));
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getcx", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime+endTime+dwStr+cxArr+zt,
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
                    this.loading = false;
                });
            },
            changeTitle(){
                if(this.zt=="0"){
                    this.columns[2].children[1].title="品种钢";
                    this.columns[4].children[1].title="品种钢";
                    this.columns[5].children[1].title="品种钢";
                    this.columns[6].children[1].title="品种钢";

                }else{
                    this.columns[2].children[1].title="高端产品";
                    this.columns[4].children[1].title="高端产品";
                    this.columns[5].children[1].title="高端产品";
                    this.columns[6].children[1].title="高端产品";
                }
                this.getList();
            },
            downLoad(){
                this.$refs.table.exportCsv({
                    filename: '结算完成（产线）明细'
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