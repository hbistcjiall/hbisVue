<template>
    <div>
        <Form :label-width="80">
            <Row>
                <Col span="4">
                    <FormItem label="钢厂:">
                        <Select v-model="xsztylhztdyData.companyId">
                            <Option value="">全部</Option>
                            <Option value="9580">唐钢</Option>
                            <Option value="9727">邯钢</Option>
                            <Option value="9193">宣钢</Option>
                            <Option value="9196">承钢</Option>
                            <Option value="1932">舞钢</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8" style="float: left ">
                    <Button @click="search" style="margin-left:20px" icon="ios-search">查询</Button>
                    <Button @click="updModal=true" style="margin-left: 20px" icon="ios-add">新增</Button>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" border stripe :columns="columns12" :data="fecthdata6" style="margin-top: 20px"
               ref="table">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{row}" slot="action">
                <Button size="small" style="margin-right: 5px" @click="updD(row)">修改</Button>
                <Button size="small" @click="remove(row)" style="background:#ff6969;color:#fff;">删除</Button>
            </template>
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging"  @on-change="changepage1" style="margin-top:20px;"></Page>
        <Modal v-model="updModal" title="新增销售主体与例会主体" :closable='false' @on-ok="addok">
            <Form :model="addformValidate" :rules="updruleValidate" :label-width="90">
                <FormItem label="钢厂" prop="gangchang">
                    <Select v-model="addformValidate.companyId" >
                        <Option value="9580">唐钢</Option>
                        <Option value="9727">邯钢</Option>
                        <Option value="9193">宣钢</Option>
                        <Option value="9196">承钢</Option>
                        <Option value="1932">舞钢</Option>
                    </Select>
                </FormItem>
                <FormItem label="销售主体" prop="xiaoshouzhuti">
                    <Input v-model="addformValidate.saleBodyDes" placeholder="请输入销售主体"></Input>
                </FormItem>
                <FormItem label="例会主体" prop="lihuizhuti">
                    <Input v-model="addformValidate.saleBody" placeholder="请输入例会主体"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="updModa2" title="修改销售主体与例会主体" :closable='false' @on-ok="updok">
            <Form :model="updformValidate" :rules="updruleValidate" :label-width="90">
                <FormItem label="钢厂" prop="gangchang">
                    <Select v-model="updformValidate.companyID" >
                        <Option value="唐钢">唐钢</Option>
                        <Option value="邯钢">邯钢</Option>
                        <Option value="宣钢">宣钢</Option>
                        <Option value="承钢">承钢</Option>
                        <Option value="舞钢">舞钢</Option>
                    </Select>
                </FormItem>
                <FormItem label="销售主体" prop="xiaoshouzhuti">
                    <Input v-model="updformValidate.saleBodyDes" placeholder="请输入销售主体"></Input>
                </FormItem>
                <FormItem label="例会主体" prop="lihuizhuti">
                    <Input v-model="updformValidate.saleBody" placeholder="请输入例会主体"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "xsztylhztdy",
        data() {
            return {
                updModa2:false,
                resDatas:[],
                xsztylhztdyData: {
                    companyId: '',
                    page: '0',
                    limit: '10',
                },
                id:'',
                loading:true,
                updModal: false,
                dataCount: 0,
                pageSize: 10,
                fecthdata6: [],
                addformValidate: {
                    companyId: '',
                    saleBody: '',
                    saleBodyDes: '',
                },
                updformValidate: {
                    Id:'',
                    companyID: '',
                    saleBodyDes: '',
                    saleBody: ''
                },
                updruleValidate: {
                    gangchang: [
                        {required: true, message: '钢厂', trigger: 'blur'}
                    ],
                    xiaoshouzhuti: [
                        {required: true, message: '销售主体', trigger: 'blur'}
                    ],
                    lihuizhuti: [
                        {required: true, message: '例会主体', trigger: 'blur'}
                    ],
                },
                columns12: [
                    {
                        title: '序号',
                        align: "center",
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '钢厂',
                        align: "center",
                        key: 'COMPANYNAME'
                    },
                    {
                        title: '销售主体',
                        align: "center",
                        key: 'SALEBODYDES'
                    },
                    {
                        title: '例会主体',
                        align: "center",
                        key: 'SALEBODY'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center',
                    },
                ],
            }
        },
        created() {
            this.search();
        },
        methods: {
            remove(r){
                this.$Modal.confirm({
                    title: '提示',
                    content: '确认删除吗？',
                    onOk: () => {
                        this.id=r.ID;
                        fetch(this.$store.state.fetchPath + "/SalesSubjectMeetingSubject/delete", {
                            method: "POST",
                            headers: this.$store.state.fetchHeader,
                            body: "Id="+this.id,
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
                                 this.search();
                            })
                    }
                });
            },
            updD(r){
                this.updModa2 = true;
                this.updformValidate.companyID=r.COMPANYNAME;
                this.updformValidate.saleBodyDes=r.SALEBODYDES;
                this.updformValidate.saleBody=r.SALEBODY;
                this.updformValidate.Id=r.ID;
            },
            updok(){
                fetch(this.$store.state.fetchPath + "/SalesSubjectMeetingSubject/update", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.updformValidate),
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
                        this.search();
                    })
            },
            addok() {
                fetch(this.$store.state.fetchPath + "/SalesSubjectMeetingSubject/insert", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.addformValidate),
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
                        this.search();
                    })

            },
            changepage1(index) {
                this.xsztylhztdyData.page = index;
                this.search();
            },
            search() {
                this.loading = true;
                fetch(this.$store.state.fetchPath + "/SalesSubjectMeetingSubject/list", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.xsztylhztdyData),
                    credentials: 'include'
                })
                    .then((res) => {
                        if (res.status != 200) {
                            this.$Message.error('请求失败！');
                        } else {
                            return res.text();
                        }
                    }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : []
                    this.resDatas = res.data;
                    this.dataCount = parseInt(res.count);
                    this.pageSize = parseInt(res.pageSize);
                    if (this.dataCount < this.pageSize) {
                        this.fecthdata6 = this.resDatas;
                    } else {
                        this.fecthdata6 = this.resDatas.slice(0, this.pageSize);
                    }
                    this.loading = false;
                })
            },
        },

    }
</script>

<style scoped>
    .paging {
        float: right;
        margin-top: 10px;
    }
    button {
        background: #3497db;
        color: #fff;
    }
    table button {
        background: #f2f4f7;
        color: #546c8c;
    }
</style>