<template>
    <div>
        <Input placeholder="日志名称" style="width: 300px" v-model="MsgData.logName"/>
        <DatePicker type="datetimerange" @on-change="serTime" format="yyyy-MM-dd" placeholder="请选择查询时间" style="width: 300px;margin-right:20px"></DatePicker>
        <Button @click="search" style="margin-left:20px;background: #3497db;color:#fff;" icon="ios-search">搜索</Button>
        <Button type="warning" @click="clearAll" style="margin-left:10px">清空日志</Button>
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
                dataCount:0,
                pageSize: 10,
                xia: 0,
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
            handleListApproveHistory() {
                fetch(this.$store.state.fetchPath + "/loginLog/list", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.MsgData),
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
                    this.resDatas =  res.data;
                    this.dataCount =  parseInt(res.count);
                    this.pageSize = parseInt(res.pageSize);
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
                                if(res.status!=200){
                                    this.$Message.error('请求失败！');
                                }else{
                                    return res.text();
                                }
                            })
                            .then(() => {
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
