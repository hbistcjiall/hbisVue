<template>
    <div>
        <div class="divStyle">
            <Form :label-width="80" style="margin-left: -80px">
                <FormItem style="float: left">
                    <label>协议户名称:</label>
                    <Input style="width:120px" v-model="xyhyhtdata.accontName" placeholder="请输入协议户名称"></Input>
                </FormItem>
                <FormItem label="合同单位:" style="float: left">
                    <Input style="width:120px" v-model="xyhyhtdata.contractUnit" placeholder="请输入合同单位"></Input>
                </FormItem>
                <Button @click="updModal=true" style="float: right" icon="ios-add">新增</Button>
                <Button @click="search" style="float: right;margin-right: 10px" icon="ios-search">查询</Button>
            </Form>
        </div>
        <Table :loading="loading" border stripe :columns="columns12" :data="fecthdata6" style="margin-top: 20px;float: left;width: 100%;"
               ref="table" >
            <template slot-scope="{row}" slot="action">
                <Button size="small" style="margin-right: 5px" @click="updD(row)">修改</Button>
                <Button size="small" @click="remove(row)" style="background:#ff6969;color:#fff;">删除</Button>
            </template>
        </Table>
        <Page :total="dataCount" :page-size="pageSize" show-total show-elevator show-sizer class="paging"
              @on-change="changepage2" @on-page-size-change='handlePageSize' style="margin-top:20px;"></Page>
        <Modal v-model="updModal" title="新增协议户与合同单位对应" :closable='false' @on-ok="addok">
            <Form :model="addxyhyhtdata" :rules="updrule" :label-width="90">
                <FormItem label="协议户名称" prop="xieyihumingcheng">
                    <Input v-model="addxyhyhtdata.accontName"></Input>
                </FormItem>
                <FormItem label="合同单位" prop="hetongdanwei">
                    <Input v-model="addxyhyhtdata.contractUnit"></Input>
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="addxyhyhtdata.note"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="updModa2" title="修改协议户与合同单位对应" :closable='false' @on-ok="updok">
            <Form :model="updxyhyhtdata" :rules="updrule" :label-width="90">
                <FormItem label="协议户名称" prop="xieyihumingcheng">
                    <Input v-model="updxyhyhtdata.accontName"></Input>
                </FormItem>
                <FormItem label="合同单位" prop="hetongdanwei">
                    <Input v-model="updxyhyhtdata.contractUnit"></Input>
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="updxyhyhtdata.note"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "xyhyhtdwdy",
        data() {
            return {
                id: '',
                resDatas: [],
                dataCount: 0,
                pageSize: 10,
                loading: true,
                updModal: false,
                updModa2: false,
                fecthdata6: [],
                updrule: {
                    xieyihumingcheng: [
                        {required: true, message: '协议户名称', trigger: 'blur'}
                    ],
                    hetongdanwei: [
                        {required: true, message: '合同单位', trigger: 'blur'}
                    ],
                },
                xyhyhtdata: {
                    accontName: '',
                    contractUnit: '',
                    page: '0',
                    limit: '10',
                },
                addxyhyhtdata: {
                    accontName: '',
                    contractUnit: '',
                    note: '',
                },
                updxyhyhtdata: {
                    accontName: '',
                    contractUnit: '',
                    note: '',
                    nameContractUnitId: ''
                },
                columns12: [
                    {
                        title: '序号',
                        align: "center",
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '协议户名称',
                        align: "center",
                        key: 'ACCONTNAME'
                    },
                    {
                        title: '合同单位',
                        align: "center",
                        key: 'CONTRACTUNIT'
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
            changepage2(index) {
                this.xyhyhtdata.page = index;
                this.search();
            },
            handlePageSize(index) {
                this.xsztylhztdyData.limit = index;
                this.search();
            },
            search() {
                this.loading = true;
                fetch(this.$store.state.fetchPath + "/ProtocolNameContractUnit/list", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.xyhyhtdata),
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
                fetch(this.$store.state.fetchPath + "/ProtocolNameContractUnit/insert", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.addxyhyhtdata),
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
                this.updxyhyhtdata.accontName = r.ACCONTNAME;
                this.updxyhyhtdata.contractUnit = r.CONTRACTUNIT;
                this.updxyhyhtdata.note = r.NOTE;
                this.updxyhyhtdata.nameContractUnitId = r.NAMECONTRACTUNITID;
            },
            updok() {
                fetch(this.$store.state.fetchPath + "/ProtocolNameContractUnit/update", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.updxyhyhtdata),
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
                        this.id = r.NAMECONTRACTUNITID;
                        fetch(this.$store.state.fetchPath + "/ProtocolNameContractUnit/delete", {
                            method: "POST",
                            headers: this.$store.state.fetchHeader,
                            body: "nameContractUnitId=" + this.id,
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

        }
    }
</script>

<style scoped>
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
    .paging{
        float: right;
    }
</style>