const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const config = require("./config/key");

const { User } = require("./models/User");

// bodyParser는 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해줌
// 1. application/x-www-form-urlencoded 형태의 데이터 분석
app.use(bodyParser.urlencoded({ extended: true }));

// 2. application/json 타입의 데이터 분석
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! ~ nodemon을 사용합시다. 18");
});

app.post("/register", (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  // bodyParser가 req.body로 클라이언트에서 보내는 정보를 받을 수 있다.
  const user = new User(req.body);

  // mongoDB의 메소드
  user.save((err, userInfo) => {
    if (err) return res.json({ sucess: false, err });
    return res.status(200).json({
      sucess: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
