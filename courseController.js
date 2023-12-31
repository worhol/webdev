import { Eta } from "https://deno.land/x/eta@v3.1.0/src/index.ts";
import * as courseService from "./courseService.js";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import {
  getSignedCookie,
} from "https://deno.land/x/hono@v3.7.4/helper.ts";
import * as countController from "./countController.js";

const validator = z.object({
  course: z.string().min(4, {
    message: "The course name should be a string of at least 4 characters.",
  }),
});

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });
const secret = "secret";


const createCourse = async (c) => {
  const body = await c.req.parseBody();
  const validationresult = validator.safeParse(body);
  if (!validationresult.success) {
    return c.html(
      eta.render("courses.eta", {
        ...body,
        errors: validationresult.error.format(),
        courses: await courseService.listCourses()
      })
    );
  }
  await courseService.createCourse(body);
  return c.redirect("/courses");
};

const showForm = async (c) => {
  return c.html(
    eta.render("courses.eta", { courses: await courseService.listCourses() })
  );
};

const showCourse = async (c) => {
  const id = c.req.param("courseId");
  const sessionId =
    (await getSignedCookie(c, secret, "sessionId"));
    const count = countController.getSessionCounts(sessionId, id);
  return c.html(
    eta.render("course.eta", { course: await courseService.getCourse(id), count: count })
  );
};

const deleteCourse = async (c) => {
  const courseId = c.req.param("courseId");
  await courseService.deleteCourse(courseId);
  return c.redirect("/courses");
};

export { createCourse, showForm, showCourse, deleteCourse };
