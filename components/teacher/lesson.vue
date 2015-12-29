<template>
    <div class="panel panel-default">
        <div class="panel-heading">已选该课程的学生列表</div>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>学生姓名</th>
                    <th>学号</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="student in studentList">
                    <td>{{student.get('name')}}</td>
                    <td>{{student.get('username')}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>

    module.exports = {
        data: function(){
            return {
                studentList: []
            }
        },
        methods:{
            fetch: function(){
                var Lesson = AV.Object.extend('Lesson');
                var query = new AV.Query(Lesson);
                var that = this;

                query.equalTo('objectId', this.$route.params.lessonId);
                query.first({
                    success: function(object) {
                        var relation = object.relation('student');
                        relation.query().find({
                            success: function(list) {
                                that.studentList = list;
                            }
                        });
                    }
                });
            }
        },
        ready: function(){
            this.fetch();
        }
    }
</script>