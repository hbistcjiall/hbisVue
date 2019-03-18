<template>
    <Table :columns="columns" :data="data" border height="500"></Table>
</template>

<script>
    export default {
        name: "getcx",
        data() {
            return {
                columns: [{
                    title: '单位',
                    key: 'COMPANYNAME',
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
                                width: 100
                            },
                                {
                                    title: '专业公司-品种钢',
                                    key: 'zygspzg',
                                    align: 'center',
                                    width: 100,
                                },
                                {
                                    title: '专业公司-比重',
                                    key: 'zygsbz',
                                    align: 'center',
                                    width: 100,
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
                                    width: 100
                                },
                                    {
                                        title: '专业公司-品种钢',
                                        key: 'zygspzg',
                                        align: 'center',
                                        width: 100,
                                    },
                                    {
                                        title: '专业公司-比重',
                                        key: 'zygsbz',
                                        align: 'center',
                                        width: 100
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
                                    width: 100
                                },
                                    {
                                        title: '专业公司-品种钢',
                                        key: 'zygspzg',
                                        align: 'center',
                                        width: 100
                                    },
                                    {
                                        title: '专业公司-比重',
                                        key: 'COMPANY_ID',
                                        align: 'center',
                                        width: 100
                                    }
                                ]
                            }
                        ]
                    }
                ],
                data:this.utils.mergeRow([{
                    "FKIMG2": "",
                    "FKIMG": 575.793,
                    "FKIMG3": "",
                    "FKIMG1": "",
                    "PZGL": 16.968,
                    "NAME": "舞钢4100/4200",
                    "PZGL2": "",
                    "PZGL1": "",
                    "SALE_BODY": "",
                    "PZGL3": "",
                    "BZ": "33.93",
                    "BZ1": "",
                    "COMPANYNAME": "舞钢",
                    "BZ3": "",
                    "BZ2": "",
                    "COMPANY_ID": 1932
                },
                    {
                        "FKIMG2": 13855.381,
                        "FKIMG": 426.51,
                        "FKIMG3": "",
                        "FKIMG1": "",
                        "PZGL": "",
                        "NAME": "邯宝酸轧",
                        "PZGL2": "",
                        "PZGL1": "",
                        "SALE_BODY": "分公司",
                        "PZGL3": "",
                        "BZ": "--",
                        "BZ1": "",
                        "COMPANYNAME": "邯宝",
                        "BZ3": "",
                        "BZ2": "--",
                        "COMPANY_ID": 7778
                    },
                    {
                        "FKIMG2": "",
                        "FKIMG": 426.51,
                        "FKIMG3": "",
                        "FKIMG1": "",
                        "PZGL": "",
                        "NAME": "邯宝酸轧",
                        "PZGL2": "",
                        "PZGL1": "",
                        "SALE_BODY": "技术中心/市场部",
                        "PZGL3": "",
                        "BZ": "--",
                        "BZ1": "",
                        "COMPANYNAME": "邯宝",
                        "BZ3": "",
                        "BZ2": "",
                        "COMPANY_ID": 7778
                    },
                    {
                        "FKIMG2": "",
                        "FKIMG": 1187.16,
                        "FKIMG3": "",
                        "FKIMG1": "",
                        "PZGL": "",
                        "NAME": "邯钢西区连退",
                        "PZGL2": "",
                        "PZGL1": "",
                        "SALE_BODY": "事业部",
                        "PZGL3": "",
                        "BZ": "--",
                        "BZ1": "",
                        "COMPANYNAME": "邯宝",
                        "BZ3": "",
                        "BZ2": "",
                        "COMPANY_ID": 7778
                    },
                    {
                        "FKIMG2": "",
                        "FKIMG": 936.9,
                        "FKIMG3": "",
                        "FKIMG1": "",
                        "PZGL": "",
                        "NAME": "邯钢西区连退",
                        "PZGL2": "",
                        "PZGL1": "",
                        "SALE_BODY": "技术中心/市场部",
                        "PZGL3": "",
                        "BZ": "--",
                        "BZ1": "",
                        "COMPANYNAME": "邯宝",
                        "BZ3": "",
                        "BZ2": "",
                        "COMPANY_ID": 7778
                    },
                    {
                        "FKIMG2": "",
                        "FKIMG": 250.26,
                        "FKIMG3": "",
                        "FKIMG1": "",
                        "PZGL": "",
                        "NAME": "邯钢西区连退",
                        "PZGL2": "",
                        "PZGL1": "",
                        "SALE_BODY": "现货",
                        "PZGL3": "",
                        "BZ": "--",
                        "BZ1": "",
                        "COMPANYNAME": "邯宝",
                        "BZ3": "",
                        "BZ2": "",
                        "COMPANY_ID": 7778
                    },
                    {
                        "FKIMG2": "",
                        "FKIMG": 242106.24,
                        "FKIMG3": "",
                        "FKIMG1": "",
                        "PZGL": 242106.24,
                        "NAME": "承钢1780",
                        "PZGL2": "",
                        "PZGL1": "",
                        "SALE_BODY": "",
                        "PZGL3": "",
                        "BZ": "1",
                        "BZ1": "",
                        "COMPANYNAME": "承钢",
                        "BZ3": "",
                        "BZ2": "",
                        "COMPANY_ID": 9196
                    },
                    {
                        "FKIMG2": "",
                        "FKIMG": 62406.549,
                        "FKIMG3": "",
                        "FKIMG1": "",
                        "PZGL": "",
                        "NAME": "承钢棒材",
                        "PZGL2": "",
                        "PZGL1": "",
                        "SALE_BODY": "",
                        "PZGL3": "",
                        "BZ": "--",
                        "BZ1": "",
                        "COMPANYNAME": "承钢",
                        "BZ3": "",
                        "BZ2": "",
                        "COMPANY_ID": 9196
                    },
                    {
                        "FKIMG2": "",
                        "FKIMG": 32776.664,
                        "FKIMG3": "",
                        "FKIMG1": "",
                        "PZGL": 32776.664,
                        "NAME": "承钢线材",
                        "PZGL2": "",
                        "PZGL1": "",
                        "SALE_BODY": "",
                        "PZGL3": "",
                        "BZ": "1",
                        "BZ1": "",
                        "COMPANYNAME": "承钢",
                        "BZ3": "",
                        "BZ2": "",
                        "COMPANY_ID": 9196
                    }
                ],'COMPANYNAME'),
            }
        },
    }
</script>

<style scoped>

</style>