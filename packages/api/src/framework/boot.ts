import Server from "./koa";

(async () => {
	const server = await Server();
	server.listen(process.env.PORT || 3000);
})();
