const userService = {};
const User = require("../models/User");
const Otp = require("../models/Otp");
const order = require("../models/Order");
const item = require("../models/Item");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const _ = require("lodash");  

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


userService.register = async (options, res) => {
  try {
    const existingUser = await User.findOne({ email: options.email });
    if (existingUser) {
      res.status(401).json({
        message: "user Already Registered",
      });
    }
    const hashedPassword = await bcrypt.hash(options.password, 10);
    const result = await User.create({
      email: options.email,
      password: hashedPassword,
      username: options.name,
      phone: options.phone,
    });

    const token = await auth.generateAccessToken(options.email);
    return res.status(200).json({ user: result });

  } catch (error) {
    return error;
  }
};

userService.login = async (options, req, res) => {
  const user = await User.findOne({ email: options.email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const passwordMatch = await bcrypt.compare(options.password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ email: options.email }, "foodlab");
  const auth = {
    userId: user._id,
    id: user.id,
    phone: user.phone,
  }
  req.session.auth = auth;
  return res.status(200).json({ token, user });
};

userService.generateOtp = async (options, res) => {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);
  const randomnumber = Math.floor(Math.random() * 90000) + 10000;
  const user = await User.findOne({ _id: options.userId });
  client.messages
    .create({
      body: `your otp is ${randomnumber}`,
      from: "+15076323349",
      to: `+91${user.phone}`,
    })
    .then(() => {
      const newotp = new Otp({
        otp: randomnumber,
      });
      const savePromise = newotp.save();
      savePromise
        .then(() => {
          res.status(200).json({ message: "otp send successfully" });
        })
        .catch((err) => {
          console.error(err);
        });
    });
};

userService.placeOrder = async (values, res) => {
  const newOrderItem = new order({
    orderId: makeid(10),
  });

  newOrderItem
    .save()
    .then((savedOrderItem) => {
      const items = [];
      values.items.forEach((itm) => {
        items.push({
          ...itm,
          order: savedOrderItem._id,
        });
      });
      item
        .insertMany(items)
        .then((data) => {
          const savePromise = order.findOneAndUpdate(
            { _id: savedOrderItem._id },
            { items: data }
          );
          savePromise
            .then(() => {
              res.status(200).json({ message: "Order placed Successfully" });
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((error) => {
          console.error(`Error saving order: ${error}`);
        });
    })
    .catch((error) => {
      console.error(`Error saving order item: ${error}`);
    });
};

userService.verifyOtp = async (values, res) => {
  if (!values.otp) {
    return res.status(401).json({ message: "please enter otp" });
  }
  const otp = await Otp.findOne({ otp: values.otp, active: 1 });
  if (!otp) {
    return res.status(401).json({ message: "Invalid otp" });
  }
  await Otp.findOneAndUpdate({ otp: values.otp, active: 1 }, { active: 0 });
  return userService.placeOrder(values, res);
};

userService.findAllOrderForListing = async (res) => {
  const query = order
    .find()
    .populate("items")
    .populate("items.product");
  const docs = await query.exec();
  res.status(200).json({ data: docs });
};


userService.profile = async (res, req) => {
  const { userId }  = req.session
  const user = await User.findOne({ id: userId });
  res.status(200).json({ data: user });
};

module.exports = userService;
