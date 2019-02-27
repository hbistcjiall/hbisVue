<template>
    <div>
    <Input placeholder="用户名" style="width: 300px" v-model="userNames"/>
    <Button type="primary" @click="search()" style="magin-left:'20px'">查询日志</Button>

    <Table border stripe :columns="columns12" :data="fecthdata6" style="margin-top: 20px">
        <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
    </Table>

        <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" style="margin-top:20px;"></Page>
    </div>
</template>
<script>
    export default {
        name:'userMsg',
        data () {
            return {
                MsgData : {
                    userName:'',
                    current:0,
                    size:10
                },
                userNames:'',
                // 初始化信息总条数
                dataCount: 0,
                // 每页显示多少条
                pageSize: 10,
                xia: 0, //下一页或者上一页的第一项索引值
                columns12: [
                    {
                        title: '用户名',
                        align: "center",
                        key: 'userName'
                    },
                    {
                        title: '登录名',
                        align: "center",
                        key: 'loginName'
                    },
                    {
                        title: '所在组',
                        align: "center",
                        key: 'groupName'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center'
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
                fetch(this.$store.state.fetchPath + "/selectuser", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.MsgData),
                    credentials:'include'
                })
                .then((res) => {
                    return res.text();
                }).then((res) => {
                    res = res.length>0?JSON.parse(res):[]
                    // window.console.log(res.records)
                    // 保存取到的所有数据
                    this.resDatas =  res.records;
                    this.dataCount =  res.total;
                    this.pageSize = res.size;
                    // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                    if(this.dataCount < this.pageSize){
                        this.fecthdata6 = this.resDatas;
                    }else{
                        this.fecthdata6 = this.resDatas.slice(0,this.pageSize);
                    }
                })
            },
            changepage(index) {
                //index当前页码
                this.MsgData.current=index;
                this.handleListApproveHistory();
                // var _start = ( index - 1 ) * this.pageSize;
                // var _end = index * this.pageSize;
                // this.loggerData = this.fecthLoggerData.slice(_start,_end);
            },
            search(){
                this.MsgData.userName=this.userNames;
                this.handleListApproveHistory();
                // window.console.log(this.userNames);
            },

            show (index) {
                this.$Modal.info({
                    title: '详细信息',
                    content: `姓名：${this.fecthdata6[index].userName}<br>登录名：${this.fecthdata6[index].loginName}<br>所在组：${this.fecthdata6[index].groupName}`
                })
            },
            remove (index) {
                this.fecthdata6.splice(index, 1);
            }
        }
    }
</script>
