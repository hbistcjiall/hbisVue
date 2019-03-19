<template>
    <div>
        <Input placeholder="角色名称" style="width: 300px" v-model="roleData.roleName"/>
        <Button type="primary" @click="search" style="magin-left:20px" icon="ios-search">搜索</Button>
        <Button type="primary" @click="addNew" style="magin-left:20px" icon ="ios-add">添加</Button>
        <!--<Button type="primary" @click="downLoadTab" style="magin-left:20px" icon="ios-download-outline">导出</Button>-->
        <Table border stripe :columns="columns12" :data="fecthdata6" style="margin-top: 20px">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{row}" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="updD(row)">编辑</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="setRole(row)">权限配置</Button>
                <Button type="error" size="small" @click="remove(row)">删除</Button>
            </template>
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging" @on-change="changepage" style="margin-top:20px;"></Page>
        <Modal v-model="updModal" title="角色编辑" :closable='false' @on-ok="updok">
            <Form :model="updformValidate" :rules="updruleValidate" :label-width="60">
                <FormItem label="角色" prop="name">
                    <Input v-model="updformValidate.name" placeholder="请输入角色"></Input>
                </FormItem>

                <FormItem label="别名" prop="description">
                    <Input v-model="updformValidate.description" placeholder="请输入别名"></Input>
                </FormItem>
                <FormItem label="排序" prop="sort">
                    <Input v-model="updformValidate.sort" placeholder="请输入排序"></Input>
                </FormItem>
                <FormItem label="上级" prop="pid">
                    <!--<Cascader :data="uproledata" trigger="hover"></Cascader>-->
                    <Tree :data="uproledata" ref="tree" @on-select-change="pidChange"></Tree>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="setModal" title="权限配置" :closable='false' @on-ok="roleok">
            <Tree :data="roleDatatree" ref="tree" show-checkbox ></Tree>
            <!--@on-check-change="checkRole"-->
        </Modal>
    </div>

</template>
<script>
    import addRole from './addRole.vue'
    export default {
        name:'roleMsg',
        data () {
            return {
                updModal:false,
                setModal:false,
                roleData: {
                    roleName: '',
                    page: '0',
                    limit: '10',
                },
                delData:{
                    roleId:'',
                },
                formValidate: {
                    name: '',
                    pid: '',
                    description: '',
                    sort: 0,
                    roleId:''
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
                        title: '上级角色',
                        align: "center",
                        key: 'PNAME'
                    },
                    {
                        title: '别名',
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
                    name: '',
                    pid: '',
                    description: '',
                    sort: 0,
                    roleId:''
                },
                updruleValidate: {
                    name: [
                        { required: true, message: '角色不为空', trigger: 'blur' }
                    ],
                    pid:[
                        { required: true, message: '上级不为空', trigger: 'blur' }
                    ],
                    description:[
                        { required: true, message: '别名不为空', trigger: 'blur' }
                    ],
                    sort: [
                        { required: true, message: '序号不为空', trigger: 'blur' },
                    ],
                },
                uproledata:[],
                roleDatatree:[],
                roleForm:{
                    roleId:'',
                },
            }
        },
        created() {
            this.handleListApproveHistory();
            fetch(this.$store.state.fetchPath + "/role/roleTreeList", {
                method: "POST",
                headers: {//fetch请求头
                    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
                },
                credentials:'include'
            })
                .then((res) => {
                    return res.text();
                }).then((res) => {
                res = res.length>0?JSON.parse(res):[]
                // 保存取到的所有数据
                this.uproledata =  this.utils.roleTree(this.utils.buildRoleTree(res));
            });
            fetch(this.$store.state.fetchPath +"/menu/menuTreeListByRoleId", {
                method: "POST",
                headers: {//fetch请求头
                    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: this.utils.formatParams(this.roleForm),
                credentials: 'include'
            }).then((res) => {
                return res.text();
            }).then((res) => {
                res = res.length>0?JSON.parse(res):[];
                this.roleDatatree=this.utils.roleTree(this.utils.buildRoleTree(res));
            });
        },
        methods: {
            // 获取日志记录信息
            handleListApproveHistory() {
                fetch(this.$store.state.fetchPath + "/role/list", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.roleData),
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
                        return h(addRole, {
                            props: {
                                url:this.$store.state.fetchPath
                            },
                            on: {
                                name: (name) => {
                                    this.formValidate.name=name
                                },
                                pid: (pid) => {
                                    this.formValidate.pid=pid
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
                        fetch(this.$store.state.fetchPath + "/role/add", {
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
                        this.delData.roleId=r.ROLEID;
                        fetch(this.$store.state.fetchPath + "/role/removeRole", {
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
                this.updformValidate.name = r.NAME;
                this.updformValidate.sort = r.SORT;
                this.updformValidate.pid = r.PID;
                this.updformValidate.description = r.DESCRIPTION;
                this.updformValidate.roleId = r.ROLEID
            },
            pidChange(e){
                let roleCheckarr = []
                let rolearr = e;
                for(var i=0;i<rolearr.length;i++){
                    roleCheckarr.push(rolearr[i].id);
                }
                this.updformValidate.pid = roleCheckarr.toString()
            },
            updok(){
                fetch(this.$store.state.fetchPath + "/role/edit", {
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
            },
            setRole(r){
                this.setModal = true;
                this.roleForm.roleId = r.ROLEID;
            },
            roleok(){
                let roleCheckarr = []
                let rolearr = this.$refs.tree.getCheckedNodes();
                for(var i=0;i<rolearr.length;i++){
                    roleCheckarr.push(rolearr[i].id);
                }
                fetch(this.$store.state.fetchPath + "/role/setAuthority", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: "ids="+roleCheckarr.toString()+"&roleId="+this.roleForm.roleId,
                    credentials:'include'
                })
                    .then((res) => {
                        return res.text();
                    })
                    .then((res) => {
                        res = res.length>0?JSON.parse(res):[];
                        this.$Message.success(res.message);
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
</style>
