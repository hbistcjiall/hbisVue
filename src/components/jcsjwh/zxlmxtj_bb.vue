<template>
    <div>
        <Row>
            <div class="divStyle">
                <label style="float:left">产品类别：
                    <Select v-model="model1" style="width:120px">
                        <Option v-for="item in cplbList" :value="item.value" :key="item.label">{{ item.label }}</Option>
                    </Select>
                </label>

                <label style="float:left;margin-left: 20px">供货方式：
                    <Select v-model="model2" style="width:120px">
                        <Option v-for="item in ghfsList" :value="item.value" :key="item.label">{{ item.label }}</Option>
                    </Select>
                </label>
                <label class="yfgc" style="margin-left:20px;margin-top: 5px">统计月份：
                </label>
                <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false" v-model="startTime"
                            style="width:120px;float: left;margin-left: 10px">
                </DatePicker>
                <DatePicker style=";width:120px;float: left" type="month" placeholder="结束月份" :editable="false"
                            :clearable="false"
                            v-model="endTime">
                </DatePicker>
                <label style="float: left;margin-left: 10px;margin-top: 6px">钢厂:</label>
                <Checkbox
                        :indeterminate="indeterminate"
                        :value="checkAll"
                        @click.prevent.native="handleCheckAll" style="float: left;margin-left: 20px;margin-top: 6px">全选
                </Checkbox>
                <CheckboxGroup v-model="checkText" class="yfgc" @on-change="checkAllGroupChange">
                    <Checkbox label="唐钢" value="唐钢"></Checkbox>
                    <Checkbox label="邯钢" value="邯钢"></Checkbox>
                    <Checkbox label="宣钢" value="宣钢"></Checkbox>
                    <Checkbox label="承钢" value="承钢"></Checkbox>
                    <Checkbox label="舞钢" value="舞钢"></Checkbox>
                </CheckboxGroup>

            </div>
        </Row>
        <Row>
            <div style="float: right;margin-bottom: 20px">
                <Button @click="search()" icon="ios-search" type="primary" style="margin-right:5px;">查询</Button>
                <a :href="downloadUrl">
                    <Button type="primary" icon="ios-cloud-download-outline" style="margin-left:5px" @click="downLoad()" :loading="dwstats">导出</Button>
                </a>
            </div>
        </Row>

        <Table border stripe :columns="columns12" :data="resDatas" style="clear: both;margin-top: 20px" ref="table"
               :loading="loading">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging"
              @on-change="changepage" @on-page-size-change='handlePageSize' style="margin-top:20px;"></Page>
    </div>

</template>
<script>
    export default {
        name: 'zxlmxtj_bb',
        data() {
            return {
                xsztylhztdyData: {
                    companyId: '',
                    page: '0',
                    limit: '10',
                },
                dwstats:true,
                loading: true,
                downloadUrl: '',
                indeterminate: true,
                checkAll: false,
                dataCount: 0,
                pageSize: 10,
                xia: 0,
                model1: '',
                cplbList: [
                    {label: '全部', value: ''},
                    {label: '热板', value: '热板'},
                    {label: '冷板', value: '冷板'},
                    {label: '宽厚板', value: '宽厚板'},
                    {label: '棒线', value: '棒线'},
                    {label: '型带', value: '型带'},
                ],
                startTime: new Date(),
                endTime: new Date(),
                switchTime: true,
                model2: '',
                ghfsList: [
                    {label: '全部', value: ''},
                    {label: '直供', value: '直供'},
                    {label: '三方', value: '三方'},
                    {label: '自办公司', value: '自办公司'},
                ],
                checkText: ['唐钢', '邯钢', '宣钢','承钢','舞钢'],
                resDatas: [],
                columns12: [
                    {
                        title: '序号',
                        align: "center",
                        width:70,
                        type: 'index',
                    },
                    {
                        title: '统计月份',
                        align: "center",
                        width:200,
                        key: 'STATISTICSTIME'
                    },
                    {
                        title: '用户名称（全称）',
                        align: "center",
                        width:200,
                        key: 'ACCOUNTNAME'
                    },
                    {
                        title: '供货方式',
                        align: "center",
                        width:100,
                        key: 'SUPPLYMODE'
                    },
                    {
                        title: '品种钢',
                        align: "center",
                        width:150,
                        key: 'VARIETIES'
                    },
                    {
                        title: '主销售区域',
                        align: "center",
                        width:100,
                        key: 'MAINSALESREGIONAL'
                    },
                    {
                        title: '辅助销售区域一',
                        align: "center",
                        width:150,
                        key: 'AIDEDSALESREGIONALONE',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                Number(params.row[params.column.key]).toFixed(2)
                            )
                        }
                    },
                    {
                        title: '辅助销售区域二',
                        align: "center",
                        width:150,
                        key: 'AIDEDSALESREGIONALTWO',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                Number(params.row[params.column.key]).toFixed(2)
                            )
                        }
                    },
                    {
                        title: '钢厂',
                        align: "center",
                        width:100,
                        key: 'STEELMILLS'
                    },
                    {
                        title: '年协议量（吨）',
                        align: "center",
                        width:150,
                        key: 'ANNUALAGREEMENTVOLUME',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                Number(params.row[params.column.key]).toFixed(2)
                            )
                        }
                    },
                    {
                        title: '当期协议销量（吨）',
                        align: "center",
                        width:150,
                        key: 'ORDERMOUNT',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                Number(params.row[params.column.key]).toFixed(2)
                            )
                        }
                    },
                    {
                        title: '当期执行集团协议加值销量（吨）',
                        align: "center",
                        width:220,
                        key: 'PROTOCOLORDERMOUNT',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                Number(params.row[params.column.key]).toFixed(2)
                            )
                        }
                    },
                ],
            }
        },
        created() {
            this.handleListApproveHistory();
        },
        methods: {
            handleListApproveHistory() {
                this.dwstats = true;
                this.loading = true;
                let startTime = 'beginTime=';
                let endTime = '&endTime=';
                this.switchTime ? (startTime = startTime + this.utils.formatMonthStart(this.startTime), endTime = endTime + this.utils.formatMonthStart(this.endTime)) : (startTime = startTime + this.utils.formatYearStart(this.year), endTime = endTime + this.utils.formatYearEnd(this.year));
                let idList = "idList=" + this.checkText.toString();
                let params = {
                    page: '0',
                    limit: '10',
                    supplyMode: this.model2,
                    varieties: this.model1,
                }
                fetch(this.$store.state.fetchPath + "/protocolAccountDetailsStatistics/list", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime + endTime + '&' + this.utils.formatParams(params) + '&' + idList,
                    credentials: 'include'
                })
                    .then((res) => {
                        if (res.status != 200) {
                            this.$Message.error('请求失败！');
                        } else {
                            return res.text();
                        }
                    }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : []
                    this.resDatas = res.list.data;
                    this.loading = false;
                    this.dwstats = false;
                })
            },
            changepage(index) {
                this.dictData.page = index;
                this.handleListApproveHistory();
            },
            handlePageSize(index) {
                this.xsztylhztdyData.limit = index;
                this.search();
            },
            search() {
                this.handleListApproveHistory();
            },
            downLoad() {
                let startTime = 'beginTime=';
                let endTime = '&endTime=';
                this.switchTime ? (startTime = startTime + this.utils.formatMonthStart(this.startTime), endTime = endTime + this.utils.formatMonthStart(this.endTime)) : (startTime = startTime + this.utils.formatYearStart(this.year), endTime = endTime + this.utils.formatYearEnd(this.year));
                let idList = "idList=" + this.checkText.toString();
                let params = {
                    supplyMode: this.model2,
                    varieties: this.model1,
                }
                this.downloadUrl = this.$store.state.fetchPath + "/protocolAccountDetailsStatistics/exportSubsidiaryVarietySteel?" + startTime + endTime + '&' + this.utils.formatParams(params) + '&' + idList;
            },
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkText = ['唐钢', '邯钢', '宣钢','承钢','舞钢'];
                } else {
                    this.checkText = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === 5) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            }
        }
    }
</script>
<style scoped>
    .paging {
        float: right;
        margin-top: 10px;
    }

    .userbtn {
        margin-right: 10px;
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
        width: 99%;
        height: 60px;
        margin: 0 auto;
        /*margin-bottom: 20px;*/
        float: left;
    }

    .yfgc {
        float: left;
        margin-left: 0px;
        margin-top: 5px;
    }
</style>
