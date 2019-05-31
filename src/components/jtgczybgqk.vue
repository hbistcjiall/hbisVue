<template>
    <div>
        <Form :label-width="100">
            <Row>
                <Col span="5" style="margin-left: -100px">
                    <FormItem  style="">
                        <label>子公司名称：</label>
                        <Select style="width:100px;" v-model="name" placeholder="请选择">
                            <Option value="全部">全部</Option>
                            <Option value="9580">唐钢</Option>
                            <Option value="9727">邯钢</Option>
                            <Option value="9193">宣钢</Option>
                            <Option value="9196">承钢</Option>
                            <Option value="7778">邯宝</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="品种：" style="">
                        <Select style="" v-model="pz" placeholder="请选择" filterable>
                            <Option value="全部">全部</Option>
                            <Option value="热板">热板</Option>
                            <Option value="冷板">冷板</Option>
                            <Option value="宽厚板">宽厚板</Option>
                            <Option value="型带">型带</Option>
                            <Option value="棒线">棒线</Option>
<!--                            <Option v-for="item in pzData" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="合同单位：" style="">
                        <Input v-model="htdw" placeholder="请输入合作单位"/>
                    </FormItem>
                </Col>
                <Col span="7" >
                    <FormItem label="发货日期：">
                        <DatePicker type="date" placeholder="记录时间" :editable="false" :clearable="false"
                                    v-model="startTime"
                                    style="width:110px;margin-left: -80px"></DatePicker>
                        <DatePicker type="date" placeholder="记录时间" :editable="false" :clearable="false"
                                    v-model="endTime"
                                    style="width:110px;margin-left:20px"></DatePicker>
                    </FormItem>
                </Col>

            </Row>
            <Row>
                <Col span="6" style="margin-left: -50px;float: right;margin-bottom: 20px">
                    <Button @click="getList()" icon="ios-search" style="margin-right:10px;">查询</Button>
                    <Button @click="downLoad()" icon="ios-cloud-download-outline">导出</Button>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="700" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "jtgczybgqk",
        data(){
            return{
                loading:false,
                name:'全部',
                pz:'全部',
                // pzData:[],
                htdw:'',
                startTime:new Date(),
                endTime:new Date(),
                pzPz:{
                    name:'全部'
                },
                data: [],
                columns:[
                    {
                        title: '子公司名称',
                        align: "center",
                        key: 'COMPANYNAME'
                    },
                    {
                        title: '品种',
                        align: "center",
                        key: 'VARIETY'
                    },
                    {
                        title: '合作单位',
                        align: "center",
                        key: 'SALER_NAME'
                    },
                    {
                        title: '运输方式',
                        align: "center",
                        key: 'TRANSPORT_NAME'
                    },
                    {
                        title: '到站',
                        align: "center",
                        key: 'DZ_NAME'
                    },
                    {
                        title: '订单量（吨）',
                        align: "center",
                        key: 'DDL',
                        render: (h, params) => {
                            params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                            return h('span',
                                params.row[params.column.key].toFixed(2)
                            )
                        }
                    },
                    {
                        title: '发货量（吨）',
                        align: "center",
                        key: 'FHL',
                        render: (h, params) => {
                            params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                            return h('span',
                                params.row[params.column.key].toFixed(2)
                            )
                        }
                    },
                    {
                        title: '欠发量（吨）',
                        align: "center",
                        key: 'QFL',
                        render: (h, params) => {
                            params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                            return h('span',
                                params.row[params.column.key].toFixed(2)
                            )
                        }
                    },
                ],
                cxData:[],
            }
        },
        mounted(){
            // this.getPzData();
        },
        methods:{
            getList(){
                this.loading = true;
                let name ='name='+this.name;
                let startTime='startTime='+this.utils.formatdate(this.startTime).substring(0, 10);
                let endTime='endTime='+this.utils.formatdate(this.endTime).substring(0, 10);
                let pz='pz='+this.pz;
                let htdw='htdw='+this.htdw;
                fetch(this.$store.state.fetchPath + "/report-product-class-level/jtgczybgqk", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: name+'&'+pz+'&'+startTime+'&'+endTime+'&'+htdw,
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    this.data=res;
                    this.loading = false;
                });
            },
            // getPzData(){
            //     fetch(this.$store.state.fetchPath + "/report-product-class-level/jtgczybgqkpz", {
            //         method: "POST",
            //         headers: this.$store.state.fetchHeader,
            //         body: this.utils.formatParams(this.pzPz),
            //         credentials: 'include'
            //     }).then((res) => {
            //         if(res.status!=200){
            //             this.$Message.error('请求失败！');
            //         }else{
            //             return res.text();
            //         }
            //     }).then((res) => {
            //         res = res && res.length > 0 ? JSON.parse(res) : [];
            //         this.pzData = this.utils.getCx(res);
            //         // let getall = {label:'全部',value:''};
            //         // this.pzData.unshift(getall)
            //     });
            // },
            // getPz(){
            //     this.pzData = [];
            //     this.pzPz.name = this.name
            //     this.getPzData()
            // },
            downLoad(){
                this.$refs.table.exportCsv({
                    filename: '集团钢材布港情况'
                });
            }

        },

    }
</script>

<style scoped>
    button {
        background: #3497db;
        color: #fff;
    }
    .paging{
        float:right;
        margin-top:10px;
    }
</style>