import { Schema, model } from 'mongoose';
import crypto from 'crypto';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const userSchema = Schema(
  {
    firstname: {
      type: String,
      maxlength: 30,
    },
    lastname: {
      type: String,
      maxlength: 30,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide your email'],
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
    google: String,
    facebook: String,
    photo: String,
    // token: String,
    tokenExp: Number,
    salt: {
      type: String,
      select: false,
    },
    hash: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre('save', function (next) {
  this.token = this.generateToken();
  next();
});

userSchema.methods.setPassword = function (password) {
  // no arrow
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function (password) {
  console.log('salt:', this.salt);
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateToken = function () {
  const expiredDate = new Date();
  expiredDate.setDate(new Date().getDate() + 2);
  this.token = jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(expiredDate.getTime() / 1000, 10),
    },
    'secret',
  );
  return this.token;
};

userSchema.statics.findByToken = async function (token) {
  const user = this;
  jwt.verify(token, 'secret', async (err, { id }) => {
    const checkUser = await user.findById(id);
    console.log('ttttttt:', checkUser, checkUser.token);
    return checkUser.token === token;
  });
  return false;
};

const User = model('User', userSchema);

export default User;
