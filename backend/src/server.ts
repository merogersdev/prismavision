import "dotenv/config";
import env from "./util/validateEnv";
import pc from "picocolors";
import app from "./app";

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(pc.blue(`> Server listening on port: ${PORT}...`));
});
