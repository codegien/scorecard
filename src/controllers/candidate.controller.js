const candidateService = require("../services/candidate.service")
const api       = require('../utils/apiResponse');
const AppError = require("../utils/AppError");
exports.initiateRegistration = async (req, res, next) => {
    try{
        const candidate = await candidateService.initiateRegistration(req.body);
        api.created(res, {candidate}, 'Registration initited. Please complete the remaining step.');
    }catch(err){
        next(err);
    }
};

///step2
exports.updateAcademicInfo = async (req, res, next) => {
    try {
        const candidate = await candidateService.updateAcademicInfo(req.params.profileCode, req.body);
        api.success(res, {candidate}, 'Academic Information updated');
    } catch (error) {
        next(error)   
    }
}

//step 3

exports.assignExamCenter = async (req,res,next)=>{
    try {
        const candidate= await candidateService.assignExamCenter(req.params, request.body.centerCode);
        api.success(res, {candidate}, 'Exam ceter assigned')
    } catch (err) {
        console.error(err);
    }
}

//step 4
exports.uploadPassportPhoto = async (req, res, next) => {
    try {
        if(!req.file) return next(new Error('Please upload a passport photograph'));
        // if(!req.file) return next(new AppError('Please upload a passport photograph', 400));
        const photoData = {
            url:        req.file.path,
            filename:   req.file.filename,
        };

        const candidate = await candidateService.updatePassportPhoto(req.params.id, photoData);
        api.success(res, {candidate}, 'Passport photo uploaded')
    } catch (err) {
          console.error(err);

    }
    
}

//step -- 5 --- final
exports.finalizeRegistration = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}