<template>
    <iframe :src="url"></iframe>
</template>

<script>
    export default {
        name: "swagger",
        data(){
            return {
                url:this.$store.state.fetchPath+"/docs.html"
            }
        }
    }
</script>

<style scoped>

</style>