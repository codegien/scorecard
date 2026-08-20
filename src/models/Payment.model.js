const { required } = require('joi');
const mongoose =require('mongoose');


const paymentSchema = new mongoose.Schema({
    candidateId: {
        type: moongose.schema.Types.Object,
        ref: 'Candidate',
        required: true,
    },
    registrationNumber: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        default:  4700
    },
    currency: {
        type: String,
        default: 'NGN'
    },
    reference: {
        type: String,
        required: true,
        unique: true
    },
    accessCode: String,
    authorizationUrl: String,
    status: {
        type: String,
        enum: ['pending', 'success', 'failed', 'abandoned'],
        default: 'pending'
    },
    transactionData: {
        type: mongoose.Schema.Types.Mixed,
    },
    paymentMethod: String,
    paidAt: Date,
    metadata: {
        type: mongoose.Schema.Types.Mixed,
    },
    retryCount: {
        type: Number,
        default: 0,
    },
},
{
    timestamp: true,
}
);

paymentSchema.index({reference: 1 });
paymentSchema.index({candidateId: 1 });
paymentSchema.index({registrationNumber: 1 });
paymentSchema.index({status: 1 });
paymentSchema.index({createdAt: -1 });


module.exports = mongoose.model('Payment', paymentSchema);