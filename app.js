import { Hono } from "https://deno.land/x/hono@v3.7.4/mod.ts";
import * as countController from "./countController.js";
import * as courseController from "./courseController.js"
import { Eta } from "https://deno.land/x/eta@v3.1.0/src/index.ts";
const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const app = new Hono();

app.post("/feedbacks/:type",  countController.incrementFeedbackCount);
app.post("/courses", courseController.createCourse);
app.post("/courses/:courseId/delete", courseController.deleteCourse);
app.get("courses/:courseId", courseController.showCourse);
app.get("/feedbacks/:type", countController.getFeedbackCount);
app.get("/courses", courseController.showForm);
app.get("/", async (c) => {
    return c.html(await eta.render("index.eta"));
  });


export default app;