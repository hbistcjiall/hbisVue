<template>
   <div>
       <steps/>
    <userInsertContent/>
       <!--<button @click="">点击我</button>-->
   </div>
</template>

<script>
    import steps from "./steps"
    import userInsertContent from "./userInsertContent"
    export default {
        name: "userManager",
        components:{
            steps,
            userInsertContent
        }
    }
</script>

<style scoped>

</style>