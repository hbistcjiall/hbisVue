<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="选择组" prop="selectGroup">
            <Select v-model="formValidate.selectGroup" @on-change="getRole" style="width:200px">
                <Option v-for="item in groupList" :value="item.tGId" :key="item.tGId">{{ item.groupName }}</Option>
            </Select>
        </FormItem>
        <FormItem label="选择角色" prop="selectRole">
            <Select v-model="formValidate.selectRole" @on-change="getMenu" style="width:200px">
                <Option v-for="item in roleList" :value="item.trId" :key="item.trId">{{ item.roleName }}</Option>
            </Select>
        </FormItem>
        <FormItem label="权限一览" v-if="showMenu">
            <Tree :data="menuData" ></Tree>
        </FormItem>
        <p class="newputh">权限不够用？试试&nbsp;<router-link to="insertAuth"><a>创建一套权限</a></router-link></p>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</template>

<script>
    export default {
        name: "userInsert_2",
        data() {
            return {
                showMenu:false,
                formValidate: {
                    selectRole: '',
                    selectGroup: ''
                },
                ruleValidate: {
                    selectRole: [
                        {required: true, message: '请选择用户角色', trigger: 'change'}
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
                return res.text();
            }).then((res) => {
                res = res.length>0?JSON.parse(res):[];
                this.groupList=res;
            });
        },

        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        fetch(this.$store.state.fetchPath + "/t-user-entity/findRoleByGroup", {
                            method: "POST",
                            headers: this.$store.state.fetchHeader,
                            body: this.utils.formatParams({roleId:this.formValidate.selectRole,userId:this.$store.state.newUserId}),
                            credentials: 'include'
                        }).then((res) => {
                            return res.text();
                        }).then((res) => {
                            res = res.length>0?JSON.parse(res):[];
                            if(res.msg=="1000"){
                            this.$store.commit("updateCurrent", 2);
                            this.$Message.success('Success!');
                            }else{
                                this.$Message.error('保存失败！');
                            }
                        });
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            getRole(){
                if(this.formValidate.selectGroup){
                    fetch(this.$store.state.fetchPath + "/t-user-entity/findRoleByGroup", {
                        method: "POST",
                        headers: this.$store.state.fetchHeader,
                        body: this.utils.formatParams({"groupId":this.formValidate.selectGroup}),
                        credentials: 'include'
                    }).then((res) => {
                        return res.text();
                    }).then((res) => {
                        this.formValidate.selectRole="";
                        res = res.length>0?JSON.parse(res):[];
                        this.roleList=res;
                    });
                }
            },
            getMenu(){
                 if(this.formValidate.selectRole){
                     fetch(this.$store.state.fetchPath + "/t-user-entity/findAuthorityByRole", {
                         method: "POST",
                         headers: this.$store.state.fetchHeader,
                         body: this.utils.formatParams({"trId":this.formValidate.selectRole}),
                         credentials: 'include'
                     }).then((res) => {
                         return res.text();
                     }).then((res) => {
                         res = res.length>0?JSON.parse(res):[];
                         this.menuData=this.utils.buildTree(res);
                         this.showMenu=true;
                     });

                 }
            }
        }
    }
</script>

<style scoped>
    .ivu-form {
        width: 35%;
        margin: 20px auto;

    }
    .newputh{
        color: #c3c3c3;
        margin:5px;
    }
</style>