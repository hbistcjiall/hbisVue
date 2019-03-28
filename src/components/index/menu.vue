<template>
    <Menu width="182px" ref="side_menu" @on-open-change="getParentName" @on-select="getName" accordion>
        <div v-for="(item,index) of menulist" :key="index">
            <MenuItem v-if="!item.children" :name="item.name" :to="item.url">{{item.name}}</MenuItem>
            <Submenu v-if="item.children"  :name="item.name" >
                <template slot="title">
                    <span>{{item.name}}</span>
                </template>
                <label v-if="item.children">
                    <MenuItem  v-for="tab2 of item.children"  :key="tab2.name" :name="tab2.name" :to="tab2.url"><span>{{tab2.name}}</span></MenuItem>
                </label>
            </Submenu>
        </div>
    </Menu>
</template>
<script>
    export default {
        name:'menuList',
        data () {
            return {
                menulist:JSON.parse(localStorage.getItem('Menulist')),
                getNames:[],
                layout:'',
                components:'',
            }
        },
        methods:{
            getParentName(e){
                this.components=e[0];
            },
            getName(e){

                this.layout=e;
                this.getNames=[];
                if(this.components){
                this.getNames.push({'name': this.components});
                this.getNames.push({'name': this.layout});
                }else{
                    this.getNames.push({'name': this.layout});
                }
                this.$store.commit('setHeaders',this.getNames);
                if(this.getNames[1].name==='用户管理'){
                    this.$store.commit("updateCurrent", 0);
                }
            }
        }
    }
</script>
<style scoped>
    .ivu-menu-item, .ivu-menu-submenu{
        text-align: left;
        color: #333;

    }
    .ivu-menu-item span{
        white-space:nowrap;
    }
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
        color: white;
        background: #09c;
    }

</style>