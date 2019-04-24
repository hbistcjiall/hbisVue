<template>
    <div>
        <Form :label-width="70">
            <Row>
                <Col span="4">
                    <FormItem label="单位：">
                        <Select style="width:100px"  v-model="dw" placeholder="请选择单位" filterable @on-change="getCx()" >
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
                <Col span="7">
                    <FormItem label="产线：">
                        <Select style="width:300px"  v-model="cx" placeholder="请选择产线" filterable multiple>
                            <Option v-for="item in cxData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="月份：" style="margin-left:70px">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false" v-model="startTime" style="width:130px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4">
                    <span>&nbsp;</span>
                </Col>
                <Col span="4">
                    <Button @click="getList()" icon="ios-search" style="margin-right:10px;">查询</Button>
                    <Button @click="downLoad()" icon="ios-cloud-download-outline">导出</Button>
                </Col>
            </Row>

        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="500" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "cxhtjdcx",
        data() {
            // let ckjhl = 'CKJHL';
            return {
                loading:true,
                cx:[],
                startTime:new Date(),
                // endTime:new Date(),
                dw:'全部',
                // pzData:[],
                cxData:[],
                cxCx:{
                    companyId:''
                },
                columns: [
                    {
                        title: '单位',
                        key: 'COMPANYID',
                        align: 'center',
                        width: 100,
                    },
                    {
                        title: '产线',
                        key: 'DNAME',
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
                                key: 'HJJHL',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '合同量',
                                key: 'HJHTL',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '完成比例',
                                key: 'SCHEDULEHJ',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)+"%"
                                    )
                                }
                            }
                        ]
                    },
                    {
                        title: '销售总公司',
                        key: 'zygs',
                        align: 'center',
                        children: [{
                            title: '计划量',
                            key: 'PLANNUMXSZ',
                            align: 'center',
                            width: 100,
                            render: (h, params) => {
                                params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                return h('span',
                                    Number(params.row[params.column.key]).toFixed(2)
                                )
                            }
                        },
                            {
                                title: '专业公司',
                                key: 'ZYGSHTL',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '分公司',
                                key: 'ZYFGSHTL',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '完成比例',
                                key: 'SCHEDULEXSZ',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)+"%"
                                    )
                                }
                            },
                            {
                                title: '进度',
                                key: 'JDXSZ',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            }
                        ]
                    },
                    {
                        title: '子公司（技术中心、事业部）',
                        key: 'fgs',
                        align: 'center',
                        children: [{
                            title: '计划量',
                            key: 'PLANNUMZGS',
                            align: 'center',
                            width: 100,
                            render: (h, params) => {
                                params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                return h('span',
                                    Number(params.row[params.column.key]).toFixed(2)
                                )
                            }
                        },
                            {
                                title: '合同量',
                                key: 'ZGSHTL',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '完成比例',
                                key: 'SCHEDULEZGS',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)+"%"
                                    )
                                }
                            },
                            {
                                title: '进度',
                                key: 'JDZGS',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            }
                        ]
                    },
                    {
                        title: '出口',
                        key: 'fgs',
                        align: 'center',
                        children: [{
                            title: '计划量',
                            key: 'PLANNUMCK',
                            align: 'center',
                            width: 100,
                            render: (h, params) => {
                                params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                return h('span',
                                    Number(params.row[params.column.key]).toFixed(2)
                                )
                            }
                        },
                            {
                                title: '合同量',
                                key: 'CKHTL',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '完成比例',
                                key: 'SCHEDULECK',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)+"%"
                                    )
                                }
                            },
                            {
                                title: '进度',
                                key: 'JDCK',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            }
                        ]
                    },
                ],
                data: []
            }
        },
        created() {
            this.getList();
            this.getCxData();
        },
        methods: {
            getList() {
                this.loading = true;
                let cxName = 'cxName='+this.cx.toString();
                let dwName='companyId='+this.dw;
                let startTime='startTime=';
                startTime=startTime+this.utils.formatMonthStart(this.startTime);
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getcxhtjd", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime+'&'+cxName+'&'+dwName,
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    this.data =  res;
                    let result1 = 0;
                    let result2 = 0;
                    let result3 = 0;
                    let result4 = 0;
                    let result5 = 0;
                    let result6 = 0;
                    let result7 = 0;
                    let result9 = 0;
                    let result10 = 0;
                    let result11 = 0;
                    let result13 = 0;
                    let result14 = 0;
                    let result15 = 0;
                    for(var i=0;i<this.data.length;i++){
                        result1 += this.data[i].HJJHL
                        result2 += this.data[i].HJHTL

                        result4 += this.data[i].PLANNUMXSZ
                        result5 += this.data[i].ZYGSHTL
                        result6 += this.data[i].ZYFGSHTL

                        result9 += this.data[i].PLANNUMZGS
                        result10 += this.data[i].ZGSHTL

                        result13 += this.data[i].PLANNUMCK
                        result14 += this.data[i].CKHTL
                    }
                    if(result1 == 0 || result1=="" || result1 == null){
                        result3 = 0;
                    }else{
                        result3 = Number(result2/result1)*100
                    }
                    if(result4 == 0 || result4=="" || result4 == null){
                        result7 = 0;
                    }else{
                        result7 = Number((result5+result6)/result4)*100
                    }
                    if(result9 == 0 || result9=="" || result9 == null){
                        result11 = 0;
                    }else{
                        result11 = Number(result10/result9)*100
                    }
                    if(result13 == 0 || result13=="" || result13 == null){
                        result15 = 0;
                    }else{
                        result15 = Number(result14/result13)*100
                    }
                    let result8 = (result5+result6)-result4
                    let result12 = result10-result9
                    let result16 = result14-result13

                    let obj ={
                        DNAME : "合计",
                        HJJHL : result1,
                        HJHTL : result2,
                        SCHEDULEHJ : result3,

                        PLANNUMXSZ : result4,
                        ZYGSHTL : result5,
                        ZYFGSHTL : result6,
                        SCHEDULEXSZ : result7,
                        JDXSZ:result8,

                        PLANNUMZGS : result9,
                        ZGSHTL : result10,
                        SCHEDULEZGS : result11,
                        JDZGS : result12,

                        PLANNUMCK : result13,
                        CKHTL : result14,
                        SCHEDULECK : result15,
                        JDCK : result16,

                    }
                    this.data.push(obj)
                    this.loading = false;
                });
            },
            getCxData(){
                this.cxCx.companyId = this.dw
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getCxName", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body:this.utils.formatParams(this.cxCx),
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
                this.cxData=[];
                this.getCxData()
            },
            downLoad(){
                this.$refs.table.exportCsv({
                    filename: '产线合同进度（产线）明细'
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