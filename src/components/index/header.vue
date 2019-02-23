<template>
    <div>
    <Breadcrumb v-if="headers">
        <BreadcrumbItem v-for="item in headers" :key="item.name">{{item.name}}</BreadcrumbItem>
    </Breadcrumb>
    </div>
</template>


<script>
    export default {
        name: "headerList",
        computed:{
            headers(){
              return this.$store.state.headers;
            }
        },
        methods:{
        }
    }
</script>

<style scoped>
    .ivu-breadcrumb {
        text-align: left !important;
    }
</style>