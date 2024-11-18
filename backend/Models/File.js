const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    iv: { type: String, required: true },
    secretKey: { type: String, required: true }, // Plaintext secret key
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model('File', fileSchema);
