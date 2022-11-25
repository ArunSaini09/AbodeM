"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Bill extends Model {}

	Bill.init(
		{
			billType: {
				type: DataTypes.STRING,
				notEmpty: true,
				allowNull: false,
				validate: {},
			},
			amount: {
				type: DataTypes.INTEGER,
			},
			paidOff: {
				type: DataTypes.BOOLEAN,
			},
			dueDate: {
				type: DataTypes.DATE,
				validate: {},
			},
		},
		{
			sequelize,
			modelName: "Bill",
		}
	);

	Bill.associate = (models) => {
		Bill.belongsTo(models.House, {
			foreignKey: "house_id",
			as: "house",
			allowNull: false,
		});
	};

	return Bill;
};
