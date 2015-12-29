<style>
    [v-cloak] {
        display: none;
    }
</style>
<template>
    <router-view></router-view>
</template>
<script>
    AV.initialize('Jku9QxEHJ8uHhkNxNXkCwYYF-gzGzoHsz', 's850DW7qVY1HjzKz8KpTFoUx');

    var VueRouter = require('vue-router')
    var router = new VueRouter();

    module.exports = {
        data: function() {
            return {
                
            }
        },
        ready: function() {
            var currentUser = AV.User.current();
            if(currentUser){
                router.go({ path: '/index' });
            }else {
                router.go({ path: '/login' });
            }
        },
    };
</script>