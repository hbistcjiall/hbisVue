<template>
    <div>
        <Form :label-width="100">
            <Row>
                <Col span="4" v-if="switchTime">
                    <FormItem label="月份：" style="width:120px">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false"
                                    v-model="startTime"
                                    style="width:120px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4" style="margin-left: 90px;float: right">
                    <Button @click="getList()" icon="ios-search" type="primary" style="margin-right:10px;">查询</Button>
                    <Button @click="downLoad()" icon="ios-cloud-download-outline" type="primary">导出</Button>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="700" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "wcqk",
        data() {
            return {
                loading:true,
                switchTime: true,
                startTime: new Date(),
                columns: [
                    {
                        title: "单位",
                        align: "center",
                        key: 'companyName',
                    },
                    {
                        title: "钢材总量(吨)",
                        align: "center",
                        key: 'totalSteel',
                    },
                    {
                        title: "品种钢总量(吨)",
                        align: "center",
                        key: 'totalSteelVarieties',
                    },
                    {
                        title: "品种钢比例(%)",
                        align: "center",
                        key: 'scaleSteel',
                    }, {
                        title: "特色战略产品(吨)",
                        align: "center",
                        key: 'featuresProducts',
                    }, {
                        title: "高端产品(吨)",
                        align: "center",
                        key: 'highProducts',
                    }, {
                        title: "一般品种钢(吨)",
                        align: "center",
                        key: 'steelVarieties',
                    },
                ],
                data: []
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                this.loading = true;
                let startTime = 'queryDate=';
                this.switchTime ? (startTime = startTime + (this.utils.formatMonthStart(this.startTime)).substring(0, 7)) : (startTime = startTime + (this.utils.formatYearStart(this.year)).substring(0, 7));
                // this.switchTime?(startTime=(startTime+ this.utils.formatdate(this.startTime)).substring(0, 20)):(startTime=startTime+ this.utils.formatYearStart(this.year));
                fetch(this.$store.state.fetchPath + "/reportTechnology/subsidiaryVarietySteel", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime,
                    credentials: 'include'
                }).then((res) => {
                    if (res.status != 200) {
                        this.$Message.error('请求失败！');
                    } else {
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    let newdata=res.list;
                    for(let i=0;i<newdata.length;i++)
                    {
                        newdata[i].scaleSteel=newdata[i].scaleSteel==''?newdata[i].scaleSteel+'0%':newdata[i].scaleSteel+'%'
                    }
                    this.data = newdata;
                    this.loading = false;
                });
            },
            downLoad(){
                this.$refs.table.exportCsv({
                    filename: '完成情况明细'
                });
            }
        }
    }
</script>

<style scoped>

</style>