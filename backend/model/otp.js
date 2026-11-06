const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  otp: { type: String, required: true },
  //expiresAt: { type: Date, required: true, index: { expires: '1m' } }, // Automatically delete OTP after 1 minute
expiresAt: {
  type: Date,
  expires: 60 // auto delete after 60 seconds
}

});


const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;