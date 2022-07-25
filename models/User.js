const mongoose = require("mongoose");

const userSchema = mongoose.SchemaType({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    /*빈칸(공백) 삭제*/ trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    /* 토큰 유효기간 */ type: SVGAnimatedNumberList,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
