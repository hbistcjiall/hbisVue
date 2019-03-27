<template>
    <div>
        <Form :label-width="80">
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
            <Col span="4">
                <FormItem label="上传时间:">
                    <DatePicker type="datetimerange" @on-change="serTime" format="yyyy-MM-dd" placeholder="请选择上传时间" style="width: 180px"></DatePicker>
                </FormItem>
            </Col>
            <Col span="4" style="margin-left: 80px">
                <FormItem label="协议年份:">
                <DatePicker type="year" v-model='year'></DatePicker>
                </FormItem>
            </Col>
            <Col span="4">
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
            <Col span="6" style="float: right">
                <Button type="primary" @click="search" style="magin-left:20px" icon="ios-search">查询</Button>
                <Button type="primary" @click="clearall" style="magin-left:20px">清空</Button>
                <Button type="primary" @click="downLoad" style="magin-left:20px" icon="ios-cloud-download-outline">导出</Button>
            </Col>
        </Row>
        </Form>
        <Table border stripe :columns="columns12" :data="fecthdata6" style="margin-top: 20px" ref="table">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{row}" slot="action">
                <Button size="small" style="margin-right: 5px" @click="updD(row)">修改</Button>
                <Button size="small" @click="remove(row)" style="background:#ff6969;color:#fff;">删除</Button>
            </template>
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging" @on-change="changepage" style="margin-top:20px;"></Page>
        <Modal v-model="updModal" title="角色编辑" :closable='false' @on-ok="updok">
            <Form :model="updformValidate" :rules="updruleValidate" :label-width="90">
                <FormItem label="协议年份">
                    <DatePicker type="year" v-model='updYear'></DatePicker>
                </FormItem>
                <FormItem label="用户名称" prop="accountName">
                    <Input v-model="updformValidate.accountName" placeholder="请输入用户名称"></Input>
                </FormItem>
                <FormItem label="品种" prop="varieties">
                    <Select v-model="updformValidate.varieties">
                        <Option value="">全部</Option>
                        <Option value="热板">热板</Option>
                        <Option value="冷板">冷板</Option>
                        <Option value="宽厚板">宽厚板</Option>
                        <Option value="棒线">棒线</Option>
                        <Option value="型带">型带</Option>
                    </Select>
                </FormItem>
                <FormItem label="主销售区域">
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
                        <Option value="">全部</Option>
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
                updModal:false,
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
                year:'',
                protocolAccountId:'',
                dataCount: 0,
                pageSize: 10,
                xia: 0,
                columns12: [
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
                        key: 'ANNUALAGREEMENTVOLUME'
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
                    this.dataCount =  parseInt(res.count);
                    this.pageSize = parseInt(res.pageSize);
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
                fetch(this.$store.state.fetchPath + "/protocolAccountDetails/exportlist", {
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
                    })
                    .then(() => {
                        this.handleListApproveHistory();
                    })
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
                            body: this.utils.formatParams(this.delData),
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
