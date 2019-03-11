<template>
    <Content  class="loginBj" :style="{minHeight:myheight}">
        <div class="loginHd">
            <div class="headImg">
                <img src="../assets/loginImg/logo.jpg">
            </div>
            <div class="headSpan">
                <span style="color: #0176c2;font-weight:800;">河钢销售营销数据中心 </span><span style="color: #B3B3B3"> |</span><span style="font-size: 20px;color: #B3B3B3"> 登录</span>
            </div>
            <div class="headlist">
                <ul>
                    <li>河钢首页</li>
                    <li>河钢官网</li>
                    <li>客户服务</li>
                </ul>
            </div>
        </div>
        <div class="LoginCss">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline class="form">
                <p style="font-size:23px;color: #5e9cdb;font-weight: 700;padding-top: 37px">河钢销售营销数据中心</p>
                <p style="color: #B3B3B3;padding-bottom: 30px;font-size:17px">Hegang Sales and Marketing Data Center</p>
                <FormItem prop="username" class="formitem">
                    <Input type="text" v-model="formInline.username" placeholder="用户">
                        <Icon type="ios-person-outline" slot="prepend" style="font-size: 20px;color: #8ABEF2;font-weight: 800"></Icon>
                    </Input>
                </FormItem>

                <FormItem prop="password" class="formitem">
                    <Input type="password" v-model="formInline.password" placeholder="密码">
                        <Icon type="ios-lock-outline" slot="prepend" style="font-size: 20px;color: #8ABEF2;font-weight: 800""></Icon>
                    </Input>
                </FormItem>
                <FormItem class="formitem">
                    <Checkbox class="cBox" @on-change="Rem" style="float: left;padding-left: 10px;color: #B3B3B3" :value="true">记住用户名和密码</Checkbox>
                </FormItem>
                <FormItem class="formitem">
                    <Button type="primary" @click="handleSubmit('formInline')" class="button"><span style="font-size: 18px">登&emsp;&emsp;&emsp;录</span>
                    </Button>
                </FormItem>
            </Form>
        </div>
    </Content>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                formInline: {
                    username: '',
                    password: '',
                    remember:''
                },
                myheight:document.documentElement.clientHeight+"px",
                ruleInline: {
                    username: [
                        {required: true, message: '请填写用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请填写密码', trigger: 'blur'},
                    ]
                }
            }
        },
        created(){
            this.loginOut()
        },
        methods: {
            handleSubmit() {
                this.$refs['formInline'].validate((valid) => {
                    if (valid) {
                        fetch(this.$store.state.fetchPath + "/login", {
                            method: "POST",
                            headers: this.$store.state.fetchHeader,
                            body: this.utils.formatParams(this.formInline),
                            credentials:'include'
                        }).then((res) => {
                            // if (res.status == 401) {
                            //     // throw new Error(401);
                            // }
                            return res.text();
                        }).then((res) => {
                            res = res.length>0?JSON.parse(res):[];
                            if(res.msg){
                                this.$Message.error(res.msg);
                            }else{
                                this.$store.commit('userStatus', true);
                                localStorage.removeItem('Menulist');
                                localStorage.setItem('Menulist', JSON.stringify(res.menus));
                                sessionStorage.setItem("Flag", "isLogin");
                                this.$Message.success("登录成功！");
                                return this.$router.push({name:'index'});
                            }
                            // if (res.msg == "1002") {
                            //     this.$Message.error("用户名输入错误");
                            // } else if (res.msg == "1001") {
                            //     this.$Message.error("密码输入错误");
                            // } else if (res.msg == "1003") {
                            //     this.$Message.error("账号已锁定");
                            // } else if (res.msg == "1000") {
                            //     this.$store.commit('userStatus', true);
                            //     localStorage.removeItem('Menulist');
                            //     localStorage.setItem('Menulist', JSON.stringify(res.menus));
                            //     sessionStorage.setItem("Flag", "isLogin");
                            //     this.$Message.success("登录成功！");
                            //     return this.$router.push({name:'index'});
                            // } else {
                            //     this.$Message.error("服务器登录异常");
                            // }

                        });
                    }
                })

            },
            Rem(stats){
                if(stats===true){
                    this.formInline.remember='on';
                }else{
                    this.formInline.remember='';
                }
            },
            loginOut(){
                this.formInline=this.$route.params;
            }
        }
    }
</script>

<style scoped>
    .loginBj{
        width: 100%;
        background-image: url("../assets/loginImg/loginBj.jpg");
    }
    .loginHd{
        width: 100%;
        height:90px;
        background-color: white;
    }
    .headImg{
        width:80px;
        height: 80px;
        border-radius: 1px;
        margin-top:5px;
        margin-left: 100px;
        float: left;
    }
    .headImg img{
        width: 100%;
        height: 100%;
    }
    .headSpan{
        float: left;
        width:340px;
        height: 25px;
        margin-top: 43px;
        margin-left: 20px;
    }
    .headSpan span{
        font-size: 25px;
    }
    .headlist{
        width: 400px;
        float: right;
        margin-right: 100px;
    }
    .headlist ul li {
        color: #B3B3B3;
        list-style: none;
        float: left;
        width: 30%;
        font-size: 18px;
        margin-top: 43px;
        font-weight: 800;
    }
    .LoginCss {
        width: 400px;
        height: 360px;
        background-color: white;
        border-radius: 5px;
        margin: 0 auto;
        margin-top: 150px;
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