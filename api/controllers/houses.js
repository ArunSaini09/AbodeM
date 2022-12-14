const express = require("express");
const passport = require("../middlewares/authentication");
const { TableHints } = require("sequelize");
const router = express.Router();
const db = require("../models");
const { User, Bill, House, Rent, sequelize } = db;

/*
 ** middleware to verify that the specified house belongs to the current requester
 ** all routes that take in a *house/:house_id* will utilize this check first
 */
router.use(
  "*/house/:house_id*",
  passport.isAuthenticated(),
  (req, res, next) => {
    const { user_id } = req.user.dataValues;
    const { house_id } = req.params;
    House.findByPk(house_id).then((house) => {
      if (!house) {
        return res.sendStatus(404);
      } else if (house.dataValues.owner_id != user_id) {
        return res.sendStatus(401);
      } else {
        next();
      }
    });
  }
);

//return all houses of the current user
router.get("/", passport.isAuthenticated(), (req, res) => {
  const { user_id } = req.user.dataValues;
  console.log(user_id);
  House.findAll({
    where: {
      owner_id: user_id,
    },
  })
    .then((userHouses) => res.json(userHouses))
    .catch((err) => {
      res.status(400).json(err);
    });
});

//return a specific house record based on house_id
router.get("/house/:house_id", passport.isAuthenticated(), (req, res) => {
  house_id = req.params.house_id;
  House.findByPk(house_id).then((house) => {
    if (!house) {
      return res.sendStatus(404);
    }
    res.json(house);
  });
});

// create a house with a supplied address in the body
router.post("/house", passport.isAuthenticated(), (req, res) => {
  const { address } = req.body;
  const { user_id } = req.user.dataValues;

  House.create({ address, owner_id: user_id })
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// delete a specific house based on its house_id
router.delete("/house/:house_id", passport.isAuthenticated(), (req, res) => {
  const { house_id } = req.params;
  House.findByPk(house_id).then((house) => {
    if (!house) {
      return res.sendStatus(404);
    }
    house.destroy();
    res.sendStatus(204);
  });
});

// fill billsTable with many bill objects from a bills array in the body

router.post(
  "/house/:house_id/bills",
  passport.isAuthenticated(),
  (req, res) => {
    // let { electric, gas, mortgage, step, tenanted, water } = req.body;
    const { house_id } = req.params;

    //save each JSON bill to DB
    const saveBillsToDB = () => {
      const length = req.body.bills.length;
      let numSaved = 0;
      const savedBills = Array();

      console.log(req.body.bills);
      req.body.bills.forEach((bill) => {
        const { billType, amount, paidOff, link, dueDate } = bill;
        Bill.create({
          billType,
          amount,
          paidOff,
          link,
          dueDate,
          house_id: house_id,
        })
          .then((savedBill) => {
            numSaved++;
            savedBills.push(savedBill);
            if (numSaved == length) return res.json(savedBills);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      });
    };

    saveBillsToDB();
  }
);

//get every recorded bills and rent for a specific house
router.get(
  "/house/:house_id/records",
  passport.isAuthenticated(),
  (req, res) => {
    const { house_id } = req.params;
    const info = {};

    //get all bills of the house from DB
    Bill.findAll({
      where: {
        house_id: house_id,
      },
    })
      .then((bills) => {
        if (!bills) {
          return res.sendStatus(404);
        }
        info.bills = bills;
        findAllRent();
      })
      .catch((err) => {
        res.status(400).json(err);
      });

    //get all rents of the house from DB
    const findAllRent = () => {
      Rent.findAll({
        where: {
          house_id: house_id,
        },
      })
        .then((rents) => {
          if (!rents) {
            return res.sendStatus(404);
          }
          info.rents = rents;
          return res.json(info);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    };
  }
);

//get all bills of a specific billType for a specific house from billTable
router.get(
  "/house/:house_id/bills/billType/:billType?",
  passport.isAuthenticated(),
  (req, res) => {
    const { house_id, billType } = req.params;
    Bill.findAll({
      where: {
        billType: sequelize.where(
          sequelize.fn("LOWER", sequelize.col("billType")),
          "LIKE",
          "%" + billType.toLowerCase() + "%"
        ),
        house_id: house_id,
      },
    }).then((bills) => {
      if (!bills) {
        return res.sendStatus(404);
      }
      res.json(bills);
    });
  }
);

//add a bill to billTable
router.post("/house/:house_id/bill", passport.isAuthenticated(), (req, res) => {
  const { house_id } = req.params;
  const { billType, amount, paidOff, link, dueDate } = req.body;
  Bill.create({
    billType,
    amount,
    paidOff,
    link,
    dueDate,
    house_id: house_id,
  })
    .then((bill) => {
      return res.json(bill);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//update a bill in the billTable
router.put(
  "/house/:house_id/bill/:bill_id",
  passport.isAuthenticated(),
  (req, res) => {
    const { house_id, bill_id } = req.params;
    const { billType, amount, paidOff, link, dueDate } = req.body;

    Bill.findByPk(bill_id).then((bill) => {
      if (!bill) {
        return res.sendStatus(404);
      }

      bill.set({
        billType,
        amount,
        paidOff,
        link,
        dueDate,
        house_id,
      });

      bill
        .save()
        .then((bill) => {
          res.json(bill);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
  }
);

//modify a bill field in the billTable
router.patch(
  "/house/:house_id/bill/:bill_id",
  passport.isAuthenticated(),
  (req, res) => {
    const { house_id, bill_id } = req.params;
    const { ["house_id"]: removeHouseID, ...fieldsWithoutHouseID } = req.body; //destructure out house_id to prevent it from being changed

    Bill.findByPk(bill_id).then((bill) => {
      if (!bill) {
        return res.sendStatus(404);
      }

      bill.set({
        ...fieldsWithoutHouseID,
      });

      bill
        .save()
        .then((bill) => {
          res.json(bill);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
  }
);

//delete a bill in billTable
router.delete(
  "/house/:house_id/bill/:bill_id",
  passport.isAuthenticated(),
  (req, res) => {
    const { bill_id } = req.params;
    Bill.findByPk(bill_id).then((bill) => {
      if (!bill) {
        return res.sendStatus(404);
      }

      bill.destroy();
      res.sendStatus(204);
      // res.status(200).json(`Deleted bill ${bill_id} sucessfully`);
    });
  }
);

//get all rents of a house from rent table
router.get("/house/:house_id/rents", passport.isAuthenticated(), (req, res) => {
  const { house_id } = req.params;
  Rent.findAll({
    where: {
      house_id: house_id,
    },
  }).then((rents) => {
    if (!rents) {
      return res.sendStatus(404);
    }
    res.json(rents);
  });
});

//add a rent to rentTable
router.post("/house/:house_id/rent", passport.isAuthenticated(), (req, res) => {
  const { house_id } = req.params;
  const { amount, recieved, dueDate } = req.body;
  Rent.create({
    amount,
    recieved,
    dueDate,
    house_id: house_id,
  })
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//modify a rent in the rentTable
router.put(
  "/house/:house_id/rent/:rent_id",
  passport.isAuthenticated(),
  (req, res) => {
    const { house_id, rent_id } = req.params;
    const { amount, recieved, dueDate } = req.body;

    Rent.findByPk(rent_id).then((rent) => {
      if (!rent) {
        return res.sendStatus(404);
      }

      rent.set({
        amount,
        recieved,
        dueDate,
        house_id,
      });

      rent
        .save()
        .then((rent) => {
          res.json(rent);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
  }
);

//delete a rent  in rentTable
router.delete(
  "/house/:house_id/rent/:rent_id",
  passport.isAuthenticated(),
  (req, res) => {
    const { rent_id } = req.params;
    Rent.findByPk(rent_id).then((rent) => {
      if (!rent) {
        return res.sendStatus(404);
      }

      rent.destroy();
      res.sendStatus(204);
    });
  }
);

//modify a rent field in the rentTable
router.patch(
  "/house/:house_id/rent/:rent_id",
  passport.isAuthenticated(),
  (req, res) => {
    const { house_id, rent_id } = req.params;
    const { ["house_id"]: removeHouseID, ...fieldsWithoutHouseID } = req.body; //destructure out house_id to prevent it from being changed

    Rent.findByPk(rent_id).then((rent) => {
      if (!rent) {
        return res.sendStatus(404);
      }

      rent.set({
        ...fieldsWithoutHouseID,
      });

      rent
        .save()
        .then((rent) => {
          res.json(rent);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
  }
);

module.exports = router;
