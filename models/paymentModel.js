const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Payment = sequelize.define(
  "Payment",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    candidate_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    payment_Date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    payment_status: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    payment_method: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    transaction_id: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  },
  { tableName: "payments", timestamps: false }
);

module.exports = Payment;
