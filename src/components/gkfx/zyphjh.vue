<template>
    <div>
        <Row>
            <Button @click="getAll" type="primary">全部</Button>
            <Button @click="getRb" type="primary" style="margin-left: 9px">热板</Button>
            <Button @click="getLb" type="primary" style="margin-left: 9px">冷板</Button>
            <Button @click="getKhb" type="primary" style="margin-left: 9px">宽厚板</Button>
            <Button @click="getBx" type="primary" style="margin-left: 9px">棒线</Button>
            <Button @click="getXd" type="primary" style="margin-left: 9px">型带</Button>
        </Row>
        <div style="margin-top:20px;">
            <div class="LeftImg">
                <div class="chartTitleStyle">销售主体</div>
                <x-chart id="all_pieValue" :option="pieOption"></x-chart>
            </div>
            <div class="RigtImg">
                <div class="chartTitleStyle">钢厂计划</div>
                <x-chart id="all_columnValue"  :option="option"></x-chart>
            </div>
        </div>
        <div>
            <div class="LeftImg">
                <Table border stripe :columns="columns1" :data="resDatas3" style="margin-top: 20px" id="allTable1">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                </Table>
            </div>
            <div class="RigtImg">
                <Table border stripe :columns="columns2" :data="resDatas4" style="margin-top: 20px" id="allTable2">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                </Table>
            </div>
        </div>
    </div>
</template>

<script>
    import XChart from '../chart.vue'
    export default {
        name: "zyphjh",
        data() {
            return {
                activeIndex:0,
                byValue:{
                    type:''
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
                    colors:['#386489','#3689cf'],
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: [],
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '单位（万吨）',
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
                    credits: {
                        enabled: false,
                    },
                    series: [{
                        name: '现货',
                        data: []
                    }, {
                        name: '计划量',
                        data:[]
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
            this.TableData();
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
                    if(res.length>0){
                        let chartsData =[];
                        for(let i=1;i<res.length;i++){
                            chartsData.push({name:res[i].COMPANYNAME,y:res[i].ZYFKIMG,b:res[i].BILI});
                        }
                        this.pie.series[0].data=chartsData;
                        this.pie.subtitle.text = '<span style="font-size:14px;color:black;font-weight: bold">'+res[0].COMPANYNAME+':'+res[0].ZYFKIMG+"万吨"+'</span>'

                    }else{
                        this.pie.series[0].data=[
                            {name:'唐钢',y:0,b:0},
                            {name:'邯钢',y:0,b:0},
                            {name:'宣钢',y:0,b:0},
                            {name:'承钢',y:0,b:0},
                            {name:'舞钢',y:0,b:0},
                            {name:'石钢',y:0,b:0},
                            {name:'衡板',y:0,b:0},
                            {name:'邯宝',y:0,b:0}
                        ]
                        this.pie.subtitle.text = '<span style="font-size:14px;color:black;font-weight: bold">'+"集团产销资源总量：0万吨"+'</span>'

                    }
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
                    if(res.length>0){
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
                    }else{
                        this.column.series[1].data=[0,0,0,0,0,0,0,0];
                        this.column.series[0].data=[0,0,0,0,0,0,0,0];
                        this.column.xAxis.categories=['唐钢','邯钢','宣钢','承钢','舞钢','石钢','衡板','邯宝'];
                    }

                    this.option=this.column;
                })

            },
            TableData(){
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
            getAll(){
                this.byValue.type = ''
                this.handleListApproveHistory();
                this.TableData()
            },
            getRb(){
                this.byValue.type = '热板'
                this.handleListApproveHistory()
            },
            getLb(){
                this.byValue.type = '冷板'
                this.handleListApproveHistory()
            },
            getKhb(){
                this.byValue.type = '宽厚板'
                this.handleListApproveHistory()
            },
            getXd(){
                this.byValue.type = '型带'
                this.handleListApproveHistory()
            },
            getBx(){
                this.byValue.type = '棒线'
                this.handleListApproveHistory()
            },

        }
    }
</script>

<style scoped>
    .RigtImg{
        width:49%;
        float:right;
    }
    .LeftImg{
        width:50%;
        float:left;
    }
    .highcharts-credits{
        display: none;
    }
    .chartTitleStyle{
        height:30px;
        background: #d4d4d4;
        text-align: left;
        line-height: 30px;
        font-size: 16px;
        padding-left:20px;
        color:#7a7a7a;
        font-weight:bold;
    }
    .ivu-table th{
        background-color: #d4d4d4 !important;
    }
    Button{
        width:100px;
        height:30px;
        background: #f3f4f7;
        border:none;
        color:#6c819b;
    }
    Button:hover{
        background: #d3dae4;
        color:#6c819b;
    }
</style>