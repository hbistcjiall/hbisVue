<template>
    <div>
        <Form :label-width="50">
            <Row>
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
                    <FormItem label="品种：" style="width:120px">
                        <Select style="width:120px"  v-model="cx" placeholder="请选择产线">
                            <Option value="cx1">产线一</Option>
                            <Option value="cx2">产线二</Option>
                            <Option value="cx3">产线三</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4"  v-if="switchTime">
                    <FormItem label="月份：" style="width:150px">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false" v-model="startTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4" v-if="switchTime">
                    <FormItem style="width:150px">
                        <DatePicker type="month" placeholder="终止月份"  :editable="false" :clearable="false" v-model="endTime" style="width:150px"></DatePicker>
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
                columns: [
                    {
                        title: '日期',
                        align: "center",
                        key: 'LOGTYPE'
                    },
                    {
                        title: '品种',
                        align: "center",
                        key: 'LOGNAME'
                    },
                    {
                        title: '产线',
                        align: "center",
                        key: 'userName'
                    },
                    {
                        title: '销售总公司',
                        align: "center",
                        key: 'CLASSNAME'
                    },
                    {
                        title: '子公司',
                        align: "center",
                        key: 'METHOD'
                    },
                    {
                        title: '出口',
                        align: "center",
                        key: 'CREATETIME'
                    },
                    {
                        title: '现货',
                        align: "center",
                        key: 'CREATETIME'
                    },
                    {
                        title: '总量',
                        align: "center",
                        key: 'MESSAGE',
                        ellipsis:true
                    },
                    {
                        title: '品种钢',
                        slot: 'action',
                        align: 'center',
                        width:'160px'
                    },
                    {
                        title: '品种钢比例',
                        slot: 'action',
                        align: 'center',
                        width:'160px'
                    }
                ],
                data: []
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
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
                    this.data =  res.data;
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