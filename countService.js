const getFeedback = async (courseId, type) => {
  const kv = await Deno.openKv();
  const key = [`feedback_${courseId}_${type}`];
  const count = await kv.get(key);
  return count.value ?? 0;
};

const incrementFeedback = async (courseId, type) => {
  let counter = await getFeedback(courseId, type);
  counter++;
  await setFeedback(courseId, counter, type);
};

const setFeedback = async (courseId, count, type) => {
  const kv = await Deno.openKv();
  const key = [`feedback_${courseId}_${type}`];
  await kv.set(key, count);
};

export { getFeedback, incrementFeedback };
