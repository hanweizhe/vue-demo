<style>
    .form-signin {
        max-width: 330px;
        margin: 0 auto;
        margin-top: 40px;
        padding: 15px;
    }
    .form-signin .form-signin-heading,
    .form-signin .checkbox {
        margin-bottom: 10px;
    }
    .form-signin .checkbox {
        font-weight: normal;
    }
    .form-signin .form-control {
        font-size: 16px;
        position: relative;
        -webkit-box-sizing: border-box;
           -moz-box-sizing: border-box;
                box-sizing: border-box;
        height: auto;
        padding: 10px;
    }
    .form-signin .form-control:focus {
        z-index: 2;
    }
    .form-signin input[type='email'] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .form-signin input[type='password'] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>
<template>
    <form class="form-signin">
        <h2 class="form-signin-heading">选课系统</h2>
        <input type="text" v-model="username" class="form-control" placeholder="学号/工号" required autofocus>
        <input type="password" v-model="password" class="form-control" placeholder="密码 000000" required>
        <button class="btn btn-lg btn-primary btn-block" v-on:click="login(username, password)">登录</button>
        <p>测试账号(用户名/密码): </p>
        <p>学生: U201300000/000000</p>
        <p>老师: T201300000/000000</p>
    </form>
</template>
<script>
var VueRouter = require('vue-router')
var router = new VueRouter()
module.exports = {
    data: function(){
        return {
        }
    },
    methods: {
        login: function(username, password){
            AV.User.logIn(username, password, {
                success: function(user) {
                    router.go({ path: '/index' });
                },
                error: function(user, error) {
                    alert(error.message);
                }
            });
        }
    }
}
</script>