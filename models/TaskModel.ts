import mongosse, {Schema} from 'mongoose';

const TaskSchema = new Schema({
    name : {type : String, required : true},
    userId : {type : String , required : true},
    finishPrevisionData : {type : Date, required : true},
    finishData : {type : Date, required : false},
});

export const TaskModel = mongosse.models.tasks || mongosse.model('tasks', TaskSchema);
