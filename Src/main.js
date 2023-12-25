
import { DbConnected } from "../Db/DbConnect.js";
import { Auth } from "./Models/Auth/AuthRouter.js";
import { CategoryRouter } from "./Models/Category/CategoryRouter.js";
import { subCategoryRouter } from "./Models/Subcategory/subcategory.router.js";

import { userRouter } from "./Models/User/userRouter.js";
import { GlobalError } from "./Utils/Error.js";
import cors from 'cors'
export const app = (express) => {
  const app = express();
  app.use(express.json());
  app.use(cors())
  app.use("/auth", Auth);
  app.use("/user",userRouter)
app.use('/category',CategoryRouter)
app.use('/subcategory',subCategoryRouter)

  app.get("/", (req, res) => res.send("Hello World!"));
  DbConnected();
  const port = process.env.Port;
  app.use(GlobalError)
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};
