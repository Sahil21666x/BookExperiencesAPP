import mongoose from "mongoose";
export declare const BookingModel: mongoose.Model<{
    id: number;
    experienceId: number;
    userName: string;
    email: string;
    slotId: number;
    quantity: number;
    totalPrice: string;
    discount: string;
    bookingStatus: string;
    createdAt: NativeDate;
    promoCode?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    id: number;
    experienceId: number;
    userName: string;
    email: string;
    slotId: number;
    quantity: number;
    totalPrice: string;
    discount: string;
    bookingStatus: string;
    createdAt: NativeDate;
    promoCode?: string | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    id: number;
    experienceId: number;
    userName: string;
    email: string;
    slotId: number;
    quantity: number;
    totalPrice: string;
    discount: string;
    bookingStatus: string;
    createdAt: NativeDate;
    promoCode?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    id: number;
    experienceId: number;
    userName: string;
    email: string;
    slotId: number;
    quantity: number;
    totalPrice: string;
    discount: string;
    bookingStatus: string;
    createdAt: NativeDate;
    promoCode?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    id: number;
    experienceId: number;
    userName: string;
    email: string;
    slotId: number;
    quantity: number;
    totalPrice: string;
    discount: string;
    bookingStatus: string;
    createdAt: NativeDate;
    promoCode?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    id: number;
    experienceId: number;
    userName: string;
    email: string;
    slotId: number;
    quantity: number;
    totalPrice: string;
    discount: string;
    bookingStatus: string;
    createdAt: NativeDate;
    promoCode?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=Booking.d.ts.map