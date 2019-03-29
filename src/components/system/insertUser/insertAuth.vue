<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem v-if="!createGroupShow" label="选择组" prop="selectGroup">
            <Select  v-model="formValidate.selectGroup" @on-change="getRole" style="width:200px">
                <Option v-for="item in groupList" :value="item.tGId" :key="item.tGId">{{ item.groupName }}</Option>
            </Select>
            &nbsp;&nbsp; <a @click="createGroup" v-if="!createGroupShow">新建</a>
        </FormItem>
        <FormItem v-if="createGroupShow" label="新建组" prop="newGroupName">
            <Input  v-model="formValidate.newGroupName" placeholder="请输入组名"/>
        </FormItem>
        <FormItem label="选择角色" prop="selectRole" v-if="!createRoleShow">
            <Select v-model="formValidate.selectRole" @on-change="getMenu" style="width:200px">
                <Option v-for="item in roleList" :value="item.trId" :key="item.trId">{{ item.roleName }}</Option>
            </Select>
            &nbsp;&nbsp;<a @click="createRole" >新建</a>
        </FormItem>
        <FormItem label="新建角色" v-if="createRoleShow" prop="newRoleName">
            <Input  v-model="formValidate.newRoleName" placeholder="请输入角色名"/>
        </FormItem>
        <FormItem label="权限一览" v-if="showMenu">
            <Tree :data="menuData"  show-checkbox />
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 10px">重置</Button>
            <Button v-if="createRoleShow||createGroupShow" @click="cancelInput" type="error" style="margin-left: 10px">取消</Button>
        </FormItem>
    </Form>
</template>

<script>
    export default {
        name: "insertAuth",
        data() {
            return {
                showMenu:false,
                createGroupShow: false,
                createRoleShow: false,
                formValidate: {
                    selectRole: '',
                    selectGroup: '',
                    newGroupName: '',
                    newRoleName: ''
                },
                ruleValidate:this.SelectRule,
                SelectRule:{
                    selectRole: [
                        {required: true, message: '请选择用户角色', trigger: 'change'}
                    ],
                    selectGroup: [
                        {required: true, message: '请选择用户组', trigger: 'change'}
                    ]
                },
                CreateGroupRule:{
                    newRoleName: [
                        {required: true, message: '请输入新建角色', trigger: 'change'}
                    ],
                    newGroupName: [
                        {required: true, message: '请输入新建组', trigger: 'change'}
                    ]
                },
                CreateRoleRule:{
                    newRoleName: [
                        {required: true, message: '请输入新建角色', trigger: 'change'}
                    ],
                    selectGroup: [
                        {required: true, message: '请选择用户组', trigger: 'change'}
                    ]
                },
                groupList: [],
                roleList: [],
                menuData: []
            }
        },
        created() {
            fetch(this.$store.state.fetchPath + "/t-user-entity/findGroupByUser", {
                method: "POST",
                headers: this.$store.state.fetchHeader,
                body: '',
                credentials: 'include'
            }).then((res) => {
                if(res.status!=200){
                    this.$Message.error('请求失败！');
                }else{
                    return res.text();
                }
            }).then((res) => {
                res = res&&res.length > 0 ? JSON.parse(res) : [];
                this.groupList = res;
            });
            this.getTreeData();
        },
        methods: {
            getTreeData(){
                fetch(this.$store.state.fetchPath + "/t-user-entity/buildTree", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: '',
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res&&res.length>0?JSON.parse(res):[];
                    this.menuData=this.utils.buildTree(res);
                    this.showMenu=true;
                });
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            getRole() {
                if (this.formValidate.selectGroup) {
                    fetch(this.$store.state.fetchPath + "/t-user-entity/findRoleByGroup", {
                        method: "POST",
                        headers: this.$store.state.fetchHeader,
                        body: this.utils.formatParams({"groupId": this.formValidate.selectGroup}),
                        credentials: 'include'
                    }).then((res) => {
                        if(res.status!=200){
                            this.$Message.error('请求失败！');
                        }else{
                            return res.text();
                        }
                    }).then((res) => {
                        this.formValidate.selectRole = "";
                        res = res&&res.length > 0 ? JSON.parse(res) : [];
                        this.roleList = res;
                    });
                }
            },
            getMenu() {
                if (this.formValidate.selectRole) {
                    fetch(this.$store.state.fetchPath + "/t-user-entity/findAuthorityByRole", {
                        method: "POST",
                        headers: this.$store.state.fetchHeader,
                        body: this.utils.formatParams({"trId": this.formValidate.selectRole}),
                        credentials: 'include'
                    }).then((res) => {
                        if(res.status!=200){
                            this.$Message.error('请求失败！');
                        }else{
                            return res.text();
                        }
                    }).then((res) => {
                        res = res&&res.length > 0 ? JSON.parse(res) : [];
                        this.menuData = this.utils.buildTree(res);
                    });

                }
            },
            createGroup(){
                this.createGroupShow=true;
                this.createRoleShow=true;
                this.ruleValidate=this.CreateGroupRule;
            },
            createRole(){
                this.createRoleShow=true;
                this.createGroupShow=false;
                this.ruleValidate=this.CreateRoleRule;
            },
            cancelInput(){
                this.createRoleShow=false;
                this.createGroupShow=false;
                this.ruleValidate=this.SelectRule;
            }
        }
    }
</script>

<style scoped>
    .ivu-form {
        width: 40%;
        margin: 20px auto;

    }
    .newputh {
        color: #c3c3c3;
        margin: 5px;
    }
</style>