<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="选择组" prop="selectGroup">
            <Select v-model="formValidate.selectGroup" style="width:200px">
                <Option v-for="item in groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="选择角色" prop="selectRole">
            <Select v-model="formValidate.selectRole" @on-change="getMenu" style="width:200px">
                <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="权限一览" v-if="showMenu">
            <Tree :data="data1" ></Tree>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</template>

<script>
    export default {
        name: "userInsert_2",
        data() {
            return {
                showMenu:false,
                formValidate: {
                    selectRole: '',
                    selectGroup: ''
                },
                ruleValidate: {
                    selectRole: [
                        {required: true, message: '请选择用户角色', trigger: 'change'}
                    ],
                    selectGroup: [
                        {required: true, message: '请选择用户组', trigger: 'change'}
                    ]
                },
                groupList: [
                    {
                        id: '9901c13b364911e99d9a00163e03cea8',
                        name: '超级管理员'
                    },
                    {
                        id: '4345656718927193131311312112',
                        name: '普通用户'
                    }
                ],
                roleList: [
                    {
                        id: '7ac06d9a364b11e99d9a00163e03cea8',
                        name: 'superAdmin'
                    },
                    {
                        id: '901869b23d344f3ea7afd411b5e90f78',
                        name: 'fdsf'
                    }
                ],
                data1: [
                    {
                        title: 'parent 1',
                        children: [
                            {
                                title: 'parent 1-1',
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$store.commit("updateCurrent", 2);
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            getMenu(){
                  window.console.log(this.formValidate.selectRole);
                 if(this.formValidate.selectRole){
                  this.showMenu=true;
                 }
            }
        }
    }
</script>

<style scoped>
    .ivu-form {
        width: 35%;
        margin: 20px auto;

    }
</style>