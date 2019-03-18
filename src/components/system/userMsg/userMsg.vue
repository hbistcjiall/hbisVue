<template>
    <div>
    <Input placeholder="账号/姓名/手机号" style="width: 300px" v-model="MsgData.name"/>
        <DatePicker type="datetimerange" @on-change="serTime" format="yyyy-MM-dd" placeholder="请选择查询时间" style="width: 300px;margin-right:20px"></DatePicker>
        <Button type="primary" @click="search" style="magin-left:20px" icon="ios-search">搜索</Button>
        <Button type="primary" @click="addNew" style="magin-left:20px" icon ="ios-add">添加</Button>
        <!--<Button type="primary" @click="downLoadTab" style="magin-left:20px" icon="ios-download-outline">导出</Button>-->
    <Table border stripe :columns="columns12" :data="fecthdata6" style="margin-top: 20px">
        <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{row}" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="updD(row)">编辑</Button>
            <Button type="primary" size="small" style="margin-right: 5px" @click="setUser(row)">分配角色</Button>
            <Button type="primary" size="small" style="margin-right: 5px" @click="rePassword(row)">重置密码</Button>
            <Button type="error" size="small" @click="remove(row)">删除</Button>
        </template>
    </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging" @on-change="changepage" style="margin-top:20px;"></Page>
        <Modal v-model="updModal" title="用户编辑" :closable='false' @on-ok="updok">
            <Form :model="updformValidate" :rules="updruleValidate" :label-width="60">
                <FormItem label="姓名" prop="name">
                    <Input v-model="updformValidate.name" placeholder="请输入姓名"></Input>
                </FormItem>
                <FormItem label="出生日期">
                    <Row>
                        <Col span="11">
                            <FormItem>
                                <DatePicker format="yyyy-MM-dd" type="date" placeholder="出生日期" v-model="updformValidate.birthday"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="E-mail">
                    <Input v-model="updformValidate.email" placeholder="请输入邮箱"></Input>
                </FormItem>
                <FormItem label="性别">
                    <Radio-group v-model="updformValidate.sex">
                        <Radio label="M">男</Radio>
                        <Radio label="F">女</Radio>
                    </Radio-group>
                </FormItem>
                <FormItem label="部门" prop="deptId">
                    <Cascader :data="deptdata" trigger="hover" placeholder="请重新选择部门" @on-change="depChange"></Cascader>
                </FormItem>
                <FormItem label="电话">
                    <Input v-model="updformValidate.phone" placeholder="请输入电话"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="setModal" title="分配角色" :closable='false' @on-ok="roleok">
            <Tree :data="userData" ref="tree" show-checkbox check-strictly></Tree>
            <!--@on-check-change="checkRole"-->
        </Modal>
    </div>

</template>
<script>
    import resetPass from './resetPassword.vue'
    import addUser from './addUser.vue'
    // import updUser from './updUser.vue'
    // import setUser from './setUser.vue'
    export default {
        name:'userManager',
        data () {
            return {
                updModal:false,
                setModal:false,
                MsgData : {
                    timeLimit:'',
                    page:'0',
                    limit:'10',
                    name:''
                },
                delData:{
                    userId:'',
                },
                freezeData:{
                    userId:'',
                    status:''
                },
                resPass:{
                    userId:''
                },
                timePick:'',
                deptdata:[],
                // 初始化信息总条数
                dataCount:0,
                // 每页显示多少条
                pageSize: 10,
                xia: 0, //下一页或者上一页的第一项索引值
                columns12: [
                    {
                        title: '账号',
                        align: "center",
                        key: 'ACCOUNT'
                    },
                    {
                        title: '姓名',
                        align: "center",
                        key: 'NAME'
                    },
                    {
                        title: '性别',
                        align: "center",
                        key: 'SEXNAME'
                    },
                    {
                        title: '角色',
                        align: "center",
                        key: 'ROLENAME'
                    },
                    {
                        title: '部门',
                        align: 'center',
                        key: 'DEPTNAME'
                    },
                    {
                        title: '邮箱',
                        align: 'center',
                        key: 'EMAIL'
                    },
                    {
                        title: '电话',
                        align: 'center',
                        key: 'PHONE'
                    },
                    {
                        title: '创建时间',
                        align: 'center',
                        key: 'CREATETIME'
                    },
                    {
                        title: '状态',
                        key: 'STATUS',
                        align: 'center',
                        render: (h, params) => h('i-switch', {
                            props: {
                                size:'large',
                                value: params.row.STATUS,
                                'true-value': 'ENABLE',
                                'false-value': 'FREEZE'
                            },
                            on: {
                                'on-change': (value) => {
                                    this.freezeData.userId = params.row.USERID;
                                    this.freezeData.status = value;
                                    fetch(this.$store.state.fetchPath + "/mgr/freeze", {
                                        method: "POST",
                                        headers: this.$store.state.fetchHeader,
                                        body: this.utils.formatParams(this.freezeData),
                                        credentials:'include'
                                    })
                                        .then((res) => {
                                            return res.text();
                                        }).then(() => {
                                        this.handleListApproveHistory();
                                    })
                                }
                            }
                        }, [h('span', {slot: 'open',domProps: {innerHTML: '正常'}}),
                            h('span', {slot: 'close',domProps: {innerHTML: '冻结'}})
                        ])
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center',
                        width:'260px'
                    },
                ],
                fecthdata6: [],
                resDatas:[],
                formValidate: {
                    account:'',
                    name: '',
                    email: '',
                    sex: '',
                    birthday: '',
                    password:'',
                    phone:'',
                    deptId:'',
                    setpassword:'',
                    userId:'',

                },
                updformValidate: {
                    name: '',
                    email: '',
                    sex: '',
                    birthday: '',
                    phone:'',
                    deptId:'',
                    userId:''
                },
                updruleValidate: {
                    name: [
                        { required: true, message: '姓名不为空', trigger: 'blur' }
                    ],
                    deptId: [
                        { required: true, message: '部门不为空', trigger: 'blur' },
                    ],
                },
                userData:[],
                roleForm:{
                    userId:'',
                },
            }
        },
        created() {
            this.handleListApproveHistory();
            fetch(this.$store.state.fetchPath + "/dept/treeView", {
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
                this.deptdata =  this.utils.buildDeptTree(res);
            })
            fetch("http://localhost:8081/role/roleTreeList", {
                method: "POST",
                headers: {//fetch请求头
                    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: '',
                credentials: 'include'
            }).then((res) => {
                return res.text();
            }).then((res) => {
                res = res.length>0?JSON.parse(res):[];
                this.userData=this.utils.roleTree(this.utils.buildRoleTree(res));
            });
        },
        methods: {
            // 获取日志记录信息
            handleListApproveHistory() {
                fetch(this.$store.state.fetchPath + "/mgr/list", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.MsgData),
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
                this.MsgData.page=index;
                this.handleListApproveHistory();
            },
            serTime(e){
                this.Dates=e;
                if(this.Dates[0]==''){
                    this.MsgData.timeLimit=''
                }else{
                    this.MsgData.timeLimit =this.Dates[0]+' - '+this.Dates[1];
                }
            },
            search(){
                this.handleListApproveHistory();
            },
            addNew () {
                this.$Modal.confirm({
                    scrollable:true,
                    okText:'保存',
                    render: (h) => {
                        return h(addUser, {
                            props: {

                            },
                            on: {
                                account: (account) => {
                                    this.formValidate.account=account
                                },
                                name: (name) => {
                                    this.formValidate.name=name
                                },
                                birthday: (birthday) => {
                                    this.formValidate.birthday=birthday
                                },
                                password: (password) => {
                                    this.formValidate.password=password
                                },
                                setpassword: (setpassword) => {
                                    this.formValidate.setpassword=setpassword
                                },
                                email: (email) => {
                                    this.formValidate.email=email
                                },
                                sex: (sex) => {
                                    this.formValidate.sex=sex
                                },
                                phone: (phone) => {
                                    this.formValidate.phone=phone
                                },
                                deptId: (deptId) => {
                                    this.formValidate.deptId=deptId
                                },
                            }
                        })
                    },
                    onOk: () => {
                        fetch(this.$store.state.fetchPath + "/mgr/add", {
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
                        this.delData.userId=r.USERID;
                        fetch(this.$store.state.fetchPath + "/mgr/delete", {
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
            updD(row){
                this.updModal = true;
                this.updformValidate.name = row.NAME;
                this.updformValidate.email = row.EMAIL;
                this.updformValidate.birthday = row.BIRTHDAY;
                this.updformValidate.sex = row.SEX
                this.updformValidate.phone = row.PHONE;
                this.updformValidate.userId = row.USERID
            },
            depChange(e){
                this.updformValidate.deptId= e[e.length-1];
                this.$emit('deptId', this.updformValidate.deptId);
            },
            updok(){
                fetch(this.$store.state.fetchPath + "/mgr/edit", {
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
            setUser(row){
                this.setModal = true;
                this.roleForm.userId = row.USERID
            },
            roleok(){
                let roleCheckarr = []
                let rolearr = this.$refs.tree.getCheckedNodes();
                for(var i=0;i<rolearr.length;i++){
                    roleCheckarr.push(rolearr[i].id);
                }
                fetch(this.$store.state.fetchPath + "/mgr/setRole", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: "roleIds="+roleCheckarr.toString()+"&userId="+this.roleForm.userId,
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
            rePassword(row){
                this.resPass.userId=row.USERID;
                this.$Modal.confirm({
                    scrollable:true,
                    okText:'确认',
                    render: (h) => {
                        return h(resetPass, {
                            props: {

                            },
                            on: {

                            }
                        })
                    },
                    onOk: () => {
                            fetch(this.$store.state.fetchPath + "/mgr/reset", {
                                method: "POST",
                                headers: this.$store.state.fetchHeader,
                                body: this.utils.formatParams(this.resPass),
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

                    }
                })

            },
        },
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
