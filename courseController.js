import { Eta } from "https://deno.land/x/eta@v3.1.0/src/index.ts";
import * as courseService from "./courseService.js";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const createCourse = async (c) => {
  const body = await c.req.parseBody();
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
    return c.html(
      eta.render("course.eta", { course: await courseService.getCourse(id)})
    );
  };
  
  const deleteCourse = async(c)=>{
    const courseId = c.req.param("courseId");
    await courseService.deleteCourse(courseId);
    return c.redirect("/courses");
  };

export{createCourse, showForm, showCourse, deleteCourse};