<template>
    <div>
        <Form :label-width="100">
            <Row>
                <Col span="4">
                    <FormItem label="钢厂：" style="width:150px">
                        <Select style="width:120px"  v-model="cxhtjdcx.gc" placeholder="请选择销售主体">
                            <Option value="">全部</Option>
                            <Option value="9580">唐钢</Option>
                            <Option value="9727">邯钢</Option>
                            <Option value="9193">宣钢</Option>
                            <Option value="9196">承钢</Option>
                            <Option value="1932">舞钢</Option>
                            <Option value="8110">石钢</Option>
                            <Option value="8493">衡板</Option>
                            <Option value="7778">邯宝</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="品种：" style="width:120px">
                        <Select v-model="cxhtjdcx.pz" style="width:120px" placeholder="请选择品种" @on-change="getCx">
                            <Option v-for="item in pzData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="产线：" style="width:120px">
                        <Select style="width:120px"  v-model="cxhtjdcx.cx" placeholder="请选择产线">
                            <Option v-for="item in cxData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem style="width:150px" label="计划月份：">
                        <Select style="width:120px"  v-model="cxhtjdcx.yf" placeholder="请选择月份">
                            <Option value="1">1月</Option>
                            <Option value="2">2月</Option>
                            <Option value="3">3月</Option>
                            <Option value="4">4月</Option>
                            <Option value="5">5月</Option>
                            <Option value="6">6月</Option>
                            <Option value="7">7月</Option>
                            <Option value="8">8月</Option>
                            <Option value="9">9月</Option>
                            <Option value="10">10月</Option>
                            <Option value="11">11月</Option>
                            <Option value="12">12月</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4"><Button @click="getList()" icon="ios-search">查询</Button></Col>
            </Row>

        </Form>
        <Table :columns="columns" :data="data" border height="500"></Table>
    </div>
</template>

<script>
    export default {
        name: "cxhtjdcx",
        data() {
            return {
                cxhtjdcx:{
                    pz:'',
                    cx:'',
                    yf:'1',
                    gc:''
                },
                pzData:[],
                cxData:[],
                cxCx:{
                    pz:''
                },
                columns: [
                    {
                        title: '日期',
                        align: "center",
                        key: 'RQ'
                    },
                    {
                        title: '品种',
                        align: "center",
                        key: 'PZ'
                    },
                    {
                        title: '产线',
                        align: "center",
                        key: 'CX'
                    },
                    {
                        title: '销售主体',
                        align: "center",
                        key: 'FL_NAME'
                    },
                    {
                        title: '计划量',
                        align: "center",
                        key: 'JHL'
                    }
                ],
                data: []
            }
        },
        mounted() {
            this.getList();
            fetch(this.$store.state.fetchPath + "/scm-steel-settle/getzyjhcxtjpz", {
                method: "POST",
                headers: this.$store.state.fetchHeader,
                body: '',
                credentials: 'include'
            }).then((res) => {
                if(res.status!=200){
                    this.$Message.error('请求失败！');
                }else{
                    return res.text();
                }
            }).then((res) => {
                res = res && res.length > 0 ? JSON.parse(res) : [];
                this.pzData = this.utils.getPz(res)
            });
            this.getCxData();
        },
        methods: {
            getList() {
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getzyjh", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.zyjhcx),
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    this.data =  res;
                });
            },
            getCxData(){
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getzyjhcxtjcx", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.cxCx),
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    this.cxData = this.utils.getCx(res)
                });
            },
            getCx(){
                this.cxCx.pz = this.zyjhcx.pz
                this.getCxData()
            }
        }
    }
</script>

<style scoped>
    button{
        background: #3497db;
        color:#fff;
    }
</style>