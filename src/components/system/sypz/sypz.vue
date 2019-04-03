<template>
    <div>
        <Input placeholder="菜单名" style="width: 300px" v-model="roleData.menuname"/>
        <Button @click="search" style="margin-left:20px;" icon="ios-search">搜索</Button>
        <Button @click="addNew" style="margin-left:10px;" icon="ios-add">添加</Button>
        <Table :loading="loading" border stripe :columns="columns12" :data="fecthdata6" style="margin-top: 20px">
            <template slot-scope="{row}" slot="action">
                <Button size="small" @click="remove(row)" style="background:#ff6969;color:#fff;">删除</Button>
            </template>
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging" @on-change="changepage" style="margin-top:20px;"></Page>
        <Modal v-model="setModal" title="添加" :closable='false' @on-ok="roleok">
            <Tree :data="roleDatatree" ref="tree"    ></Tree>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "sypz",
        data() {
            return {
                loading:true,
                columns12: [
                    {
                        title: '序号',
                        align: "center",
                        type:'index',
                        width:'60'
                    },
                    {
                        title: '模块名',
                        align: "center",
                        key:'MENUNAME'
                    },
                    {
                        title: '对应路径',
                        align: "center",
                        key:'URL'
                    },
                    {
                        title: '添加时间',
                        align: "center",
                        key:'UPLOAD_TIME'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center',
                        width: '260px'
                    },
                ],
                setModal:false,
                roleDatatree:[],
                fecthdata6: [],
                resDatas:[],
                roleData: {
                    menuname: '',
                    page: '1',
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
                dataCount: 0,
                pageSize: 10,
                xia: 0,
                roleForm:{
                    roleId:'',
                },
            }
        },
        methods:{
            addNew(){
                this.setModal=true;
            },
            roleok(){
                let roleCheckarr = []
                let rolearr = this.$refs.tree.getSelectedNodes();
                for(var i=0;i<rolearr.length;i++){
                    roleCheckarr.push(rolearr[i].id);
                }
                fetch(this.$store.state.fetchPath + "/settings/addorupdate", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: "menuid="+roleCheckarr.toString(),
                    credentials:'include'
                })
                    .then((res) => {
                        if(res.status!=200){
                            this.$Message.error('请求失败！');
                        }else{
                            this.handleListApproveHistory();
                            return res.text();
                        }
                    })
            },
            handleListApproveHistory() {
                this.loading = true;
                fetch(this.$store.state.fetchPath + "/settings/selsettings", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.roleData),
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
                this.roleData.page=index;
                this.handleListApproveHistory();
            },
            search(){
                this.handleListApproveHistory();
            },
            remove (r) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确认删除吗？',
                    onOk: () => {
                        fetch(this.$store.state.fetchPath + "/settings/delsettings", {
                            method: "POST",
                            headers: this.$store.state.fetchHeader,
                            body: "id="+r.SETTING_ID,
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
        },
        created(){
            this.handleListApproveHistory();
            fetch(this.$store.state.fetchPath +"/menu/menuTreeListByRoleId", {
                method: "POST",
                headers: {
                    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: this.utils.formatParams(this.roleForm),
                credentials: 'include'
            }).then((res) => {
                if(res.status!=200){
                    this.$Message.error('请求失败！');
                }else{
                    return res.text();
                }
            }).then((res) => {
                res = res&&res.length>0?JSON.parse(res):[];
                this.roleDatatree=this.utils.roleTree(this.utils.buildRoleTree(res));
            });
        },
    }
</script>

<style scoped>
    button {
        background: #3497db;
        color: #fff;
    }

    table button {
        background: #f2f4f7;
        color: #546c8c;
    }
</style>