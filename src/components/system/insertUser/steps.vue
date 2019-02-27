<template>
    <Steps :current="current">
        <Step title="添加用户" content="设置用户基本信息"></Step>
        <Step title="用户权限" content="设置用户权限"></Step>
        <Step title="完成" content="完成"></Step>
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