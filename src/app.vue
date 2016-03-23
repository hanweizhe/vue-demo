<style>
    [v-cloak] {
        display: none;
    }
</style>
<template>
    <router-view></router-view>
</template>
<script>
    AV.initialize('fHr5WDRKFh0WqyaCNzBYxrfO-gzGzoHsz', 'DMMYLjaFeCj0zOqYRCtugjdG');

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