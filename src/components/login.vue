<template>
    <Content  class="loginBj" :style="{minHeight:myheight}">
        <div class="loginHd">
            <div class="headImg">
                <img src="../assets/loginImg/logoImage.png">
            </div>
            <div class="headSpan">
                <!--<span style="color: #0176c2;font-weight:800;">河钢销售营销数据中心 </span>-->
                <span style="color: #B3B3B3"> |</span><span style="font-size: 20px;color: #B3B3B3"> 登录</span>
            </div>
            <div class="headlist">
                <ul>
                    <li><a style="color:#B3B3B3 " href="http://www.hbisco.com">河钢集团官网</a></li>
                    <li><a style="color:#B3B3B3 " href="http://sale.hbistc.com/saleweb/login.htm">客户服务中心</a></li>
                </ul>
            </div>
        </div>
        <div class="contentimg">
            <img src="../assets/loginImg/loginbj3.png">
        </div>
        <div class="LoginCss">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline class="form">
                <p style="font-size:23px;color: #5e9cdb;font-weight: 700;padding-top: 37px">河钢销售营销数据中心</p>
                <p style="color: #B3B3B3;padding-bottom: 30px;font-size:17px">HBIS SALES MARKETING DATA CENTER</p>
                <FormItem prop="username" class="formitem">
                    <Input type="text" v-model="formInline.username" placeholder="用户">
                        <Icon type="ios-person-outline" slot="prepend" style="font-size: 20px;color: #8ABEF2;font-weight: 800"></Icon>
                    </Input>
                </FormItem>

                <FormItem prop="password" class="formitem">
                    <Input type="password" v-model="formInline.password" placeholder="密码" @keyup.enter.native="handleSubmit('formInline')">
                        <Icon type="ios-lock-outline" slot="prepend" style="font-size: 20px;color: #8ABEF2;font-weight: 800"></Icon>
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
                                return res.text();
                        }).then((res) => {
                            res = res&&res.length>0?JSON.parse(res):[];
                            if(res.msg){
                                this.$Message.error(res.msg);
                            }else{
                                localStorage.setItem('quanxian', res.id);
                                this.$store.commit('userStatus', true);
                                localStorage.removeItem('Menulist');
                                localStorage.setItem('Menulist', JSON.stringify(res.menus));
                                sessionStorage.setItem("Flag", "isLogin");
                                this.$Message.success("登录成功！");
                                return this.$router.push({name:'index'});
                            }
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
        height: auto;
        background-image: url("../assets/loginImg/loginBj.jpg");
        background-repeat:no-repeat;
        clear: both;
    }
    .loginHd{
        width: 100%;
        height:70px;
        background-color: white;
    }
    .headImg{
        width:258px;
        height: 80px;
        border-radius: 1px;
        margin-top:5px;
        margin-left: 100px;
        float: left;
    }
    .headImg img{
        width: 70%;
        height: auto;
    }
    .headSpan{
        float: left;
        /*width:340px;*/
        height: 25px;
        margin-top: 14px;
        margin-left: 20px;
    }
    .headSpan span{
        font-size: 25px;
    }
    .headlist{
        width: 400px;
        float: right;
        margin-top: -21px;
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
        float: right;
        position: relative;
        right: 300px;
        border-radius: 5px;
        margin: 0 auto;
        margin-top: 100px;
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
    .contentimg img{
        position: absolute;
        left: 0px;
        width: 55%;
        height: auto;
    }
</style>