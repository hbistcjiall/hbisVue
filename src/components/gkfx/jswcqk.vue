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
                active:'',
                SubStarTime_month :'',
                SubStarTime_year :'',
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
                    subtitle: {
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
                            text: '结算均价(元)',
                            style: {
                                color:''
                            }
                        }
                    }, { // Secondary yAxis
                        title: {
                            text: '结算(万吨)',
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
                                color:'#cc0000'
                            },
                        }
                    },
                    credits: {
                        enabled: false,
                    },
                    legend: {
                        y: 20,
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
                    colors:['#75b9e6','#4aa3de','#c1e0ff','#77bbff','#33577b','#6ba6e0','#3d8ec4','#4fc1e9','#96bdd3','#73bbc4'],
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: ''
                    },
                    tooltip: {
                        percentageDecimals: 2 ,//百分比保留小数
                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>',
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
                        enabled: false,
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
                this.pieOption = {};
                this.option = {};
                let startTime='startTime=';
                let endTime='&endTime=';
                switch (e) {
                    case 1:
                        startTime=startTime+this.utils.formatMonthStart();
                        endTime=endTime+this.utils.formatMonthEnd();
                        this.SubStarTime_year = startTime.substring(10, 14);
                        this.SubStarTime_month = startTime.substring(15, 17);
                        this.pie.title.text = '<span style="font-size:14px;color:black;font-weight: bold">'+this.SubStarTime_year+"年"+this.SubStarTime_month+"月"+"结算完成情况（品种）"+'</span>';
                        this.column.title.text = '<span style="font-size:14px;color:black;font-weight: bold">'+this.SubStarTime_year+"年"+this.SubStarTime_month+"月"+"结算完成情况（品种）"+'</span>';
                        break;
                    case 2:
                        startTime=startTime+this.utils.formatMonthBefore();
                        endTime=endTime+this.utils.formatMonthStart();
                        this.SubStarTime_year = startTime.substring(10, 14);
                        this.SubStarTime_month = startTime.substring(15, 17);
                        this.pie.title.text = '<span style="font-size:14px;color:black;font-weight: bold">'+this.SubStarTime_year+"年"+this.SubStarTime_month+"月"+"结算完成情况（品种）"+'</span>';
                        this.column.title.text = '<span style="font-size:14px;color:black;font-weight: bold">'+this.SubStarTime_year+"年"+this.SubStarTime_month+"月"+"结算完成情况（品种）"+'</span>';
                        break;
                    case 3:
                        startTime=startTime+ this.utils.formatYearStart(new Date());
                        endTime=endTime+this.utils.formatYearEnd(new Date());
                        this.SubStarTime_year = startTime.substring(10, 14);
                        this.pie.title.text = '<span style="font-size:14px;color:black;font-weight: bold">'+this.SubStarTime_year+"年结算完成情况（品种）"+'</span>';
                        this.column.title.text = '<span style="font-size:14px;color:black;font-weight: bold">'+this.SubStarTime_year+"年结算完成情况（品种）"+'</span>';
                        break;
                }
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getpzjszl", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body:startTime+endTime,
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
                    if(res.length>0){
                        let chartsData1=[];
                        let chartsData2=[];
                        let chartsData3=[];
                        let chartsData =[];
                        for(let k=0;k<res.length;k++){
                            chartsData1.push(res[k].JSL);
                            chartsData2.push(res[k].JSJJ);
                            chartsData3.push(res[k].VARIETY);
                            chartsData.push({name:res[k].VARIETY,y:res[k].JSL});
                        }
                        this.column.series[1].data=chartsData2;
                        this.column.series[0].data=chartsData1;
                        this.column.xAxis[0].categories=chartsData3;
                        this.pie.series[0].data=chartsData;
                    }else{
                        this.column.series[1].data=[0,0,0,0,0];
                        this.column.series[0].data=[0,0,0,0,0];
                        this.column.xAxis[0].categories=['热板','冷板','宽厚板','棒线','型带'];
                        this.pie.series[0].data=[{name:'热板',y:0},{name:'冷板',y:0},{name:'宽厚板',y:0},{name:'棒线',y:0},{name:'型带',y:0}];
                    }
                    this.option=this.column;
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
        cursor: pointer;
    }
    .chartStyle{
        margin-top:20px;
    }
  .highcharts-credits{
      display: none !important;
  }
</style>