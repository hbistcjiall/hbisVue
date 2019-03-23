<template>
        <Tabs type="card">
            <TabPane label="全部"><allIndex></allIndex></TabPane>
            <TabPane label="热板"><rbIndex></rbIndex></TabPane>
            <TabPane label="冷板"><lbIndex></lbIndex></TabPane>
            <TabPane label="宽厚板"><khbIndex></khbIndex></TabPane>
            <TabPane label="棒线"><bxIndex></bxIndex></TabPane>
            <TabPane label="型带"><xdIndex></xdIndex></TabPane>
        </Tabs>
</template>

<script>
    import  allIndex from '@/components/gkfx/zyphjhcx/allIndex'
    import  rbIndex from '@/components/gkfx/zyphjhcx/rbIndex'
    import  lbIndex from '@/components/gkfx/zyphjhcx/lbIndex'
    import  khbIndex from '@/components/gkfx/zyphjhcx/khbIndex'
    import  bxIndex from '@/components/gkfx/zyphjhcx/bxIndex'
    import  xdIndex from '@/components/gkfx/zyphjhcx/xdIndex'
    export default {
        name: "zyphjh",
        data() {
            return {
                activeIndex:0,
            }
        },
        components:{
            allIndex,
            rbIndex,
            lbIndex,
            khbIndex,
            bxIndex,
            xdIndex
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