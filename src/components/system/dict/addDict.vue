<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="父级字典" prop="dictTypeId">
            <Input v-model="formValidate.dictTypeId" placeholder="请输入父级字典" @on-change="dictTypeIdChange" readonly></Input>
        </FormItem>
        <FormItem label="字典名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入字典名称" @on-change="nameChange"></Input>
        </FormItem>
        <FormItem label="字典编码" prop="code">
            <Input v-model="formValidate.code" placeholder="请输入字典编码" @on-change="codeChange"></Input>
        </FormItem>
        <FormItem label="描述">
            <Input v-model="formValidate.description" placeholder="请输入描述" @on-change="descriptionChange"></Input>
        </FormItem>
        <FormItem label="排序">
            <Input v-model="formValidate.sort" placeholder="请输入排序" @on-change="sortChange"></Input>
        </FormItem>

    </Form>
</template>
<script>
    export default {
        name:'addRole',
        data () {
            return {
                roledata: [],
                formValidate: {
                    dictTypeId:'顶级',
                    name:'',
                    code:'',
                    description:'',
                    sort:0
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '字典名称', trigger: 'blur' }
                    ],
                    dictTypeId:[
                        { required: true, message: '父级字典', trigger: 'blur' }
                    ],
                    code:[
                        { required: true, message: '字典编码', trigger: 'blur' }
                    ]
                },
            }
        },
        created(){

        },
        methods: {
            nameChange:function() {
                this.$emit('name', this.formValidate.name)
            },
            dictTypeIdChange(){
                this.$emit('dictTypeId', this.formValidate.dictTypeId);
            },
            descriptionChange:function() {
                this.$emit('description', this.formValidate.description)
            },
            codeChange:function() {
                this.$emit('code', this.formValidate.code)
            },
            sortChange:function() {
                this.$emit('sort',this.formValidate.sort)
            }
        }
    }
</script>
