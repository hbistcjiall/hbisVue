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
        width: 100%;
        height:30px;
        text-align: left !important;
        background-color: #f2f9fd;
        line-height: 30px;
    }
    .ivu-breadcrumb span{
        margin-bottom: 40px;
    }
</style>