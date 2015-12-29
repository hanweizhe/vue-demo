<style>
body {
    font-family: "Microsoft YaHei", "微软雅黑";
}
.nav.navbar-nav > li a.active {
    color: #fff;
    background-color: #080808 !important;
}
</style>
<template>
    <nav class="navbar navbar-inverse navbar-static-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" v-link="{ path: '/index'}">选课系统</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><a v-link="{ path: '/index/home', activeClass: 'active'}">主页</a></li>
                    <li><a v-link="{ path: '/index/about', activeClass: 'active'}">关于</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="javascript:void(0);">{{name}}</a></li>
                    <li><a href="javascript:void(0);" v-on:click="logout()">退出</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container">
        <router-view></router-view>
    </div>
</template>
<script>
    var VueRouter = require('vue-router')
    var router = new VueRouter();

    module.exports = {
        data: function() {
            var currentUser = AV.User.current();
            var name = currentUser.get("name");
            return {
                name: name
            }
        },
        methods: {
            logout: function(){
                AV.User.logOut();
                router.go({ path: '/login' });
            }
        }
    }
</script>