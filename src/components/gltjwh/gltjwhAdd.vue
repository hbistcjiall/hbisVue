<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <Row>
            <Col span="2">
                <span>&emsp;</span>
            </Col>
            <Col span="3">
                <FormItem label="业务编码：" :label-width="80">
                    <span>{{formValidate.ywbm}}</span>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="业务名称：" prop="ywmcName" :label-width="120">
                    <Input v-model="formValidate.ywmc" placeholder="请输入业务名称" @on-change="getYwmc"></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="过滤表类型： " prop="tableName"  :label-width="120">
                    <Select  v-model="formValidate.tableName" style="width:235px" placeholder="请选择过滤表类型" @on-change="getTableName()">
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
                    <Table :loading="bzzloading" border stripe :columns="bzzcolumn" :data="bzzTableData" height="300" ref="szztable"  @on-select="getGlz()"></Table>
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
                    <Input style="width: 100%" @on-change="getBz" v-model="formValidate.bz"></Input>
                </FormItem>
            </Col>
        </div>
    </Form>
</template>
<script>
    export default {
        name:'gltjwhAdd',
        props:{
            url:String
        },
        data () {
            return {
                columnName:'',
                columnValue:'',
                bzdloading:false,
                bzzloading:false,
                formValidate: {
                    ywbm:'',
                    ywmc:'',
                    tableName:'SCM_SALE_ORDER',
                    glzd:'',
                    bz:'',
                    glz:''
                },
                ruleValidate: {
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
        mounted(){
            this.getYwbms()
            this.getBzdList()
            this.setTableName()
        },
        watch: {
            url: function(newVal){
                this.url=newVal;
            },
        },
        methods: {
            getYwbms(){
                fetch(this.url+"/scm-filter/getMaxCode", {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
                    },
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
                    this.formValidate.ywbm = res
                    this.$emit('ywbm', this.formValidate.ywbm);
                })
            },
            getBzdList(){
                this.glzdTableData=[]
                this.glzTableData=[]
                this.bzdloading=true
                let tableName='tableName='+this.formValidate.tableName
                let columnName='columnName='+this.columnName
                fetch(this.url+"/scm-filter/getColumnName", {
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
                this.formValidate.glzd = this.columnName
                this.glzdTableData.push(glzdDatasss)
                this.bzzloading=true
                let tableName='tableName='+this.formValidate.tableName
                let columnName='columnName='+this.columnName
                let columnValue='columnValue='+this.columnValue
                this.bzzTableData=[]
                fetch(this.url+"/scm-filter/getColumnValue", {
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
                    this.$emit('glzd', this.formValidate.glzd)
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
                this.formValidate.glz= bzzarr.toString()
                this.$emit('glz', this.formValidate.glz)
            },
            glzupdD(){
                // this.glzTableData=[]
            },
            getYwmc:function() {
                this.$emit('ywmc', this.formValidate.ywmc)
            },
            setTableName(){
                this.$emit('tableName', this.formValidate.tableName)
            },
            getTableName() {
                this.getBzdList()
            },
            getBz:function(){
                this.$emit('bz', this.formValidate.bz)
            }
        }
    }
</script>
<style scoped>
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
