<template>
    <Tree :data="userData" show-checkbox multiple></Tree>
</template>
<script>
    export default {
        name:'setUser',
        data () {
            return {
                userData:[],
            }
        },
        created() {
            fetch(this.$store.state.fetchPath + "/t-user-entity/findGroupByUser", {
                method: "POST",
                headers: this.$store.state.fetchHeader,
                body: '',
                credentials: 'include'
            }).then((res) => {
                return res.text();
            }).then((res) => {
                res = res.length>0?JSON.parse(res):[];
                this.groupList=res;
            });
        },
        methods: {

        }
    }
</script>
