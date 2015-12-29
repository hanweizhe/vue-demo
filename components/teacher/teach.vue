<template>
    <div class="panel panel-default">
        <div class="panel-heading">我的教课列表</div>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>课程名</th>
                    <th>学分</th>
                    <th>上课时间/地点</th>
                    <th>人数/容量</th>
                    <th>查看课程信息</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="lesson in lessonList" v-cloak>
                    <td>{{lesson.get('name')}}</td>
                    <td>{{lesson.get('credit')}}</td>
                    <td>{{lesson.get('time')}} / {{lesson.get('location')}}</td>
                    <td>{{lesson.get('num')}} / {{lesson.get('max')}}</td>
                    <td><a v-link="{ name: 'lesson', params: { lessonId: lesson.id }}">查看课程信息</a></td>
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