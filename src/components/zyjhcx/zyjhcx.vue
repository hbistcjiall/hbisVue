<template>
    <div>
        <Form :label-width="60">
            <Row>
                <Col style="width: 200px;float: left">
                    <FormItem label="日期：">
                        <DatePicker type="month" placeholder="请选择" :editable="false" :clearable="false"
                                    v-model="startTime"></DatePicker>
                    </FormItem>
                </Col>
                <!--<Col span="4">-->
                    <!--<FormItem label="年份：" style="margin-left:-30px;">-->
                        <!--<DatePicker type="year" placeholder="年份" :editable="false" :clearable="false" v-model="zyjhcx.nf" style="width:150px"></DatePicker>-->
                    <!--</FormItem>-->
                <!--</Col>-->
                <!--<Col span="4">-->
                    <!--<FormItem label="月份：">-->
                        <!--<Select style="width:120px"  v-model="zyjhcx.yf" placeholder="请选择月份">-->
                            <!--<Option value="1">1月</Option>-->
                            <!--<Option value="2">2月</Option>-->
                            <!--<Option value="3">3月</Option>-->
                            <!--<Option value="4">4月</Option>-->
                            <!--<Option value="5">5月</Option>-->
                            <!--<Option value="6">6月</Option>-->
                            <!--<Option value="7">7月</Option>-->
                            <!--<Option value="8">8月</Option>-->
                            <!--<Option value="9">9月</Option>-->
                            <!--<Option value="10">10月</Option>-->
                            <!--<Option value="11">11月</Option>-->
                            <!--<Option value="12">12月</Option>-->
                        <!--</Select>-->
                    <!--</FormItem>-->
                <!--</Col>-->
                <Col style="width: 200px;float: left">
                    <FormItem label="品种：">
                        <Select v-model="zyjhcx.pz" placeholder="请选择品种" @on-change="getCx">
                            <Option value="全部">全部</Option>
                            <Option value="热板">热板</Option>
                            <Option value="冷板">冷板</Option>
                            <Option value="宽厚板">宽厚板</Option>
                            <Option value="棒线">棒线</Option>
                            <Option value="型带">型带</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col style="width: 340px;float: left">
                    <FormItem label="产线：" style="">
                        <Select  v-model="cx" placeholder="请选择产线" filterable multiple>
                            <Option v-for="item in cxData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col style="width: 250px;float: left">
                    <FormItem label="销售主体：" :label-width="80" style="">
                        <Select  v-model="zyjhcx.xszt" placeholder="请选择销售主体">
                            <Option value="">全部</Option>
                            <Option value="销售总公司">销售总公司</Option>
                            <Option value="技术中心、事业部">技术中心、事业部</Option>
                            <Option value="出口">出口</Option>
                            <Option value="现货">现货</Option>
                        </Select>
                    </FormItem>
                </Col>

                <!--<Col span="2" style="line-height: 30px;margin-top: 10px;float: right">-->
                <!--</Col>-->
            </Row>
            <Row>
                <Col style="width: 200px;float: right;margin-bottom: 20px">
                    <Button @click="getList()" icon="ios-search" style="margin-right:10px;">查询</Button>
                    <Button @click="downLoad()" :loading="dwstats" icon="ios-cloud-download-outline">导出</Button>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="700" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "pzgjs_cx",
        data() {
            return {
                dwstats:true,
                loading:true,
                zyjhcx:{
                    pz:'全部',
                    // nf:2019,
                    //yf:4
                    xszt:''
                },
                startTime:new Date(),
                cx:[],
                pzData:[],
                cxData:[],
                xsztData:[],
                cxCx:{
                    pz:''
                },
                columns: [
                    {
                        title: '日期',
                        align: "center",
                        key: 'RQ'
                    },
                    {
                        title: '品种',
                        align: "center",
                        key: 'PZ'
                    },
                    {
                        title: '产线',
                        align: "center",
                        key: 'CX'
                    },
                    {
                        title: '销售主体',
                        align: "center",
                        key: 'FL_NAME'
                    },
                    {
                        title: '计划量(吨)',
                        align: "center",
                        key: 'JHL',
                        render: (h, params) => {
                            return h('span',
                                params.row[params.column.key]=params.row[params.column.key]==''?'0.00':params.row[params.column.key]
                            )
                        }
                    }
                ],
                data: []
            }
        },
        mounted() {
            this.getList();
            this.getCxData();
        },
        methods: {
            getList() {
                this.dwstats = true;
                this.loading = true;
                let cx = 'cx='+this.cx.toString();
                let startTime = 'startTime=';
                startTime = startTime + (this.utils.formatMonthStart(this.startTime)).substring(0, 7);
            // if(this.zyjhcx.nf!=''){
                //     this.zyjhcx.nf=new Date(this.zyjhcx.nf).getFullYear().toString()
                // }else{
                //     this.zyjhcx.nf=''
                // }
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getzyjh", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.zyjhcx)+'&'+cx+'&'+startTime,
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
                    const compare = (name, minor) => {
                        return function (o, p) {
                            var a, b;
                            if (o && p && typeof o === 'object' && typeof p === 'object') {
                                a = o[name];
                                b = p[name];
                                if (a === b) {
                                    return typeof minor === 'function' ? minor(o, p) : 0;
                                }
                                if (typeof a === typeof b) {
                                    return a < b ? -1 : 1;
                                }
                                return typeof a < typeof b ? -1 : 1;
                            } else {
                                this.$Message.error("error");
                            }
                        }
                    };
                    this.data.sort(compare('RQ', compare('CX', compare('XSZT',compare('PZ')))))
                    this.loading = false;
                    this.dwstats = false;
                });
            },
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
                    this.cxData = this.utils.getCx(res);
                    // let getall = {label:'全部',value:''};
                    // this.cxData.unshift(getall)
                });
            },
            getCx(){
                this.cxCx.pz = this.zyjhcx.pz
                this.getCxData()
            },
            downLoad(){
                this.$refs.table.exportCsv({
                    filename: '资源计划明细'
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