<template>
    <div>
        <Input placeholder="字典名称" style="width: 300px" v-model="dictData.condition"/>
        <Button type="primary" @click="search" style="magin-left:20px" icon="ios-search">搜索</Button>
        <Button type="primary" @click="addNew" style="magin-left:20px" icon ="ios-add">添加</Button>
        <!--<Button type="primary" @click="downLoadTab" style="magin-left:20px" icon="ios-download-outline">导出</Button>-->
        <Table border stripe :columns="columns12" :data="fecthdata6" style="margin-top: 20px">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{row}" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="updD(row)">添加子项目</Button>
                <Button type="error" size="small" @click="remove(row)">删除</Button>
            </template>
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging" @on-change="changepage" style="margin-top:20px;"></Page>
        <Modal v-model="updModal" title="角色编辑" :closable='false' @on-ok="updok">
            <Form :model="updformValidate" :rules="updruleValidate" :label-width="90">
                <FormItem label="父级字典" prop="dictTypeId">
                    <Input v-model="updformValidate.dictTypeId" placeholder="请输入父级字典" readonly></Input>
                </FormItem>
                <FormItem label="字典名称" prop="name">
                    <Input v-model="updformValidate.name" placeholder="请输入字典名称"></Input>
                </FormItem>
                <FormItem label="字典编码" prop="code">
                    <Input v-model="updformValidate.code" placeholder="请输入字典编码"></Input>
                </FormItem>
                <FormItem label="描述">
                    <Input v-model="updformValidate.description" placeholder="请输入描述"></Input>
                </FormItem>
                <FormItem label="排序">
                    <Input v-model="updformValidate.sort" placeholder="请输入排序"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>

</template>
<script>
    import addDict from './addDict.vue'
    export default {
        name:'dictMsg',
        data () {
            return {
                updModal:false,
                dictData: {
                    condition: '',
                    page: '0',
                    limit: '10',
                },
                delData:{
                    dictId:'',
                },
                formValidate: {
                    dictTypeId:'0',
                    name:'',
                    code:'',
                    description:'',
                    sort:0
                },
                // 初始化信息总条数
                dataCount: 0,
                // 每页显示多少条
                pageSize: 10,
                xia: 0, //下一页或者上一页的第一项索引值
                columns12: [
                    {
                        title: '名称',
                        align: "center",
                        key: 'NAME'
                    },
                    {
                        title: '字典编码',
                        align: "center",
                        key: 'CODE'
                    },
                    {
                        title: '详情',
                        align: "center",
                        key: 'detail'
                    },
                    {
                        title: '备注',
                        align: "center",
                        key: 'DESCRIPTION'
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
                    dictTypeId:'',
                    name:'',
                    code:'',
                    description:'',
                    sort:0,
                    dictId:''
                },
                updruleValidate: {
                    name: [
                        { required: true, message: '字典名称', trigger: 'blur' }
                    ],
                    dictTypeId:[
                        { required: true, message: '父级字典', trigger: 'blur' }
                    ],
                    code:[
                        { required: true, message: '字典编码', trigger: 'blur' }
                    ]
                },
                uproledata:[],
            }
        },
        created() {
            this.handleListApproveHistory();
        },
        methods: {
            // 获取日志记录信息
            handleListApproveHistory() {
                fetch(this.$store.state.fetchPath + "/dict/list", {
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
                    okText:'保存',
                    render: (h) => {
                        return h(addDict, {
                            props: {

                            },
                            on: {
                                name: (name) => {
                                    this.formValidate.name=name
                                },
                                dictTypeId: (dictTypeId) => {
                                    this.formValidate.dictTypeId=dictTypeId
                                },
                                code: (code) => {
                                    this.formValidate.code=code
                                },
                                sort: (sort) => {
                                    this.formValidate.sort=sort
                                },
                                description: (description) => {
                                    this.formValidate.description=description
                                }
                            }
                        })
                    },
                    onOk: () => {
                        fetch(this.$store.state.fetchPath + "/dict/add", {
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
                        this.delData.dictId=r.DICTID;
                        fetch(this.$store.state.fetchPath + "/dict/delete  ", {
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
            updD(r){
                this.updModal = true;
                this.updformValidate.dictId = r.DICTID;
                this.updformValidate.dictTypeId = r.NAME;
            },
            updok(){
                this.updformValidate.dictTypeId = this.updformValidate.dictId
                fetch(this.$store.state.fetchPath + "/dict/add", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.updformValidate),
                    credentials:'include'
                })
                    .then((res) => {
                        return res.text();
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
</style>
