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
    </div>
</template>
<script>
    // import add from './updUsermsg.vue'
    import resetPass from './resetPassword.vue'
    import addUser from './addUser.vue'
    import updUser from './updUser.vue'
    export default {
        name:'userManager',
        data () {
            return {
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
                updData:{
                    userName:'',
                    userPassword:'',
                    id:''
                },
                resPass:{
                    userId:''
                },
                newUser:{
                    name: '',
                    email: '',
                    sex: '',
                    birthday: '',
                    phone:'',
                    deptId:'',
                },
                timePick:'',
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
                    setpassword:''
                },
            }
        },
        components:{
            // add
        },
        created() {
            this.handleListApproveHistory();
            this.getDeptid();
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
                                // this.newUser =
                                // value1: (value1) => {
                                //     this.v1 = value1
                                //     this.updData.userName=this.v1
                                // },
                            }
                        })
                    },
                    onOk: (e) => {
                        window.console.log(e)
                    }
                })
            },
            remove (r) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确认删除吗？',
                    onOk: () => {
                        this.delData.userId=r.userId;
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
                                this.handleListApproveHistory();
                            })
                    }
                });

            },
            updD(row){
                this.updData.id=row.id;
                // this.$Modal.confirm({
                //     scrollable:true,
                //     okText:'保存',
                //     render: (h) => {
                //         return h(addUser, {
                //             props: {
                //
                //             },
                //             on: {
                //
                //             }
                //         })
                //     },
                //     onOk: () => {
                //         if (this.v1 === '') {
                //             this.$Message.error('用户名不能为空!')
                //         }else if(this.v2 === ''){
                //             this.$Message.error('密码不能为空!')
                //         }else{
                //             fetch(this.$store.state.fetchPath + "/updateuser", {
                //                 method: "POST",
                //                 headers: this.$store.state.fetchHeader,
                //                 body: this.utils.formatParams(this.updData),
                //                 credentials:'include'
                //             })
                //                 .then((res) => {
                //                     return res.text();
                //                 })
                //                 .then((res) => {
                //                     res = res.length>0?JSON.parse(res):[];
                //
                //                     this.$Message.error(res.msg);
                //                     this.handleListApproveHistory();
                //                 })
                //         }
                //     }
                // })
            },
            setUser(row){
                this.updData.id=row.id;
                this.$Modal.confirm({
                    scrollable:true,
                    okText:'分配角色',
                    render: (h) => {
                        return h(updUser, {
                            props: {

                            },
                            on: {

                            }
                        })
                    },
                    onOk: () => {

                    }
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
            getDeptid(){
                fetch(this.$store.state.fetchPath + "/dept/tree", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    credentials:'include'
                })
                    .then((res) => {
                        return res.text();
                    }).then((res) => {
                    res = res.length>0?JSON.parse(res):[]
                    // 保存取到的所有数据
                    window.console.log(res);
                    // this.data =  res.data;
                })
            }
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
