export default {
  env: "development",
  db: "mongodb://localhost/simple-task-es-api-dev",
  port: process.env.PORT || 3000,
  jwtSecret: "123456abcdef",
  jwtDuration: "2 hours"
};
