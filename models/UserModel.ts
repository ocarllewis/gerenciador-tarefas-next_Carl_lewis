import mongosse, {Schema} from 'mongoose';

const UserSchema = new Schema({
    name : {type : String, required : true},
    email : {type : String, required : false},
    password : {type : String, required : true},
});

export const UserModel = mongosse.models.users || mongosse.model('users', UserSchema);
