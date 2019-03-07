<template>
    <Menu ref="side_menu" :theme="theme3" @on-open-change="getParentName" @on-select="getName">
        <div v-for="(item,index) of menulist" :key="index">
            <MenuItem v-if="!item.children" :name="item.name"><Icon type="ios-filing" style="margin-right:8px "/>{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</MenuItem>
            <Submenu v-if="item.children"  :name="item.name" >
                <template slot="title">
                    <span>{{item.name}}</span>
                </template>
                <label v-if="item.children">
                    <MenuItem  v-for="tab2 of item.children"  :key="tab2.name" :name="tab2.name" :to="tab2.path"><span>{{tab2.name}}</span></MenuItem>
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
                theme3: 'dark',
                menulist:this.$route.params,
                getNames:[],
                layout:'',
                components:'',
            }
        },
        // created() {
        //     this.newMenu();
        // },
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
            },
            // newMenu(){
            //     fetch(this.$store.state.fetchPath + "/t-user-entity/buildTree", {
            //         method: "POST",
            //         headers: this.$store.state.fetchHeader,
            //         body: '',
            //         credentials:'include'
            //     })
            //         .then((res) => {
            //             return res.text();
            //         }).then((res) => {
            //         res = res.length>0?JSON.parse(res):[];
            //         this.menulist=this.utils.buildTree(res);
            //         // window.console.log(typeof(this.menulist))
            //         this.showMenu=true;
            //     })
            // }
        }
    }
</script>
<style scoped>
    .ivu-menu{
        width: auto !important;
    }
    .ivu-menu-item{
        padding-left:20px !important;
    }
    .ivu-menu-submenu-title,.ivu-menu-item span{
       display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .ivu-menu-submenu-title,.ivu-menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .ivu-menu-submenu-title,.collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
        margin-top:5px;
    }
</style>