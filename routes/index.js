const KoaRouter = require("koa-router");
const indexRouter = new KoaRouter();
var db = require("../data/database.js");

indexRouter.get("/", async function (ctx) {
	ctx.body = "Hello World";
});
indexRouter.get("/members", async function members(ctx, next) {
	let sql = `SELECT 
		m.firstName || ' ' || m.lastName AS fullName,
		m.company,
    	m.title,
    	m.department,
    	m.phone,
    	m.url,
    	m.image,
		a.address ||','|| a.city ||','|| a.state ||' '|| a.zip  AS fullAddress
		FROM members m 
		JOIN addresses a on m.id = a.memberId
		WHERE a.primaryAddress != 0
		`;
	return new Promise(function (resolve, reject) {
		db.all(sql, [], (err, rows) => {
			if (err) reject(err);
			else {
				ctx.status = 200;
				ctx.type = "application/json";
				ctx.body = { result: JSON.stringify(rows) };
				resolve({ rows: rows });
			}
		});
	});
});

module.exports = indexRouter;
