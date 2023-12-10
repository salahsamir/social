import { DbConnected } from "../Db/DbConnect.js";
import { Auth } from "./Models/Auth/AuthRouter.js";
import { userRouter } from "./Models/User/userRouter.js";
import { GlobalError } from "./Utils/Error.js";

export const app = (express) => {
  const app = express();
  app.use(express.json());
  app.use("/auth", Auth);
  app.use("/user",userRouter)
  app.get("/", (req, res) => res.send("Hello World!"));
  DbConnected();
  const port = process.env.Port;
  app.use(GlobalError)
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};