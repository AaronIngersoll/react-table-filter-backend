if (require.main === module) {
	throw new Error("Do not run directly. Use server.js to start.");
}

const Koa = require("koa");
var cors = require("koa-cors");
const koaStatic = require("koa-static");
var options = {
	origin: "*",
};
const app = new Koa();

// Register Routes
app.use(cors(options));
let indexRouter = require("./routes/index");

app.use(indexRouter.routes()).use(indexRouter.allowedMethods());

// Serve static files from public directory
app.use(koaStatic("./public"));

module.exports = app;
