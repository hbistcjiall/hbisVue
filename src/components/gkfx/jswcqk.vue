<template>
    <div>
        <div>
            <button @click="getTime(1)">本月</button>
            <button @click="getTime(2)">上月</button>
            <button @click="getTime(3)">本年</button>
        </div>
        <div class="chartStyle">
            <div style="width:50%;float:left;border-right:1px solid #3497db">
                <x-chart id="pieValue"  :option="pieOption"></x-chart>
            </div>
            <div style="width:49%;float:right;">
                <x-chart id="columnValue"  :option="option"></x-chart>
            </div>
            <div style="clear:both"></div>
        </div>
    </div>
</template>

<script>
    import XChart from '../chart.vue'
    export default {
        name: "jswcqk",
        data(){
            return {
                byValue:{
                    endTime:'2019-06-01 00:00:00',
                    startTime:'2016-01-01 00:00:00',
                },
                resDatas2:[],
                //柱状图
                option:{},
                column: {
                    chart: {
                        zoomType: 'xy'
                    },
                    colors:['#3689cf','#cc0000'],
                    title: {
                        text: ''
                    },
                    xAxis: [{
                        categories:[],
                        crosshair: true
                    }],
                    yAxis: [{ // Primary yAxis
                        labels: {
                            format: '{value}',
                            style: {
                                color: ''
                            }
                        },
                        title: {
                            text: '结算均价',
                            style: {
                                color:''
                            }
                        }
                    }, { // Secondary yAxis
                        title: {
                            text: '结算',
                            style: {
                                color:''
                            }
                        },
                        labels: {
                            format: '{value}',
                            style: {
                                color: ''
                            }
                        },
                        opposite: true
                    }],
                    tooltip: {
                        shared: true
                    },
                    plotOptions: {
                        column:{
                            dataLabels:{
                                enabled:true, // dataLabels设为true
                            }
                        },
                        spline:{
                            dataLabels:{
                                enabled:true, // dataLabels设为true
                            }
                        }
                    },
                    series: [{
                        name: '结算（万吨）',
                        type: 'column',
                        yAxis: 1,
                        data: [],
                    }, {
                        name: '结算均价（元）',
                        type: 'spline',
                        data: [],
                    }]
                },
                //饼状图
                pieOption:{},
                pie: {
                    chart: {
                        type: 'pie'
                    },
                    // colors:['#386489','#3689cf'],
                    title: {
                        text: '<span style="font-size:16px;font-weight: bold">销售主体</span><br>'
                    },
                    subtitle: {
                        text: ''
                    },
                    tooltip: {
                        percentageDecimals: 2 ,//百分比保留小数
                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}万吨</b><br/>',
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.y:.2f}万吨',
                            },
                            showInLegend: true
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: '结算量',
                        data: []
                    }]
                },
            }
        },
        components: {
            XChart
        },
        mounted() {
            this.getTime(1);
        },
        methods: {
            getTime(e) {
                let startTime='startTime=';
                let endTime='&endTime=';
                switch (e) {
                    case 1:
                        startTime=startTime+this.utils.formatMonthStart();
                        endTime=endTime+this.utils.formatMonthEnd();
                        break;
                    case 2:
                        window.console.log(new Date(new Date().getFullYear()+'-'+new Date().getMonth()-1));
                        startTime=startTime+this.utils.formatMonthBefore();
                        endTime=endTime+this.utils.formatMonthStart();
                        break;
                    case 3:
                        startTime=startTime+ this.utils.formatYearStart(new Date());
                        endTime=endTime+this.utils.formatYearEnd(new Date());
                        break;
                }
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getpzjszl", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body:this.utils.formatParams(this.byValue),
                    // body:startTime+endTime,
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
                        chartsData2.push(res[k].JSJJ);
                        chartsData1.push(res[k].JSL);
                        chartsData3.push(res[k].VARIETY);
                    }
                    this.column.series[1].data=chartsData2;
                    this.column.series[0].data=chartsData1;
                    this.column.xAxis[0].categories=chartsData3;
                    window.console.log(this.column.xAxis.categories)
                    this.option=this.column;

                    let chartsData =[];
                    for(let i=1;i<res.length;i++){
                        chartsData.push({name:res[i].VARIETY,y:res[i].JSL});
                    }
                    this.pie.series[0].data=chartsData;
                    this.pieOption=this.pie;

                })
            }
        }
    }
</script>

<style scoped>
    button{
        background: #3497db;
        color:#fff;
        width:100px;
        height:30px;
        margin-left:20px;
        outline: none;
        border:none;
    }
    .chartStyle{
        margin-top:20px;
        border:1px solid #3497db;
    }

</style>