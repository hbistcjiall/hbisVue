<template>
    <div id="demo">
        <x-chart id="container"  :option="option"></x-chart>
    </div>
</template>

<script>
    import XChart from '@/components/chart'
    export default {
        name: "demo",
        data(){
          return {
              option:{},
              myoption:{
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
                      data: []
                  }]}
          }
        },
        mounted() {
            this.createChart();
        },
        components: {
            XChart
        },
        methods:{
            createChart() {
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
                    res = res && res.length > 0 ? JSON.parse(res) : []
                    let chartsData=[];
                    for(let k=0;k<res.length;k++){
                        chartsData.push(res[k].JH);
                    }
                    this.myoption.series[1].data=chartsData;
                    this.myoption.series[0].data=chartsData;
                     this.option=this.myoption;
                });

            }
        }
    }
</script>

<style scoped>
</style>