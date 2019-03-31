<template>
    <div>
        <Form :label-width="100">
            <Row>
                <Col span="4">
                    <FormItem label="品种：" style="width:120px">
                        <Select v-model="pz" style="width:120px" placeholder="请选择品种">
                            <!--<Option v-for="item in pzData" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                            <Option value="">全部</Option>
                            <Option value="热板">热板</Option>
                            <Option value="冷板">冷板</Option>
                            <Option value="宽厚板">宽厚板</Option>
                            <Option value="棒线">棒线</Option>
                            <Option value="型带">型带</Option>
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
        <Table :loading="loading" :columns="columns" :data="data" border height="500" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "cxhtjdpz",
        data() {
            return {
                loading:true,
                pz:'',
                startTime:new Date(),
                endTime:this.utils.formatMonthEnd(),
                // pzData:[],
                columns: [
                    {
                        title: '品种',
                        key: 'VARIETY',
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
                                key: 'ZYWCBL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '进度',
                                key: 'ZYJD',
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
        mounted() {
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
        },
        methods: {
            getList() {
                let params={};
                params.pz = this.pz
                let startTime='startTime=';
                let endTime='&endTime=';
                startTime=startTime+this.utils.formatMonthStart(this.startTime);
                endTime=endTime+this.utils.formatMonthStart(this.endTime);
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getpzhtjd", {
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
                    this.loading = false;
                });
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
</style>