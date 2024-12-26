import { join } from "path";
import Koa from "koa";

const cors = require("@koa/cors");

import TrpcServer from "./trpc-server";

const App = async () => {
	const trpcServer = await TrpcServer();

	const app = new Koa();
	app.use(cors());
	app.use(trpcServer);

	return app;
};

export default App;
