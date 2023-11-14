const createCourse = async (course) => {
  course.id = crypto.randomUUID();
  const kv = await Deno.openKv();
  await kv.set(["courses", course.id], course);
};
const listCourses = async () => {
  const kv = Deno.openKv();
  const coursesEntries = (await kv).list({ prefix: ["courses"] });
  const courses = [];
  for await (const entry of coursesEntries) {
    courses.push(entry.value);
  }
  return courses;
};

const getCourse = async (id) => {
  const kv = await Deno.openKv();
  const course = await kv.get(["courses", id]);
  return course?.value ?? {};
};

const deleteCourse = async (id) => {
  const kv = await Deno.openKv();
  await kv.delete(["courses", id]);
};

export { createCourse, listCourses, getCourse, deleteCourse };
