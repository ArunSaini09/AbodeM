<<<<<<< HEAD
const {Model} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}

    User.init({
        firstName: {type: DataTypes.STRING},
        lastName: {type: DataTypes.STRING},
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        //only store hashed user passwords on databse 
        passwordHash: {type: DataTypes.STRING},
        //virtual means that there will not a be an actual password column in the db table but rather it will be stored locally 
        //on the machine and will be altered, the alteration happens in the User.beforeSave method defined below
        password: {
            type: DataTypes.VIRTUAL,
            validate: {
                isLongEnough: (val) => {
                    if(val.length < 7) {
                        throw new Error("Please choose a longer password");
                    }
                },
            },
        }, 
    }, {
            sequelize,
            modelName: 'user'
        
    })
    
    User.associate = (models) => {

    };

    //a sequelize hook that uses bcyrpt to hash the virtual password data and stores in the passwordHash db column
    User.beforeSave((user, options) => {
        if(user.password){
            user.passwordHash = bcrypt.hashSync(user.password, 10);
        }
    });

    return User;
}
=======
"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {}

	User.init(
		{
			user_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: true,
				notEmpty: true,
				validate: {},
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				notEmpty: true,
				validate: {
					isEmail: true,
				},
			},
			passwordHash: {
				type: DataTypes.STRING,
			},
			password: {
				type: DataTypes.VIRTUAL,
				allowNull: false,
				validate: {
					isLongEnough: (val) => {
						if (val.length < 7) {
							throw new Error(
								"password has be longer than 7 characters"
							);
						}
					},
				},		
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);

	User.associate = (models) => {
		User.hasMany(models.House, {
			foreignKey: 'owner_id',
			as: 'owner_id',
			allowNull: false
		});
	};

	User.beforeSave((user, options) => {
		if (user.password) {
			user.passwordHash = bcrypt.hashSync(user.password, 10);
			console.log(user.passwordHash);
		}
	});

	return User;
};
>>>>>>> deaf891ffdd64ab51a55af37009df52ae4d119fc
