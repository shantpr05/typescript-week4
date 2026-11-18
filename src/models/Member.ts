
import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Member = sequelize.define(
  "Member",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "members",
    timestamps: false,
  }
);

export default Member;
