import { prop, getModelForClass } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class {{varCap name}} {
    _id: Types.ObjectId;
    
}

export const {{varCap name}}Model = getModelForClass({{varCap name}});