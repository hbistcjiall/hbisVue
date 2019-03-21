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
                    endTime:'',
                    current:0,
                    size:10
                },
                fecthLoggerData: [],
                dataCount: 0,
                pageSize: 10,
                xia: 0,
                loggerColumns: [{
                    "title": "用户名",
                    "align": "center",
                    "key": "userName"
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
            handleListApproveHistory() {
                fetch(this.$store.state.fetchPath + "/selectloggers", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.loggerParams),
                    credentials:'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res&&JSON.parse(res)
                    window.console.log(res);
                    this.fecthLoggerData =  res.records;
                    this.dataCount =  res.total;
                    if(this.dataCount < this.pageSize){
                        this.loggerData = this.fecthLoggerData;
                    }else{
                        this.loggerData = this.fecthLoggerData.slice(0,this.pageSize);
                    }
                })
            },
            changepage(index) {
                this.loggerParams.current=index;
                this.handleListApproveHistory();
            },
            time1(e){
                this.Dates=e;
                this.loggerParams.createTime=this.Dates[0];
                this.loggerParams.endTime=this.Dates[1];
                this.loggerParams.size=10;
                this.loggerParams.current=0;
            },
            search(){
                this.handleListApproveHistory();
            }
         },

    }
</script>
<style scoped>
    .paging{
        float:right;
        margin-top:10px;
    }
    button{
        background: #3497db;
        color:#fff;
    }
</style>