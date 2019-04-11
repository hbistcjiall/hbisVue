<template>
    <div>
        <div class="divStyle">
            <Form :label-width="80">

                        <FormItem label="钢厂:" style="float: left">
                            <Select style="width: 100px" v-model="ddlxyjglxdyData.companyId">
                                <Option value="">全部</Option>
                                <Option value="9580">唐钢</Option>
                                <Option value="9727">邯钢</Option>
                                <Option value="9193">宣钢</Option>
                                <Option value="9196">承钢</Option>
                                <Option value="1932">舞钢</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="品种钢:" style="float: left">
                            <Select style="width: 100px" v-model="ddlxyjglxdyData.varieties">
                                <Option value="">全部</Option>
                                <Option value="热板">热板</Option>
                                <Option value="冷板">冷板</Option>
                                <Option value="中厚板">中厚板</Option>
                                <Option value="棒线">棒线</Option>
                                <Option value="型带">型带</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="订单类型:" style="float: left">
                            <Input style="width: 100px" v-model="ddlxyjglxdyData.orderType" placeholder="请输入订单类型"></Input>
                        </FormItem>
                        <FormItem label="价格类型:" style="float: left">
                            <Input style="width: 100px" v-model="ddlxyjglxdyData.priceType" placeholder="请输入价格类型"></Input>
                        </FormItem>
                        <Button @click="search" style="margin-left:20px" icon="ios-search">查询</Button>
                        <Button @click="updModal=true" style="margin-left: 20px" icon="ios-add">新增</Button>
            </Form>
        </div>
        <Table :loading="loading" border stripe :columns="columns12" :data="fecthdata6" style="margin-top: 20px;float: left;width: 100%;"
               ref="table">
            <template slot-scope="{row}" slot="action">
                <Button size="small" style="margin-right: 5px" @click="updD(row)">修改</Button>
                <Button size="small" @click="remove(row)" style="background:#ff6969;color:#fff;">删除</Button>
            </template>
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging"
              @on-change="changepage" @on-page-size-change='handlePageSize' style="margin-top:20px;">
        </Page>
        <Modal v-model="updModal" title="新增订单类型与价格类型对应" :closable='false' @on-ok="addok">
            <Form :model="addddlxyjglxdyData" :rules="updrule" :label-width="90">
                <FormItem label="品种钢:">
                    <Select v-model="addddlxyjglxdyData.varieties">
                        <Option value="">全部</Option>
                        <Option value="热板">热板</Option>
                        <Option value="冷板">冷板</Option>
                        <Option value="中厚板">中厚板</Option>
                        <Option value="棒线">棒线</Option>
                        <Option value="型带">型带</Option>
                    </Select>
                </FormItem>
                <FormItem label="钢厂:">
                    <Select v-model="addddlxyjglxdyData.companyId">
                        <Option value="">全部</Option>
                        <Option value="9580">唐钢</Option>
                        <Option value="9727">邯钢</Option>
                        <Option value="9193">宣钢</Option>
                        <Option value="9196">承钢</Option>
                        <Option value="1932">舞钢</Option>
                    </Select>
                </FormItem>
                <FormItem label="订单类型" prop="dingdanleixing">
                    <Input v-model="addddlxyjglxdyData.orderType"></Input>
                </FormItem>
                <FormItem label="价格类型" prop="jiageleixing">
                    <Input v-model="addddlxyjglxdyData.priceType"></Input>
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="addddlxyjglxdyData.note"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="updModa2" title="修改订单类型与价格类型对应" :closable='false' @on-ok="updok">
            <Form :model="updddlxyjglxdyData" :rules="updrule" :label-width="90">
                <FormItem label="品种钢:">
                    <Select v-model="updddlxyjglxdyData.varieties">
                        <Option value="">全部</Option>
                        <Option value="热板">热板</Option>
                        <Option value="冷板">冷板</Option>
                        <Option value="中厚板">中厚板</Option>
                        <Option value="棒线">棒线</Option>
                        <Option value="型带">型带</Option>
                    </Select>
                </FormItem>
                <FormItem label="钢厂:">
                    <Select v-model="updddlxyjglxdyData.companyId">
                        <Option value="">全部</Option>
                        <Option value="唐钢">唐钢</Option>
                        <Option value="邯钢">邯钢</Option>
                        <Option value="宣钢">宣钢</Option>
                        <Option value="承钢">承钢</Option>
                        <Option value="舞钢">舞钢</Option>
                    </Select>
                </FormItem>
                <FormItem label="订单类型" prop="dingdanleixing">
                    <Input v-model="updddlxyjglxdyData.orderType"></Input>
                </FormItem>
                <FormItem label="价格类型" prop="jiageleixing">
                    <Input v-model="updddlxyjglxdyData.priceType"></Input>
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="updddlxyjglxdyData.note"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "ddlxyjglxdy",
        data() {
            return {
                id: '',
                updModal: false,
                updModa2: false,
                dataCount: 0,
                pageSize: 10,
                loading: true,
                fecthdata6: [],
                resDatas: [],
                updrule: {
                    dingdanleixing: [
                        {required: true, message: '订单类型', trigger: 'blur'}
                    ],
                    jiageleixing: [
                        {required: true, message: '价格类型', trigger: 'blur'}
                    ],
                },
                ddlxyjglxdyData: {
                    companyId: '',
                    varieties: '',
                    orderType: '',
                    priceType: '',
                    page: '0',
                    limit: '10',
                },
                addddlxyjglxdyData: {
                    companyId: '9580',
                    varieties: '热板',
                    orderType: '',
                    priceType: '',
                    note: '',
                },
                updddlxyjglxdyData: {
                    orderPriceId: '',
                    companyId: '',
                    varieties: '',
                    orderType: '',
                    priceType: '',
                    note: '',
                },
                columns12: [
                    {
                        title: '序号',
                        align: "center",
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '品种钢',
                        align: "center",
                        key: 'VARIETIES'
                    },
                    {
                        title: '钢厂',
                        align: "center",
                        key: 'COMPANYNAME'
                    },
                    {
                        title: '订单类型',
                        align: "center",
                        key: 'ORDERTYPE'
                    },
                    {
                        title: '价格类型',
                        align: "center",
                        key: 'PRICETYPE'
                    },
                    {
                        title: '备注',
                        align: "center",
                        key: 'NOTE'
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
            changepage(index) {
                this.ddlxyjglxdyData.page = index;
                this.search();
            },
            handlePageSize(index) {
                this.ddlxyjglxdyData.limit = index;
                this.search();
            },
            search() {
                this.loading = true;
                fetch(this.$store.state.fetchPath + "/OrderTypePriceType/list", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.ddlxyjglxdyData),
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
            addok() {
                fetch(this.$store.state.fetchPath + "/OrderTypePriceType/insert", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.addddlxyjglxdyData),
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
            updD(r) {
                this.updModa2 = true;
                this.updddlxyjglxdyData.orderPriceId = r.ORDERPRICEID;
                this.updddlxyjglxdyData.companyId = r.COMPANYNAME;
                this.updddlxyjglxdyData.note = r.NOTE;
                this.updddlxyjglxdyData.varieties = r.VARIETIES;
                this.updddlxyjglxdyData.orderType = r.ORDERTYPE;
                this.updddlxyjglxdyData.priceType = r.PRICETYPE;

            },
            updok() {
                fetch(this.$store.state.fetchPath + "/OrderTypePriceType/update", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.updddlxyjglxdyData),
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
            remove(r) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确认删除吗？',
                    onOk: () => {
                        this.id = r.ORDERPRICEID;
                        fetch(this.$store.state.fetchPath + "/OrderTypePriceType/delete", {
                            method: "POST",
                            headers: this.$store.state.fetchHeader,
                            body: "orderPriceId=" + this.id,
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
                    }
                });
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
    .divStyle {
        width: 100%;
        height: 60px;
        margin: 0 auto;
        /*margin-bottom: 20px;*/
        float: left;
    }
</style>