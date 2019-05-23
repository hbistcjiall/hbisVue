<template>
    <div>
        <Form :label-width="100">
            <Row>
                <Col span="6" v-if="!switchTime" style="margin-left: -50px">
                    <FormItem label="年份：">
                        <DatePicker type="year"  placeholder="请选择年份" :editable="false" :clearable="false"  v-model="year" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="9"  v-if="switchTime" style="margin-left: -50px">
                    <FormItem label="月份：">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false"  v-model="startTime" style="width:150px"></DatePicker>
                        <DatePicker type="month" placeholder="终止月份" :editable="false" :clearable="false"  v-model="endTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="1">
                    <FormItem>
                        <i-switch v-model="switchTime" @on-change="changeSwitch">
                            <span slot="open">年</span>
                            <span slot="close">月</span>
                        </i-switch>
                    </FormItem>
                </Col>
                <Col span="4" style="margin-left: -20px">
                    <FormItem label="品种：" style="width: 120px">
                        <Select v-model="pz" style="width:120px" placeholder="请选择品种" @on-change="changeTitle()">
                            <Option value="">全部</Option>
                            <Option value="冷板">冷板</Option>
                            <Option value="热板">热板</Option>
                            <Option value="棒线">棒线</Option>
                            <Option value="宽厚板">宽厚板</Option>
                            <Option value="型带">型带</Option>
                            <Option value="高端产品">高端产品</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4" style="margin-left: -50px">
                    <FormItem label="产品等级：" style="width: 120px">
                        <Select v-model="zt" style="width:120px" placeholder="请选择产品等级" @on-change="changeTitle()">
                            <Option value="0">品种钢</Option>
                            <Option value="1">高端产品</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4" style="float: right;margin-bottom: 20px">
                    <Button @click="getList()" icon="ios-search" style="margin-right:10px;">查询</Button>
                    <Button @click="downLoad()" icon="ios-cloud-download-outline">导出</Button>
                    <a :href="downloadUrl"><Button type="primary" :loading="mxstats" style="margin-left:10px" @click="dw()">明细导出</Button></a>
                </Col>
            </Row>


        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="700" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "pzgjs_pz",
        data() {
            return {
                downloadUrl:'',
                mxstats:true,
                loading:true,
                switchTime:true,
                year:new Date(),
                startTime:new Date(new Date().getFullYear(), new Date().getMonth()-1, 1),
                endTime:new Date(new Date().getFullYear(), new Date().getMonth()-1, 1),
                pz:'',
                zt:'0',
                columns: [{
                    title: '品种',
                    key: 'NAME',
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
                                title: '总量（吨）',
                                key: 'FKIMG',
                                align: 'center',
                                width: 150,
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '品种钢（吨）',
                                key: 'PZGL',
                                align: 'center',
                                width: 150,
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
                                width: 100,
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])*100).toFixed(2)+"%"
                                    )
                                }
                            }
                        ]
                    },
                    // {
                    //     title: '环比',
                    //     key: 'HB',
                    //     align: 'center',
                    //     width: 90,
                    //     render: (h, params) => {
                    //         params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                    //         return h('span',
                    //             Number(params.row[params.column.key]).toFixed(2)+"%"
                    //         )
                    //     }
                    // },
                    {
                        title: '专业公司',
                        key: 'zygs',
                        align: 'center',
                        children: [{
                            title: '总量（吨）',
                            key: 'ZYFKIMG',
                            align: 'center',
                            width: 150,
                            render: (h, params) => {
                                params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                return h('span',
                                    Number(params.row[params.column.key]).toFixed(2)
                                )
                            }

                        },
                            {
                                title: '品种钢（吨）',
                                key: 'ZYPZGL',
                                align: 'center',
                                width: 150,
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
                                width: 100,
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])*100).toFixed(2)+"%"
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
                            title: '总量（吨）',
                            key: 'FGSFKIMG',
                            align: 'center',
                            width: 150,
                            render: (h, params) => {
                                params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                return h('span',
                                    Number(params.row[params.column.key]).toFixed(2)
                                )
                            }
                        },
                            {
                                title: '品种钢（吨）',
                                key: 'FGSPZGL',
                                align: 'center',
                                width: 150,
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
                                width: 90,
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])*100).toFixed(2)+"%"
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
                            title: '总量（吨）',
                            key: 'ZGSFKIMG',
                            align: 'center',
                            width: 150,
                            render: (h, params) => {
                                params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                return h('span',
                                    Number(params.row[params.column.key]).toFixed(2)
                                )
                            }
                        },
                            {
                                title: '品种钢（吨）',
                                key: 'ZGSPZGL',
                                align: 'center',
                                width: 150,
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
                                width: 100,
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])*100).toFixed(2)+"%"
                                    )
                                }
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
                this.mxstats = true;
                this.loading = true;
                let params={
                };
                let zt='&zt='+this.zt
                this.pz?params.pz=this.pz:'';
                let startTime='startTime=';
                let endTime='&endTime=';
                this.switchTime?(startTime=startTime+this.utils.formatMonthStart(this.startTime),endTime=endTime+this.utils.formatMonthStart(this.endTime)):(startTime=startTime+ this.utils.formatYearStart(this.year),endTime=endTime+this.utils.formatYearEnd(this.year));
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getpz", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime+endTime+'&'+this.utils.formatParams(params)+zt,
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
                    let result1 = 0;
                    let result2 = 0;
                    let result3 = 0;
                    let result4 = 0;
                    let result5 = 0;
                    let result6 = 0;
                    let result7 = 0;
                    let result8 = 0;

                    let result9 = 0;
                    let result10 = 0;
                    let result11 = 0;
                    let result12 = 0;
                    for(var i=0;i<this.data.length;i++){
                        result1 += this.data[i].FKIMG
                        result2 += this.data[i].PZGL
                        result3 += this.data[i].ZYFKIMG
                        result4 += this.data[i].ZYPZGL
                        result5 += this.data[i].FGSFKIMG
                        result6 += this.data[i].FGSPZGL
                        result7 += this.data[i].ZGSFKIMG
                        result8 += this.data[i].ZGSPZGL
                    }
                    if(result1 == 0 || result1=="" || result1 == null){
                        result9 = 0;
                    }else{
                        result9 = result2/result1
                    }
                    if(result3 == 0 || result3=="" || result3 == null){
                        result10 = 0;
                    }else{
                        result10 = result4/result3
                    }
                    if(result5 == 0 || result5=="" || result5 == null){
                        result11 = 0;
                    }else{
                        result11 = result6/result5
                    }
                    if(result7 == 0 || result7=="" || result7 == null){
                        result12 = 0;
                    }else{
                        result12 = result8/result7
                    }
                    let obj ={
                        NAME : "合计",
                        FKIMG : result1,
                        PZGL : result2,
                        ZYFKIMG : result3,
                        ZYPZGL : result4,
                        FGSFKIMG : result5,
                        FGSPZGL : result6,
                        ZGSFKIMG : result7,
                        ZGSPZGL : result8,
                        COMPANYNAME:'',
                        ZGSBZ:result12,
                        FGSBZ:result11,
                        ZYBZ:result10,
                        BZ:result9

                    }
                    this.data.unshift(obj)
                    this.loading = false;
                    this.mxstats = false;
                });
            },
            changeTitle(){
                if(this.zt=='1'){
                    this.columns[1].children[1].title="高端产品";
                    this.columns[3].children[1].title="高端产品";
                    this.columns[4].children[1].title="高端产品";
                    this.columns[5].children[1].title="高端产品";
                }else{
                    this.columns[1].children[1].title="品种钢";
                    this.columns[3].children[1].title="品种钢";
                    this.columns[4].children[1].title="品种钢";
                    this.columns[5].children[1].title="品种钢";
                }
                this.getList()
            },
            dw(){
                this.downMx();
            },
            downMx(){
                let startTime='startTime=';
                startTime+=this.utils.formatMonthStart(this.startTime)
                let endTime='&endTime=';
                endTime+=this.utils.formatMonthStart(this.endTime)
                let pz = "&pz="+this.pz
                this.downloadUrl=this.$store.state.fetchPath + "/export/exportPzgPz?"+startTime+endTime+pz;
            },
            downLoad(){
                this.$refs.table.exportCsv({
                    filename: '结算完成（品种）明细'
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