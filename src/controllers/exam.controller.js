const ExamCenter = require('../models/ExamCenter.model');
const api        = require('../utils/apiResponse');
const AppError   = require('../utils/AppError');

//Create exam center
exports.createCenter =  async (req, res, next) => {
    try{
        const center = await ExamCenter.create(req.body);
        api.created(res, {center}, 'Exam center created');
    }catch(err){
        next(err);
    }
}
//get all active exam center
//get centre by center code
//update center
// get ceter statistics