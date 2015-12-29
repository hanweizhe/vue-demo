<style>
.nav.nav-pills> li a.active {
    color: #fff;
    background-color: #337ab7 !important;
}
</style>
<template>
    <div class="col-md-2">
        <ul class="nav nav-pills nav-stacked" v-if="position == 1">
            <li role="presentation"><a v-link="{ path: '/index/home/choose', activeClass: 'active'}">开始选课</a></li>
            <li role="presentation"><a v-link="{ path: '/index/home/result', activeClass: 'active'}">查看选课结果</a></li>
            <li role="presentation"><a v-link="{ path: '/index/home/hasLearn', activeClass: 'active'}">已修课程</a></li>
        </ul>
        <ul class="nav nav-pills nav-stacked" v-else>
            <li role="presentation"><a v-link="{ path: '/index/home/teach', activeClass: 'active'}">我的课程列表</a></li>
            <li role="presentation"><a v-link="{ path: '/index/home/addLesson', activeClass: 'active'}">添加课程</a></li>
        </ul>
    </div>
    <div class="col-md-10">
        <router-view></router-view>
    </div>
</template>
<script>
    var VueRouter = require('vue-router')
    var router = new VueRouter();

    module.exports = {
        data: function() {
            var currentUser = AV.User.current();
            var position = currentUser.get("position");
            return {
                position: position
            }
        },
        ready: function() {
            
        },
    };
</script>