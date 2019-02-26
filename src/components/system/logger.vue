<template>
    <div>
        <DatePicker type="datetimerange" @on-change="time1" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择查询时间" style="width: 300px;margin-right:20px"></DatePicker>
        <Button type="primary" @click="search()" style="magin-left:'20px'">查询日志</Button>

        <Table stripe :columns="loggerColumns" :data="loggerData" style="margin-top: 20px"></Table>
        <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
    </div>
</template>

<script>
    export default {
        name:"logger",
        data() {
            return {
                loggerParams: {
                    createTime: '',
                    page:0,
                    size:10
                },
                dates:[],
                fecthLoggerData: [],
                // 初始化信息总条数
                dataCount: 0,
                // 每页显示多少条
                pageSize: 10,
                xia: 0, //下一页或者上一页的第一项索引值
                loggerColumns: [{
                    "title": "用户名",
                    "align": "center",
                    "key": "username"
                }, {
                    "title": "请求方式",
                    "align": "center",
                    "key": "opType"
                },{
                    "title": "操作内容",
                    "align": "center",
                    "key": "content"
                }, {
                    "title": "请求路径",
                    "align": "center",
                    "key": "path"

                }, {
                    "title": "操作方法",
                    "align": "center",
                    "key": "method"

                },  {
                    "title": "ip",
                    "align": "center",
                    "key": "ip"

                }, {
                    "title": "创建时间",
                    "align": "center",
                    "key": "createTime"

                }],
                loggerData: []
            }
        },
        created() {
            this.handleListApproveHistory();
        },
        methods: {
            // 获取日志记录信息
            handleListApproveHistory() {
                fetch(this.$store.state.fetchPath + "/selectloggers", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.loggerParams),
                    credentials:'include'
                }).then((res) => {
                    return res.text();
                }).then((res) => {
                    res = JSON.parse(res);
                    // window.console.log(res);
                    // 保存取到的所有数据
                    this.fecthLoggerData =  res.records;
                    this.dataCount =  res.total;
                    // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                    if(this.dataCount < this.pageSize){
                        this.loggerData = this.fecthLoggerData;
                    }else{
                        this.loggerData = this.fecthLoggerData.slice(0,this.pageSize);
                    }
                })
            },
            changepage(index) {
                //index当前页码
                var _start = ( index - 1 ) * this.pageSize;
                var _end = index * this.pageSize;
                this.loggerData = this.fecthLoggerData.slice(_start,_end);
            },
            time1(e){
                window.console.log(e);
                this.Dates=e;
                window.console.log(this.Dates[0]);
                window.console.log(this.Dates[1]);

            },
            search(params){
                window.console.log(params);
            }
         },

    }
</script>
<style scoped>
    .paging{
        float:right;
        margin-top:10px;
    }
</style>