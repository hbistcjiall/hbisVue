<template>
    <div>
        <div>
            <div style="width:50%;float:left;height:500px;border:1px solid black;">
                <!--<x-chart id="xszt" :option="pie"></x-chart>-->
            </div>
            <div style="width:49%;float:right;height:500px;border:1px solid black;">
                <!--<x-chart id="test" :option="column"></x-chart>-->
                <div id="test" :option="column"></div>
            </div>
        </div>
        <div>
            <div style="width:55%;float:left;">
                <Table border stripe :columns="columns1" :data="resDatas3" style="margin-top: 20px">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                </Table>
            </div>
            <div style="width:44%;float:right;">
                <Table border stripe :columns="columns2" :data="resDatas4" style="margin-top: 20px">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                </Table>
            </div>
        </div>
    </div>
</template>

<script>
    // import XChart from '../../chart.vue'
    import highCharts from 'highcharts'
    export default {
        name: "allIndex",
        data () {
            return {
                gcjh:'gcjh',
                columns1: [
                    {
                        title: '品种',
                        align: "center",
                        key: 'NAME'
                    },
                    {
                        title: '计划量',
                        align: "center",
                        key: 'JSL'
                    },
                    {
                        title: '品种钢',
                        align: "center",
                        key: 'PZGL'
                    },
                    {
                        title: '比例',
                        align: "center",
                        key: 'BILI'
                    },
                ],
                columns2: [
                    {
                        title: '钢厂',
                        align: "center",
                        key: 'COMPANYNAME'
                    },
                    {
                        title: '计划量',
                        align: "center",
                        key: 'JSL'
                    },
                    {
                        title: '品种钢',
                        align: "center",
                        key: 'PZGL'
                    },
                    {
                        title: '比例',
                        align: "center",
                        key: 'BILI'
                    },
                ],
                resDatas1:[],
                resDatas2:[],
                resDatas3:[],
                resDatas4:[],
                xhdata:[],
                //柱状图
                column: {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: '钢厂计划'
                    },
                    xAxis: {
                        categories: [1],
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '单位（万）',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    plotOptions: {
                        column:{
                            dataLabels:{
                                enabled:true, // dataLabels设为true
                            }
                        }
                    },
                    series: [{
                        name: '现货',
                        data: []
                    }, {
                        name: '计划量',
                        data: this.xhdata
                    }]
                },

                pie: {
                    chart: {
                        type: 'pie'
                    },
                    title: {
                        text: '销售主体'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                        percentageDecimals: 2 //百分比保留小数
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f}万吨',
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: '百分比',
                        data: [ {
                            name: '技术中心',
                            y: 51.82
                        }, {
                            name: '出口',
                            y: 24.25
                        },{
                            name: '子公司',
                            y: 46.02
                        },{
                            name: '销售公司',
                            y: 158.36,
                        }]
                    }]
                },
            }
        },
        // components: {
        //     XChart
        // },
        mounted() {
            this.handleListApproveHistory();
            highCharts.chart('test',this.column);
        },

        methods: {
            handleListApproveHistory() {
                //销售主体
                // fetch(this.$store.state.fetchPath + "/protocolAccountDetails/resourceplanone", {
                //     method: "POST",
                //     headers: this.$store.state.fetchHeader,
                //     body:'',
                //     credentials:'include'
                // })
                //     .then((res) => {
                //         if(res.status!=200){
                //             this.$Message.error('请求失败！');
                //         }else{
                //             return res.text();
                //         }
                //     }).then((res) => {
                //     res = res&&res.length>0?JSON.parse(res):[]
                //     this.resDatas1 =  res;
                //     window.console.log(this.resDatas1)
                // })

                //钢厂计划
                fetch(this.$store.state.fetchPath + "/protocolAccountDetails/resourceplantwo", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body:'',
                    credentials:'include'
                })
                    .then((res) => {
                        if(res.status!=200){
                            this.$Message.error('请求失败！');
                        }else{
                            return res.text();
                        }
                    }).then((res) => {
                    res = res&&res.length>0?JSON.parse(res):[]
                    this.resDatas2 =  res;

                    // window.console.log(this.resDatas2)
                    // for(var i=0;i<this.resDatas2.length;i++){
                    //     // this.xhdata = this.resDatas2[i].JH;
                    //     this.xhdata.splice(this.resDatas2[i].JH);
                    //     this.column.series[0].data=res;
                    //     window.console.log(this.column.series[1])
                    //     // this.column.series[1].data.push(this.xhdata);
                    //     // this.column.series[1].data= this.resDatas2[i].JH;
                    //     //  this.column.xAxis.categories.push(+'"'+this.resDatas2[i].COMPANYNAME+'"');
                    //     //  window.console.log(typeof(this.column.series[0].data[0]))
                    // }
                    for(let i=0;i<res.length;i++){
                        this.column.series[0].data.push(res[i].JH);
                    }

                })

                //品种表格
                // fetch(this.$store.state.fetchPath + "/protocolAccountDetails/resourceplanthrid", {
                //     method: "POST",
                //     headers: this.$store.state.fetchHeader,
                //     body:'',
                //     credentials:'include'
                // })
                //     .then((res) => {
                //         if(res.status!=200){
                //             this.$Message.error('请求失败！');
                //         }else{
                //             return res.text();
                //         }
                //     }).then((res) => {
                //     res = res&&res.length>0?JSON.parse(res):[]
                //     this.resDatas3 =  res;
                //     window.console.log(this.resDatas3[3].BILI*100+'%')
                //     for(var i=0;i<this.resDatas3.length;i++){
                //         this.resDatas3[i].BILI = this.resDatas3[i].BILI*100+'%';
                //     }
                //
                // })
                //

                //钢厂表格
                // fetch(this.$store.state.fetchPath + "/protocolAccountDetails/resourceplanfour", {
                //     method: "POST",
                //     headers: this.$store.state.fetchHeader,
                //     body:'',
                //     credentials:'include'
                // })
                //     .then((res) => {
                //         if(res.status!=200){
                //             this.$Message.error('请求失败！');
                //         }else{
                //             return res.text();
                //         }
                //     }).then((res) => {
                //     res = res&&res.length>0?JSON.parse(res):[]
                //     this.resDatas4 =  res;
                //     for(var i=0;i<this.resDatas4.length;i++){
                //         this.resDatas4[i].BILI = this.resDatas4[i].BILI*100+'%';
                //     }
                //     window.console.log(this.resDatas4)
                //
                // })
            },
        }
    }
</script>

<style scoped>

</style>