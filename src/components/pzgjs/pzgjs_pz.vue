<template>
    <div>
        <Form :label-width="50">
            <Row>
                <Col span="6" v-if="!switchTime">
                    <FormItem label="年份：">
                        <DatePicker type="year"  placeholder="请选择年份" :editable="false" :clearable="false"  v-model="year" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4"  v-if="switchTime">
                    <FormItem label="月份：">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false"  v-model="startTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4" v-if="switchTime">
                    <FormItem>
                        <DatePicker type="month" placeholder="终止月份" :editable="false" :clearable="false"  v-model="endTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="3">
                    <FormItem>
                        <i-switch v-model="switchTime" @on-change="changeSwitch">
                            <span slot="open">年</span>
                            <span slot="close">月</span>
                        </i-switch>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="品种：">
                        <Select v-model="pz" style="width:120px" placeholder="请选择品种">
                            <Option value="">全部</Option>
                            <Option value="冷板">冷板</Option>
                            <Option value="热板">热板</Option>
                            <Option value="棒线">棒线</Option>
                            <Option value="宽厚板">宽厚板</Option>
                            <Option value="型带">型带</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4">
                    <Button @click="getList()" icon="ios-search" style="margin-right:10px;">查询</Button>
                    <Button @click="downLoad()" icon="ios-cloud-download-outline">导出</Button>
                </Col>

            </Row>

        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="500" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "pzgjs_pz",
        data() {
            return {
                loading:true,
                switchTime:true,
                year:new Date(),
                startTime:new Date(),
                endTime:this.utils.formatMonthEnd(),
                pz:'',
                columns: [{
                    title: '品种',
                    key: 'VARIETY',
                    align: 'center',
                    width: 100,
                    fixed: 'left'
                },
                    {
                        title: '内贸总量',
                        key: 'nmzl',
                        align: 'center',
                        width: 100,
                        children: [
                            {
                                title: '内贸总量-总量',
                                key: 'FKIMG',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '内贸总量-品种钢',
                                key: 'PZGL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '内贸总量-比重',
                                key: 'BZ',
                                align: 'center',
                                width: 100,
                            }
                        ]
                    },
                    {
                        title: '环比',
                        key: 'hb',
                        align: 'center',
                        width: 100,
                    },
                    {
                        title: '专业公司',
                        key: 'zygs',
                        align: 'center',
                        children: [{
                            title: '专业公司-总量',
                            key: 'ZYFKIMG',
                            align: 'center',
                            width: 100
                        },
                            {
                                title: '专业公司-品种钢',
                                key: 'ZYPZGL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '专业公司-比重',
                                key: 'ZYBZ',
                                align: 'center',
                                width: 100,
                            }
                        ]
                    },
                    {
                        title: '分公司',
                        key: 'fgs',
                        align: 'center',
                        children: [{
                            title: '分公司-总量',
                            key: 'FGSFKIMG',
                            align: 'center',
                            width: 100
                        },
                            {
                                title: '分公司-品种钢',
                                key: 'FGSPZGL',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '分公司-比重',
                                key: 'FGSBZ',
                                align: 'center',
                                width: 100
                            }
                        ]
                    },
                    {
                        title: '子公司',
                        key: 'zgs',
                        align: 'center',
                        children: [{
                            title: '子公司-总量',
                            key: 'ZGSFKIMG',
                            align: 'center',
                            width: 100
                        },
                            {
                                title: '子公司-品种钢',
                                key: 'ZGSPZGL',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '子公司-比重',
                                key: 'ZGSBZ',
                                align: 'center',
                                width: 100
                            }
                        ]
                    }
                ],
                data: []
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            changeSwitch(){
                let date=new Date();
                this.switchTime?(this.startTime=date,this.endTime=this.utils.formatMonthEnd()):this.year=date;
            },
            getList() {

                let params={
                };
                this.pz?params.pz=this.pz:'';
                let startTime='startTime=';
                let endTime='&endTime=';
                this.switchTime?(startTime=startTime+this.utils.formatMonthStart(this.startTime),endTime=endTime+this.utils.formatMonthStart(this.endTime)):(startTime=startTime+ this.utils.formatYearStart(this.year),endTime=endTime+this.utils.formatYearEnd(this.year));
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getpz", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime+endTime+'&'+this.utils.formatParams(params),
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    this.data = res;
                    this.loading = false;
                });
            },
            downLoad(){
                this.$refs.table.exportCsv({
                    filename: '结算完成（品种）明细'
                });
            }
        }

    }
</script>

<style scoped>
    button{
        background: #3497db;
        color:#fff;
    }
</style>