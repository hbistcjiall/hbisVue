<template>
    <div>
        <Form :label-width="100">
            <Row>
                <Col span="4">
                    <FormItem label="子公司：" style="width:120px;">
                        <Select style="width:120px" v-model="zgs">
                            <Option v-for="item in zgslist" :value="item.value">{{item.lable}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4" v-if="switchTime">
                    <FormItem label="交货截至日期：" style="width:120px;margin-left: 40px">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false" v-model="startTime"
                                    style="width:120px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4" v-if="switchTime">
                    <FormItem style="width:120px;">
                        <DatePicker type="month" placeholder="终止月份" :editable="false" :clearable="false" v-model="endTime" style="width:120px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4" v-if="switchTime">
                    <FormItem label="记录日期：" style="width:120px;margin-left: 20px">
                        <DatePicker type="date" placeholder="记录时间" :editable="false" :clearable="false" v-model="jiluTime"
                                    style="width:120px"></DatePicker>
                        <!--<DatePicker type="date"  placeholder="Select date" style="width: 150px" v-model="startTime"></DatePicker>-->
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="发货量汇总方式：" style="width:120px;margin-left: 40px">
                        <Select style="width:120px" v-model="hz">
                            <Option value="1">去0统计</Option>
                            <Option value="0">不去0统计</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="2" style="margin-left: 90px">
                    <Button @click="getList()" icon="ios-search">查询</Button>
                </Col>
            </Row>
        </Form>
        <Table :columns="columns" :data="data" border height="500"></Table>
    </div>
</template>

<script>
    export default {
        name: "khdxlfx",
        data(){
            return{
                columns:[
                    {
                        title:'单位',
                        align: "center",
                        width: 100,
                        key:'companyId'
                    },
                    {
                        title:'日期',
                        align: "center",
                        width: 100,
                        key:'',
                        children:[
                            {
                                title:"合同量",
                                align: "center",
                                width: 350,
                                key:'contractWeight',
                            },
                            {
                                title:"发货量",
                                align: "center",
                                width: 350,
                                key:'deliveryWeight',
                            },
                            {
                                title:"兑现率",
                                align: "center",
                                width: 350,
                                key:'cashRate',
                            },
                        ]
                    },
                ],
                zgslist:[
                    {
                        lable:'全部',
                        value:'-1'
                    },
                    {
                        lable:'河钢唐钢',
                        value:'9580'
                    },
                    {
                        lable:'河钢邯钢',
                        value:'9727'
                    },
                    {
                        lable:'河钢宣钢',
                        value:'9193'
                    },
                    {
                        lable:'河钢承钢',
                        value:'9196'
                    },{
                        lable:'河钢舞钢',
                        value:'1932'
                    },{
                        lable:'河钢石钢',
                        value:'8110'
                    },{
                        lable:'河钢衡板',
                        value:'8493'
                    },
                ],
                switchTime:true,
                zgs:'',
                hz:'',
                startTime:new Date(),
                endTime:this.utils.formatMonthEnd(),
                jiluTime:new Date(),
                data:[],
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                let params={};
                this.zgs?params.companyId=this.zgs:'';
                this.hz?params.summaryType=this.hz:'';
                let startTime='orderStopDateS=';
                let endTime='orderStopDateE=';
                let jiluTime='recordDate=';
                this.switchTime?(startTime=startTime+(this.utils.formatMonthStart(this.startTime)).substring(0, 7),endTime=endTime+(this.utils.formatMonthStart(this.endTime)).substring(0, 7),jiluTime=(jiluTime+this.utils.formatdate(this.jiluTime)).substring(0, 21)):(startTime=startTime+ (this.utils.formatYearStart(this.year)).substring(0, 7),endTime=endTime+(this.utils.formatYearEnd(this.year)).substring(0, 7),jiluTime=(jiluTime+this.utils.formatdate(this.jiluTime)).substring(0, 21));
                // this.switchTime?(startTime=(startTime+ this.utils.formatdate(this.startTime)).substring(0, 20)):(startTime=startTime+ this.utils.formatYearStart(this.year));
                fetch(this.$store.state.fetchPath + "/reportCashRate/cashRateSummary", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime+'&'+endTime+'&'+jiluTime+'&'+this.utils.formatParams(params),
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    console.log(startTime),
                    console.log(endTime),
                    console.log(jiluTime),
                    console.log(params),
                    window.console.log(res.list);
                    this.data =  res.list;
                });
            }
        }
    }
</script>

<style scoped>

</style>