<template>
    <Steps :current="current">
        <Step title="基本信息" content="设置用户基本信息"></Step>
        <Step title="设置组" content="配置组和角色"></Step>
        <Step title="设置权限" content="配置用户权限"></Step>
        <Step title="设置菜单" content="配置用户菜单可见"></Step>
    </Steps>
</template>

<script>
    export default {
        name: "steps",
        computed:{
            current(){
                return this.$store.state.current;
            }
        }
    }
</script>

<style scoped>

</style>