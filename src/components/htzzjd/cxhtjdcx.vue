<template>
    <div>
        <Form :label-width="70">
            <Row>
                <Col span="4">
                    <FormItem label="产线：" style="width:120px">
                        <Select style="width:120px"  v-model="cx" placeholder="请选择产线">
                            <Option v-for="item in cxData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="月份：" style="width:150px">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false" v-model="startTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem style="width:150px">
                        <DatePicker type="month" placeholder="终止月份"  :editable="false" :clearable="false" v-model="endTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4">
                    <Button @click="getList()" icon="ios-search" style="margin-right:10px;">查询</Button>
                    <Button @click="downLoad()" icon="ios-cloud-download-outline">导出</Button>
                </Col>
            </Row>

        </Form>
        <Table :columns="columns" :data="data" border height="500" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "cxhtjdcx",
        data() {
            return {
                cx:'',
                startTime:new Date(),
                endTime:this.utils.formatMonthEnd(),
                // pzData:[],
                cxData:[],
                cxCx:{
                    pz:''
                },
                columns: [
                    {
                        title: '产线',
                        key: 'NAME',
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
                                key: 'ZJHL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '合同量',
                                key: 'ZHTL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '完成比例',
                                key: 'ZWCBL',
                                align: 'center',
                                width: 100,
                            }
                        ]
                    },
                    {
                        title: '销售总公司',
                        key: 'zygs',
                        align: 'center',
                        children: [{
                            title: '计划量',
                            key: 'ZYJHL',
                            align: 'center',
                            width: 100
                        },
                            {
                                title: '合同量（专业公司）',
                                key: 'ZYHTL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '合同量（分公司）',
                                key: 'HTL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '完成比例',
                                key: 'WCBL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '进度',
                                key: 'JD',
                                align: 'center',
                                width: 100,
                            }
                        ]
                    },
                    {
                        title: '子公司（技术中心、事业部）',
                        key: 'fgs',
                        align: 'center',
                        children: [{
                            title: '计划量',
                            key: 'ZGSJHL',
                            align: 'center',
                            width: 100
                        },
                            {
                                title: '合同量',
                                key: 'ZGSHTL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '完成比例',
                                key: 'ZGSWCBL',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '进度',
                                key: 'ZGSJD',
                                align: 'center',
                                width: 100
                            }
                        ]
                    },
                    {
                        title: '出口',
                        key: 'fgs',
                        align: 'center',
                        children: [{
                            title: '计划量',
                            key: 'CKJHL',
                            align: 'center',
                            width: 100
                        },
                            {
                                title: '合同量',
                                key: 'CKHTL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '完成比例',
                                key: 'CKWCBL',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '进度',
                                key: 'CKJD',
                                align: 'center',
                                width: 100
                            }
                        ]
                    },
                ],
                data: []
            }
        },
        created() {
            this.getList();
            // fetch(this.$store.state.fetchPath + "/scm-steel-settle/getzyjhcxtjpz", {
            //     method: "POST",
            //     headers: this.$store.state.fetchHeader,
            //     body: '',
            //     credentials: 'include'
            // }).then((res) => {
            //     if(res.status!=200){
            //         this.$Message.error('请求失败！');
            //     }else{
            //         return res.text();
            //     }
            // }).then((res) => {
            //     res = res && res.length > 0 ? JSON.parse(res) : [];
            //     this.pzData = this.utils.getPz(res)
            // });
            this.getCxData();
        },
        methods: {
            getList() {
                let params={};
                params.cx = this.cx
                let startTime='startTime=';
                let endTime='&endTime=';
                startTime=startTime+this.utils.formatMonthStart(this.startTime);
                endTime=endTime+this.utils.formatMonthStart(this.endTime);
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getcxhtjd", {
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
                    this.data =  res;
                });
            },
            getCxData(){
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getzyjhcxtjcx", {
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
            downLoad(){
                this.$refs.table.exportCsv({
                    filename: '产线合同进度（产线）明细'
                });
            }
            // getCx(){
            //     this.cxCx.pz = this.zyjhcx.pz
            //     this.getCxData()
            // }
        }
    }
</script>

<style scoped>
    button{
        background: #3497db;
        color:#fff;
    }
</style>