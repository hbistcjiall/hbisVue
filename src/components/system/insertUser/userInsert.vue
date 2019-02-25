<template>
   <div>
       <steps/>
       <router-view/>
   </div>
</template>

<script>
    import steps from "./steps"
    export default {
        name: "userManager",
        components:{
            steps
        },
        methods:{
        }
    }
</script>

<style scoped>

</style>