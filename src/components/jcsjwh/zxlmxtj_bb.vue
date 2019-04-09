<template>
    <div>
        <div class="divStyle">
            <label style="float:left">产品类别：
                <Select v-model="model1" style="width:120px">
                    <Option v-for="item in cplbList" :value="item.label" :key="item.label">{{ item.label }}</Option>
                </Select>
            </label>

            <label style="float:left;margin-left: 20px">供货方式：
                <Select v-model="model2" style="width:120px">
                    <Option v-for="item in ghfsList" :value="item.label" :key="item.label">{{ item.label }}</Option>
                </Select>
            </label>
            <label class="yfgc" style="margin-left:20px;margin-top: 5px">统计月份：
            </label>
            <DatePicker  type="month" placeholder="起始月份" :editable="false" :clearable="false" v-model="startTime"
                        style="width:120px;float: left;margin-left: 10px">
            </DatePicker>
            <DatePicker style=";width:120px;float: left" type="month" placeholder="结束月份" :editable="false" :clearable="false"
                        v-model="endTime" >
            </DatePicker>
            <CheckboxGroup  v-model="checkText" class="yfgc">钢厂：
                <Checkbox label="全部"></Checkbox>
                <Checkbox label="唐钢"></Checkbox>
                <Checkbox label="邯钢"></Checkbox>
                <Checkbox label="宣钢"></Checkbox>
                <Checkbox label="承钢"></Checkbox>
                <Checkbox label="舞钢"></Checkbox>
            </CheckboxGroup>

        </div>
        <div style="both:clear;margin-left: -900px">
            <Button @click="search()" icon="ios-search" type="primary" style="margin-right:20px;">查询</Button>
            <a :href="downloadUrl"><Button type="primary" style="margin-left:10px">导出</Button></a>
        </div>
        <Table border stripe :columns="columns12" :data="resDatas" style="margin-top: 20px" ref="table" :loading="loading">
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
                loading:true,
                downloadUrl:'',
                dataCount: 0,
                pageSize: 10,
                xia: 0,
                model1: '全部',
                cplbList: [
                    {label: '全部', value: '0'},
                    {label: '热板', value: '1'},
                    {label: '冷板', value: '2'},
                    {label: '宽厚板', value: '3'},
                    {label: '棒线', value: '4'},
                    {label: '型带', value: '5'},
                ],
                startTime: new Date(),
                endTime: new Date(),
                switchTime: true,
                model2: '全部',
                ghfsList: [
                    {label: '全部', value: '0'},
                    {label: '直供', value: '1'},
                    {label: '三方', value: '2'},
                    {label: '资办公司', value: '3'},
                ],
                checkText: ['全部'],
                resDatas: [],
                columns12: [
                    {
                        title: '序号',
                        align: "center",
                        type: 'index',
                    },
                    {
                        title: '统计月份',
                        align: "center",
                        key: 'STATISTICSTIME'
                    },
                    {
                        title: '用户名称（全称）',
                        align: "center",
                        key: 'ACCOUNTNAME'
                    },
                    {
                        title: '供货方式',
                        align: "center",
                        key: 'SUPPLYMODE'
                    },
                    {
                        title: '品种',
                        align: "center",
                        key: 'VARIETIES'
                    },
                    {
                        title: '主销售区域',
                        align: "center",
                        key: 'MAINSALESREGIONAL'
                    },
                    {
                        title: '辅助销售区域一',
                        align: "center",
                        key: 'AIDEDSALESREGIONALONE'
                    },
                    {
                        title: '辅助销售区域二',
                        align: "center",
                        key: 'AIDEDSALESREGIONALTWO'
                    },
                    {
                        title: '钢厂',
                        align: "center",
                        key: 'STEELMILLS'
                    },
                    {
                        title: '协议议量（吨）',
                        align: "center",
                        key: 'ANNUALAGREEMENTVOLUME'
                    },
                    {
                        title: '当期协议销量（吨）',
                        align: "center",
                        key: 'ORDERMOUNT'
                    },
                    {
                        title: '当期执行集团协议加值销量（吨）',
                        align: "center",
                        key: 'PROTOCOLORDERMOUNT'
                    },
                ],
            }
        },
        created() {
            this.handleListApproveHistory();
        },
        methods: {
            handleListApproveHistory() {
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
                    if (res.list.data.length < 0 || res.list.data.length == 0) {
                        this.loading = false;
                        return;
                    } else {
                        this.resDatas = res;
                        this.loading = false;
                    }
                    this.downLoad();
                })
            },
            changepage(index) {
                this.dictData.page = index;
                this.handleListApproveHistory();
            },
            handlePageSize(index){
                this.xsztylhztdyData.limit = index;
                this.search();
            },
            search() {
                this.handleListApproveHistory();
            },
            downLoad() {
                let startTime = 'beginTime=';
                let endTime = '&endTime=';
                this.switchTime ? (startTime = startTime + this.utils.formatMonthStart(this.startTime),endTime = endTime + this.utils.formatMonthStart(this.endTime)) : (startTime = startTime + this.utils.formatYearStart(this.year), endTime = endTime + this.utils.formatYearEnd(this.year));
                let idList = "idList=" + this.checkText.toString();
                let params = {
                    supplyMode: this.model2,
                    varieties: this.model1,
                }
                this.downloadUrl="http://18.4.22.0:8081/protocolAccountDetailsStatistics/exportSubsidiaryVarietySteel?"+ startTime + endTime + '&' + this.utils.formatParams(params) + '&' + idList;
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
        width: 100%;
        height: 60px;
        margin: 0 auto;
        /*margin-bottom: 20px;*/
        float: left;
    }

    .yfgc {
        float: left;
        margin-left: 20px;
        margin-top: 5px;
    }
</style>
