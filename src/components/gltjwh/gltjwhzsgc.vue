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
                    <Button type="primary" @click="addNew" style="margin-left:10px;">添加</Button>
                    <Button type="primary" @click="pldelect" style="margin-left:10px">批量删除</Button>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" border stripe :columns="columns" :data="tableData"  style="margin-top: 20px" ref="table">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{row}" slot="action">
                <Button size="small" style="margin-right: 5px" @click="updD(row)">修改</Button>
                <Button size="small" @click="remove(row)" style="background:#ff6969;color:#fff;">删除</Button>
            </template>
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging" @on-change="changepage" @on-page-size-change='handlePageSize' style="margin-top:20px"></Page>
        <Modal v-model="updModals" :closable='false' @on-ok="roleok" width="80%">
            <Form ref="updformValidate" :model="updformValidate" :rules="updruleValidate">
                <Row>
                    <Col span="2">
                        <span>&emsp;</span>
                    </Col>
                    <Col span="3">
                        <FormItem label="业务编码：" :label-width="80">
                            <span>{{updformValidate.ywbm}}</span>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="业务名称：" prop="ywmcName" :label-width="120">
                            <Input v-model="updformValidate.ywmc" placeholder="请输入业务名称"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="过滤表类型： " prop="tableName"  :label-width="120">
                            <Select  v-model="updformValidate.tableName" style="width:235px" placeholder="请选择过滤表类型" @on-change="getTableName()">
                                <Option value="SCM_SALE_ORDER">订单表 SCM_SALE_ORDER</Option>
                                <Option value="SCM_DELIVERY_DETAIL">发货表 SCM_DELIVERY_DETAIL</Option>
                                <Option value="SCM_STEEL_SETTLE">结算表 SCM_STEEL_SETTLE</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <div style="width: 100%">
                    <ul>
                        <li>
                            <Table :loading="bzdloading" border stripe :columns="bzdcolumn" :data="bzdTableData" height="300"  ref="table">
                                <template slot-scope="{ row }" slot="name">
                                    <strong>{{ row.name }}</strong>
                                </template>
                                <template slot-scope="{row}" slot="action">
                                    <Button size="small" style="margin-right: 5px" @click="bzdupdD(row)">获取过滤字段</Button>
                                </template>
                            </Table>
                        </li>
                        <li>
                            <Table border stripe :columns="glzdcolumn" :data="glzdTableData" height="300"  ref="table">
                                <template slot-scope="{ row }" slot="name">
                                    <strong>{{ row.name }}</strong>
                                </template>
                                <template slot-scope="{row}" slot="action">
                                    <Button size="small" style="margin-right: 5px" @click="glzdupdD(row)">移除</Button>
                                </template>
                            </Table>
                        </li>
                        <li>
                            <Table border :loading="bzzloading" stripe :columns="bzzcolumn" :data="bzzTableData" height="300" ref="szztable"  @on-select="getGlz()"></Table>
                        </li>
                        <li>
                            <Table border stripe :columns="glzcolumn" :data="glzTableData" height="300"  ref="table">
                                <template slot-scope="{ row }" slot="name">
                                    <strong>{{ row.name }}</strong>
                                </template>
                                <template slot-scope="{row}" slot="action">
                                    <Button size="small" style="margin-right: 5px" @click="glzupdD(r)">移除</Button>
                                </template>
                            </Table>
                        </li>
                    </ul>
                </div>
                <div style="width:100%;margin-top: 20px">
                    <Col span="23">
                        <FormItem label="备注：" :label-width="80">
                            <Input style="width: 100%" v-model="updformValidate.bz"></Input>
                        </FormItem>
                    </Col>
                </div>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import gltjwhadd from './gltjwhAdd.vue'
    export default {
        name:'gltjwh',
        data () {
            return {
                bzzloading:false,
                bzdloading:false,
                updModals:false,
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
                                        title: params.row.REMARKS
                                    }
                                }, params.row.REMARKS)
                            ])
                        }
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
                addFormData:{
                    code:'',
                    FName:'',
                    tableName:'',
                    FColumn:'',
                    CValue:'',
                    remark:''
                },
                updformValidate: {
                    ywbm:'',
                    ywmc:'',
                    tableName:'SCM_SALE_ORDER',
                    glzd:'',
                    bz:'',
                    glz:'',
                    id:''
                },
                updruleValidate: {
                    ywmcName: [
                        { required: true, message: '业务名称不为空', trigger: 'blur' }
                    ],
                    tableName:[
                        { required: true, message: '过滤表类型不为空', trigger: 'blur' }
                    ]
                },
                bzdcolumn:[
                    {
                        title: '表字段',
                        align: "center",
                        key: 'COLUMN_NAME'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center',
                    }
                ],
                bzdTableData:[],
                glzdcolumn:[
                    {
                        title: '过滤字段',
                        align: "center",
                        key: 'COLUMN_NAME'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center',
                    }
                ],
                glzdTableData:[],
                bzzcolumn:[
                    {
                        type: 'selection',
                        align: 'center'
                    },
                    {
                        title: '表中值',
                        align: "center",
                        key: 'COLUMNVALUE'
                    }
                ],
                bzzTableData:[],
                glzcolumn:[
                    {
                        title: '过滤值',
                        align: "center",
                        key: 'COLUMNVALUE'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center',
                    }
                ],
                glzTableData:[]
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
            addNew() {
                this.$Modal.confirm({
                    scrollable: true,
                    okText:"确认",
                    width:"80%",
                    render: (h) => {
                        return h(gltjwhadd, {
                            props: {
                                url: this.$store.state.fetchPath
                            },
                            on: {
                                ywbm: (ywbm) => {
                                    this.addFormData.code = ywbm
                                },
                                ywmc: (ywmc) => {
                                    this.addFormData.FName = ywmc
                                },
                                tableName: (tableName) => {
                                    this.addFormData.tableName = tableName
                                },
                                glzd: (glzd) => {
                                    this.addFormData.FColumn  = glzd
                                },
                                glz: (glz) => {
                                    this.addFormData.CValue = glz
                                },
                                bz: (bz) => {
                                    this.addFormData.remark  = bz
                                },
                            }
                        })
                    },
                    onOk: () => {
                        let remark="remark="+this.addFormData.remark
                        let CValue="CValue="+this.addFormData.CValue
                        let FColumn="FColumn="+this.addFormData.FColumn
                        let tableName="tableName="+this.addFormData.tableName
                        let FName="FName="+this.addFormData.FName
                        let code="code="+this.addFormData.code
                        fetch(this.$store.state.fetchPath + "/scm-filter/addFilter", {
                            method: "POST",
                            headers: this.$store.state.fetchHeader,
                            body:remark+'&'+CValue+'&'+FColumn+'&'+tableName+'&'+FName+'&'+code,
                            credentials: 'include'
                        })
                            .then((res) => {
                                if (res.status != 200) {
                                    this.$Message.error('请求失败！');
                                } else {
                                    return res.text();
                                }
                            })
                            .then(() => {
                                this.$Message.success('新建成功！');
                                this.handleListApproveHistory();
                                this.bzdTableData=[]
                                this.glzdTableData=[]
                                this.bzzTableData =[]
                                this.glzTableData=[]
                            })
                    }
                })
            },
            updD(r){
                this.updModals = true
                this.updformValidate.ywbm = r.CODE
                this.updformValidate.ywmc = r.F_NAME
                this.updformValidate.tableName = r.TABLE_NAME
                this.updformValidate.glzd = r.F_COLUMN
                this.updformValidate.glz = r.C_VALUE
                this.updformValidate.bz = r.REMARKS
                this.updformValidate.id = r.ID
                this.getTableName();
                let glzdobj = { }
                glzdobj.COLUMN_NAME = this.updformValidate.glzd
                this.glzdTableData.push(glzdobj)
            },
            getTableName() {
                this.glzdTableData=[]
                this.glzTableData=[]
                this.bzdloading=true
                let tableName='tableName='+this.updformValidate.tableName
                let columnName='columnName='+''
                fetch(this.$store.state.fetchPath+"/scm-filter/getColumnName", {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    body:tableName+'&'+columnName,
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
                    this.bzdTableData = res
                    this.bzdloading=false
                })
            },
            bzdupdD(r){
                this.glzdTableData=[]
                this.glzTableData=[]
                this.bzzTableData=[]
                let glzdDatasss={}
                glzdDatasss.COLUMN_NAME = r.COLUMN_NAME
                this.columnName = r.COLUMN_NAME
                this.updformValidate.glzd = this.columnName
                this.glzdTableData.push(glzdDatasss)
                this.bzzloading=true
                let tableName='tableName='+this.updformValidate.tableName
                let columnName='columnName='+this.updformValidate.glzd
                let columnValue='columnValue='+''
                this.bzzTableData=[]
                fetch(this.$store.state.fetchPath+"/scm-filter/getColumnValue", {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    body:tableName+'&'+columnName+"&"+columnValue,
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
                    this.bzzTableData = res
                    this.bzzloading=false
                })
            },
            glzdupdD(){
                this.glzdTableData=[]
                this.bzzTableData =[]
                this.glzTableData=[]
            },
            getGlz(){
                this.glzTableData=this.$refs.szztable.getSelection();
                let bzzarr=[]
                for(var i=0;i<this.glzTableData.length;i++){
                    bzzarr.push(this.glzTableData[i].COLUMNVALUE)
                }
                this.updformValidate.glz= bzzarr.toString()
            },
            glzupdD(r){
                window.console.log(r)
            },
            roleok(){

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
    ul{
        list-style: none;
        width: 100%;
        height: 300px;
    }
    ul li{
        width: 24%;
        float: left;
    }
</style>
