const axios = require('axios');
const crypto = require('crypto');
const payment = require('../models/Payment.model');
const Candidate = require('../models/Candidate.model');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');


class PaymentService {
    constructor(){

        this.secretKey = process.env.PAYSTACK_SECRET_KEY;
        this.publicKey = process.env.PAYSTACK_PUBLIC_KEY;
        this.webhookSecret= process.env.PAYSTACK_WEBHOOK_SECRET;
        this.baseURL = process.env.NODE_ENV === 'production'? 'https://api.scorecard.com': 'https://';

        this.amount = process.env.EXAM_FEE || 4700;  //N4700
    }

    async initializePayment(candidateId, email, callbackUrl){
        try{

        } catch(err){}
    }

}