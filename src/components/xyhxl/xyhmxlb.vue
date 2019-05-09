<template>
    <div>
        <Form :label-width="80" >
        <Row>
            <Col span="4">
                <FormItem label="产品类别:">
                    <Select v-model="xyhmxlbData.varieties">
                        <Option value="">全部</Option>
                        <Option value="热板">热板</Option>
                        <Option value="冷板">冷板</Option>
                        <Option value="宽厚板">宽厚板</Option>
                        <Option value="棒线">棒线</Option>
                        <Option value="型带">型带</Option>
                    </Select>
                </FormItem>
            </Col>
            <Col span="2">
                <FormItem label="上传时间:">
                    <DatePicker type="datetimerange" @on-change="serTime" format="yyyy-MM-dd" placeholder="请选择上传时间" style="width: 175px"></DatePicker>
                </FormItem>
            </Col>
            <Col span="3" style="margin-left: 160px">
                <FormItem label="协议年份:">
                <DatePicker type="year" v-model='year' style="width: 100px"></DatePicker>
                </FormItem>
            </Col>
            <Col span="4" style="margin-left: 20px">
                <FormItem label="钢厂:">
                    <Select v-model="xyhmxlbData.steelMills">
                        <Option value="">全部</Option>
                        <Option value="唐钢">唐钢</Option>
                        <Option value="邯钢">邯钢</Option>
                        <Option value="宣钢">宣钢</Option>
                        <Option value="承钢">承钢</Option>
                        <Option value="舞钢">舞钢</Option>
                    </Select>
                </FormItem>
            </Col>
            <Col span="7" style="float: right">
                <Button type="primary" @click="search" style="margin-left:20px" icon="ios-search">查询</Button>
                <Button type="primary" @click="clearall" style="margin-left:10px">清空</Button>
                <Button type="primary" @click="pldelect" style="margin-left:10px">批量删除</Button>
                <a :href="downloadUrl"><Button type="primary" style="margin-left:10px">导出</Button></a>
            </Col>

        </Row>
            <Row>
                <Col span="2">
                    <a :href="downloadMb"><Button type="primary" style="margin-left:10px">下载模版</Button></a>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" border stripe :columns="columns12" :data="fecthdata6"  style="margin-top: 20px" ref="table" @on-select="panduanduoxuan" @on-select-all="panduanduoxuan" >
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{row}" slot="action">
                <Button size="small" style="margin-right: 5px" @click="updD(row)">修改</Button>
                <Button size="small" @click="remove(row)" style="background:#ff6969;color:#fff;">删除</Button>
            </template>
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging" @on-change="changepage" @on-page-size-change='handlePageSize' style="margin-top:20px;padding-bottom: 120px"></Page>
        <Modal v-model="updModal" title="协议户编辑" :closable='false' @on-ok="updok">
            <Form :model="updformValidate" :rules="updruleValidate" :label-width="90">
                <FormItem label="协议年份" prop="Yearofagreement">
                    <DatePicker type="year" v-model='updYear'></DatePicker>
                </FormItem>
                <FormItem label="用户名称" prop="accountName">
                    <Input v-model="updformValidate.accountName" placeholder="请输入用户名称"></Input>
                </FormItem>
                <FormItem label="品种" prop="varieties">
                    <Select v-model="updformValidate.varieties">
                        <Option value="热板">热板</Option>
                        <Option value="冷板">冷板</Option>
                        <Option value="宽厚板">宽厚板</Option>
                        <Option value="棒线">棒线</Option>
                        <Option value="型带">型带</Option>
                    </Select>
                </FormItem>
                <FormItem label="主销售区域" prop="Mainsalesarea">
                    <Input v-model="updformValidate.mainSalesRegional" placeholder="请输入主销售区域"></Input>
                </FormItem>
                <FormItem label="辅助销售区域一">
                    <Input v-model="updformValidate.aidedSalesRegionalOne" placeholder="请输入辅助销售区域一"></Input>
                </FormItem>
                <FormItem label="辅助销售区域二">
                    <Input v-model="updformValidate.aidedSalesRegionalTwo" placeholder="请输入辅助销售区域二"></Input>
                </FormItem>
                <FormItem label="钢厂" prop="steelMills">
                    <Select v-model="updformValidate.steelMills">
                        <Option value="唐钢">唐钢</Option>
                        <Option value="邯钢">邯钢</Option>
                        <Option value="宣钢">宣钢</Option>
                        <Option value="承钢">承钢</Option>
                        <Option value="舞钢">舞钢</Option>
                    </Select>
                </FormItem>
                <FormItem label="年协议量(吨)" prop="annualAgreementVolume">
                    <Input v-model="updformValidate.annualAgreementVolume" placeholder="请输入年协议量"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    export default {
        name:'xyhmxlb',
        data () {
            return {
                downloadMb:'',
                duoxuan:false,
                loading:true,
                updModal:false,
                downloadUrl:'',
                downloadData:{},
                xyhmxlbData: {
                    beginTime:'',
                    endTime:'',
                    protocolYear:'',
                    steelMills:'',
                    varieties:'',
                    page: '0',
                    limit: '10',
                },
                begin:'',
                end:'',
                year:'2019',
                protocolAccountId:'',
                dataCount: 0,
                pageSize: 10,
                xia: 0,
                columns12: [
                    {
                        type: 'selection',
                        width:50,
                        align:"center"
                    },
                    {
                        title: '序号',
                        align: "center",
                        type:'index',
                        width:60
                    },
                    {
                        title: '上传时间',
                        align: "center",
                        width:150,
                        key: 'UPLOADTIME'
                    },
                    {
                        title: '协议年份',
                        align: "center",
                        key: 'PROTOCOLYEAR'
                    },
                    {
                        title: '用户名称(全称)',
                        align: "center",
                        key: 'ACCOUNTNAME',
                        width:130
                    },
                    {
                        title: '品种',
                        align: "center",
                        key: 'VARIETIES',
                        width:70
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
                        key: 'STEELMILLS',
                        width:70
                    },
                    {
                        title: '年协议量(吨)',
                        align: "center",
                        key: 'ANNUALAGREEMENTVOLUME',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                Number(params.row[params.column.key]).toFixed(2)
                            )
                        }
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center',
                        width: '150px'
                    },
                ],
                fecthdata6: [],
                resDatas:[],
                plDelectData:[],
                updformValidate: {
                    accountName:'',
                    aidedSalesRegionalOne:'',
                    aidedSalesRegionalTwo:'',
                    annualAgreementVolume:'',
                    mainSalesRegional:'',
                    protocolAccountId:'',
                    protocolYear:'',
                    steelMills:'',
                    varieties:''
                },
                updYear:'',
                updruleValidate: {
                    annualAgreementVolume:[
                        { required: true, message: '年协议量(吨)', trigger: 'blur' }
                    ],
                    Mainsalesarea:[
                        { required: true, message: '主销售区域', trigger: 'blur' }
                    ],
                    Yearofagreement:[
                        {required: true, message: '协议年份', trigger: 'blur'}
                    ],
                    accountName: [
                        { required: true, message: '用户名称', trigger: 'blur' }
                    ],
                    mainSalesRegional:[
                        { required: true, message: '主销售区域', trigger: 'blur' }
                    ],
                    varieties:[
                        { required: true, message: '品种', trigger: 'blur' }
                    ],
                    steelMills:[
                        { required: true, message: '钢厂', trigger: 'blur' }
                    ],
                },
            }
        },
        created() {
            this.handleListApproveHistory();
        },
        methods: {
            panduanduoxuan(){
                this.duoxuan=true;
                },
            handleListApproveHistory() {
                this.year?this.xyhmxlbData.protocolYear=new Date(this.year).getFullYear():'';
                this.begin?this.xyhmxlbData.beginTime=this.utils.format(this.begin):'';
                this.end?this.xyhmxlbData.endTime=this.utils.format(this.end):'';
                fetch(this.$store.state.fetchPath + "/protocolAccountDetails/list", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.xyhmxlbData),
                    credentials:'include'
                })
                    .then((res) => {
                        if(res.status!=200){
                            this.$Message.error('请求失败！');
                        }else{
                            return res.text();
                        }
                    }).then((res) => {
                    res = res&&res.length>0?JSON.parse(res):[]
                    this.resDatas =  res.data;
                    for(let i=0;i<this.resDatas.length;i++)
                    {
                        this.resDatas[i].ANNUALAGREEMENTVOLUME=Number(this.resDatas[i].ANNUALAGREEMENTVOLUME).toFixed(2);
                    }
                    this.dataCount =  parseInt(res.count);
                    this.pageSize = parseInt(res.pageSize);
                    if(this.dataCount < this.pageSize){
                        this.fecthdata6 = this.resDatas;
                    }else{
                        this.fecthdata6 = this.resDatas.slice(0,this.pageSize);
                    }
                    this.downLoad();
                    this.downloadMbban();
                    this.loading = false;
                })
            },
            changepage(index) {
                this.xyhmxlbData.page=index;
                this.handleListApproveHistory();
            },
            handlePageSize(index){
                this.xyhmxlbData.limit = index;
                this.search();
            },
            serTime(e){
                this.Dates=e;
                if(this.Dates[0]==''){
                    this.xyhmxlbData.beginTime='';
                    this.xyhmxlbData.endTime='';
                }else{
                    this.xyhmxlbData.beginTime=this.Dates[0];
                    this.xyhmxlbData.endTime=this.Dates[1]
                }
            },
            search(){
                this.loading = true;
                this.handleListApproveHistory();
            },
            clearall(){
                this.xyhmxlbData.beginTime = '';
                this.xyhmxlbData.endTime = '';
                this.xyhmxlbData.steelMills = '';
                this.xyhmxlbData.limit = '10';
                this.xyhmxlbData.page = '1';
                this.xyhmxlbData.protocolYear = '';
                this.xyhmxlbData.varieties = '';
                this.begin = '';
                this.end = '';
                this.year = ''
            },
            checkedel(){
                this.xyhmxlbData.varieties=''
                this.year=''
                this.xyhmxlbData.steelMills=''

            },
            downLoad(){
                this.downloadData.beginTime= this.xyhmxlbData.beginTime;
                this.downloadData.endTime = this.xyhmxlbData.endTime;
                this.downloadData.protocolYear = this.xyhmxlbData.protocolYear;
                this.downloadData.varieties = this.xyhmxlbData.varieties;
                this.downloadData.steelMills = this.xyhmxlbData.steelMills;
                this.downloadUrl=this.$store.state.fetchPath + "/protocolAccountDetails/exportlist?"+this.utils.formatParams(this.downloadData);
            },
            downloadMbban(){
                this.downloadMb=this.$store.state.fetchPath + "/export/exportAgreement";
            },
            remove (r) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确认删除吗？',
                    onOk: () => {
                        this.protocolAccountId=r.PROTOCOLACCOUNTID;
                        fetch(this.$store.state.fetchPath + "/protocolAccountDetails/delete", {
                            method: "POST",
                            headers: this.$store.state.fetchHeader,
                            body: "protocolAccountId="+this.protocolAccountId,
                            credentials:'include'
                        })
                            .then((res) => {
                                if(res.status!=200){
                                    this.$Message.error('请求失败！');
                                }else{
                                    return res.text();
                                }
                            })
                            .then(() => {
                                this.handleListApproveHistory();
                            })
                    }
                });

            },
            updD(r){
                this.updModal = true;
                this.updformValidate.protocolAccountId = r.PROTOCOLACCOUNTID;
                this.updYear = r.PROTOCOLYEAR;
                this.updformValidate.accountName = r.ACCOUNTNAME;
                this.updformValidate.varieties = r.VARIETIES;
                this.updformValidate.mainSalesRegional = r.MAINSALESREGIONAL;
                this.updformValidate.aidedSalesRegionalOne = r.AIDEDSALESREGIONALONE;
                this.updformValidate.aidedSalesRegionalTwo = r.AIDEDSALESREGIONALTWO;
                this.updformValidate.steelMills = r.STEELMILLS;
                this.updformValidate.annualAgreementVolume = r.ANNUALAGREEMENTVOLUME
            },
            updok(){
                this.updYear?this.updformValidate.protocolYear=new Date(this.updYear).getFullYear():'';
                fetch(this.$store.state.fetchPath + "/protocolAccountDetails/update", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.updformValidate),
                    credentials:'include'
                })
                    .then((res) => {
                        if(res.status!=200){
                            this.$Message.error('请求失败！');
                        }else{
                            return res.text();
                        }
                    })
                    .then(() => {
                        this.handleListApproveHistory();
                    })
            },
            pldelect(){
                if(this.duoxuan==false)
                {
                    alert('请选择要删除的数据')
                }
                else
                {
                    this.$Modal.confirm({
                        title: '提示',
                        content: '确认删除吗？',
                        onOk: () => {
                            let a=this.$refs.table.getSelection();
                            for(let i=0;i<a.length;i++){
                                this.plDelectData.push(a[i].PROTOCOLACCOUNTID);
                            }
                            fetch(this.$store.state.fetchPath + "/protocolAccountDetails/deleteList", {
                                method: "POST",
                                headers: this.$store.state.fetchHeader,
                                body: "idList="+this.plDelectData,
                                credentials:'include'
                            })
                                .then((res) => {
                                    if(res.status!=200){
                                        this.$Message.error('请求失败！');
                                    }else{
                                        return res.text();
                                    }
                                })
                                .then(() => {
                                    this.handleListApproveHistory();
                                })
                        }
                    });
                }

            }
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
    FormItem {
        float: left;
    }
</style>
