<template>
    <Tabs type="card"
          v-model="activeIndex"
          @tab-click="onTabClick">
        <TabPane label="协议户明细列表"><xyhmxlb/></TabPane>
        <TabPane label="明细批量导入"><xyhmxlbUpload/></TabPane>
    </Tabs>
</template>

<script>
    import  xyhmxlb from './xyhmxlb'
    import  xyhmxlbUpload from './xyhmxlbUpload'
    export default {
        name: "xyhmxlbCont",
        data() {
            return {
                activeIndex:0
            }
        },
        components:{
            xyhmxlb,
            xyhmxlbUpload
        },
        methods: {
            onTabClick(index) {
                this.activeIndex = index
            }
        }
    }
</script>

<style scoped>

</style>
