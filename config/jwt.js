import config from "./env";
import expressJwt from "express-jwt";

const authenticate = expressJwt({
  secret: config.jwtSecret
});

export default authenticate;
