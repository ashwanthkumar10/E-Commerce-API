const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const { Schema, model } = mongoose;

const AdminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
});

// Hash password before saving
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 10); //Access Hash
  next();
});

module.exports = model("Admin", AdminSchema);
