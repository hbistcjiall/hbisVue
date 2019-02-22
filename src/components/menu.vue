<template>
    <Menu :theme="theme3" :open-names="['1']" accordion @on-select="routeTo">
        <Submenu  v-for="(item,index) in menulist" :key="item.name" :name="index"  >
            <template v-if="item" slot="title">
                <Icon type="ios-filing" />
                {{item.title}}
            </template>
            <label v-if="item.children">
                <MenuItem  v-for="(tab2,i) of item.children"  :key="tab2.name" :name="index+'-'+i" :to="tab2.path">{{tab2.name}}</MenuItem>
            </label>
        </Submenu>
    </Menu>
</template>
<script>
    export default {
        name:'menuList',
        data () {
            return {
                theme3: 'dark',
                menulist:[
                    {
                        name : 'system',
                        title : '系统管理',
                        path:'/a',
                        icon : 'outlet',
                        children: [
                            { name : 'user', title : '用户管理', icon : 'outlet',path:'/hello', }
                        ]
                    },
                    {
                        name : 'other',
                        title: '其他管理',
                        icon : 'outlet',
                        path:'/b',
                        children : [
                            {
                                name : 'role',
                                title : '角色管理',
                                icon : 'outlet',
                                children : [
                                    { name : 'auth', title : '权限管理', icon : 'outlet',path:'/b/a' }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        methods:{
            routeTo(e) {
                window.console.log(e);
            }
        }
    }
</script>
<style scoped>
    .ivu-menu{
        width: 200px !important;
    }

</style>