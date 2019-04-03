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
                    <FormItem label="月份：" style="margin-left:10px">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false" v-model="startTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <!--<Col span="4">-->
                    <!--<FormItem>-->
                        <!--<DatePicker type="month" placeholder="终止月份"  :editable="false" :clearable="false" v-model="endTime" style="width:150px"></DatePicker>-->
                    <!--</FormItem>-->
                <!--</Col>-->
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
            let ckjhl = 'CKJHL';
            return {
                loading:true,
                cx:'',
                startTime:new Date(),
                // endTime:this.utils.formatMonthEnd(),
                // pzData:[],
                cxData:[],
                cxCx:{
                    pz:''
                },
                columns: [
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
                            },
                            {
                                title: '合同量',
                                key: 'HJHTL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '完成比例',
                                key: 'SCHEDULEHJ',
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
                            key: 'PLANNUMXSZ',
                            align: 'center',
                            width: 100
                        },
                            {
                                title: '合同量（专业公司）',
                                key: 'ZYGSHTL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '合同量（分公司）',
                                key: 'ZYFGSHTL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '完成比例',
                                key: 'SCHEDULEXSZ',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '进度',
                                key: 'JDXSZ',
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
                            key: 'PLANNUMZGS',
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
                                key: 'SCHEDULEZGS',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '进度',
                                key: 'JDZGS',
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
                                key: 'SCHEDULECK',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '进度',
                                key: 'JDCK',
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
                this.loading = true;
                let params={};
                params.cxName = this.cx
                let startTime='date=';
                // let endTime='&endTime=';
                startTime=startTime+this.utils.formatMonthStart(this.startTime);
                // endTime=endTime+this.utils.formatMonthStart(this.endTime);
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getcxhtjd", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime+'&'+this.utils.formatParams(params),
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
                    for(var i=0;this.data.length>i;i++){
                        this.data[i].SCHEDULECK = this.data[i].SCHEDULECK+'%';
                        this.data[i].SCHEDULEZGS = this.data[i].SCHEDULEZGS+'%'
                        this.data[i].SCHEDULEXSZ = this.data[i].SCHEDULEXSZ+'%'
                        this.data[i].SCHEDULEHJ = this.data[i].SCHEDULEHJ+'%'
                    }
                    this.loading = false;
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