"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class House extends Model {}

	House.init(
		{
			address: {
				type: DataTypes.STRING,
				notEmpty: true,
				allowNull: false,
				unique: true,
				validate: {},
			},
			miscellaneous: {
				type: DataTypes.STRING,
				notEmpty: true,
				validate: {},
			},
		},
		{
			sequelize,
			modelName: "House",
		}
	);

	House.associate = (models) => {
		House.belongsTo(models.User, {
			foreignKey: "owner_id",
			as: "owner",
			allowNull: false,
		});
	};

	return House;
};
