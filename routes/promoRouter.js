var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Promotions = require('../models/promotions');

var promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .get((req, res, next) => {
        Promotions.find({})
            .then((promotions) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions)
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post((req, res, next) => {
        Promotions.create(req.body)
            .then((promotion) => {
                console.log('Promotion Created ', promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })

    .delete((req, res, next) => {
        Promotions.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))//then
        .catch((err) => next(err));
    });

promoRouter.route('/:promoId')
    .get((req, res, next) => {
        Promotions.findById(req.params.promoId)
        .then((promotions) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotions)
        }, (err) => next(err))
        .catch((err) => next(err));
    })

    .put((req, res, next) => {
        Promotions.findByIdandUpdate(req.params.promoId, {
            $set: req.body
        }, { new: true })
        .then((promotions) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotions)
        }, (err) => next(err))
        .catch((err) => next(err));
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes' + req.params)
    })

    .delete((req, res, next) => {
        Promotions.findByIdandRemove(req.params.promoId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp)
        }, (err) => next(err))
        .catch((err) => next(err));
    });

exports.router = promoRouter;