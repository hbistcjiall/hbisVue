<template>
  <div id="app">
 <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
    data(){return{}},
    created() {
        this.doLogin();
    },
    methods:{
        doLogin(){
            fetch(this.$store.state.fetchPath + "/login", {
                        method: "get",
                        headers: this.$store.state.fetchHeader,
                        credentials:'include'
                    })
                        .then((res) => {
                            return res.text();
                        }).then((res) => {
                        res = res.length>0?JSON.parse(res):[];
                        if(res.page=='login'){
                            return this.$router.push("login");
                        }else{
                            return this.$router.push("index");
                        }
                    })
        }
    }

}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
