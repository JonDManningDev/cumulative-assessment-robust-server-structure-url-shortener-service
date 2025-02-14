const router = require('express').Router({ mergeParams: true });
const controller = require('./uses.controller');
const urlsRouter = require('../urls/urls.router');
const methodNotAllowed = require('../errors/method-not-allowed');

router.route("/:useId").get(controller.read).delete(controller.delete).all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;