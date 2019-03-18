<template>
    <Table :columns="columns11" :data="data10" border height="500"></Table>
</template>

<script>
    export default {
        name: "getcx",
        data() {
            return {
                columns11: [{
                    title: '单位',
                    key: 'dw',
                    align: 'center',
                    width: 100,
                    fixed: 'left',
                    isMergeRow: true
                },
                    {
                        title: '产线',
                        key: 'cx',
                        align: 'center',
                        width: 100,
                    },
                    {
                        title: '内贸总量',
                        key: 'nmzl',
                        align: 'center',
                        width: 100,
                    },
                    {
                        title: '内贸总量-总量',
                        key: 'nmzlzl',
                        align: 'center',
                        width: 100,
                    },
                    {
                        title: '内贸总量-品种钢',
                        key: 'nmzlpzg',
                        align: 'center',
                        width: 100,
                    },
                    {
                        title: '内贸总量-比重',
                        key: 'nmzlbz',
                        align: 'center',
                        width: 100,
                    },
                    {
                        title: '环比',
                        key: 'hb',
                        align: 'center',
                        width: 100,
                    },
                    {
                        title: '专业公司',
                        key: 'myzygs',
                        align: 'center',
                        children: [{
                            title: '专业公司',
                            key: 'zygs',
                            align: 'center',
                            children: [{
                                title: '专业公司-总量',
                                key: 'zygszl',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    let items = params.row.myzygs;
                                    for (let key in items) {
                                        if (items[key].zygs) {
                                            return h("div", {
                                                class: "ivu-table-cell"
                                            }, items[key].zygszl);
                                        }
                                    }
                                }
                            },
                                {
                                    title: '专业公司-品种钢',
                                    key: 'zygspzg',
                                    align: 'center',
                                    width: 100,
                                    render: (h, params) => {
                                        let items = params.row.myzygs;
                                        for (let key in items) {
                                            if (items[key].zygs) {
                                                return h("div", {
                                                    class: "ivu-table-cell"
                                                }, items[key].zygspzg);
                                            }
                                        }
                                    }
                                },
                                {
                                    title: '专业公司-比重',
                                    key: 'zygsbz',
                                    align: 'center',
                                    width: 100,
                                    render: (h, params) => {
                                        let items = params.row.myzygs;
                                        for (let key in items) {
                                            if (items[key].zygs) {
                                                return h("div", {
                                                    class: "ivu-table-cell"
                                                }, items[key].zygsbz);
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                            {
                                title: '分公司',
                                key: 'fgs',
                                align: 'center',
                                children: [{
                                    title: '专业公司-总量',
                                    key: 'zygszl',
                                    align: 'center',
                                    width: 100,
                                    render: (h, params) => {
                                        let items = params.row.myzygs;
                                        for (let key in items) {
                                            if (items[key].fgs) {
                                                return h("div", {
                                                    class: "ivu-table-cell"
                                                }, items[key].zygszl);
                                            }
                                        }
                                    }
                                },
                                    {
                                        title: '专业公司-品种钢',
                                        key: 'zygspzg',
                                        align: 'center',
                                        width: 100,
                                        render: (h, params) => {
                                            let items = params.row.myzygs;
                                            for (let key in items) {
                                                if (items[key].fgs) {
                                                    return h("div", {
                                                        class: "ivu-table-cell"
                                                    }, items[key].zygspzg);
                                                }
                                            }
                                        }
                                    },
                                    {
                                        title: '专业公司-比重',
                                        key: 'zygsbz',
                                        align: 'center',
                                        width: 100,
                                        render: (h, params) => {
                                            let items = params.row.myzygs;
                                            for (let key in items) {
                                                if (items[key].fgs) {
                                                    return h("div", {
                                                        class: "ivu-table-cell"
                                                    }, items[key].zygsbz);
                                                }
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                title: '子公司',
                                key: 'zgs',
                                align: 'center',
                                children: [{
                                    title: '专业公司-总量',
                                    key: 'zygszl',
                                    align: 'center',
                                    width: 100,
                                    render: (h, params) => {
                                        let items = params.row.myzygs;
                                        for (let key in items) {
                                            if (items[key].zgs) {
                                                return h("div", {
                                                    class: "ivu-table-cell"
                                                }, items[key].zygszl);
                                            }
                                        }
                                    }
                                },
                                    {
                                        title: '专业公司-品种钢',
                                        key: 'zygspzg',
                                        align: 'center',
                                        width: 100,
                                        render: (h, params) => {
                                            let items = params.row.myzygs;
                                            for (let key in items) {
                                                if (items[key].zgs) {
                                                    return h("div", {
                                                        class: "ivu-table-cell"
                                                    }, items[key].zygspzg);
                                                }
                                            }
                                        }
                                    },
                                    {
                                        title: '专业公司-比重',
                                        key: 'zygsbz',
                                        align: 'center',
                                        width: 100,
                                        render: (h, params) => {
                                            let items = params.row.myzygs;
                                            for (let key in items) {
                                                if (items[key].zgs) {
                                                    return h("div", {
                                                        class: "ivu-table-cell"
                                                    }, items[key].zygsbz);
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ],
                data10: [
                    {
                        dw: '唐钢',
                        cx: '本部热板',
                        nmzl: '5000',
                        nmzlzl: '5500',
                        nmzlpzg: '3800',
                        nmzlbz: '0.5',
                        rowspan: 4,
                        hb: '-1.8',
                        myzygs: [{
                            zygszl: '270',
                            zygspzg: '180',
                            zygsbz: '1.2',
                            zygs: '专业公司'
                        },
                            {
                                zygszl: '270',
                                zygspzg: '180',
                                zygsbz: '1.2',
                                fgs: '分公司'
                            },
                            {
                                zygszl: '270',
                                zygspzg: '180',
                                zygsbz: '1.2',
                                zgs: '子公司'
                            }
                        ]
                    },
                    {
                        dw: '唐钢',
                        cx: '本部热板',
                        nmzl: '5000',
                        nmzlzl: '5500',
                        nmzlpzg: '3800',
                        nmzlbz: '0.5',
                        hb: '-1.8',
                        myzygs: [{
                            zygszl: '270',
                            zygspzg: '180',
                            zygsbz: '1.2',
                            zygs: '专业公司'
                        },
                            {
                                zygszl: '270',
                                zygspzg: '180',
                                zygsbz: '1.2',
                                fgs: '分公司'
                            },
                            {
                                zygszl: '270',
                                zygspzg: '180',
                                zygsbz: '1.2',
                                zgs: '子公司'
                            }
                        ]
                    },
                    {
                        dw: '唐钢',
                        cx: '本部热板3',
                        nmzl: '5000',
                        nmzlzl: '5500',
                        nmzlpzg: '3800',
                        nmzlbz: '0.5',
                        hb: '-1.8',
                        myzygs: [{
                            zygszl: '270',
                            zygspzg: '180',
                            zygsbz: '1.2',
                            zygs: '专业公司'
                        },
                            {
                                zygszl: '270',
                                zygspzg: '180',
                                zygsbz: '1.2',
                                fgs: '分公司'
                            },
                            {
                                zygszl: '270',
                                zygspzg: '180',
                                zygsbz: '1.2',
                                zgs: '子公司'
                            }
                        ]
                    },
                    {
                        dw: '唐钢',
                        cx: '本部热板',
                        nmzl: '5000',
                        nmzlzl: '5500',
                        nmzlpzg: '3800',
                        nmzlbz: '0.5',
                        hb: '-1.8',
                        myzygs: [{
                            zygszl: '270',
                            zygspzg: '180',
                            zygsbz: '1.2',
                            zygs: '专业公司'
                        },
                            {
                                zygszl: '270',
                                zygspzg: '180',
                                zygsbz: '1.2',
                                fgs: '分公司'
                            },
                            {
                                zygszl: '270',
                                zygspzg: '180',
                                zygsbz: '1.2',
                                zgs: '子公司'
                            }
                        ]
                    },
                    {
                        dw: '唐钢',
                        cx: '本部热板',
                        nmzl: '5000',
                        nmzlzl: '5500',
                        nmzlpzg: '3800',
                        nmzlbz: '0.5',
                        rowspan: 4,
                        hb: '-1.8',
                        myzygs: [{
                            zygszl: '270',
                            zygspzg: '180',
                            zygsbz: '1.2',
                            zygs: '专业公司'
                        },
                            {
                                zygszl: '270',
                                zygspzg: '180',
                                zygsbz: '1.2',
                                fgs: '分公司'
                            },
                            {
                                zygszl: '270',
                                zygspzg: '180',
                                zygsbz: '1.2',
                                zgs: '子公司'
                            }
                        ]
                    },
                    {
                        dw: '唐钢',
                        cx: '本部热板',
                        nmzl: '5000',
                        nmzlzl: '5500',
                        nmzlpzg: '3800',
                        nmzlbz: '0.5',
                        hb: '-1.8',
                        myzygs: [{
                            zygszl: '270',
                            zygspzg: '180',
                            zygsbz: '1.2',
                            zygs: '专业公司'
                        },
                            {
                                zygszl: '270',
                                zygspzg: '180',
                                zygsbz: '1.2',
                                fgs: '分公司'
                            },
                            {
                                zygszl: '270',
                                zygspzg: '180',
                                zygsbz: '1.2',
                                zgs: '子公司'
                            }
                        ]
                    },
                    {
                        dw: '唐钢',
                        cx: '本部热板3',
                        nmzl: '5000',
                        nmzlzl: '5500',
                        nmzlpzg: '3800',
                        nmzlbz: '0.5',
                        hb: '-1.8',
                        myzygs: [{
                            zygszl: '270',
                            zygspzg: '180',
                            zygsbz: '1.2',
                            zygs: '专业公司'
                        },
                            {
                                zygszl: '270',
                                zygspzg: '180',
                                zygsbz: '1.2',
                                fgs: '分公司'
                            },
                            {
                                zygszl: '270',
                                zygspzg: '180',
                                zygsbz: '1.2',
                                zgs: '子公司'
                            }
                        ]
                    },
                    {
                        dw: '唐钢',
                        cx: '本部热板',
                        nmzl: '5000',
                        nmzlzl: '5500',
                        nmzlpzg: '3800',
                        nmzlbz: '0.5',
                        hb: '-1.8',
                        myzygs: [{
                            zygszl: '270',
                            zygspzg: '180',
                            zygsbz: '1.2',
                            zygs: '专业公司'
                        },
                            {
                                zygszl: '270',
                                zygspzg: '180',
                                zygsbz: '1.2',
                                fgs: '分公司'
                            },
                            {
                                zygszl: '270',
                                zygspzg: '180',
                                zygsbz: '1.2',
                                zgs: '子公司'
                            }
                        ]
                    }
                ]
            }
        },
    }
</script>

<style scoped>

</style>