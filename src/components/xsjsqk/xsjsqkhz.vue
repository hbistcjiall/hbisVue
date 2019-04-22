<template>
    <div>
        <Form :label-width="50">
            <Row>
                <Col span="4">
                    <FormItem label="月份：">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false" v-model="startTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem>
                        <DatePicker type="month" placeholder="终止月份"  :editable="false" :clearable="false" v-model="endTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4">
                    <Button @click="getList()" icon="ios-search" style="margin-right:10px;">查询</Button>
                    <!--<Button @click="downLoad()" icon="ios-cloud-download-outline">导出</Button>-->
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="550" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "xsjsqkhz",
        data() {
            return {
                loading:true,
                startTime:new Date(),
                endTime:new Date(),
                columns: [
                    {
                        title: '产品大类',
                        key: 'ZL',
                        align: 'center',
                        fixed: 'left',
                        width:'100',
                        isMergeRow: true
                    },
                    {
                        title: '产线',
                        key: 'CXNAME',
                        width:'100',
                        align: 'center',
                    },
                    {
                        title: '销售量（吨）',
                        key: 'FKIMG',
                        width:'100',
                        align: 'center',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                Math.round(Number(params.row[params.column.key]))
                            )
                        }
                    },
                    {
                        title: '售价（元/吨）',
                        key: '',
                        width:'100',
                        align: 'center',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                Math.round(Number(params.row[params.column.key]))
                            )
                        }
                    },
                    {
                        title: '售价（元/吨）',
                        key: 'KZWI6',
                        width:'100',
                        align: 'center',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                Math.round(Number(params.row[params.column.key]))
                            )
                        }
                    },
                    {
                        title: '总销售额（万元）',
                        key: 'ZSJ',
                        width:'100',
                        align: 'center',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                Math.round(Number(params.row[params.column.key]))
                            )
                        }
                    },
                    {
                        title: '内贸销售量（吨）',
                        key: 'NMFKIMG',
                        align: 'center',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                Math.round(Number(params.row[params.column.key]))
                            )
                        }
                    },
                    {
                        title: '内贸均价（元/吨）',
                        key: 'NMSJ',
                        align: 'center',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                Math.round(Number(params.row[params.column.key]))
                            )
                        }
                    },
                    {
                        title: '销售总公司',
                        key: 'xszgs',
                        align: 'center',
                        children: [
                            {
                                title: '销售总公司',
                                key: 'XSZGSFKIMG',
                                width:'100',
                                align: 'center',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Math.round(Number(params.row[params.column.key]))
                                    )
                                }

                            },
                            {
                                title: '平均售价',
                                key: 'SXZGSSJ',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Math.round(Number(params.row[params.column.key]))
                                    )
                                }

                            },
                            {
                                title: '其中:专业公司',
                                key: 'ZYGSFKIG',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Math.round(Number(params.row[params.column.key]))
                                    )
                                }
                            },
                            {
                                title: '平均售价',
                                key: 'ZYGSSJ',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Math.round(Number(params.row[params.column.key]))
                                    )
                                }
                            },
                            {
                                title: '分公司',
                                key: 'FGSFKIMG',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Math.round(Number(params.row[params.column.key]))
                                    )
                                }
                            },
                            {
                                title: '平均售价',
                                key: 'FGSSJ',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Math.round(Number(params.row[params.column.key]))
                                    )
                                }
                            }
                        ]
                    },
                    {
                        title: '子公司',
                        key: '',
                        align: 'center',
                        children: [
                            {
                                title: '子公司合计',
                                key: 'ZGSFKIMG',
                                width:'100',
                                align: 'center',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Math.round(Number(params.row[params.column.key]))
                                    )
                                }

                            },
                            {
                                title: '平均价格',
                                key: 'ZGSSJ',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Math.round(Number(params.row[params.column.key]))
                                    )
                                }

                            },
                            {
                                title: '事业部',
                                key: 'SYBFKIMG',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Math.round(Number(params.row[params.column.key]))
                                    )
                                }
                            },
                            {
                                title: '平均售价',
                                key: 'SYBSJ',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Math.round(Number(params.row[params.column.key]))
                                    )
                                }
                            },
                            {
                                title: '现货',
                                key: 'XHFKIMG',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Math.round(Number(params.row[params.column.key]))
                                    )
                                }
                            },
                            {
                                title: '平均售价',
                                key: 'XHSJ',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Math.round(Number(params.row[params.column.key]))
                                    )
                                }
                            }
                        ]
                    },
                    {
                        title: ' ',
                        key: '',
                        align: 'center',
                        children: [
                            {
                                title: '自办公司',
                                key: 'ZBGSFKIMG',
                                width:'100',
                                align: 'center',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Math.round(Number(params.row[params.column.key]))
                                    )
                                }

                            },
                            {
                                title: '平均价格',
                                key: 'ZBGSSJ',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Math.round(Number(params.row[params.column.key]))
                                    )
                                }

                            },
                            {
                                title: '出口',
                                key: 'CKFKIMG',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Math.round(Number(params.row[params.column.key]))
                                    )
                                }
                            },
                            {
                                title: '平均售价',
                                key: 'CKSJ',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Math.round(Number(params.row[params.column.key]))
                                    )
                                }
                            }
                        ]
                    }
                ],
                data: []
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                this.loading = true;
                let startTime='startTime=';
                startTime+=this.utils.formatMonthStart(this.startTime)
                let endTime='&endTime=';
                endTime+=this.utils.formatMonthStart(this.endTime)
                fetch(this.$store.state.fetchPath + "/yxyb/getxsjswccx", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime+endTime,
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    this.data = this.utils.mergeRow(res, 'ZL');
                    this.loading = false;
                });
            }
        }
    }
</script>

<style scoped>
    button{
        background: #3497db;
        color:#fff;
    }
    .ivu-table-cell{
        text-overflow: ellipsis !important;
        word-break: break-all !important;
        padding-left:0px;
        padding-right:0px;
    }
</style>