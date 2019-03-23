<template>
    <Tabs type="card"
          v-model="activeIndex"
          @on-click="onTabClick">
        <TabPane label="前10"><qian></qian></TabPane>
        <TabPane label="后10"><hou></hou></TabPane>
    </Tabs>
</template>

<script>
    import  qian from '@/components/htzzjd/htjd_cx_qian'
    import  hou from '@/components/htzzjd/htjd_cx_hou'
    export default {
        name: "htjd_cx",
        data() {
            return {
                activeIndex:0
            }
        },
        components:{
            qian,
            hou
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
