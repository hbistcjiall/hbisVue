<template>
    <div>
        <Form :label-width="80">
            <Row>
                <Col span="4">
                    <FormItem label="产品类别:">
                        <Select v-bind="cplb">
                            <Option value="">全部</Option>
                            <Option value="">热板</Option>
                            <Option value="">冷板</Option>
                            <Option value="">宽厚板</Option>
                            <Option value="">棒线</Option>
                            <Option value="">型带</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="月份:">
                        <DatePicker type="month" :editable="false" :clearable="false" v-model="startTime"
                                    style="width:120px;margin-left: -30px">
                        </DatePicker>
                        <span>一</span>
                        <DatePicker type="month" :editable="false" :clearable="false" v-model="endTime"
                                    style="width:120px;">
                        </DatePicker>
                    </FormItem>
                </Col>
                <Col span="8" style="float: left ">
                    <Button @click="search" style="margin-left:20px" icon="ios-search">查询</Button>
                    <Button @click="downLoad" style="margin-left: 20px" icon="ios-cloud-download-outline">导出</Button>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" border stripe :columns="columns12" :data="fecthdata6" style="margin-top: 20px"
               ref="table">
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging"
              @on-change="changepage" style="margin-top:20px;">
        </Page>
    </div>
</template>

<script>
    export default {
        name: "cpzxljxsgsxyhxltjgn",
        data() {
            return {
                switchTime:true,
                resDatas:[],
                dataCount: 0,
                pageSize: 10,
                cplb:'',
                loading: true,
                startTime: new Date(),
                endTime: this.utils.formatMonthEnd(),
                fecthdata6: [],
                data:{
                    page: '0',
                    limit: '20',
                },
                columns12: [
                    {
                        title: '子公司',
                        align: "center",
                        key: 'COMPANYNAME',
                        fixed: 'left',
                        isMergeRow: true
                    },
                    {
                        title: '产品类别',
                        align: "center",
                        key: 'VARIETIES'
                    },
                    {
                        title: '总销量',
                        align: "center",
                        key: 'TOTALSALES'
                    },
                    {
                        title: '协议户数',
                        align: "center",
                        key: 'PROTOCOLACCOUNTNUM'
                    },
                    {
                        title: '年协议量',
                        align: "center",
                        key: 'PROTOCOLSALESYEAR'
                    },
                    {
                        title: '总公司协议户销量',
                        align: "center",
                        children: [
                            {
                                title: '销售量',
                                align: "center",
                                key: 'TOTALPROTOCOLSALES'
                            },
                            {
                                title: '占年协议量比',
                                align: "center",
                                key: 'TOTALPROTOCOLSALESOFYEAR'
                            },
                            {
                                title: '占产品总销量',
                                align: "center",
                                key: 'TOTALPROTOCOLSALESOFPRODUCT'
                            },
                        ],
                    },{
                        title: '协议户中自办公司销量',
                        align: "center",
                        children: [
                            {
                                title: '销售量',
                                align: "center",
                                key: 'ZIBANPROTOCOLSALES'
                            },
                            {
                                title: '占协议总销量比',
                                align: "center",
                                key: 'ZIBANPROTOCOLSALESOFTOTAL'
                            },
                        ],
                    },
                    {
                        title: '协议户中执行协议政策销量',
                        align: "center",
                        children: [
                            {
                                title: '销售量',
                                align: "center",
                                key: 'XIEYIPROTOCOLSALES'
                            },
                            {
                                title: '占协议总销量比',
                                align: "center",
                                key: 'XIEYIPROTOCOLSALESOFTOTAL'
                            },
                        ],
                    },
                ],
            }
        },
        created(){
            this.search();
        },
        methods:{
            changepage(index) {
                this.ddlxyjglxdyData.page = index;
                this.search();
            },
            search(){
                let params={};
                this.cplb?params.cplb=this.cplb:'';
                let startTime='beginTime=';
                let endTime='&endTime=';
                this.switchTime?(startTime=startTime+this.utils.formatMonthStart(this.startTime),endTime=endTime+this.utils.formatMonthStart(this.endTime)):(startTime=startTime+ this.utils.formatYearStart(this.year),endTime=endTime+this.utils.formatYearEnd(this.year));
                fetch(this.$store.state.fetchPath + "/productSalesProtocolAccountSales/list", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime+endTime+'&'+this.utils.formatParams(params)+this.utils.formatParams(this.data),
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }

                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    this.resDatas = res.data;
                    this.dataCount = parseInt(res.count);
                    this.pageSize = parseInt(res.pageSize);
                    if (this.dataCount < this.pageSize) {
                        // this.fecthdata6 = this.resDatas;
                        this.fecthdata6 = this.utils.mergeRow(res.data, 'COMPANYNAME');
                    } else {
                        // this.fecthdata6 = this.resDatas.slice(0, this.pageSize);
                        this.fecthdata6 = this.utils.mergeRow(res.data, 'COMPANYNAME').slice(0, this.pageSize);
                    }

                    // this.fecthdata6 = this.utils.mergeRow(res, 'COMPANYNAME');

                    this.loading = false;
                });
            },
            downLoad() {
                this.$refs.table.exportCsv({
                    filename: '产品总销量'
                });
            }
        },
    }
</script>

<style scoped>
    .paging {
        float: right;
        margin-top: 10px;
    }
    button {
        background: #3497db;
        color: #fff;
    }

    table button {
        background: #f2f4f7;
        color: #546c8c;
    }
</style>