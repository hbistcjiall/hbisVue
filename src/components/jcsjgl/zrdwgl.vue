<template>
    <div>
        <Input placeholder="责任单位名称" style="width: 300px" v-model="dictData.companyname"/>
        <Button @click="search" style="magin-left:20px;" icon="ios-search">查询</Button>
        <Button @click="addNew" style="magin-left:20px;" icon ="ios-add">新增</Button>
        <!--<Button type="primary" @click="downLoadTab" style="magin-left:20px" icon="ios-download-outline">导出</Button>-->
        <Table border stripe :columns="columns12" :data="fecthdata6" style="margin-top: 20px">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{row}" slot="action">
                <Button size="small" style="margin-right: 5px" @click="updD(row)">修改</Button>
                <Button size="small" @click="remove(row)" style="background:#ff6969;color:#fff;">删除</Button>
            </template>
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging" @on-change="changepage" style="margin-top:20px;"></Page>
        <Modal v-model="updModal" title="责任单位管理" :closable='false' @on-ok="updok">
            <Form :model="updformValidate" :rules="updruleValidate" :label-width="90">
                <FormItem label="编码" prop="code">
                    <Input v-model="updformValidate.code" placeholder="请输入编码" readonly></Input>
                </FormItem>
                <FormItem label="责任单位" prop="companyname">
                    <Input v-model="updformValidate.companyname" placeholder="请输入责任单位名称"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>

</template>
<script>
    import addZrdwgl from './addZrdwgl.vue'
    export default {
        name:'zrdwgl',
        data () {
            return {
                updModal:false,
                dictData: {
                    companyname: '',
                    page: '0',
                    limit: '10',
                },
                delData:{
                    id:'',
                },
                formValidate: {
                    companyname:'',
                },
                dataCount: 0,
                pageSize: 10,
                xia: 0,
                columns12: [
                    {
                        title: '序号',
                        align: "center",
                        type: 'index',
                    },
                    {
                        title: '编码',
                        align: "center",
                        key: 'CODE'
                    },
                    {
                        title: '责任单位名称',
                        align: "center",
                        key: 'NAME'
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
                updformValidate: {
                    id:'',
                    companyname:'',
                    code:'',
                },
                updruleValidate: {
                    name: [
                        { required: true, message: '名称', trigger: 'blur' }
                    ],
                    code:[
                        { required: true, message: '编码', trigger: 'blur' }
                    ]
                },
                uproledata:[],
            }
        },
        created() {
            this.handleListApproveHistory();
        },
        methods: {
            handleListApproveHistory() {
                fetch(this.$store.state.fetchPath + "/acctabilityunit/selaccountmanager", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.dictData),
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
            search(){
                this.handleListApproveHistory();
            },
            addNew () {
                this.$Modal.confirm({
                    scrollable:true,
                    okText:'新增',
                    render: (h) => {
                        return h(addZrdwgl, {
                            props: {

                            },
                            on: {
                                companyname: (name) => {
                                    this.formValidate.companyname=name
                                },
                            }
                        })
                    },
                    onOk: () => {
                        fetch(this.$store.state.fetchPath + "/acctabilityunit/addorupdatemanager", {
                            method: "POST",
                            headers: this.$store.state.fetchHeader,
                            body: this.utils.formatParams(this.formValidate),
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
                })
            },
            remove (r) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确认删除吗？',
                    onOk: () => {
                        this.delData.id=r.ID;
                        fetch(this.$store.state.fetchPath + "/acctabilityunit/delmanager", {
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
                this.updformValidate.id = r.ID;
                this.updformValidate.companyname = r.NAME;
                this.updformValidate.code = r.CODE;
            },
            updok(){
                this.updformValidate.dictTypeId = this.updformValidate.id
                fetch(this.$store.state.fetchPath + "/acctabilityunit/addorupdatemanager", {
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
    button{
        background: #3497db;
        color:#fff;
    }
    table button{
         background: #f2f4f7;
         color:#546c8c;
     }
</style>
