<template>
    <Tabs type="card" v-model="activeIndex" @on-click="onTabClick" :animated="false">
        <TabPane label="集团"><jt></jt></TabPane>
        <TabPane label="销售总公司"><xszgs></xszgs></TabPane>
        <TabPane label="子公司"><zgs></zgs></TabPane>
        <TabPane label="进口"><jk></jk></TabPane>
    </Tabs>
</template>

<script>
    import  jt from '@/components/htzzjd/htjd_pz_jt'
    import  jk from '@/components/htzzjd/htjd_pz_jk'
    import  xszgs from '@/components/htzzjd/htjd_pz_xszgs'
    import  zgs from '@/components/htzzjd/htjd_pz_zgs'
    export default {
        name: "htjd_pz",
        data() {
            return {
                activeIndex:0,
            }
        },
        components:{
            jk,
            jt,
            xszgs,
            zgs
        },
        methods: {
            onTabClick(index) {
                this.activeIndex = index;
            }
        }
    }
</script>

<style scoped>

</style>
