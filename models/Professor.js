const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ProfessorSchema = new mongoose.Schema({
  username: String,
  password: String
});

ProfessorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Professor', ProfessorSchema);