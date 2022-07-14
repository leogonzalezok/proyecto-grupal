const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('player', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    telephone:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      primaryKey:true,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    city:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    elo:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:0,
    },
    status:{
      type: DataTypes.ENUM("allowed","Banned"),
      allowNull: false,
      defaultValue:"allowed"
    }
  },{
    timestamps:false
  });
};
