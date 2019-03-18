<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="编码" prop="code">
            <Input v-model="formValidate.code" placeholder="请输入编码" @on-change="codeChange"></Input>
        </FormItem>
        <FormItem label="责任单位名称" prop="companyname">
            <Input v-model="formValidate.companyname" placeholder="请输入责任单位名称" @on-change="nameChange"></Input>
        </FormItem>

    </Form>
</template>
<script>
    export default {
        name:'addZrdwgl',
        data () {
            return {
                roledata: [],
                formValidate: {
                    companyname:'',
                    code:'',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '责任单位名称', trigger: 'blur' }
                    ],
                    code:[
                        { required: true, message: '编码', trigger: 'blur' }
                    ]
                },
            }
        },
        created(){

        },
        methods: {
            nameChange:function() {
                this.$emit('companyname', this.formValidate.companyname)
            },
            codeChange:function() {
                this.$emit('code', this.formValidate.code)
            },
        }
    }
</script>
