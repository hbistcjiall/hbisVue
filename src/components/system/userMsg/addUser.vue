<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="账号" prop="account">
            <Input v-model="formValidate.account" placeholder="请输入账号" @on-change="accountChange"></Input>
        </FormItem>
        <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入姓名" @on-change="nameChange"></Input>
        </FormItem>
        <FormItem label="出生日期">
            <Row>
                <Col span="11">
                    <FormItem prop="birthday">
                        <DatePicker format="yyyy-MM-dd" type="date" placeholder="出生日期" v-model="formValidate.birthday" @on-change="birthdayChange"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="密码" prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="请输入密码" @on-change="passwordChange"></Input>
        </FormItem>
        <FormItem label="重复密码" prop="password">
            <Input type="password" v-model="formValidate.setpassword" placeholder="确认密码" @on-change="setpasswordChange"></Input>
        </FormItem>
        <FormItem label="E-mail" prop="email">
            <Input v-model="formValidate.email" placeholder="请输入邮箱" @on-change="emailChange"></Input>
        </FormItem>
        <FormItem label="性别" prop="sex">
            <Radio-group v-model="formValidate.sex" @on-change="sexChange">
                <Radio label="M">男</Radio>
                <Radio label="F">女</Radio>
            </Radio-group>
        </FormItem>
        <FormItem label="电话" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入电话" @on-change="phoneChange"></Input>
        </FormItem>
        <FormItem label="部门" prop="deptId">
            <Tree :data="deptdata" ref="tree" @on-check-change="depChange" show-checkbox check-strictly multiple></Tree>
        </FormItem>

    </Form>
</template>
<script>
    export default {
        name:'addUser',
        props:{
            url:String
        },
        data () {
            return {
                deptdata: [],
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
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不为空', trigger: 'blur' }
                    ],
                    account:[
                        { required: true, message: '账号不为空', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '密码不为空', trigger: 'blur' }
                    ],
                    deptId: [
                        { required: true, message: '部门不为空', trigger: 'blur' },
                    ],
                }
            }
        },
        mounted(){
            this.getDeptList();
        },
        watch: {
            url: function(newVal){
                this.url=newVal;
            },
        },
        methods: {
            getDeptList(){
                fetch(this.url+"/dept/tree", {
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
                    this.deptdata=this.utils.roleTree(this.utils.buildRoleTree(res));
                })
            },
            accountChange:function() {
                this.$emit('account', this.formValidate.account)
            },
            nameChange:function() {
                this.$emit('name', this.formValidate.name)
            },
            birthdayChange:function() {
                this.$emit('birthday', this.utils.format(this.formValidate.birthday))
            },
            passwordChange:function() {
                this.$emit('password', this.formValidate.password)
            },
            setpasswordChange:function() {
                this.$emit('setpassword', this.formValidate.setpassword)
            },
            emailChange:function() {
                this.$emit('email', this.formValidate.email)
            },
            sexChange:function(v) {
                this.$emit('sex', v)
            },
            phoneChange:function() {
                this.$emit('phone', this.formValidate.phone)
            },
            depChange(e){
                if(this.$refs.tree.getCheckedNodes()){
                    for(let i=0;i<this.$refs.tree.getCheckedNodes().length;i++){
                        if(e[0].nodeKey!=this.$refs.tree.getCheckedNodes()[i].nodeKey){
                            this.$refs.tree.getCheckedNodes()[i].checked=false;
                        }
                    }
                }
                e[0]?this.formValidate.deptId=e[0].id.toString():this.formValidate.deptId="";
                this.$emit('deptId', this.formValidate.deptId);
            }
        }
    }
</script>
<style>
    .ivu-form-item-content{
        top:-8px !important;
    }
    .ivu-tree-title{
        font-size: 14px !important;
    }
    .ivu-icon-md-arrow-dropright-circle{
        font-size: 18px !important;
        color:#ccc;
    }
</style>
