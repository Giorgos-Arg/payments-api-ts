import db from "./src/db/index";
import app from "./app";

const port = process.env.PORT || 3000;

db.connect().then(() => {
  app.listen(port, () => {
    console.log("Payments API server started on: " + port);
  });
});
