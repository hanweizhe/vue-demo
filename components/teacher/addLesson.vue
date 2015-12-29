<template>
    <div class="panel panel-default">
        <div class="panel-heading">我的教课列表</div>
        <div class="panel-body">
            <form class="form-horizontal">
                <div class="form-group">
                    <label class="col-sm-2 control-label">课程名</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="" v-model="name">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">学分</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="" v-model="credit">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">时间</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="" v-model="time">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">地点</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" placeholder="" v-model="location">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">课堂容量</label>
                    <div class="col-sm-8">
                        <input type="number" class="form-control" placeholder="" v-model="max">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-8">
                        <button type="submit" class="btn btn-default" v-on:click="addLesson(lesson)">添加</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    module.exports = {
        data: function(){
            return {
                
            }
        },
        methods: {
            addLesson: function(){
                var Lesson = AV.Object.extend('Lesson');
                var lesson = new Lesson();

                lesson.set('name', this.name);
                lesson.set('credit', parseInt(this.credit));
                lesson.set('time', this.time);
                lesson.set('location', this.location);
                lesson.set('max', parseInt(this.max));

                lesson.save(null, {
                    success: function(lesson) {
                        alert("添课成功！");

                        var user = AV.User.current();
                        var relation = user.relation('lesson');
                        relation.add(lesson);
                        user.save();

                        lesson.set('teacher', user.get('name'));
                        lesson.save();
                    },
                    error: function(lesson, error) {
                        console.log('Failed to create new object, with error message: ' + error.message);
                    }
                });
            }
        },
        ready: function(){
            
        }
    }
</script>