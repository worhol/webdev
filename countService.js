const getFeedback = async (courseId, type) => {
  const kv = await Deno.openKv();
  const key = [`feedback_${courseId}_${type}`];
  const count = await kv.get(key);
  return count.value ?? 0;
};

const incrementFeedback = async (courseId, type) => {
  let counter = await getFeedback(courseId, type);
//   console.log(`Counter: ${counter}`);
  counter++;
  await setFeedback(courseId, counter, type);
};

const setFeedback = async (courseId, count, type) => {
  const kv = await Deno.openKv();
  //   const key = [`${courseId}${type}`];
  const key = [`feedback_${courseId}_${type}`];
  await kv.set(key, count);
//   console.log(`Set count ${count} for key ${key}`);
};

export { getFeedback, incrementFeedback };
