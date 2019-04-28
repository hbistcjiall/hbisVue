<template>
    <div>
        <Form :label-width="100">
            <Row>
                <Col span="8">
                    <FormItem label="日期：">
                        <DatePicker type="month" placeholder="开始时间" :editable="false" :clearable="false"
                                    v-model="startTime"
                                    style="width:110px;margin-left: -80px"></DatePicker>
                        <DatePicker type="month" placeholder="结束时间" :editable="false" :clearable="false"
                                    v-model="endTime"
                                    style="width:110px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="2" style="margin-left: -50px;float: left">
                    <Button @click="getListed()" icon="ios-search" style="margin-right:10px;">查询</Button>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="550" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "cpdjjgfb",
        data() {
            return {
                startTime: new Date(),
                endTime: new Date(),
                loading: true,
                data: [],
                columns: [
                    {
                        title: '产品大类',
                        align: "center",
                        isMergeRow: true,
                        width: '100',
                        key: 'ZL'
                    },
                    {
                        title: '产线',
                        align: "center",
                        isMergeRow: true,
                        width: '100',
                        key: 'CXNAME'
                    },
                    {
                        title: '产品等级',
                        align: "center",
                        width: '110',
                        key: 'PRODUCT_GRADE'
                    },
                    {
                        title: '销售量\n' +
                            '（吨）',
                        align: "center",
                        width: '100',
                        key: 'FKIMG',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                (Number(params.row[params.column.key])).toFixed(2)
                            )
                        }
                    },
                    {
                        title: '税前售价\n' +
                            '（元/吨）',
                        align: "center",
                        width: '100',
                        key: 'ZSJ',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                (Number(params.row[params.column.key])).toFixed(2)
                            )
                        }
                    },
                    {
                        title: '专业公司',
                        align: "center",
                        width: '',
                        key: '',
                        children: [
                            {
                                title: '销量',
                                align: "center",
                                width: '80',
                                key: 'ZYFKIMG',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '均价',
                                align: "center",
                                width: '80',
                                key: 'ZYSJ',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '销售占比',
                                align: "center",
                                width: '80',
                                key: 'ZYXSZB',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key]) * 100).toFixed(2) + '%',
                                    )
                                }
                            },
                        ]
                    },
                    {
                        title: '分公司',
                        align: "center",
                        width: '',
                        key: '',
                        children: [
                            {
                                title: '销量',
                                align: "center",
                                width: '80',
                                key: 'FGSFKIMG',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '均价',
                                align: "center",
                                width: '80',
                                key: 'FGSSJ',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '销售占比',
                                align: "center",
                                width: '80',
                                key: 'FGSXSZB',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key]) * 100).toFixed(2) + '%'
                                    )
                                }
                            },
                        ]
                    },
                    {
                        title: '事业部',
                        align: "center",
                        key: '',
                        children: [
                            {
                                title: '销量',
                                align: "center",
                                width: '80',
                                key: 'SYBFKIMG',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '均价',
                                align: "center",
                                width: '80',
                                key: 'SYBSJ',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '销售占比',
                                align: "center",
                                width: '80',
                                key: 'SYBXSZB',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key]) * 100).toFixed(2) + '%'
                                    )
                                }
                            },
                        ]
                    },
                    {
                        title: '现货',
                        align: "center",
                        key: '',
                        children: [
                            {
                                title: '销量',
                                align: "center",
                                width: '80',
                                key: 'XHFKIMG',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '均价',
                                align: "center",
                                width: '80',
                                key: 'XHSJ',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '销售占比',
                                align: "center",
                                width: '80',
                                key: 'XHXSZB',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key]) * 100).toFixed(2) + '%'
                                    )
                                }
                            },
                        ]
                    },
                    {
                        title: '自办公司',
                        align: "center",
                        key: '',
                        children: [
                            {
                                title: '销量',
                                align: "center",
                                width: '80',
                                key: 'ZBGSFKIMG',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '均价',
                                align: "center",
                                width: '80',
                                key: 'ZBGSSJ',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '销售占比',
                                align: "center",
                                width: '80',
                                key: 'ZBGSXSZB',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key]) * 100).toFixed(2) + '%'
                                    )
                                }
                            },
                        ]
                    },
                ],
            }
        },
        mounted() {
            this.getListed();
        },
        methods: {
            getListed() {
                this.loading = true;
                let startTime = 'startTime=' + this.utils.formatMonthStart(this.startTime);
                let endTime = 'endTime=' + this.utils.formatMonthStart(this.endTime);
                fetch(this.$store.state.fetchPath + "/report-product-class-level/getcxfb", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime + '&' + endTime,
                    credentials: 'include'
                }).then((res) => {
                    if (res.status != 200) {
                        this.$Message.error('请求失败！');
                    } else {
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    window.console.log(res);
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].PRODUCT_GRADE == '' || res[i].PRODUCT_GRADE == null) {
                            res[i].PRODUCT_GRADE = '其他    '
                        }
                    }



                    this.data = this.utils.mergeRow(res, 'CXNAME', 'ZL');
                    this.loading = false;
                });
            },
        },
    }
</script>

<style scoped>
    button {
        background: #3497db;
        color: #fff;
    }

    .paging {
        float: right;
        margin-top: 10px;
    }
</style>