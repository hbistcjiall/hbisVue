<template>
    <div>
        <Form :label-width="80">
            <Row>
                <Col span="6">
                    <FormItem label="业务类型:">
                        <Select  v-model="name" style="width:235px" placeholder="请选择产线" filterable>
                            <Option v-for="item in nameData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6" style="margin-left: 20px">
                    <FormItem label="过滤表:">
                        <Select  v-model="tableName" style="width:235px" placeholder="请选择产线" filterable @on-change="getCCCC()">
                            <Option v-for="item in tableNameData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4" style="margin-left: 20px">
                    <FormItem label="过滤字段:">
                        <Select  v-model="column" style="width:235px" placeholder="请选择产线" filterable>
                            <Option v-for="item in columnData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8" style="float: right">
                    <Button type="primary" @click="search" style="margin-left:20px" icon="ios-search">查询</Button>
                    <Button type="primary" @click="clearall" style="margin-left:10px">清空</Button>
                    <!--<Button type="primary" @click="addNew" style="margin-left:10px;">添加</Button>-->
                    <Button type="primary" @click="pldelect" style="margin-left:10px">批量删除</Button>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" border stripe :columns="columns" :data="tableData"  style="margin-top: 20px" ref="table">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{row}" slot="action">
                <!--<Button size="small" style="margin-right: 5px" @click="updD(row)">修改</Button>-->
                <Button size="small" @click="remove(row)" style="background:#ff6969;color:#fff;">删除</Button>
            </template>
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging" @on-change="changepage" @on-page-size-change='handlePageSize' style="margin-top:20px"></Page>
    </div>
</template>
<script>
    // import gltjwhadd from './gltjwhAdd.vue'
    export default {
        name:'gltjwh',
        data () {
            return {
                loading:true,
                updModal:false,
                name:'',
                tableName:'',
                column:'',
                nameData:[],
                tableNameData:[],
                columnData:[],
                dataCount: 0,
                pageSize: 10,
                page:1,
                columns: [
                    {
                        type: 'selection',
                        align:"center"
                    },
                    {
                        title: '业务编码',
                        align: "center",
                        key: 'CODE'
                    },
                    {
                        title: '业务名称',
                        align: "center",
                        key: 'F_NAME'
                    },
                    {
                        title: '过滤表',
                        align: "center",
                        key: 'TABLE_NAME'
                    },
                    {
                        title: '过滤字段',
                        align: "center",
                        key: 'F_COLUMN'
                    },
                    {
                        title: '过滤值',
                        align: "center",
                        width:'150',
                        key: 'C_VALUE',
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        width: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    },
                                    domProps: {
                                        title: params.row.C_VALUE
                                    }
                                }, params.row.C_VALUE)
                            ])
                        }
                    },
                    {
                        title: '备注',
                        align: "center",
                        key: 'REMARKS',
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center',
                        width: '150px'
                    },
                ],
                tableData: [],
                resDatas:[],
                plDelectData:[],
            }
        },
        created() {
            this.handleListApproveHistory();
            this.getNameSelect()
            this.getTableNameSelect()
            this.getNameSelect()
            this.getColumnData()
        },
        methods: {
            getNameSelect(){
                fetch(this.$store.state.fetchPath + "/scm-filter/selCondition", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body:"col=F_NAME",
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
                    this.nameData = this.utils.getName(res)
                })
            },
            getTableNameSelect(){
                fetch(this.$store.state.fetchPath + "/scm-filter/selCondition", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body:"col=TABLE_NAME",
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
                    this.tableNameData=this.utils.getTABLEName(res)
                })
            },
            getColumnData(){
                fetch(this.$store.state.fetchPath + "/scm-filter/selCondition", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body:"col=F_COLUMN",
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
                    this.columnData=this.utils.getColumnss(res)
                })
            },
            getCCCC(){
                let tablename="tableName="+this.tableName
                fetch(this.$store.state.fetchPath + "/scm-filter/selCondition", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body:"col=F_COLUMN"+"&"+tablename,
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
                    this.columnData=this.utils.getColumnss(res)
                })
            },
            handleListApproveHistory() {
                this.loading = true;
                let name="name="+this.name
                let tableName= 'tableName='+this.tableName
                let column = 'column='+this.column.toString()
                let limit = 'limit='+this.pageSize.toString()
                let page="page="+this.page.toString()
                fetch(this.$store.state.fetchPath + "/scm-filter/getFilterList", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: name+"&"+tableName+"&"+column+"&"+limit+"&"+page,
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
                        this.tableData = this.resDatas;
                    }else{
                        this.tableData = this.resDatas.slice(0,this.pageSize);
                    }
                    this.loading = false;
                })
            },
            changepage(index) {
                this.page=index;
                this.handleListApproveHistory();
            },
            handlePageSize(index){
                this.pageSize = index;
                this.handleListApproveHistory();
            },
            search(){
                this.loading = true;
                this.handleListApproveHistory();
            },
            clearall(){
                this.name='全部'
                this.tableName='全部'
                this.column='全部'
                // this.handleListApproveHistory();
            },
            pldelect(){
                this.$Modal.confirm({
                    title: '提示',
                    content: '确认批量删除吗？',
                    onOk: () => {
                        let a=this.$refs.table.getSelection();
                        for(let i=0;i<a.length;i++){
                            this.plDelectData.push(a[i].ID);
                        }
                        fetch(this.$store.state.fetchPath + "/scm-filter/deleteFilter", {
                            method: "POST",
                            headers: this.$store.state.fetchHeader,
                            body: "ids="+this.plDelectData,
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
                                this.$Message.success('已删除');
                                this.handleListApproveHistory();
                            })
                    }
                });
            },
            remove (r) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确认删除吗？',
                    onOk: () => {
                        let ids=r.ID;
                        this.plDelectData.push(ids)
                        fetch(this.$store.state.fetchPath + "/scm-filter/deleteFilter", {
                            method: "POST",
                            headers: this.$store.state.fetchHeader,
                            body: "ids="+this.plDelectData,
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
                                this.plDelectData=[]
                            })
                    }
                });

            },
            // addNew() {
            //     this.$Modal.confirm({
            //         scrollable: true,
            //         okText:"确认",
            //         width:"80%",
            //         render: (h) => {
            //             return h(gltjwhadd, {
            //                 props: {
            //                     url: this.$store.state.fetchPath
            //                 },
            //                 on: {
            //                     year: (year) => {
            //                         this.formValidate.year = year
            //                     },
            //                     code: (code) => {
            //                         this.formValidate.targetname = code
            //                     },
            //                     jan: (jan) => {
            //                         this.formValidate.jan = jan
            //                     },
            //                     feb: (feb) => {
            //                         this.formValidate.feb = feb
            //                     },
            //                     mar: (mar) => {
            //                         this.formValidate.mar = mar
            //                     },
            //                     apr: (apr) => {
            //                         this.formValidate.apr = apr
            //                     },
            //                     may: (may) => {
            //                         this.formValidate.may = may
            //                     },
            //                     jun: (jun) => {
            //                         this.formValidate.jun = jun
            //                     },
            //                     jul: (jul) => {
            //                         this.formValidate.jul = jul
            //                     },
            //                     aug: (aug) => {
            //                         this.formValidate.aug = aug
            //                     },
            //                     sep: (sep) => {
            //                         this.formValidate.sep = sep
            //                     },
            //                     oct: (oct) => {
            //                         this.formValidate.oct = oct
            //                     },
            //                     nov: (nov) => {
            //                         this.formValidate.nov = nov
            //                     },
            //                     dec: (dec) => {
            //                         this.formValidate.dec = dec
            //                     },
            //                 }
            //             })
            //         },
            //         onOk: () => {
            //             fetch(this.$store.state.fetchPath + "/TargetManage/addorupTargetManage", {
            //                 method: "POST",
            //                 headers: this.$store.state.fetchHeader,
            //                 body: this.utils.formatParams(this.formValidate),
            //                 credentials: 'include'
            //             })
            //                 .then((res) => {
            //                     if (res.status != 200) {
            //                         this.$Message.error('请求失败！');
            //                     } else {
            //                         return res.text();
            //                     }
            //                 })
            //                 .then(() => {
            //                     this.handleListApproveHistory();
            //                 })
            //         }
            //     })
            // },
            updD(r){
                window.console.log(r)
            },

        }
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
    FormItem {
        float: left;
    }
</style>
