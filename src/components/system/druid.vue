<template>
    <iframe :src="url"></iframe>
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

<style>
    iframe{
        height: 100%;
        width: 100%;
        border: 0px;
    }
</style>