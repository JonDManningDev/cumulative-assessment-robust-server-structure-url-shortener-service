const router = require('express').Router({ mergeParams: true });
const controller = require('./urls.controller');
const usesController = require("../uses/uses.controller");
const methodNotAllowed = require('../errors/method-not-allowed');

router.route("/:urlId/uses/:useId").get(controller.urlExists, usesController.read).delete(controller.urlExists, usesController.delete).all(methodNotAllowed);

router.route("/:urlId/uses").get(controller.urlExists, usesController.list).all(methodNotAllowed);

router.route("/:urlId").get(controller.read).put(controller.update).all(methodNotAllowed);

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

module.exports = router;