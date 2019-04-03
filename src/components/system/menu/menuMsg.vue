<template>
    <div>
        <Input placeholder="菜单名称/编码" style="width: 300px" v-model="menuData.menuName"/>
        <Input placeholder="层级" style="width: 300px" v-model="menuData.level"/>
        <Button @click="search" style="margin-left:20px;" icon="ios-search">搜索</Button>
        <Button @click="addNew" style="margin-left:10px;" icon ="ios-add">添加</Button>
        <!--<Button type="primary" @click="downLoadTab" style="magin-left:20px" icon="ios-download-outline">导出</Button>-->
        <Table :loading="loading" border stripe :columns="columns12" :data="fecthdata6" style="margin-top: 20px">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{row}" slot="action">
                <Button size="small" style="margin-right: 5px" @click="updD(row)">编辑</Button>
                <Button size="small" @click="remove(row)" style="background:#ff6969;color:#fff;">删除</Button>
            </template>
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging" @on-change="changepage" style="margin-top:20px;"></Page>
        <Modal v-model="updModal" title="用户编辑" :closable='false' @on-ok="updok">
            <Form ref="updformValidate" :model="updformValidate" :rules="updruleValidate" :label-width="80">
                <FormItem label="名称" prop="name">
                    <Input v-model="updformValidate.name" placeholder="名称"></Input>
                </FormItem>
                <FormItem label="菜单编号" prop="code">
                    <Input v-model="updformValidate.code" placeholder="菜单编号"></Input>
                </FormItem>
                <FormItem label="父级编号" prop="pid">
                    <!--<Cascader :data="menuDatas" trigger="hover" @on-change="pIdChange"></Cascader>-->
                    <Tree :data="menuDatas" ref="tree" @on-select-change="pIdChange"></Tree>
                </FormItem>
                <FormItem label="是否是菜单" prop="menuFlag">
                    <Radio-group v-model="updformValidate.menuFlag">
                        <Radio label="Y">是</Radio>
                        <Radio label="N">不是</Radio>
                    </Radio-group>
                </FormItem>
                <FormItem label="请求地址" prop="url">
                    <Input v-model="updformValidate.url" placeholder="请输入请求地址"></Input>
                </FormItem>
                <FormItem label="排序">
                    <Input v-model="updformValidate.sort" placeholder="请输入排序"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>

</template>
<script>
    import addMenu from './addMenu.vue'
    export default {
        name:'menuMsg',
        data () {
            return {
                loading:true,
                updModal:false,
                menuData : {
                    level:'',
                    page:'0',
                    limit:'10',
                    menuName:'',
                },
                delData:{
                    menuId:'',
                },
                freezeData:{
                    userId:'',
                    status:''
                },
                menuDatas:[],
                dataCount:0,
                pageSize: 10,
                xia: 0,
                columns12: [
                    {
                        title: '菜单名称',
                        align: "center",
                        key: 'NAME'
                    },
                    {
                        title: '菜单编号',
                        align: "center",
                        key: 'CODE'
                    },
                    {
                        title: '菜单父编号',
                        align: "center",
                        key: 'PCODE'
                    },
                    {
                        title: '请求地址',
                        align: "center",
                        key: 'URL'
                    },
                    {
                        title: '排序',
                        align: 'center',
                        key: 'SORT'
                    },
                    {
                        title: '层级',
                        align: 'center',
                        key: 'LEVELS'
                    },
                    {
                        title: '是否是菜单',
                        align: 'center',
                        key: 'isMenuName'
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
                    name:'',
                    code:'',
                    pid:'',
                    menuFlag:'',
                    url:'',
                    sort:0,
                },
                updformValidate: {
                    name:'',
                    code:'',
                    pid:'',
                    menuFlag:'',
                    url:'',
                    sort:0,
                    menuId:''
                },
                updruleValidate: {
                    name: [
                        { required: true, message: '名称为空', trigger: 'blur' }
                    ],
                    code:[
                        { required: true, message: '菜单编号不为空', trigger: 'blur' }
                    ],
                    pid:[
                        { required: true, message: '父菜单编号不为空', trigger: 'blur' }
                    ],
                    menuFlag:[
                        { required: true, message: '是否是菜单不为空', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: '请求路径不为空', trigger: 'blur' },
                    ],
                },
                userData:[],
            }
        },
        created() {
            this.handleListApproveHistory();
            fetch(this.$store.state.fetchPath +"/menu/selectMenuTreeList", {
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
                this.menuDatas =  this.utils.roleTree(this.utils.buildRoleTree(res));

            })
        },
        methods: {
            handleListApproveHistory() {
                this.loading = true;
                fetch(this.$store.state.fetchPath + "/menu/list", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.menuData),
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
                    this.loading = false;
                })
            },
            changepage(index) {
                this.menuData.page=index;
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
                        return h(addMenu, {
                            props: {
                                url:this.$store.state.fetchPath
                            },
                            on: {
                                name: (name) => {
                                    this.formValidate.name=name
                                },
                                code: (code) => {
                                    this.formValidate.code=code
                                },
                                pid: (pid) => {
                                    this.formValidate.pid=pid
                                },
                                menuFlag: (menuFlag) => {
                                    this.formValidate.menuFlag=menuFlag
                                },
                                url: (url) => {
                                    this.formValidate.url=url
                                },
                                sort: (sort) => {
                                    this.formValidate.sort=sort
                                },
                            }
                        })
                    },
                    onOk: () => {
                        fetch(this.$store.state.fetchPath + "/menu/add", {
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
                        this.delData.menuId=r.MENUID;
                        fetch(this.$store.state.fetchPath + "/menu/remove", {
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
            updD(row){
                this.updModal = true;
                this.updformValidate.menuId = row.MENUID;
                this.updformValidate.name = row.NAME;
                this.updformValidate.code = row.CODE;
                this.updformValidate.pid = row.PID;
                this.updformValidate.menuFlag = row.MENUFLAG;
                this.updformValidate.url = row.URL;
                this.updformValidate.sort = row.SORT;
            },
            pIdChange(e){
                let roleCheckarr = []
                let rolearr = e;
                for(var i=0;i<rolearr.length;i++){
                    roleCheckarr.push(rolearr[i].id);
                }
                this.updformValidate.pid = roleCheckarr.toString()
            },
            updok(){
                fetch(this.$store.state.fetchPath + "/menu/edit", {
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
    button{
        background: #3497db;
        color:#fff;
    }
    table button{
        background: #f2f4f7;
        color:#546c8c;
    }
</style>
