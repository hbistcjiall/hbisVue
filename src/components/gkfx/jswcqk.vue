<template>
    <div>
        <Row style="width:330px;margin:0px auto;">
            <div @click="getTime(0)" type="primary" :class="{ 'class-a': isA, 'class-b': isB}">本月</div>
            <div @click="getTime(1)" type="primary" :class="{ 'class-c': isC, 'class-d': isD}">上月</div>
            <div @click="getTime(2)" type="primary" :class="{ 'class-e': isE, 'class-f': isF}">本年</div>
        </Row>
        <div class="chartStyle">
            <div style="width:50%;float:left;border-right:1px solid #3497db">
                <x-chart id="pieValue"  :option="pieOption"></x-chart>
            </div>
            <div style="width:49%;float:right;">
                <x-chart id="columnValue"  :option="option"></x-chart>
            </div>
        </div>
        <div style="margin-top:500px;">
            <div style="width:100%;height:30px;font-size: 16px;font-weight: bold;padding-left:10px;text-align: left;background:#dddddd;line-height: 30px;margin-bottom:10px;">品种钢结算完成情况</div>
            <div style="overflow: hidden;" class="PZGC">
                <ul style="width:100px;float:right;">
                    <li v-for="(todo, index) in todos" v-on:click="tabsClick(index,$event)"
                        v-bind:class="{ blue:index==active1}"> {{ todo.text }}</li>
                </ul>
            </div>
            <Table :loading="loading" :columns="columns" :data="resDatas" border height="500">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
            </Table>
        </div>
    </div>
</template>

<script>
    import XChart from '../chart.vue'
    export default {
        name: "jswcqk",
        data(){
            return {
                isA: true,
                isB: false,
                isC: true,
                isD: false,
                isE: true,
                isF: false,
                loading:true,
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
                            text: '结算(吨)',
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
                        name: '结算（吨）',
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
                                format: '<b>{point.name}</b>: {point.y:.2f}吨',
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
                active1:0,
                zt:1,
                todos: [
                    { text: '品种' },
                    { text: '钢厂' },
                ],
                resDatas : [],
                resDatas1 : [],
                columns: [
                    {
                        title: '总量',
                        key: 'zl',
                        align: 'center',
                        children: [
                            {
                                title: '品种',
                                key: 'NAME',
                                align: 'center',
                            },
                            {
                                title: '完成量',
                                key: 'JSL',
                                align: 'center',
                            },
                        ]
                    },
                    {
                        title: '品种钢量',
                        key: 'pzgl',
                        align: 'center',
                        children: [{
                            title: '品种钢',
                            key: 'PZGL',
                            align: 'center',
                        },{
                            title: '完成比例',
                            key: 'WCL',
                            align: 'center',
                        },
                        ]
                    }
                ],
            }
        },
        components: {
            XChart
        },
        mounted() {
            this.getTime(0,1);
        },
        methods: {
            getTime(e) {
                let params = {
                    zt:this.zt
                }
                this.pieOption = {};
                this.option = {};
                let startTime='startTime=';
                let endTime='&endTime=';
                switch (e) {
                    case 0:
                        startTime=startTime+this.utils.formatMonthStart();
                        endTime=endTime+this.utils.formatMonthEnd();
                        this.SubStarTime_year = startTime.substring(10, 14);
                        this.SubStarTime_month = startTime.substring(15, 17);
                        this.pie.title.text = '<span style="font-size:14px;color:black;font-weight: bold">'+this.SubStarTime_year+"年"+this.SubStarTime_month+"月"+"结算完成情况（品种）"+'</span>';
                        this.column.title.text = '<span style="font-size:14px;color:black;font-weight: bold">'+this.SubStarTime_year+"年"+this.SubStarTime_month+"月"+"结算完成情况（品种）"+'</span>';
                        this.isA= false;
                        this.isB= true;
                        this.isC= true;
                        this.isD= false
                        this.isE= true;
                        this.isF= false;
                        break;
                    case 1:
                        this.isA= true;
                        this.isB= false;
                        this.isC= false;
                        this.isD= true
                        this.isE= true;
                        this.isF= false;
                        startTime=startTime+this.utils.formatMonthBefore();
                        endTime=endTime+this.utils.formatMonthStart();
                        this.SubStarTime_year = startTime.substring(10, 14);
                        this.SubStarTime_month = startTime.substring(15, 17);
                        this.pie.title.text = '<span style="font-size:14px;color:black;font-weight: bold">'+this.SubStarTime_year+"年"+this.SubStarTime_month+"月"+"结算完成情况（品种）"+'</span>';
                        this.column.title.text = '<span style="font-size:14px;color:black;font-weight: bold">'+this.SubStarTime_year+"年"+this.SubStarTime_month+"月"+"结算完成情况（品种）"+'</span>';
                        break;
                    case 2:
                        this.isA= true;
                        this.isB= false;
                        this.isC= true;
                        this.isD= false
                        this.isE= false;
                        this.isF= true;
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
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getpzgjswc", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body:startTime+endTime+'&'+this.utils.formatParams(params),
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
                    this.resDatas =  res;
                    this.loading = false;
                })
            },
            tabsClick(index){
                this.active1=index;
                this.zt = this.active1+1;
                this.getTime(0,this.zt);
                if(index ==0){
                    this.columns[0].children[0].title = '品种'
                }else if(index == 1){
                    this.columns[0].children[0].title = '钢厂'
                }
            },
        }
    }
</script>

<style scoped>
    .class-a,.class-c,.class-e{
        width:100px;
        height:30px;
        background: #f2f3f7;
        border:none;
        color:#6c819b;
        margin-right:10px;
        cursor: pointer;
        float:left;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        border-radius: 3px;
        font-weight: bold;
    }
    .class-b,.class-d,.class-f{
        width:100px;
        height:30px;
        background: #d2d9e3;
        border:none;
        color:#6c819b;
        margin-right:10px;
        cursor: pointer;
        float:left;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        border-radius: 3px;
        font-weight: bold;
    }
    .chartStyle{
        margin-top:20px;
    }
  .highcharts-credits{
      display: none !important;
  }
  ul{
      list-style-type: none;
  }
    .PZGC ul li{
        font-size: 16px;
        cursor: pointer;
        float:left;
        margin-right:5px;
    }
    .PZGC ul li:first-child{
        border-right:1px solid #000;
        padding-right:5px;
    }
    .blue {color: #2175bc;}
</style>