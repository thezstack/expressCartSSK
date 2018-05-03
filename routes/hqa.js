const express = require('express');
const router = express.Router();
const colors = require('colors');
const async = require('async');
// const _ = require('lodash');
 const common = require('../lib/common');

router.get('/hqa', async (req, res) => {
    console.log(req.session.cart)
    let db = req.app.db;
    let config = req.app.config;
    let numberProducts = config.productsPerPage ? config.productsPerPage : 6;

    if(req.params.page === '/hqa'){
        router.get('/hqa', (req, res) => {
            res.render('/hqa');
        });
    };
    // if no page is specified, just render page 1 of the cart
    if(!req.params.page){
        Promise.all([
            common.getData(req, 1, {}),
            common.getMenu(db)
        ])
        .then(([results, menu]) => {
            // If JSON query param return json instead
            if(req.query.json === 'true'){
                res.status(200).json(results.data);
                return;
            }

            res.render(`${config.themeViews}hqa`, {
                title: `${config.cartTitle} - Shop`,
                theme: config.theme,
                results: results.data,
                session: req.session,
                message: common.clearSessionValue(req.session, 'message'),
                messageType: common.clearSessionValue(req.session, 'messageType'),
                pageCloseBtn: common.showCartCloseBtn('page'),
                config: req.app.config,
                productsPerPage: numberProducts,
                totalProductCount: results.totalProducts,
                pageNum: 1,
                paginateUrl: 'page',
                helpers: req.handlebars.helpers,
                showFooter: 'showFooter',
                menu: common.sortMenu(menu)
            });
        })
        .catch((err) => {
            console.error(colors.red('Error getting products for page', err));
        })}

    });
module.exports = router;