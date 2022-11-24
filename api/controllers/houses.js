const express = require("express");
const passport = require("../middlewares/authentication");
const { TableHints } = require("sequelize");
const router = express.Router();
const db = require("../models");
const { User, Bill, House, Rent } = db;

//return json of houses based on userID
router.get("/", passport.isAuthenticated(), (req, res) => {
	const { userId } = req.paramsl;
	House.findAll({
		where: {
			ownerID: userId,
		},
	}).then((userHouses) => res.json(userHouses));
});

//return house specific information
router.get("/house/:id", passport.isAuthenticated(), (req, res) => {
	const { id, userId } = req.params;
	House.findByPk(id).then((house) => {
		if (!house) {
			return res.sendStatus(404);
		}
		res.json(house);
	});
});

// Address endpoint - create a house based on address
router.post("/house", passport.isAuthenticated(), (req, res) => {
	const { address } = req.body;
	House.create({ address })
		.then((newPost) => {
			res.status(201).json(newPost);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

// delete a house based on id
router.delete("/house/:id", passport.isAuthenticated(), (req, res) => {
	const { id, userId } = req.params;
	House.findByPk(id).then((house) => {
		if (!house) {
			return res.sendStatus(404);
		}
		house.destroy();
		res.sendStatus(204);
	});
});

//update billsTable with all bill information
router.post("/form/bills", passport.isAuthenticated(), (req, res) => {
	// let { electric, gas, mortgage, step, tenanted, water } = req.body;

	req.body.forEach((item) => {
		const { billType, amount, paidOff, dueDate } = item;
		Bill.create({
			billType,
			amount,
			paidOff,
			dueDate,
		});
	});
});

//return all bills and other information for a specific house
router.get("/house/:id/records", passport.isAuthenticated(), (req, res) => {
	const { houseID } = req.params;
	const info = {};
	Bill.findAll({
		where: {
			house: houseID,
		},
	}).then((records) => {
		if (!records) {
			return res.sendStatus(404);
		}
		info.records = records;
	});
});

//get all bills of a specific billType from billTable
router.get(
	"/house/:id/bills/billType/:billType?",
	passport.isAuthenticated(),
	(req, res) => {
		const { id } = req.params;
		Bill.findByPk(id).then((mpost) => {
			if (!mpost) {
				return res.sendStatus(404);
			}
			res.json(mpost);
		});
	}
);

//add a bill to billTable
router.post(
	"/house/:id/bill/:billID",
	passport.isAuthenticated(),
	(req, res) => {
		const { id } = req.params;
	}
);

//modify a bill in the billTable
router.put(
	"/house/:id/bill/:billID",
	passport.isAuthenticated(),
	(req, res) => {
		const { id } = req.params;
	}
);

//delete a bill in billTable
router.delete(
	"/house/:id/bill/:billID",
	passport.isAuthenticated(),
	(req, res) => {
		const { id } = req.params;
	}
);

//get a rent from rent table
router.get("/house/:id/rents", passport.isAuthenticated(), (req, res) => {
	const { id } = req.params;
});

//add a rent to rentTable
router.post(
	"/house/:id/rent/:rentID",
	passport.isAuthenticated(),
	(req, res) => {
		const { id } = req.params;
	}
);

//modify a rent in the rentTable
router.put(
	"/house/:id/rent/:rentID",
	passport.isAuthenticated(),
	(req, res) => {
		const { id } = req.params;
	}
);

//delete a rent  in rentTable
router.delete(
	"/house/:id/rent/:rentID",
	passport.isAuthenticated(),
	(req, res) => {
		const { id } = req.params;
	}
);

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   MicroPost.findByPk(id).then((mpost) => {
//     if (!mpost) {
//       return res.sendStatus(404);
//     }

//     mpost.content = req.body.content;
//     mpost
//       .save()
//       .then((updatedPost) => {
//         res.json(updatedPost);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   });
// });

module.exports = router;
