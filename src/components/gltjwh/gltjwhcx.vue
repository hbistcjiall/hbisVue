<template>
    <div>
        <Form :label-width="80">
            <Row>
                <Col style="width: 320px;float: left">
                    <FormItem label="日期：">
                        <DatePicker type="date" placeholder="记录时间" :editable="false" :clearable="false"
                                    v-model="startTime"
                                    style="width:110px;margin-left: -20px;"></DatePicker>
                        <DatePicker type="date" placeholder="记录时间" :editable="false" :clearable="false"
                                    v-model="endTime"
                                    style="width:110px;margin-left: 20px"></DatePicker>
                    </FormItem>
                </Col>
                <Col style="width: 200px;float: left">
                    <FormItem label="钢厂：" style="">
                        <Select v-model="gc" placeholder="请选择">
                            <Option value="全部">全部</Option>
                            <Option value="9580">唐钢</Option>
                            <Option value="9727">邯钢</Option>
                            <Option value="9193">宣钢</Option>
                            <Option value="9196">承钢</Option>
                            <Option value="1932">舞钢</Option>
                            <Option value="8110">石钢</Option>
                            <Option value="8493">衡板</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col style="width: 200px;float: left">
                    <FormItem label="查询表：" style="">
                        <Select @on-change="changewww()" v-model="cxb" placeholder="请选择">
                            <Option value="SCM_SALE_ORDER">订单表</Option>
                            <Option value="SCM_DELIVERY_DETAIL">发货表</Option>
                            <Option value="SCM_STEEL_SETTLE">结算表</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col style="width: 200px;float: left;margin-left: 20px">
                    <FormItem label="过滤类型：">
                        <Select v-model="glzd" placeholder="请选择">
                            <Option v-for="item in cxData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col style="width: 100px;float: right">
                    <Button @click="getList()" icon="ios-search">查询</Button>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="700" ref="table"></Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging" @on-change="changepage" @on-page-size-change='handlePageSize' style="margin-top:20px;"></Page>
    </div>
</template>

<script>
    export default {
        name: "gltjwhcx",
        data(){
            return{
                dataCount: 0,
                pageSize: 10,
                limit:'10',
                page:'0',
                loading:false,
                startTime:new Date(),
                endTime:new Date(),
                gc:'全部',
                cxb:'SCM_SALE_ORDER',
                glzd:'',
                data: [],
                columns:[
                    {
                        title: '序号',
                        align: "center",
                        type:'index',
                        width:60
                    },
                    {
                        title: '钢厂',
                        align: "center",
                        key: 'COMPANYNAME'
                    },
                    {
                        title: '类型',
                        align: "center",
                        key: 'F_NAME'
                    },
                    {
                        title: '总量（吨）',
                        align: "center",
                        key: 'HTL'
                    },
                ],
                cxData:[],
            }
        },
        mounted(){
            this.getcxb();
        },
        methods:{
            changewww(){
                this.getcxb();
                this.cxb

            },
            handlePageSize(index){
                this.limit = index;
                this.getList();
            },
            changepage(index) {
                this.page=index;
                this.getList();
            },
            getList(){
                if(this.glzd=='')
                {
                    alert('请选择过滤类型！')
                    return
                }
                this.loading = true;
                let companyId ='companyId='+this.gc;
                let startTime='startTime='+this.utils.formatMonthStart(this.startTime);
                let endTime='endTime='+this.utils.formatMonthStart(this.endTime);
                let tableName='tableName='+this.cxb;
                let fName='fName='+this.glzd;
                let limit='limit='+this.limit;
                let page='page='+this.page;
                fetch(this.$store.state.fetchPath + "/scm-filter/selFilterDzl", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: companyId+'&'+fName+'&'+startTime+'&'+endTime+'&'+tableName+'&'+limit+'&'+page,
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    this.data=res.data;
                    this.dataCount =  parseInt(res.count);
                    this.pageSize = parseInt(res.pageSize);
                    if(this.dataCount < this.pageSize){
                        this.data = res.data;
                    }else{
                        this.data = res.data.slice(0,this.pageSize);
                    }
                    this.loading = false;
                });
            },
            getcxb(){
                this.cxData={};
                let tableName ='tableName=';
                tableName+=this.cxb;
                fetch(this.$store.state.fetchPath + "/scm-filter/selFilterColumn", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: tableName,
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    this.cxData = this.utils.getcxb(res)
                });
            }
        },

    }
</script>

<style scoped>
    button {
        background: #3497db;
        color: #fff;
    }
    .paging{
        float:right;
        margin-top:10px;
    }
</style>