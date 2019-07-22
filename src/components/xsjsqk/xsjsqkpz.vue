<template>
    <div>
        <Form :label-width="60">
            <Row>
                <Col style="width: 320px;float: left;">
                    <FormItem label="月份：">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false" v-model="startTime" style="width:120px;margin-left:-20px"></DatePicker>
                    <!--</FormItem>-->
                <!--</Col>-->
                <!--<Col span="4">-->
                    <!--<FormItem>-->
                        <DatePicker type="month" placeholder="终止月份"  :editable="false" :clearable="false" v-model="endTime" style="width:120px;margin-left:20px"></DatePicker>
                    </FormItem>
                </Col>
                <Col style="width: 270px;float: left">
                    <FormItem >
                        <label>是否借贷：</label>
                        <Select v-model="model1" style="width:100px">
                            <Option value="1">是</Option>
                            <Option value="0">否</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col style="width: 320px;float: right">
                    <Button @click="getList()" icon="ios-search" style="margin-right:10px;">查询</Button>
                    <Button @click="downLoad()" :loading="dwstats" icon="ios-cloud-download-outline">导出</Button>
<!--                    <a :href="downloadUrl"><Button type="primary" :loading="mxstats" style="margin-left:10px" @click="dw()">明细导出</Button></a>-->
                </Col>
                <Button type="primary" style="margin-left:10px" icon="ios-cloud-download-outline" :loading="mxstats" @click="dw()">明细导出</Button>
            </Row>
        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="550" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "xsjsqkpz",
        data() {
            return {
                dwstats:true,
                mxstats:true,
                downloadUrl:'',
                loading:true,
                startTime:new Date(new Date().getFullYear(), new Date().getMonth()-1, 1),
                endTime:new Date(new Date().getFullYear(), new Date().getMonth()-1, 1),
                columns: [
                    // {
                    //     title: '序号',
                    //     align: "center",
                    //     type:'index',
                    // },
                    {
                        title: '品种',
                        align: "center",
                        key: 'COMPANYNAME'
                    },
                    {
                        title: '销售量（吨）',
                        align: "center",
                        key: 'FKIMG',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                Number(params.row[params.column.key]).toFixed(2)
                            )
                        }

                    },
                    {
                        title: '售价（元/吨）',
                        align: "center",
                        key: 'SJ',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                Number(params.row[params.column.key]).toFixed(2)
                            )
                        }
                    },
                    {
                        title: '销售额（万元）',
                        align: "center",
                        key: 'KZWI6',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                Number(params.row[params.column.key]).toFixed(2)
                            )
                        }
                    },
                ],
                data: [],
                model1:'0'
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            dw(){
                // this.Mxdown()
                const msg = this.$Message.loading({
                    content: '正在导出数据，请稍后',
                    duration: 0
                });
                this.mxstats = true
                let startTime='startTime=';
                startTime+=this.utils.formatMonthStart(this.startTime)
                let endTime='&endTime=';
                endTime+=this.utils.formatMonthStart(this.endTime)
                let pz= "&pz=冷板"
                let jd = "&jd="+this.model1
                fetch(this.$store.state.fetchPath + "/export/exportXSJSPz?"+startTime+endTime+jd+pz, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }).then(response => response.blob())
                    .then(blob => {
                        setTimeout(msg,1000);
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement('a');
                        a.href = url;
                        a.download = "销售结算情况（品种）.xlsx";
                        a.click();
                        this.mxstats = false
                    });
            },

            // Mxdown(){
            //     let startTime='startTime=';
            //     startTime+=this.utils.formatMonthStart(this.startTime)
            //     let endTime='&endTime=';
            //     endTime+=this.utils.formatMonthStart(this.endTime)
            //     // let companyName= "&companyName="+this.gc
            //     let jd = "&jd="+this.model1
            //     this.downloadUrl=this.$store.state.fetchPath + "/export/exportXSJSPz?"+startTime+endTime+jd;
            //     const msg = this.$Message.loading({
            //         content: '正在导出数据，请稍后',
            //         duration: 0
            //     });
            //     setTimeout(msg, 20000);
            // },
            downLoad(){
                this.$refs.table.exportCsv({
                    filename: '销售结算情况（品种）明细'
                });
            },
            getList() {
                this.dwstats = true;
                this.mxstats = true;
                this.loading = true;
                let startTime='startTime=';
                startTime+=this.utils.formatMonthStart(this.startTime)
                let endTime='&endTime=';
                endTime+=this.utils.formatMonthStart(this.endTime)
                let zt='&zt='
                zt+="1"
                let sfjd="&jd="
                sfjd+=this.model1
                fetch(this.$store.state.fetchPath + "/yxyb/getyxybpz", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime+endTime+zt+sfjd,
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
                    this.mxstats = false;
                    this.dwstats = false;
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
    .ivu-table-cell{
        text-overflow: ellipsis !important;
        word-break: break-all !important;
        padding-left:0px;
        padding-right:0px;
    }
</style>
