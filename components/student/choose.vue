<template>
    <div class="panel panel-default">
        <div class="panel-heading">开始选课</div>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>课程名</th>
                    <th>任课老师</th>
                    <th>学分</th>
                    <th>上课时间/地点</th>
                    <th>人数/容量</th>
                    <th>选课</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="lesson in lessonList">
                    <td>{{lesson.get('name')}}</td>
                    <td>{{lesson.get('teacher')}}</td>
                    <td>{{lesson.get('credit')}}</td>
                    <td>{{lesson.get('time')}} / {{lesson.get('location')}}</td>
                    <td>{{lesson.get('num')}} / {{lesson.get('max')}}</td>
                    <td v-if="hasChoose[$index]">已选</td>
                    <td v-else><a href="javascript:void(0)" v-on:click="choose(lesson)">选课</a></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    module.exports = {
        data: function(){
            return {
                lessonList: [],
                hasChoose: []
            }
        },
        methods:{
            choose: function(lesson){
                //学生与课程多对多关系
                var user = AV.User.current();
                var relation = user.relation('lesson');
                relation.add(lesson);
                user.save();

                var relation1 = lesson.relation('student');
                relation1.add(user);
                lesson.save();

                alert("选课成功！");
                this.fetch();
            },
            fetch: function(){
                var Lesson = AV.Object.extend('Lesson');
                var query = new AV.Query(Lesson);
                var that = this;
                query.find({
                    success: function(results) {
                        //获取课程列表
                        that.lessonList = results;
                        for (var i = 0;i < that.lessonList.length; i++){
                            (function(i){
                                var relation = that.lessonList[i].relation('student');
                                relation.query().find({
                                    success: function(list) {
                                        that.lessonList[i].set('num', list.length);
                                        that.lessonList[i].save();

                                        //有点小bug...
                                        hasChoose[i] = 0;
                                        for(var j = 0;j < list.length; j++) {
                                            if (list[j].get('id') == AV.User.current().get('id')){
                                                hasChoose[i] = 1;
                                            }
                                        }
                                        console.log(i, hasChoose[i]);
                                    },
                                    error: function(error){
                                        console.log(error);
                                    }
                                });
                            }(i))
                        }
                    },
                    error: function(error) {
                        console.log('Error: ' + error.code + ' ' + error.message);
                    }
                });
            }
        },
        ready: function(){
            this.fetch();
        }
    }
</script>