const mongoose = require('mongoose');


const connectDB = async (mongoUri) => {
try {
const conn = await mongoose.connect(mongoUri, {
// defaults in mongoose 7+ are fine; keep options minimal
});
console.log(`MongoDB Connected: ${conn.connection.host}`);
} catch (error) {
console.error(`Error: ${error.message}`);
process.exit(1);
}
};


module.exports = connectDB;