const express = require("express");
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require("../models");
const { User, Bill, House, Rent, sequelize } = db;


/* 
** middleware to verify that the specified house belongs to the current requester 
**  all routes that take in a *house/:house_id*will utilize this check first 
*/
const checkUserOwnsHouse = router.use('*/house/:house_id*', (req, res, next) => {
	const { user_id } = req.user.dataValues;
	const { house_id } = req.params;
	House.findByPk(house_id).then((house) => {
		if (!house) {
			return res.sendStatus(404);
		} else if(house.dataValues.owner_id!=user_id){
			return res.sendStatus(401);
		} else{
			next();
		}
	});
});

module.exports =  checkUserOwnsHouse;