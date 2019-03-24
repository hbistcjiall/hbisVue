<template>
    <div>
        <Form :label-width="100">
            <Row>
                <Col span="4" v-if="switchTime">
                    <FormItem label="记录日期：" style="width:150px">
                        <DatePicker type="date" placeholder="记录时间" :editable="false" :clearable="false" v-model="startTime"
                                    style="width:150px"></DatePicker>
                        <!--<DatePicker type="date"  placeholder="Select date" style="width: 150px" v-model="startTime"></DatePicker>-->
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="钢厂：" style="width:120px;margin-left: 50px">
                        <Select style="width:120px" v-model="cx" placeholder="请选择">
                            <Option value="1">宣钢</Option>
                            <Option value="2">承钢</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4" style="margin-left: 80px">
                    <Button @click="getList()" icon="ios-search">查询</Button>
                </Col>
            </Row>
        </Form>
        <Table :columns="columns" :data="data" border height="500"></Table>
    </div>
</template>

<script>
    export default {
        name: "bjsc",
        data() {
            return {
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
                        key: 'COMPANY'
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
                                        key: 'GXDATA1'
                                    },
                                    {
                                        title: 'φ8mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'GXDATA2'
                                    },
                                    {
                                        title: 'φ10mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'GXDATA3'
                                    },
                                    {
                                        title: 'φ12mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'GXDATA4'
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
                                        key: 'PLDATA1'
                                    },
                                    {
                                        title: 'φ8mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'PLDATA2'
                                    },
                                    {
                                        title: 'φ10mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'PLDATA3'
                                    },
                                    {
                                        title: 'φ12mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'PLDATA4'
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
                                        key: 'PLDATA5'
                                    },
                                    {
                                        title: 'φ8mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'PLDATA6'
                                    },
                                    {
                                        title: 'φ10mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'PLDATA7'
                                    },
                                    {
                                        title: 'φ12mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'PLDATA8'
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
                                        key: 'LWDATA1'
                                    },
                                    {
                                        title: 'φ12mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA2'
                                    },
                                    {
                                        title: 'φ14mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA3'
                                    },
                                    {
                                        title: 'φ16mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA4'
                                    },
                                    {
                                        title: 'φ18mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA5'
                                    },
                                    {
                                        title: 'φ20mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA6'
                                    },
                                    {
                                        title: 'φ22mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA7'
                                    },
                                    {
                                        title: 'φ25mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA8'
                                    },
                                    {
                                        title: 'φ28mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA9'
                                    },
                                    {
                                        title: 'φ32mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA10'
                                    },
                                    {
                                        title: 'φ36mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA11'
                                    },
                                    {
                                        title: 'φ40mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA12'
                                    },
                                    {
                                        title: 'φ18-25mm',
                                        align: 'center',
                                        width: 100,
                                        key: 'LWDATA13'
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
                                        key: 'LWDATA14'
                                    },
                                    {
                                        title: 'φ12mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA15'
                                    },
                                    {
                                        title: 'φ14mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA16'
                                    },
                                    {
                                        title: 'φ16mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA17'
                                    },
                                    {
                                        title: 'φ18mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA18'
                                    },
                                    {
                                        title: 'φ20mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA19'
                                    },
                                    {
                                        title: 'φ22mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA20'
                                    },
                                    {
                                        title: 'φ25mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA21'
                                    },
                                    {
                                        title: 'φ28mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA22'
                                    },
                                    {
                                        title: 'φ32mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA23'
                                    },
                                    {
                                        title: 'φ36mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA24'
                                    },
                                    {
                                        title: 'φ40mm',
                                        align: 'center',
                                        width: 85,
                                        key: 'LWDATA25'
                                    },
                                    {
                                        title: 'φ18-25mm',
                                        align: 'center',
                                        width: 100,
                                        key: 'LWDATA26'
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
                // this.dw?params.dw=this.dw:'';
                this.cx?params.company=this.cx:'';
                let startTime='endMonth=';
                // let endTime='&endTime=';
                // this.switchTime?(startTime=startTime+this.utils.formatMonthStart(this.startTime),endTime=endTime+this.utils.formatMonthStart(this.endTime)):(startTime=startTime+ this.utils.formatYearStart(this.year),endTime=endTime+this.utils.formatYearEnd(this.year));
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
                    window.console.log(res.dayList);
                    this.data =  res.dayList;
                    // ORDERDAY
                    this.data=this.utils.mergeRow(res.dayList,'ORDERDAY');
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