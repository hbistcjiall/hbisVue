<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="出生日期">
            <Row>
                <Col span="11">
                    <FormItem prop="birthday">
                        <DatePicker type="datetime" placeholder="Select date" v-model="formValidate.birthday" format="yyyy-MM-dd"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="E-mail" prop="email">
            <Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem label="性别" prop="sex">
            <RadioGroup v-model="formValidate.gender">
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="部门" prop="deptId">
            <Cascader :data="data" v-model="value1"></Cascader>
        </FormItem>
        <FormItem label="电话" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入电话"></Input>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        name:'updUser',
        data () {
            return {
                value1:[],
                data: [
                    //     {
                    //     value: 'beijing',
                    //     label: '北京',
                    //     children: [
                    //         {
                    //             value: 'gugong',
                    //             label: '故宫'
                    //         },
                    //         {
                    //             value: 'tiantan',
                    //             label: '天坛'
                    //         },
                    //         {
                    //             value: 'wangfujing',
                    //             label: '王府井'
                    //         }
                    //     ]
                    // }, {
                    //     value: 'jiangsu',
                    //     label: '江苏',
                    //     children: [
                    //         {
                    //             value: 'nanjing',
                    //             label: '南京',
                    //             children: [
                    //                 {
                    //                     value: 'fuzimiao',
                    //                     label: '夫子庙',
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             value: 'suzhou',
                    //             label: '苏州',
                    //             children: [
                    //                 {
                    //                     value: 'zhuozhengyuan',
                    //                     label: '拙政园',
                    //                 },
                    //                 {
                    //                     value: 'shizilin',
                    //                     label: '狮子林',
                    //                 }
                    //             ]
                    //         }
                    //     ],
                    // }
                ],
                formValidate: {
                    name: '',
                    email: '',
                    sex: '',
                    birthday: '',
                    phone:'',
                    deptId:'',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不为空', trigger: 'blur' }
                    ],
                    account:[
                        { required: true, message: '账号不为空', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '账号不为空', trigger: 'blur' }
                    ],
                    deptId: [
                        { required: true, message: '部门不为空', trigger: 'blur' },
                    ],
                }
            }
        },
        created() {
            this.getDeptid();
        },
        methods: {
            getDeptid(){
                fetch(this.$store.state.fetchPath + "/dept/treeView", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    credentials:'include'
                })
                    .then((res) => {
                        return res.text();
                    }).then((res) => {
                    res = res.length>0?JSON.parse(res):[]
                    // 保存取到的所有数据
                    window.console.log(res)
                    // this.data =  res.data;
                })
            }
        }
    }
</script>
