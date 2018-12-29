const express = require("express");

var api = express.Router();
var adminRouter = require("./admin/adminRouter.js");
var usersRouter = require("./users/usersRouter.js");
var savingsRouter = require("./savings/savingsRouter.js");
var loansRouter = require("./loans/loansRouter.js");
var productsRouter = require("./product/productRouter.js");
var storeRouter = require("./store/storeRouter.js");
var logsRouter = require("./logs/logsRouter.js");


api.use("/admins", adminRouter);
api.use("/users", usersRouter);
api.use("/savings", savingsRouter);
api.use("/loans", loansRouter);
api.use("/store/loans", storeRouter);
api.use("/products", productsRouter);
api.use("/logs", logsRouter);

module.exports = api;