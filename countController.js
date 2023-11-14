import * as countService from "./countService.js";

const getFeedbackCount = async (c) =>{
    const type = c.req.param("type");
    const feedbackCount = await countService.getFeedback(type);
     return c.text(`Feedback ${type}: ${feedbackCount}`);

};

const incrementFeedbackCount = async (c)=>{
    const type = c.req.param("type");
    await countService.incrementFeedback(type);
    return c.redirect('/');
    
};

export {getFeedbackCount, incrementFeedbackCount};