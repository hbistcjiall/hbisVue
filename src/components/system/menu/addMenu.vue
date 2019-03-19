<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
        <FormItem label="名称" prop="name">
            <Input v-model="formValidate.name" placeholder="名称" @on-change="nameChange"></Input>
        </FormItem>
        <FormItem label="菜单编号" prop="code">
            <Input v-model="formValidate.code" placeholder="菜单编号" @on-change="codeChange"></Input>
        </FormItem>
        <FormItem label="父级编号" prop="pid">
            <!--<Cascader :data="menuData" trigger="hover" @on-change="pcodeChange"></Cascader>-->
            <Tree :data="menuData" ref="tree" @on-select-change="pIdChange"></Tree>
        </FormItem>
        <FormItem label="是否是菜单" prop="menuFlag">
            <Radio-group v-model="formValidate.menuFlag" @on-change="menuFlagChange">
                <Radio label="Y">是</Radio>
                <Radio label="N">不是</Radio>
            </Radio-group>
        </FormItem>
        <FormItem label="请求地址" prop="url">
            <Input v-model="formValidate.url" placeholder="请输入请求地址" @on-change="urlChange"></Input>
        </FormItem>
        <FormItem label="排序">
            <Input v-model="formValidate.sort" placeholder="请输入排序" @on-change="sortChange"></Input>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        name:'addMenu',
        props:{
            url:String
        },
        data () {
            return {
                menuData: [],
                formValidate: {
                    name:'',
                    code:'',
                    pid:'',
                    menuFlag:'',
                    url:'',
                    sort:0,
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '名称为空', trigger: 'blur' }
                    ],
                    code:[
                        { required: true, message: '菜单编号不为空', trigger: 'blur' }
                    ],
                    pid:[
                        { required: true, message: '父菜单编号不为空', trigger: 'blur' }
                    ],
                    menuFlag:[
                        { required: true, message: '是否是菜单不为空', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: '请求路径不为空', trigger: 'blur' },
                    ],
                }
            }
        },
        created(){
            fetch(this.url+"/menu/selectMenuTreeList", {
                method: "POST",
                headers: {//fetch请求头
                    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
                },
                credentials:'include'
            })
                .then((res) => {
                    return res.text();
                }).then((res) => {
                res = res.length>0?JSON.parse(res):[]
                // 保存取到的所有数据
                this.menuData =  this.utils.roleTree(this.utils.buildRoleTree(res));

            })
        },
        methods: {
            nameChange:function() {
                this.$emit('name', this.formValidate.name)
            },
            codeChange:function() {
                this.$emit('code', this.formValidate.code)
            },
            pIdChange(e){
                let roleCheckarr = []
                let rolearr = e;
                for(var i=0;i<rolearr.length;i++){
                    roleCheckarr.push(rolearr[i].id);
                }
                this.formValidate.pid = roleCheckarr.toString()
                this.$emit('pid',this.formValidate.pid );
            },
            menuFlagChange:function(v) {
                this.$emit('menuFlag', v)
            },
            urlChange:function() {
                this.$emit('url', this.formValidate.url)
            },
            sortChange:function() {
                this.$emit('sort', this.formValidate.sort)
            }
        }
    }
</script>
