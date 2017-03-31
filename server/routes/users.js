import express from "express";
import userCtrl from "../controllers/users";
import auth from "../../config/jwt";

const router = express.Router();

/**
 * @apiDefine UserNotFoundError
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample UserNotFound Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": 400,
 *       "message": "User not found"
 *     }
 */

router.route("/")
  /**
   * @api {get} /api/users List all users
   * @apiName GetUsers
   * @apiGroup Users
   *
   * @apiUse AuthorizationHeader
   *
   * @apiSuccess {Object[]} users List of users
   * @apiSuccess {String} users._id ID of the user
   * @apiSuccess {String} users.username Username of the user
   * @apiSuccess {String} users.password Encrypted password of the user
   * username/password combination.
   *
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 Success
   *     [
   *       {
   *        "_id":
   *        "username": "a_user",
   *        "password": "$2a$10$4kGSUCjFpSSIGS6T3Vpb7O..."
   *       },
   *       {
   *        "_id":
   *        "username": "another_user",
   *        "password": "$2a$10$4kGSUCjFpSSIGS6T3Vpb7O..."
   *       }
   *     ]
   *
   * @apiUse NotAuthorizedError
   * @apiUse InternalServerError
   * @apiUse UserNotFoundError
   **/
  .get(auth, userCtrl.list)

  /** POST /api/users - Create new user */
  .post(userCtrl.create);

router.route("/:id")
  .all(auth)
  /** GET /api/users/:id - Get user */
  .get(auth, userCtrl.get)

  /** PUT /api/users/:id - Update user */
  .put(auth, userCtrl.update)

  /** DELETE /api/users/:id - Delete user */
  .delete(auth, userCtrl.remove);

/** Load user when API with id route parameter is hit */
router.param("id", userCtrl.load);

export default router;
