<template>
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
        <FormItem label="用户名" prop="userName">
            <Input type="text" v-model="formCustom.userName"/>
        </FormItem>
        <FormItem label="登录账号" prop="loginName">
            <Input type="text" v-model="formCustom.loginName"/>
        </FormItem>
        <FormItem label="密码" prop="userPassword">
            <Input type="password" v-model="formCustom.userPassword"/>
        </FormItem>
        <FormItem label="再次输入密码" prop="passwdCheck">
            <Input type="password" v-model="formCustom.passwdCheck"/>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">保存</Button>
            <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</template>

<script>
    export default {
        name: "userInsert_1",
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validateUserName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback();
                }
            };
            const validateLoginName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入登录账号'));
                } else {
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formCustom.userPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                formCustom: {
                    userPassword: '',
                    passwdCheck: '',
                    userName: '',
                    loginName: ''
                },
                ruleCustom: {
                    userPassword: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    userName: [
                        {validator: validateUserName, trigger: 'blur'}
                    ],
                    loginName: [
                        {validator: validateLoginName, trigger: 'blur'}
                    ],
                    passwdCheck: [
                        {validator: validatePassCheck, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // fetch(this.$store.state.fetchPath + "/register", {
                        //     method: "POST",
                        //     headers: this.$store.state.fetchHeader,
                        //     body: this.utils.formatParams(this.formCustom),
                        //     credentials: 'include'
                        // }).then((res) => {
                        //     return res.text();
                        // }).then((res) => {
                        //      res = res.length>0?JSON.parse(res):[];
                        //     if (res.msg == "1000") {
                        //         this.$Message.success('保存成功!');
                        //         this.$store.commit("updateCurrent", 1);
                        //         this.$store.commit("updateNewuserId", res.userId);
                        //         this.$router.push('userInsert_2');
                        //     } else {
                        //         this.$Message.success('保存失败!');
                        //     }
                        // });
                        this.$router.push('insertAuth');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>

<style scoped>
    .ivu-form {
        width: 35%;
        margin: 20px auto;

    }
</style>