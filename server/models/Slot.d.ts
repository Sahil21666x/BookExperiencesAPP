import mongoose from "mongoose";
export declare const SlotModel: mongoose.Model<{
    id: number;
    date: string;
    experienceId: number;
    time: string;
    capacity: number;
    booked: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    id: number;
    date: string;
    experienceId: number;
    time: string;
    capacity: number;
    booked: number;
}, {}, mongoose.DefaultSchemaOptions> & {
    id: number;
    date: string;
    experienceId: number;
    time: string;
    capacity: number;
    booked: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    id: number;
    date: string;
    experienceId: number;
    time: string;
    capacity: number;
    booked: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    id: number;
    date: string;
    experienceId: number;
    time: string;
    capacity: number;
    booked: number;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    id: number;
    date: string;
    experienceId: number;
    time: string;
    capacity: number;
    booked: number;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=Slot.d.ts.map