<template>
    <iframe :src="url" ></iframe>
</template>

<script>
    export default {
        name: "druid",
        data(){
            return {
                url:this.$store.state.fetchPath+"/druid/index.html"
            }
        }
    }

</script>

<style scoped>
    iframe{
        border: 0px;
        width: 100%;
        min-height:600px ;
        padding: 0px;
    }
    .ivu-layout-content{
        padding: 0px !important;
    }
</style>
