<template>
    <div>我是登录页
    <button @click="torouter">点击</button>
    </div>
</template>

<script>
    export default {
        name: "login",
        methods:{
            torouter(){
                this.$store.commit('userStatus',true)
                localStorage.setItem("Flag", "isLogin");
                this.$Message.success("登录成功！");
                return this.$router.push("index");
            }
        }
    }
</script>

<style scoped>

</style>