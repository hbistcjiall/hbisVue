<template>
    <div>
    <Breadcrumb v-if="headers">
        <BreadcrumbItem v-for="item in headers" :key="item.name">{{item.name}}</BreadcrumbItem>
        <Button type="info" style="float: right;margin-top: 14px" @click="loginOut()">退 出</Button>
    </Breadcrumb>
    </div>
</template>


<script>
    export default {
        name: "headerList",
        data(){
            return {
                headerss:[{
                    name: '首页'
                }],
                loginOutData:{
                    username:'',
                    password:'',
                    remember: ''
                }
            }
        },
        computed:{
            headers(){
              return this.$store.state.headers;
            }
        },
        methods:{
            loginOut(){
                fetch(this.$store.state.fetchPath + "/logout", {
                    method: "get",
                    headers: this.$store.state.fetchHeader,
                    // body: '',
                    credentials:'include'
                })
                    .then((res) => {
                        return res.text();
                    }).then((res) => {
                     res = res.length>0?JSON.parse(res):[];
                     this.$store.commit('setHeaders',this.headerss);
                     this.loginOutData.username =res.userName;
                     this.loginOutData.password =res.password;
                     sessionStorage.setItem("Flag", "");
                     this.$Message.success("请重新登录！");
                     return this.$router.push({name:"login",params:this.loginOutData});
                })
            }
        }
    }
</script>

<style scoped>
    .ivu-breadcrumb {
        text-align: left !important;
    }
</style>