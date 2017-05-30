import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from "jsonwebtoken";

let UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, lowercase: true },
  diplayname: { type: String, lowercase: true, unique: true},
  email: { type: String, unique: true, lowercase: true },
  passwordHash: String,
  salt: String
})

UserSchema.method('setPassword', function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
});

UserSchema.method('validatePassword', function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return (hash === this.passwordHash);
});

UserSchema.method('generateJWT', function() {
  return jwt.sign({
    id: this._id,
    username: this.username,
    email: this.email
  }, 'SecretKey');
});
let User = mongoose.model("User", UserSchema);
export default User
