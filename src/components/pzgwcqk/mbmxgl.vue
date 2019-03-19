<template>
    <div>
        <DatePicker type="year" placeholder="年份" v-model="year" style="width: 120px;margin-right:10px;"></DatePicker>

        <Select style="width:200px;margin-right:10px;" placeholder="请输入责任单位名称" v-model="dictData.code">
            <Option v-for="item in list" :value="item.code" :key="item.code">
            {{item.name }}
            </Option>
        </Select>

        <Button type="primary" @click="search" style="magin-left:20px" icon="ios-search">查询</Button>
        <Button type="primary" @click="addNew" style="magin-left:20px" icon ="ios-add">新增</Button>
        <!--<Button type="primary" @click="downLoadTab" style="magin-left:20px" icon="ios-download-outline">导出</Button>-->
        <Table border stripe :columns="columns12" :data="fecthdata6" style="margin-top: 20px">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{row}" slot="action">
                <!--<Button type="primary" size="small" style="margin-right: 5px" @click="updD(row)">新增</Button>-->
                <Button type="error" size="small" @click="remove(row)">删除</Button>
            </template>
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging" @on-change="changepage" style="margin-top:20px;"></Page>
    </div>

</template>
<script>
    import addMbmxgl from './addMbmxgl.vue'
    export default {
        name:'mbmxgl',
        data () {
            return {
                year:'',
                updModal:false,
                dictData: {
                    code: '',
                    page: '0',
                    limit: '10',
                    year : ''
                },
                delData:{
                    id:'',
                },
                formValidate: {
                    year:'',
                    code:'',
                    jan:'',
                    feb:'',
                    mar:'',
                    apr:'',
                    may:'',
                    jun:'',
                    jul:'',
                    aug:'',
                    sep:'',
                    oct:'',
                    nov:'',
                    dec:''
                },
                // 初始化信息总条数
                dataCount: 0,
                // 每页显示多少条
                pageSize: 10,
                xia: 0, //下一页或者上一页的第一项索引值
                columns12: [
                    {
                        title: '年份',
                        align: "center",
                        key: 'YEAR',
                    },
                    {
                        title: '责任公司名称',
                        align: "center",
                        key: 'NAME'
                    },
                    {
                        title: '一月',
                        align: "center",
                        key: 'JANUARY'
                    },
                    {
                        title: '二月',
                        align: "center",
                        key: 'FEBRUARY'
                    },
                    {
                        title: '三月',
                        align: "center",
                        key: 'MARCH'
                    },
                    {
                        title: '四月',
                        align: "center",
                        key: 'APRIL'
                    },
                    {
                        title: '五月',
                        align: "center",
                        key: 'MAY'
                    },
                    {
                        title: '六月',
                        align: "center",
                        key: 'JUNE'
                    },
                    {
                        title: '七月',
                        align: "center",
                        key: 'JULY'
                    },
                    {
                        title: '八月',
                        align: "center",
                        key: 'AUGUST'
                    },
                    {
                        title: '九月',
                        align: "center",
                        key: 'SEPTEMBER'
                    },
                    {
                        title: '十月',
                        align: "center",
                        key: 'OCTOBER'
                    },
                    {
                        title: '十一月',
                        align: "center",
                        key: 'NOVEMBER'
                    },
                    {
                        title: '十二月',
                        align: "center",
                        key: 'DECEMBER'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center',
                        width: '260px'
                    },
                ],
                fecthdata6: [],
                resDatas:[],
                // updformValidate: {
                //     id:'',
                //     companyname:'',
                //     code:'',
                // },
                updruleValidate: {
                    name: [
                        { required: true, message: '名称', trigger: 'blur' }
                    ],
                    dictTypeId:[
                        { required: true, message: 'id', trigger: 'blur' }
                    ],
                    code:[
                        { required: true, message: '编码', trigger: 'blur' }
                    ]
                },
                uproledata:[],

                list : [
                    { name: '热板公司', code: "001" },
                    { name: '冷板公司', code: "002" },
                    { name: '宽厚板公司', code: "003" },
                    { name: '棒线公司', code: "004" },
                    { name: '型材公司', code: "005" },
                    { name: '唐钢分公司', code: "006" },
                    { name: '邯钢分公司', code: "007" },
                    { name: '宣钢分公司', code: "008" },
                    { name: '承钢分公司', code: "009" },
                    { name: '舞钢分公司', code: "010" },
                    { name: '石钢公司', code: "011" },
                    { name: '衡板公司', code: "012" },
                ]
            }
        },
        created() {
            this.handleListApproveHistory();
        },
        methods: {
            // 获取日志记录信息
            handleListApproveHistory() {

                this.year?this.dictData.year=new Date(this.year).getFullYear():'';
                fetch(this.$store.state.fetchPath + "/TargetManage/selTargetManage", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.dictData),
                    credentials:'include'
                })
                    .then((res) => {
                        return res.text();
                    }).then((res) => {
                    res = res.length>0?JSON.parse(res):[]
                    // 保存取到的所有数据
                    this.resDatas =  res.data;
                    this.dataCount =  parseInt(res.count);
                    this.pageSize = parseInt(res.pageSize);
                    // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                    if(this.dataCount < this.pageSize){
                        this.fecthdata6 = this.resDatas;
                    }else{
                        this.fecthdata6 = this.resDatas.slice(0,this.pageSize);
                    }
                })
            },
            changepage(index) {
                this.dictData.page=index;
                this.handleListApproveHistory();
            },
            search(){
                this.handleListApproveHistory();
            },
            addNew () {
                this.$Modal.confirm({
                    scrollable:true,
                    okText:'新增',
                    render: (h) => {
                        return h(addMbmxgl, {
                            props: {

                            },
                            on: {
                                year: (year) => {
                                    this.formValidate.year=year
                                },
                                code: (code) => {
                                    this.formValidate.code=code
                                },
                                jan: (jan) => {
                                    this.formValidate.jan=jan
                                },
                                feb: (feb) => {
                                    this.formValidate.feb=feb
                                },
                                mar: (mar) => {
                                    this.formValidate.mar=mar
                                },
                                apr: (apr) => {
                                    this.formValidate.apr=apr
                                },
                                may: (may) => {
                                    this.formValidate.may=may
                                },
                                jun: (jun) => {
                                    this.formValidate.jun=jun
                                },
                                jul: (jul) => {
                                    this.formValidate.jul=jul
                                },
                                aug: (aug) => {
                                    this.formValidate.aug=aug
                                },
                                sep: (sep) => {
                                    this.formValidate.sep=sep
                                },
                                oct: (oct) => {
                                    this.formValidate.oct=oct
                                },
                                nov: (nov) => {
                                    this.formValidate.nov=nov
                                },
                                dec: (dec) => {
                                    this.formValidate.dec=dec
                                },
                            }
                        })
                    },
                    onOk: () => {
                        fetch(this.$store.state.fetchPath + "/TargetManage/addorupTargetManage", {
                            method: "POST",
                            headers: this.$store.state.fetchHeader,
                            body: this.utils.formatParams(this.formValidate),
                            credentials:'include'
                        })
                            .then((res) => {
                                return res.text();
                            })
                            .then(() => {
                                this.handleListApproveHistory();
                            })
                    }
                })
            },
            remove (r) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确认删除吗？',
                    onOk: () => {
                        this.delData.id=r.ID;
                        fetch(this.$store.state.fetchPath + "/TargetManage/delTargetManage", {
                            method: "POST",
                            headers: this.$store.state.fetchHeader,
                            body: this.utils.formatParams(this.delData),
                            credentials:'include'
                        })
                            .then((res) => {
                                return res.text();
                            })
                            .then(() => {
                                // res = res.length>0?JSON.parse(res):[];
                                // this.$Message.error(res.msg);
                                this.handleListApproveHistory();
                            })
                    }
                });

            },
            // updD(r){
            //     this.updModal = true;
            //     this.updformValidate.id = r.ID;
            //     this.updformValidate.companyname = r.NAME;
            //     this.updformValidate.code = r.CODE;
            // },
            // updok(){
            //     this.updformValidate.dictTypeId = this.updformValidate.id
            //     fetch(this.$store.state.fetchPath + "/acctabilityunit/addorupdatemanager", {
            //         method: "POST",
            //         headers: this.$store.state.fetchHeader,
            //         body: this.utils.formatParams(this.updformValidate),
            //         credentials:'include'
            //     })
            //         .then((res) => {
            //             return res.text();
            //         })
            //         .then(() => {
            //             this.handleListApproveHistory();
            //         })
            // }

        }
    }
</script>
<style scoped>
    .paging{
        float:right;
        margin-top:10px;
    }
    .userbtn{
        margin-right:10px;
    }
</style>
