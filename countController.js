import * as countService from "./countService.js";
const getFeedbackCount = async (c) => {
  const type = c.req.param("type");
  const courseId = c.req.param("courseId");
  // console.log(`Type: ${type}, Course ID: ${courseId}`);
  const feedbackCount = await countService.getFeedback(courseId, type);
  // console.log(`Feedback Count: ${feedbackCount}`);
  return c.text(`Feedback ${type}: ${feedbackCount}`);
};

const incrementFeedbackCount = async (c) => {
  const type = c.req.param("type");
  const courseId = c.req.param("courseId");
  await countService.incrementFeedback(courseId, type);
  return c.redirect(`/courses/${courseId}`);
};

export { getFeedbackCount, incrementFeedbackCount };
