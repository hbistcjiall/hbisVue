<template>
    <!--添加权限-->
    <div>添加权限<button @click="haha">保存</button></div>
</template>

<script>
    export default {
        name: "insertAuth",
        methods:{
            haha(){
                this.$router.push('userInsert_2');
            }
        }
    }
</script>

<style scoped>

</style>