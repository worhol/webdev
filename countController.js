import * as countService from "./countService.js";
import {
  getSignedCookie,
  setSignedCookie,
} from "https://deno.land/x/hono@v3.7.4/helper.ts";
const sessionCounts = new Map();
const secret = "secret";

const getAndIncrementCount = (sessionId, courseId) => {
  let courseCounts = sessionCounts.get(sessionId);

  if (!courseCounts) {
    courseCounts = new Map();
    sessionCounts.set(sessionId, courseCounts);
  }

  let count = courseCounts.get(courseId) ?? 0;
  count++;
  courseCounts.set(courseId, count);
  return count;
};
const getSessionCounts = (sessionId, courseId) => {
  const courseCounts = sessionCounts.get(sessionId);
  const count = courseCounts?.get(courseId) ?? 0;
  return count;
};
const getFeedbackCount = async (c) => {
  const type = c.req.param("type");
  const courseId = c.req.param("courseId");
  const feedbackCount = await countService.getFeedback(courseId, type);
  return c.text(`Feedback ${type}: ${feedbackCount}`);
};

const incrementFeedbackCount = async (c) => {
  const type = c.req.param("type");
  const courseId = c.req.param("courseId");
  const sessionId =
    (await getSignedCookie(c, secret, "sessionId")) ?? crypto.randomUUID();

  await countService.incrementFeedback(courseId, type);
  await setSignedCookie(c, "sessionId", sessionId, secret, {
    path: "/",
  });
  getAndIncrementCount(sessionId, courseId);
  return c.redirect(`/courses/${courseId}`);
};

export { getFeedbackCount, incrementFeedbackCount, getSessionCounts };
