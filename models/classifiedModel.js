const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const ClassifiedListing = sequelize.define(
  "ClassifiedListing",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    person_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    firm_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    firm_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    website: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    business_category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    photos: {
      type: DataTypes.STRING(1000), // store comma-separated URLs
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "disapproved"),
      allowNull: false,
      defaultValue: "pending",
    },
    approval_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "admin_users", // table name
        key: "id",
      },
    },
    approval_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "classified_listings",
    timestamps: false, // because you already have created_at (no updatedAt)
  }
);

module.exports = ClassifiedListing;
