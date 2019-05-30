<template>
    <div id="demo">
        <homepage v-if="show"></homepage>
    </div>
</template>

<script>
    import homepage from '@/components/index/homepage'
    export default {
        name: "indexpage",
        components: {
            homepage
        },
        data(){
            return{
                show:true,
            }
        },
        created() {
            if(localStorage.getItem('quanxian')!=1)
            {
                this.show=false;
            }
            else{
                this.show=true;
            }
        }
    }
</script>

<style scoped>
</style>