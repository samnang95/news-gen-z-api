const mongoose = require('mongoose');
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const Category = mongoose.model('Category', new mongoose.Schema({}, { strict: false }));
  const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
  console.log("Categories:", await Category.find());
  console.log("Users:", await User.find());
  process.exit();
}
run();
