<template>
    <div class="LoginCss">
        <img src="../assets/hbisLogo.jpg" class="img">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline class="form">
            <FormItem prop="user" class="formitem">
                <Input type="text" v-model="formInline.user" placeholder="用户">
                    <Icon type="ios-person-outline" slot="prepend" style="font-size: 20px"></Icon>
                </Input>
            </FormItem>

            <FormItem prop="password" class="formitem">
                <Input type="password" v-model="formInline.password" placeholder="密码">
                    <Icon type="ios-lock-outline" slot="prepend" style="font-size: 20px"></Icon>
                </Input>
            </FormItem>
            <FormItem class="formitem">
                <Button type="primary" @click="handleSubmit('formInline')" class="button"><span style="font-size: 18px">登&emsp;&emsp;&emsp;录</span>
                </Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        {required: true, message: '请填写用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请填写密码', trigger: 'blur'},
                        // { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit() {
                this.$refs['formInline'].validate((valid) => {
                    if (valid) {
                        let postdata = {
                            username: this.formInline.user,
                            password: this.formInline.password
                        };
                        fetch(this.$store.state.fetchPath+"/doLogin", {
                            method: "POST",
                            headers: this.$store.state.fetchHeader,
                            body: this.utils.formatParams(postdata)
                        }).then((res) => {
                            return res.text();
                        }).then((res) => {
                            window.console.log(res);
                            // this.$store.commit('userStatus', true)
                            // localStorage.setItem("Flag", "isLogin");
                            // this.$Message.success("登录成功！");
                            // return this.$router.push("index");
                        });
                    }
                })

            }
        }
    }
</script>

<style scoped>
    .LoginCss {
        width: 400px;
        height: 400px;
        background-color: gainsboro;
        border-radius: 5px;
        margin: 0 auto;
        margin-top: 100px;
    }

    .img {
        width: 120px;
        height: 120px;
        margin: 0 auto;
        margin-top: 40px;
        margin-bottom: 30px;
    }

    .form {
        /*padding-top: 100px;*/
    }

    .formitem {
        width: 80%;
    }

    .button {
        width: 100%;
    }
</style>