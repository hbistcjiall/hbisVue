<template>
    <div>
        <Form :label-width="100">
            <Row>
                <Col span="4" v-if="switchTime">
                    <FormItem label="记录日期：">
                        <DatePicker type="date" placeholder="记录时间" :editable="false" :clearable="false" v-model="startTime"
                                    style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="钢厂：" style="margin-left: 50px">
                        <Select style="width:120px" v-model="cx" placeholder="请选择">
                            <Option value="1">宣钢</Option>
                            <Option value="2">承钢</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="1">&nbsp;</Col>
                <Col span="4" style="margin-left: 80px">
                    <Button @click="getList()" icon="ios-search" style="margin-right:10px;">查询</Button>
                    <Button @click="downLoad()" icon="ios-cloud-download-outline" type="primary">导出</Button>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="500" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "bjsc",
        data() {
            return {
                loading:true,
                switchTime: true,
                startTime: new Date(),
                cx: '',
                columns: [
                    {
                        title: '日期',
                        align: "center",
                        width: 100,
                        isMergeRow:true,
                        key: 'ORDERDAY',
                        fixed: 'left'
                    },
                    {
                        title: '单位',
                        align: "center",
                        width: 85,
                        key: 'company'
                    },
                    {
                        title: ' ',
                        align: "center",
                        width: 85,
                        key: ''
                    },
                    {
                        title: '2019年以来建材北京市场现货数量、出库价汇总',
                        align: "center",
                        children: [
                            {
                                title: '高线（HPB300）',
                                align: 'center',
                                children: [
                                    {
                                        title: 'φ6.5mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'gxData1'
                                    },
                                    {
                                        title: 'φ8mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'gxData2'
                                    },
                                    {
                                        title: 'φ10mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'gxData3'
                                    },
                                    {
                                        title: 'φ12mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'gxData4'
                                    }
                                ]
                            },
                            {
                                title: '盘螺（HRB400/400E）',
                                align: 'center',
                                children: [
                                    {
                                        title: 'φ6mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'plData1'
                                    },
                                    {
                                        title: 'φ8mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'plData2'
                                    },
                                    {
                                        title: 'φ10mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'plData3'
                                    },
                                    {
                                        title: 'φ12mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'plData4'
                                    }
                                ]
                            },
                            {
                                title: '盘螺（HRB500/500E）',
                                align: 'center',
                                children: [
                                    {
                                        title: 'φ6mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'plData5'
                                    },
                                    {
                                        title: 'φ8mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'plData6'
                                    },
                                    {
                                        title: 'φ10mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'plData7'
                                    },
                                    {
                                        title: 'φ12mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'plData8'
                                    }
                                ]
                            },
                            {
                                title: '螺纹钢（HRB400/400E）',
                                align: 'center',
                                children: [
                                    {
                                        title: 'φ10mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData1'
                                    },
                                    {
                                        title: 'φ12mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData2'
                                    },
                                    {
                                        title: 'φ14mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData3'
                                    },
                                    {
                                        title: 'φ16mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData4'
                                    },
                                    {
                                        title: 'φ18mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData5'
                                    },
                                    {
                                        title: 'φ20mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData6'
                                    },
                                    {
                                        title: 'φ22mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData7'
                                    },
                                    {
                                        title: 'φ25mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData8'
                                    },
                                    {
                                        title: 'φ28mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData9'
                                    },
                                    {
                                        title: 'φ32mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData10'
                                    },
                                    {
                                        title: 'φ36mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData11'
                                    },
                                    {
                                        title: 'φ40mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData12'
                                    },
                                    {
                                        title: 'φ18-25mm',
                                        align: 'center',
                                        width: 100,
                                        key: 'lwData13'
                                    },
                                ]
                            },
                            {
                                title: '螺纹钢（HRB500/500E）',
                                align: 'center',
                                children: [
                                    {
                                        title: 'φ10mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData14'
                                    },
                                    {
                                        title: 'φ12mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData15'
                                    },
                                    {
                                        title: 'φ14mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData16'
                                    },
                                    {
                                        title: 'φ16mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData17'
                                    },
                                    {
                                        title: 'φ18mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData18'
                                    },
                                    {
                                        title: 'φ20mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData19'
                                    },
                                    {
                                        title: 'φ22mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData20'
                                    },
                                    {
                                        title: 'φ25mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData21'
                                    },
                                    {
                                        title: 'φ28mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData22'
                                    },
                                    {
                                        title: 'φ32mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData23'
                                    },
                                    {
                                        title: 'φ36mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData24'
                                    },
                                    {
                                        title: 'φ40mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'lwData25'
                                    },
                                    {
                                        title: 'φ18-25mm',
                                        align: 'center',
                                        width: 100,
                                        key: 'lwData26'
                                    },
                                ]
                            },
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
            getList() {
                let params={};
                this.cx?params.company=this.cx:'';
                let startTime='endMonth=';
                this.switchTime?(startTime=(startTime+ this.utils.formatdate(this.startTime)).substring(0, 20)):(startTime=startTime+ this.utils.formatYearStart(this.year));
                fetch(this.$store.state.fetchPath + "/reportSpotPriceBreakdown/list", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime+'&'+this.utils.formatParams(params),
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    this.data =  res.dayList;
                    this.data=this.utils.mergeRow(res.dayList,'ORDERDAY');
                    this.loading = false;
                });
            },
            downLoad(){
                this.$refs.table.exportCsv({
                    filename: '北京市场明细'
                });
            }
        }
    }

</script>

<style scoped>
    button {
        background: #3497db;
        color: #fff;
    }
</style>