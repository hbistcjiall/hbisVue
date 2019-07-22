<template>
    <div>
        <Form :label-width="60">
            <Row>
                <Col style="width: 200px;float:left;margin-right: 20px">
                    <FormItem label="子公司：">
                        <Select style="" v-model="zgs">
                            <Option v-for="item in zgslist" :value="item.value">{{item.lable}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col v-if="switchTime" style="width:360px;float: left">
                    <FormItem label="交货截至日期：" :label-width="100">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false"
                                    v-model="startTime"
                                    style="width:120px;margin-left:-20px"></DatePicker>
                        <DatePicker type="month" placeholder="终止月份" :editable="false" :clearable="false"
                                    v-model="endTime"  style="width:120px;margin-left:20px"></DatePicker>
                    </FormItem>
                </Col>
                <Col style="width:200px;float: left;margin-left:20px" v-if="switchTime">
                    <FormItem label="记录日期：" :label-width="80">
                        <DatePicker type="date" placeholder="记录时间" :editable="false" :clearable="false"
                                    v-model="jiluTime"
                                    style=""></DatePicker>
                        <!--<DatePicker type="date"  placeholder="Select date" style="width: 150px" v-model="startTime"></DatePicker>-->
                    </FormItem>
                </Col>
                <Col style="width: 200px;float: left;margin-left:20px" >
                    <FormItem label="发货量汇总方式：" :label-width="120">
                        <Select style="width:120px;" v-model="hz">
                            <Option value="1">去0统计</Option>
                            <Option value="0">不去0统计</Option>
                        </Select>
                    </FormItem>
                </Col>

            </Row>
            <Row>
                <Col style="float: right;margin-bottom:20px;width: 200px;">
                    <Button @click="getList()" icon="ios-search">查询</Button>
                    <Button @click="downLoad()" :loading="dwstats" icon="ios-cloud-download-outline">导出</Button>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="700" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "khdxlfx",
        data() {
            return {
                dwstats:true,
                startTime: new Date(),
                endTime: new Date(),
                NewStartTime: this.utils.formatMonthStart(this.startTime).substring(6, 7),
                NewEndTime: this.utils.formatMonthEnd(this.endTime).substring(6, 7),
                riqi: [],
                newdata: [],
                loading: true,
                columns: [],
                z: 0,
                zgslist: [
                    {
                        lable: '全部',
                        value: '-1'
                    },
                    {
                        lable: '河钢唐钢',
                        value: '9580'
                    },
                    {
                        lable: '河钢邯钢',
                        value: '9727'
                    },
                    {
                        lable: '河钢宣钢',
                        value: '9193'
                    },
                    {
                        lable: '河钢承钢',
                        value: '9196'
                    }, {
                        lable: '河钢舞钢',
                        value: '1932'
                    }, {
                        lable: '河钢石钢',
                        value: '8110'
                    }, {
                        lable: '河钢衡板',
                        value: '8493'
                    },
                ],
                switchTime: true,
                zgs: '',
                hz: '',

                jiluTime: new Date(),
                data: [],
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                this.columns = [];
                this.columns.push({
                    title: '单位',
                    align: "center",
                    // width: 100,
                    key: 'companyName'
                });
                let startMonth = this.startTime.getMonth() + 1;
                let endMonth = this.endTime.getMonth() + 1;
                let kd = Number(endMonth) - Number(startMonth) != 0 ? Number(endMonth) - Number(startMonth) + 1 : 0;//月份跨度
                let hetongyuefen =
                    [
                        'contractWeightJan',
                        'contractWeightFeb',
                        'contractWeightMar',
                        'contractWeightApr',
                        'contractWeightMay',
                        'contractWeightJun',
                        'contractWeightJul',
                        'contractWeightAug',
                        'contractWeightSept',
                        'contractWeightOct',
                        'contractWeightNov',
                        'contractWeightDec',
                    ];
                let fahuoyuefen =
                    [
                        'deliveryWeightJan',
                        'deliveryWeightFeb',
                        'deliveryWeightMar',
                        'deliveryWeightApr',
                        'deliveryWeightMay',
                        'deliveryWeightJun',
                        'deliveryWeightJul',
                        'deliveryWeightAug',
                        'deliveryWeightSept',
                        'deliveryWeightOct',
                        'deliveryWeightNov',
                        'deliveryWeightDec',
                    ];
                let duixian =
                    [
                        'cashRateJan',
                        'cashRateFeb',
                        'cashRateMar',
                        'cashRateApr',
                        'cashRateMay',
                        'cashRateJun',
                        'cashRateJul',
                        'cashRateAug',
                        'cashRateSept',
                        'cashRateOct',
                        'cashRateNov',
                        'cashRateDec',
                    ];
                this.columns.push({
                    title: `${startMonth}月～${endMonth}月合计`,
                    align: "center",
                    key: '',
                    children: [
                        {
                            title: "合同量",
                            align: "center",
                            key: 'contractWeight',
                            render: (h, params) => {
                                params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                return h('span',
                                    Number(params.row[params.column.key]).toFixed(2)
                                )
                            }
                        },
                        {
                            title: "发货量",
                            align: "center",
                            key: 'deliveryWeight',
                            render: (h, params) => {
                                params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                return h('span',
                                    Number(params.row[params.column.key]).toFixed(2)
                                )
                            }
                        },
                        {
                            title: "兑现率",
                            align: "center",
                            key: 'cashRate',
                        },
                    ]
                });
                for (let i = 0; i < kd; i++) {
                    this.columns.push({
                        title: Number(startMonth) + i + "月",
                        align: "center",
                        key: '',
                        children: [
                            {
                                title: "合同量",
                                align: "center",
                                key: hetongyuefen[Number(startMonth) + i - 1],
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            },
                            {
                                title: "发货量",
                                align: "center",
                                key: fahuoyuefen[Number(startMonth) + i - 1],
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: "兑现率(%)",
                                align: "center",
                                key: duixian[Number(startMonth) + i - 1],
                                render: (h, params) => {
                                    if (params.row[params.column.key] == '') {
                                        return h('span',
                                            params.row[params.column.key] + "0%")
                                    } else {
                                        return h('span',
                                            params.row[params.column.key] + "%"
                                        )
                                    }

                                }
                            },
                        ]
                    });
                    // this.newdata[i].duixian[Number(startMonth)+i-1] = this.newdata[i].duixian[Number(startMonth)+i-1] + "%";
                }
                this.loading = true;
                this.dwstats = true;
                let params = {};
                this.zgs ? params.companyId = this.zgs : '';
                this.hz ? params.summaryType = this.hz : '';
                let startTime = 'orderStopDateS=';
                let endTime = 'orderStopDateE=';
                let jiluTime = 'recordDate=';
                this.switchTime ? (startTime = startTime + (this.utils.formatMonthStart(this.startTime)).substring(0, 7), endTime = endTime + (this.utils.formatMonthStart(this.endTime)).substring(0, 7), jiluTime = (jiluTime + this.utils.formatdate(this.jiluTime)).substring(0, 21)) : (startTime = startTime + (this.utils.formatYearStart(this.year)).substring(0, 7), endTime = endTime + (this.utils.formatYearEnd(this.year)).substring(0, 7), jiluTime = (jiluTime + this.utils.formatdate(this.jiluTime)).substring(0, 21));
                // this.switchTime?(startTime=(startTime+ this.utils.formatdate(this.startTime)).substring(0, 20)):(startTime=startTime+ this.utils.formatYearStart(this.year));
                fetch(this.$store.state.fetchPath + "/reportCashRate/cashRateSummary", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime + '&' + endTime + '&' + jiluTime + '&' + this.utils.formatParams(params),
                    credentials: 'include'
                }).then((res) => {
                    if (res.status != 200) {
                        this.$Message.error('请求失败！');
                    } else {
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    this.newdata = res.list;
                    for (let i = 0; i < this.newdata.length; i++) {
                        this.newdata[i].cashRate = Number(this.newdata[i].cashRate).toFixed(2);
                        this.newdata[i].cashRate = this.newdata[i].cashRate + "%";
                        // this.newdata[i].duixian[Number(startMonth)+i-1] = this.newdata[i].duixian[Number(startMonth)+i-1] + "%";
                    }
                    this.data = this.newdata;
                    this.loading = false;
                    this.dwstats = false;
                });
            },
            downLoad() {
                this.$refs.table.exportCsv({
                    filename: '客户兑现率分析明细'
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