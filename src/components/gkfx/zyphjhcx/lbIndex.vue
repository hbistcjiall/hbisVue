<template>
    <div>
        <div>
            <div style="width:50%;float:left;height:405px;border:1px solid black;">
                <x-chart id="lb_pieValue" :option="pieOption"></x-chart>
            </div>
            <div style="width:49%;float:right;height:405px;border:1px solid black;">
                <x-chart id="lb_rcolumnValue"  :option="option"></x-chart>
            </div>
        </div>
        <div>
            <div style="width:55%;float:left;">
                <Table border stripe :columns="columns1" :data="resDatas3" style="margin-top: 20px" id="lbTable1">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                </Table>
            </div>
            <div style="width:44%;float:right;">
                <Table border stripe :columns="columns2" :data="resDatas4" style="margin-top: 20px" id="lbTable2">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                </Table>
            </div>
        </div>
    </div>
</template>

<script>
    import XChart from '../../chart.vue'
    export default {
        name: "lbIndex",
        data () {
            return {
                byValue:{
                    type:'冷板'
                },
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
                option:{},
                column: {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: '<span style="font-size:16px;font-weight: bold">钢厂计划</span><br>'
                    },
                    xAxis: {
                        categories: [],
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
                //饼状图
                pieOption:{},
                pie: {
                    chart: {
                        type: 'pie'
                    },
                    title: {
                        text: '<span style="font-size:16px;font-weight: bold">销售主体</span><br>'
                    },
                    subtitle: {
                        text: ''
                    },
                    tooltip: {
                        percentageDecimals: 2 ,//百分比保留小数
                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.b:.2f}%</b><br/>',
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.y:.2f}万吨',
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: '百分比',
                        data: []
                    }]
                },
            }
        },
        components: {
            XChart
        },
        mounted() {
            this.handleListApproveHistory();
        },

        methods: {
            handleListApproveHistory() {
                //销售主体
                fetch(this.$store.state.fetchPath + "/protocolAccountDetails/resourceplanone", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body:this.utils.formatParams(this.byValue),
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
                    this.resDatas1 =  res;
                    let chartsData =[];
                    for(let i=1;i<res.length;i++){
                        chartsData.push({name:res[i].COMPANYNAME,y:res[i].ZYFKIMG,b:res[i].BILI});
                    }
                    this.pie.series[0].data=chartsData;
                    this.pie.subtitle.text = '<span style="font-size:14px;color:black;font-weight: bold">'+res[0].COMPANYNAME+':'+res[0].ZYFKIMG+"万吨"+'</span>'
                    this.pieOption=this.pie;
                })

                //钢厂计划
                fetch(this.$store.state.fetchPath + "/protocolAccountDetails/resourceplantwo", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body:this.utils.formatParams(this.byValue),
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
                    let chartsData1=[];
                    let chartsData2=[];
                    let chartsData3=[];
                    for(let k=0;k<res.length;k++){
                        chartsData2.push(res[k].JH);
                        chartsData1.push(res[k].XH);
                        chartsData3.push(res[k].COMPANYNAME);
                    }
                    this.column.series[1].data=chartsData2;
                    this.column.series[0].data=chartsData1;
                    this.column.xAxis.categories=chartsData3;
                    this.option=this.column;
                })

                //品种表格
                fetch(this.$store.state.fetchPath + "/protocolAccountDetails/resourceplanthrid", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body:this.utils.formatParams(this.byValue),
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
                    this.resDatas3 =  res;
                    for(var i=0;i<this.resDatas3.length;i++){
                        this.resDatas3[i].BILI = this.resDatas3[i].BILI;
                    }

                })


                //钢厂表格
                fetch(this.$store.state.fetchPath + "/protocolAccountDetails/resourceplanfour", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body:this.utils.formatParams(this.byValue),
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
                    this.resDatas4 =  res;
                    for(var i=0;i<this.resDatas4.length;i++){
                        this.resDatas4[i].BILI = this.resDatas4[i].BILI;
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>