import express from "express";
import validate from "express-validation";
import taskCtrl from "../controllers/tasks";
import validations from "./validation/tasks";
import auth from "../../config/jwt";

const router = express.Router();

router.route("/")
  .all(auth)
  /** GET /api/tasks - Get list of tasks */
  .get(taskCtrl.list)

  /** POST /api/tasks - Create new task */
  .post(validate(validations.createTask), taskCtrl.create);

router.route("/:id")
  .all(auth)
  /** GET /api/tasks/:id - Get task */
  .get(taskCtrl.get)

  /** PUT /api/tasks/:id - Update task */
  .put(validate(validations.updateTask), taskCtrl.update)

  /** DELETE /api/tasks/:id - Delete task */
  .delete(taskCtrl.remove);

/** Load task when API with id route parameter is hit */
router.param("id", validate(validations.getTask));
router.param("id", taskCtrl.load);

export default router;
