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
                }]
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
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: '',
                    credentials:'include'
                })
                    .then((res) => {
                        return res.text();
                    }).then(() => {
                     this.$store.commit('setHeaders',this.headerss);
                     sessionStorage.setItem("Flag", "");
                     return this.$router.push("login");
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