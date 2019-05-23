<template>
    <div>
        <DatePicker type="year" placeholder="年份" v-model="year" style="width: 120px;margin-right:10px;"></DatePicker>

        <Select style="width:200px;margin-right:10px;" placeholder="请输入责任单位名称" v-model="dictData.companyname">
            <Option v-for="item in list" :value="item.value" :key="item.value">
                {{item.label }}
            </Option>
        </Select>
        <div style="float: right">
            <Button @click="search" style="magin-left:20px;margin-right:10px;" icon="ios-search">查询</Button>
            <Button @click="addNew" style="magin-left:20px;" icon="ios-add">新增</Button>
        </div>
        <!--<Button type="primary" @click="downLoad" style="magin-left:20px" icon="ios-cloud-download-outline">导出</Button>-->
        <Table :loading="loading" border stripe :columns="columns12" :data="fecthdata6" style="margin-top: 20px">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{row}" slot="action">
                <!--<Button type="primary" size="small" style="margin-right: 5px" @click="updD(row)">新增</Button>-->
                <Button size="small" style="margin-right: 5px;background-color: #ffffff" @click="updD(row)">修改</Button>
                <Button size="small" style="background:#ff6969;color:#fff;" @click="remove(row)">删除</Button>
            </template>
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging"
              @on-change="changepage" @on-page-size-change='handlePageSize' style="margin-top:20px;"></Page>
        <Modal v-model="updModal" title="目标明细管理修改" :closable='false' @on-ok="updok">
            <Form :model="updformValidate" :label-width="80">
                <FormItem label="年份：" style="width:150px">
                    <DatePicker type="year" format="yyyy" placeholder="请选择年份" @on-change="serTime"
                                v-model="updformValidate.year"
                                style="width:120px"></DatePicker>
                </FormItem>
                <FormItem label="一月：" style="width:150px" prop="jan" class="floatClass">
                    <Input v-model="updformValidate.jan"></Input>
                </FormItem>
                <FormItem label="二月：" style="width:150px" prop="feb" class="floatClass">
                    <Input v-model="updformValidate.feb"></Input>
                </FormItem>
                <FormItem label="三月：" style="width:150px" prop="mar" class="floatClass">
                    <Input v-model="updformValidate.mar"></Input>
                </FormItem>
                <FormItem label="四月：" style="width:150px" prop="apr" class="floatClass">
                    <Input v-model="updformValidate.apr"></Input>
                </FormItem>
                <FormItem label="五月：" style="width:150px" prop="may" class="floatClass">
                    <Input v-model="updformValidate.may"></Input>
                </FormItem>
                <FormItem label="六月：" style="width:150px" prop="jun" class="floatClass">
                    <Input v-model="updformValidate.jun"></Input>
                </FormItem>
                <FormItem label="七月：" style="width:150px" prop="jul" class="floatClass">
                    <Input v-model="updformValidate.jul"></Input>
                </FormItem>
                <FormItem label="八月：" style="width:150px" prop="aug" class="floatClass">
                    <Input v-model="updformValidate.aug"></Input>
                </FormItem>
                <FormItem label="九月：" style="width:150px" prop="sep" class="floatClass">
                    <Input v-model="updformValidate.sep"></Input>
                </FormItem>
                <FormItem label="十月：" style="width:150px" prop="oct" class="floatClass">
                    <Input v-model="updformValidate.oct"></Input>
                </FormItem>
                <FormItem label="十一月：" style="width:150px" prop="nov" class="floatClass">
                    <Input v-model="updformValidate.nov"></Input>
                </FormItem>
                <FormItem label="十二月：" style="width:150px" prop="dec" class="floatClass">
                    <Input v-model="updformValidate.dec"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>

</template>
<script>
    import addMbmxgl from './addMbmxgl.vue'

    export default {
        name: 'mbmxgl',
        data() {
            return {
                loading: true,
                test: "9683",
                updformValidate: {
                    id: '',
                    year: '',
                    jan: '',
                    feb: '',
                    mar: '',
                    apr: '',
                    may: '',
                    jun: '',
                    jul: '',
                    aug: '',
                    sep: '',
                    oct: '',
                    nov: '',
                    dec: ''
                },
                year: '2019',
                updModal: false,
                dictData: {
                    companyname: '',
                    page: '0',
                    limit: '10',
                    year: ''
                },
                delData: {
                    id: '',
                },
                formValidate: {
                    year: '',
                    targetname: '',
                    jan: '',
                    feb: '',
                    mar: '',
                    apr: '',
                    may: '',
                    jun: '',
                    jul: '',
                    aug: '',
                    sep: '',
                    oct: '',
                    nov: '',
                    dec: ''
                },
                dataCount: 0,
                pageSize: 10,
                xia: 0,
                columns12: [
                    {
                        title: '年份',
                        align: "center",
                        key: 'YEAR',
                        width: 80
                    },
                    {
                        title: '责任单位名称',
                        width: 120,
                        align: "center",
                        key: 'NAME'
                    },
                    {
                        title: '一月',
                        align: "center",
                        key: 'JANUARY',
                        width: 120
                    },
                    {
                        title: '二月',
                        align: "center",
                        key: 'FEBRUARY',
                        width: 120
                    },
                    {
                        title: '三月',
                        align: "center",
                        key: 'MARCH',
                        width: 120
                    },
                    {
                        title: '四月',
                        align: "center",
                        key: 'APRIL',
                        width: 120
                    },
                    {
                        title: '五月',
                        align: "center",
                        key: 'MAY',
                        width: 120
                    },
                    {
                        title: '六月',
                        align: "center",
                        key: 'JUNE',
                        width: 120
                    },
                    {
                        title: '七月',
                        align: "center",
                        key: 'JULY',
                        width: 120
                    },
                    {
                        title: '八月',
                        align: "center",
                        key: 'AUGUST',
                        width: 120
                    },
                    {
                        title: '九月',
                        align: "center",
                        key: 'SEPTEMBER',
                        width: 120
                    },
                    {
                        title: '十月',
                        align: "center",
                        key: 'OCTOBER',
                        width: 120
                    },
                    {
                        title: '十一月',
                        align: "center",
                        key: 'NOVEMBER',
                        width: 120
                    },
                    {
                        title: '十二月',
                        align: "center",
                        key: 'DECEMBER',
                        width: 120
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center',
                        width: '260px'
                    },
                ],
                fecthdata6: [],
                resDatas: [],

                updruleValidate: {
                    name: [
                        {required: true, message: '名称', trigger: 'blur'}
                    ],
                    dictTypeId: [
                        {required: true, message: 'id', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '编码', trigger: 'blur'}
                    ]
                },
                uproledata: [],

                list: []
            }
        },
        created() {
            this.handleListApproveHistory();
            fetch(this.$store.state.fetchPath + "/TargetManage/selectlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: '',
                credentials: 'include'
            })
                .then((res) => {
                    if (res.status != 200) {
                        this.$Message.error('请求失败！');
                    } else {
                        return res.text();
                    }
                }).then((res) => {
                res = res && res.length > 0 ? JSON.parse(res) : [];
                this.list = this.utils.buildselTree(res);
            })
        },
        methods: {
            handleListApproveHistory() {
                this.loading = true
                this.year ? this.dictData.year = new Date(this.year).getFullYear() : '';
                fetch(this.$store.state.fetchPath + "/TargetManage/selTargetManage", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.dictData),
                    credentials: 'include'
                })
                    .then((res) => {
                        return res.text();
                    }).then((res) => {
                    res = res.length > 0 ? JSON.parse(res) : []
                    this.resDatas = res.data;
                    this.dataCount = parseInt(res.count);
                    this.pageSize = parseInt(res.pageSize);
                    if (this.dataCount < this.pageSize) {
                        this.fecthdata6 = this.resDatas;
                    } else {
                        this.fecthdata6 = this.resDatas.slice(0, this.pageSize);
                    }
                    this.loading = false;
                })
            },
            changepage(index) {
                this.dictData.page = index;
                this.handleListApproveHistory();
            },
            handlePageSize(index) {
                this.dictData.limit = index;
                this.search();
            },
            search() {
                this.handleListApproveHistory();
            },
            addNew() {
                this.$Modal.confirm({
                    scrollable: true,
                    okText: '新增',
                    render: (h) => {
                        return h(addMbmxgl, {
                            props: {
                                url: this.$store.state.fetchPath
                            },
                            on: {
                                year: (year) => {
                                    this.formValidate.year = year
                                },
                                code: (code) => {
                                    this.formValidate.targetname = code
                                },
                                jan: (jan) => {
                                    this.formValidate.jan = jan
                                },
                                feb: (feb) => {
                                    this.formValidate.feb = feb
                                },
                                mar: (mar) => {
                                    this.formValidate.mar = mar
                                },
                                apr: (apr) => {
                                    this.formValidate.apr = apr
                                },
                                may: (may) => {
                                    this.formValidate.may = may
                                },
                                jun: (jun) => {
                                    this.formValidate.jun = jun
                                },
                                jul: (jul) => {
                                    this.formValidate.jul = jul
                                },
                                aug: (aug) => {
                                    this.formValidate.aug = aug
                                },
                                sep: (sep) => {
                                    this.formValidate.sep = sep
                                },
                                oct: (oct) => {
                                    this.formValidate.oct = oct
                                },
                                nov: (nov) => {
                                    this.formValidate.nov = nov
                                },
                                dec: (dec) => {
                                    this.formValidate.dec = dec
                                },
                            }
                        })
                    },
                    onOk: () => {
                        fetch(this.$store.state.fetchPath + "/TargetManage/addorupTargetManage", {
                            method: "POST",
                            headers: this.$store.state.fetchHeader,
                            body: this.utils.formatParams(this.formValidate),
                            credentials: 'include'
                        })
                            .then((res) => {
                                if (res.status != 200) {
                                    this.$Message.error('请求失败！');
                                } else {
                                    return res.text();
                                }
                            })
                            .then(() => {
                                this.handleListApproveHistory();
                            })
                    }
                })
            },
            updD(r) {
                this.updModal = true;
                this.updformValidate.year = r.YEAR;
                this.updformValidate.id = r.ID;
                this.updformValidate.jan = r.JANUARY;
                this.updformValidate.feb = r.FEBRUARY;
                this.updformValidate.mar = r.MARCH;
                this.updformValidate.apr = r.APRIL;
                this.updformValidate.may = r.MAY;
                this.updformValidate.jun = r.JUNE;
                this.updformValidate.jul = r.JULY;
                this.updformValidate.aug = r.AUGUST;
                this.updformValidate.sep = r.SEPTEMBER;
                this.updformValidate.oct = r.OCTOBER;
                this.updformValidate.nov = r.NOVEMBER;
                this.updformValidate.dec = r.DECEMBER;
            },
            updok() {
                fetch(this.$store.state.fetchPath + "/TargetManage/addorupTargetManage", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.updformValidate),
                    credentials: 'include'
                })
                    .then((res) => {
                        if (res.status != 200) {
                            this.$Message.error('请求失败！');
                        } else {
                            return res.text();
                        }
                    })
                    .then(() => {
                        this.handleListApproveHistory();
                    })
            },
            serTime(year) {
                this.updformValidate.year = year;
            },
            remove(r) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确认删除吗？',
                    onOk: () => {
                        this.delData.id = r.ID;
                        fetch(this.$store.state.fetchPath + "/TargetManage/delTargetManage", {
                            method: "POST",
                            headers: this.$store.state.fetchHeader,
                            body: this.utils.formatParams(this.delData),
                            credentials: 'include'
                        })
                            .then((res) => {
                                if (res.status != 200) {
                                    this.$Message.error('请求失败！');
                                } else {
                                    return res.text();
                                }
                            })
                            .then(() => {
                                this.handleListApproveHistory();
                            })
                    }
                });

            },
            downLoad() {
                // fetch(this.$store.state.fetchPath + "/protocolAccountDetails/exportlist", {
                //     method: "POST",
                //     headers: this.$store.state.fetchHeader,
                //     body: this.utils.formatParams(this.dictData),
                //     credentials:'include'
                // })
                //     .then((res) => {
                //         if(res.status!=200){
                //             this.$Message.error('请求失败！');
                //         }else{
                //             return res.text();
                //         }
                //     })
                //     .then(() => {
                //         this.handleListApproveHistory();
                //     })
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

    .floatClass {
        float: left;
    }
</style>
