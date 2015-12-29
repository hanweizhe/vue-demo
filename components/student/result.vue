<template>
    <div class="panel panel-default">
        <div class="panel-heading">选课结果</div>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>课程名</th>
                    <th>任课老师</th>
                    <th>学分</th>
                    <th>上课时间/地点</th>
                    <th>人数/容量</th>
                    <th>退选</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="lesson in lessonList" v-cloak>
                    <td>{{lesson.get('name')}}</td>
                    <td>{{lesson.get('teacher')}}</td>
                    <td>{{lesson.get('credit')}}</td>
                    <td>{{lesson.get('location')}}</td>
                    <td>{{lesson.get('num')}} / {{lesson.get('max')}}</td>
                    <td><a href="javascript:void(0)" v-on:click="cancel(lesson)">退选</a></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    module.exports = {
        data: function(){
            return {
                lessonList: []
            }
        },
        methods: {
            cancel: function(lesson){
                var user = AV.User.current();
                var relation = user.relation('lesson');
                relation.remove(lesson);
                user.save();

                var relation1 = lesson.relation('student');
                relation1.remove(user);
                lesson.save();

                this.fetch();
            },
            fetch: function(){
                var user = AV.User.current();
                var relation = user.relation('lesson');
                var that = this;
                relation.query().find({
                    success: function(list) {
                        that.lessonList = list;
                    }
                });
            }
        },
        ready: function(){
            this.fetch();
        }
    }
</script>