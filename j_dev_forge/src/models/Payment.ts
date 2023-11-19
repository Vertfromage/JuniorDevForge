import mongoose from 'mongoose'
import validator from 'validator' //https://www.npmjs.com/package/validator

function validateURL(value: string) {
    return validator.isURL(value, { require_tld: false });
}

export interface Payment extends mongoose.Document {
    transaction_id: string
    project_id: mongoose.Types.ObjectId; //References Projects
    amount: number
    time_stamp: Date
}

const PaymentSchema = new mongoose.Schema<Payment>({
    transaction_id:{
        type: String,
        required: true,
        unique: true,
    },
    project_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects', //Reference to the Projects model
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    time_stamp:{
        type: Date,
        required: true,
    },
})

<<<<<<< HEAD
export default mongoose.models.Payment || mongoose.model<Payment>('Payment', PaymentSchema)
=======
export default mongoose.models.Payment || mongoose.model<Payment>('Payment', PaymentSchema)
>>>>>>> origin/main
