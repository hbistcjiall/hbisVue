<template>
    <div>
        <div class="divStyle">
            <Form :label-width="80">
                <FormItem label="产品类别:" style="float: left">
                    <Select v-model="cplb" style="width: 100px">
                        <Option value="">全部</Option>
                        <Option value="热板">热板</Option>
                        <Option value="冷板">冷板</Option>
                        <Option value="宽厚板">宽厚板</Option>
                        <Option value="棒线">棒线</Option>
                        <Option value="型带">型带</Option>
                    </Select>
                </FormItem>
                <FormItem label="月份:" style="float: left">
                    <DatePicker type="month" :editable="false" :clearable="false" v-model="startTime"
                                style="width:120px;margin-left: 10px">
                    </DatePicker>
                    <DatePicker type="month" :editable="false" :clearable="false" v-model="endTime"
                                style="width:120px;">
                    </DatePicker>
                </FormItem>
                <div style="float: right">
                <a :href="downloadUrl">
                    <Button type="primary" icon="ios-cloud-download-outline" style="float: right">导出</Button>
                </a>
                <Button @click="search" style="float: right;margin-right: 20px" icon="ios-search">查询</Button>
                </div>
            </Form>
        </div>
        <Table :loading="loading" border stripe :columns="columns12" :data="fecthdata6"
               style="margin-top: 20px;float: left;width: 100%;"
               ref="table">"
            ref="table">
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging"
              @on-change="changepage" @on-page-size-change='handlePageSize' style="margin-top:20px;">
        </Page>
    </div>
</template>

<script>
    export default {
        name: "cpzxljxsgsxyhxltjgn",
        data() {
            return {
                downloadUrl: '',
                downloadData: {},
                switchTime: true,
                resDatas: [],
                dataCount: 0,
                pageSize: 10,
                cplb: '',
                loading: true,
                startTime: new Date(),
                endTime: new Date(),
                fecthdata6: [],
                data: {
                    page: '0',
                    limit: '10',
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
                        width:90,
                        align: "center",
                        key: 'VARIETIES'
                    },
                    {
                        title: '总销量',
                        align: "center",
                        key: 'TOTALSALES',
                        render: (h, params) => {
                            params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                            return h('span',
                                params.row[params.column.key].toFixed(2)
                            )
                        }
                    },
                    {
                        title: '协议户数',
                        align: "center",
                        width:90,
                        key: 'PROTOCOLACCOUNTNUM',
                        render: (h, params) => {
                            params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                            return h('span',
                                params.row[params.column.key].toFixed(2)
                            )
                        }
                    },
                    {
                        title: '年协议量',
                        width:90,
                        align: "center",
                        key: 'PROTOCOLSALESYEAR',
                        render: (h, params) => {
                            params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                            return h('span',
                                params.row[params.column.key].toFixed(2)
                            )
                        }
                    },
                    {
                        title: '总公司协议户销量',
                        align: "center",
                        children: [
                            {
                                title: '销售量',
                                align: "center",
                                key: 'TOTALPROTOCOLSALES',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        params.row[params.column.key].toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '占年协议量比',
                                align: "center",
                                width:110,
                                key: 'TOTALPROTOCOLSALESOFYEAR',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        params.row[params.column.key].toFixed(2)+'%'
                                    )
                                }
                            },
                            {
                                title: '占产品总销量',
                                align: "center",
                                width:110,
                                key: 'TOTALPROTOCOLSALESOFPRODUCT',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        params.row[params.column.key].toFixed(2)+'%'
                                    )
                                }
                            },
                        ],
                    }, {
                        title: '协议户中自办公司销量',
                        align: "center",
                        children: [
                            {
                                title: '销售量',
                                align: "center",
                                key: 'ZIBANPROTOCOLSALES',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        params.row[params.column.key].toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '占协议总销量比',
                                align: "center",
                                width:130,
                                key: 'ZIBANPROTOCOLSALESOFTOTAL',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        params.row[params.column.key].toFixed(2)+'%'
                                    )
                                }
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
                                key: 'XIEYIPROTOCOLSALES',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        params.row[params.column.key].toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '占协议总销量比',
                                align: "center",
                                width:130,
                                key: 'XIEYIPROTOCOLSALESOFTOTAL',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        params.row[params.column.key].toFixed(2)+'%'
                                    )
                                }
                            },
                        ],
                    },
                ],
            }
        },
        created() {
            this.search();
        },
        methods: {
            changepage(index) {
                this.data.page = index;
                this.search();
            },
            handlePageSize(index) {
                this.data.limit = index;
                this.search();
            },
            search() {
                this.loading = true;
                let params = {};
                params.varieties = this.cplb;
                let startTime = 'beginTime=';
                let endTime = '&endTime=';
                this.switchTime ? (startTime = startTime + this.utils.formatMonthStart(this.startTime), endTime = endTime + this.utils.formatMonthStart(this.endTime)) : (startTime = startTime + this.utils.formatYearStart(this.year), endTime = endTime + this.utils.formatYearEnd(this.year));
                fetch(this.$store.state.fetchPath + "/productSalesProtocolAccountSales/list", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime + endTime + '&' + this.utils.formatParams(params) + '&' + this.utils.formatParams(this.data),
                    credentials: 'include'
                }).then((res) => {
                    if (res.status != 200) {
                        this.$Message.error('请求失败！');
                    } else {
                        return res.text();
                    }

                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    this.resDatas = res.data;
                    this.dataCount = parseInt(res.count);
                    this.pageSize = parseInt(res.pageSize);
                    if (this.dataCount < this.pageSize) {
                        this.fecthdata6 = this.utils.mergeRow(this.resDatas, 'COMPANYNAME');
                    } else {
                        this.fecthdata6 = this.utils.mergeRow(this.resDatas, 'COMPANYNAME').slice(0, this.pageSize);
                    }
                    this.downLoad();
                    this.loading = false;
                });
            },
            downLoad() {
                let params = {};
                params.cplb = this.cplb;
                let startTime = 'beginTime=';
                let endTime = '&endTime=';
                this.switchTime ? (startTime = startTime + this.utils.formatMonthStart(this.startTime), endTime = endTime + this.utils.formatMonthStart(this.endTime)) : (startTime = startTime + this.utils.formatYearStart(this.year), endTime = endTime + this.utils.formatYearEnd(this.year));
                this.downloadUrl = this.$store.state.fetchPath + "/productSalesProtocolAccountSales/export?" + startTime + endTime + '&' + this.utils.formatParams(params);
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

    .divStyle {
        width: 100%;
        height: 60px;
        margin: 0 auto;
        float: left;
    }
</style>