var Vue = require('vue')
var VueRouter = require('vue-router')
Vue.use(VueRouter);

var app = Vue.extend(require('./app.vue'))
var router = new VueRouter();

router.map({
    '/index': {
        component: require('../components/index.vue'),
        subRoutes: {
            '/home': {
                component: require('../components/home.vue'),
                subRoutes: {
                    '/': {
                        component: require('../components/welcome.vue'),
                    },
                    '/choose': {
                        component: require('../components/student/choose.vue'),
                    },
                    '/result': {
                        component: require('../components/student/result.vue'),
                    },
                    '/hasLearn': {
                        component: require('../components/student/hasLearn.vue')
                    },
                    '/teach': {
                        component: require('../components/teacher/teach.vue')
                    },
                    '/addLesson': {
                        component: require('../components/teacher/addLesson.vue')
                    },
                    '/lesson/:lessonId': {
                        name: 'lesson',
                        component: require('../components/teacher/lesson.vue')
                    }
                }
            },
            '/about': { 
                component: require('../components/about.vue'),
            }
        }
    },
    '/login': {
        component: require('../components/login.vue'),
    }
})

// 重定向
router.redirect({
    '/index': "/index/home/"
})

router.start(app, '#app');
