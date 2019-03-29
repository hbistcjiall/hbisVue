<template>
    <div>
        <Input placeholder="部门名称" style="width: 300px" v-model="deptData.condition"/>
        <Button @click="search" style="margin-left:20px;" icon="ios-search">搜索</Button>
        <Button @click="addNew" style="margin-left:10px;" icon ="ios-add">添加</Button>
        <!--<Button type="primary" @click="downLoadTab" style="magin-left:20px" icon="ios-download-outline">导出</Button>-->
        <Table border stripe :columns="columns12" :data="fecthdata6" style="margin-top: 20px">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{row}" slot="action">
                <Button size="small" style="margin-right: 5px" @click="updD(row)">编辑</Button>
                <Button size="small" @click="remove(row)" style="background:#ff6969;color:#fff;">删除</Button>
            </template>
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging" @on-change="changepage" style="margin-top:20px;"></Page>
        <Modal v-model="updModal" title="角色编辑" :closable='false' @on-ok="updok">
            <Form :model="updformValidate" :rules="updruleValidate" :label-width="90">
                <FormItem label="部门名称" prop="simpleName">
                    <Input v-model="updformValidate.simpleName" placeholder="请输入部门名称"></Input>
                </FormItem>

                <FormItem label="部门全称" prop="fullName">
                    <Input v-model="updformValidate.fullName" placeholder="请输入部门全称"></Input>
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="updformValidate.description" placeholder="请输入备注"></Input>
                </FormItem>
                <FormItem label="排序">
                    <Input v-model="updformValidate.sort" placeholder="请输入排序"></Input>
                </FormItem>
                <FormItem label="上级名称" prop="pid">
                    <!--<Cascader :data="updeptdata" trigger="hover"></Cascader>-->
                    <Tree :data="updeptdata" ref="tree" @on-select-change="pidChange"></Tree>
                </FormItem>
            </Form>
        </Modal>
    </div>

</template>
<script>
    import addDept from './addDept.vue'
    export default {
        name:'deptMsg',
        data () {
            return {
                updModal:false,
                deptData: {
                    condition: '',
                    page: '0',
                    limit: '10',
                },
                delData:{
                    deptId:'',
                },
                formValidate: {
                    fullName: '',
                    simpleName: '',
                    pid: '',
                    description: '',
                    sort: 0
                },
                dataCount: 0,
                pageSize: 10,
                xia: 0,
                columns12: [
                    {
                        title: '部门简称',
                        align: "center",
                        key: 'SIMPLENAME'
                    },
                    {
                        title: '部门全称',
                        align: "center",
                        key: 'FULLNAME'
                    },
                    {
                        title: '排序',
                        align: "center",
                        key: 'SORT'
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
                    simpleName:'',
                    pid:'',
                    fullName:'',
                    description:'',
                    sort:0
                },
                updruleValidate: {
                    simpleName: [
                        { required: true, message: '部门名称', trigger: 'blur' }
                    ],
                    pid:[
                        { required: true, message: '上级部门', trigger: 'blur' }
                    ],
                    fullName:[
                        { required: true, message: '部门全称', trigger: 'blur' }
                    ],
                },
                updeptdata:[],
            }
        },
        created() {
            this.handleListApproveHistory();
            fetch(this.$store.state.fetchPath + "/dept/tree", {
                method: "POST",
                headers: {
                    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
                },
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
                this.updeptdata =  this.utils.roleTree(this.utils.buildRoleTree(res));
            })
        },
        methods: {
            // 获取日志记录信息
            handleListApproveHistory() {
                fetch(this.$store.state.fetchPath + "/dept/list", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.deptData),
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
                this.roleData.page=index;
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
                        return h(addDept, {
                            props: {
                                url:this.$store.state.fetchPath
                            },
                            on: {
                                simpleName: (simpleName) => {
                                    this.formValidate.simpleName=simpleName
                                },
                                pid: (pid) => {
                                    this.formValidate.pid=pid
                                },
                                fullName: (fullName) => {
                                    this.formValidate.fullName=fullName
                                },
                                sort: (sort) => {
                                    this.formValidate.sort=sort
                                },
                                description: (description) => {
                                    this.formValidate.description=description
                                },

                            }
                        })
                    },
                    onOk: () => {
                        fetch(this.$store.state.fetchPath + "/dept/add", {
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
                        this.delData.deptId=r.DEPTID;
                        fetch(this.$store.state.fetchPath + "/dept/delete", {
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
                this.updformValidate.simpleName = r.SIMPLENAME
                this.updformValidate.fullName = r.FULLNAME
                this.updformValidate.sort = r.SORT;
                this.updformValidate.pid = r.PID;
                this.updformValidate.description = r.DESCRIPTION;
                this.updformValidate.deptId = r.DEPTID
            },
            pidChange(e){
                let roleCheckarr = []
                let rolearr = e;
                for(var i=0;i<rolearr.length;i++){
                    roleCheckarr.push(rolearr[i].id);
                }
                this.formValidate.pid = roleCheckarr.toString()
            },
            updok(){
                fetch(this.$store.state.fetchPath + "/dept/update", {
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
