<template>
    <div>
        <Input placeholder="日志名称" style="width: 300px" v-model="MsgData.logName"/>
        <DatePicker type="datetimerange" @on-change="serTime" format="yyyy-MM-dd" placeholder="请选择查询时间" style="width: 300px;margin-right:20px"></DatePicker>
        <Button type="primary" @click="search" style="magin-left:20px" icon="ios-search">搜索</Button>
        <Button type="primary" @click="clearAll" style="magin-left:20px">清空日志</Button>
        <Table border stripe :columns="columns12" :data="fecthdata6" style="margin-top: 20px"></Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging" @on-change="changepage" style="margin-top:20px;"></Page>
    </div>

</template>
<script>
    export default {
        name:'loginLog',
        data () {
            return {
                MsgData : {
                    beginTime:'',
                    page:'0',
                    limit:'10',
                    logName:'',
                    endTime:''
                },
                timePick:'',
                // 初始化信息总条数
                dataCount:0,
                // 每页显示多少条
                pageSize: 10,
                xia: 0, //下一页或者上一页的第一项索引值
                columns12: [
                    {
                        title: '日志名称',
                        align: "center",
                        key: 'LOGNAME'
                    },
                    {
                        title: '用户名称',
                        align: "center",
                        key: 'userName'
                    },
                    {
                        title: '时间',
                        align: "center",
                        key: 'CREATETIME'
                    },
                    {
                        title: '具体消息',
                        align: "center",
                        key: 'MESSAGE'
                    },
                    {
                        title: 'ip',
                        align: 'center',
                        key: 'IPADDRESS'
                    }
                ],
                fecthdata6: [],
                resDatas:[]
            }
        },
        created() {
            this.handleListApproveHistory();
        },
        methods: {
            // 获取日志记录信息
            handleListApproveHistory() {
                fetch(this.$store.state.fetchPath + "/loginLog/list", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.MsgData),
                    credentials:'include'
                })
                    .then((res) => {
                        return res.text();
                    }).then((res) => {
                    res = res.length>0?JSON.parse(res):[]
                    // 保存取到的所有数据
                    this.resDatas =  res.data;
                    this.dataCount =  parseInt(res.count);
                    this.pageSize = parseInt(res.pageSize);
                    // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                    if(this.dataCount < this.pageSize){
                        this.fecthdata6 = this.resDatas;
                    }else{
                        this.fecthdata6 = this.resDatas.slice(0,this.pageSize);
                    }
                })
            },
            changepage(index) {
                this.MsgData.page=index;
                this.handleListApproveHistory();
            },
            serTime(e){
                this.Dates=e;
                if(this.Dates[0]==''){
                    this.MsgData.endTime='';
                    this.MsgData.beginTime = '';
                }else{
                    this.MsgData.endTime = this.Dates[1];
                    this.MsgData.beginTime = this.Dates[0]
                }
            },
            search(){
                this.handleListApproveHistory();
            },
            clearAll () {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确认删除吗？',
                    onOk: () => {
                        fetch(this.$store.state.fetchPath + "/loginLog/delLoginLog", {
                            method: "POST",
                            headers: this.$store.state.fetchHeader,
                            body: '',
                            credentials:'include'
                        })
                            .then((res) => {
                                return res.text();
                            })
                            .then(() => {
                                // res = res.length>0?JSON.parse(res):[];
                                // this.$Message.error(res.msg);
                                this.handleListApproveHistory();
                            })
                    }
                });

            }
        },
    }
</script>
<style scoped>
    .paging{
        float:right;
        margin-top:10px;
    }
    .userbtn{
        margin-right:10px;
    }
</style>
