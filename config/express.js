import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import expressValidation from "express-validation";
import bodyParser from "body-parser";
import routes from "../server/routes";
import logger from "../server/helpers/logger";

const app = express();

app.use(express.static("docs"));
app.use(morgan("common", {
    stream: {
        write: (message) => {
            logger.info(message);
        }
    },
    skip: (req, res) => {
        return req.url.indexOf("/apidoc") > -1;
    }
}));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mount all routes on /api path
app.use("/api", routes);

app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
      res.status(err.status).json(err);
    } else {
      res.status(500)
        .json({
          status: err.status,
          message: err.message
        });
    }
});

export default app;
