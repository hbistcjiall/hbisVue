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
        create() {
            this.$store.commit("updateCurrent", 0);
        }
    }
</script>

<style scoped>

</style>