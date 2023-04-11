const userService = {};
const User = require("../models/User");
const Otp = require("../models/Otp");
const order = require("../models/Order");
const item = require("../models/Item");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");

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

console.log(makeid(5));

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
    return {
      data: {
        user: result,
        token,
      },
    };
  } catch (error) {
    return error;
  }
};

userService.login = async (options, res) => {
  const user = await User.findOne({ email: options.email });
  console.log("user", user);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const passwordMatch = await bcrypt.compare(options.password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ email: options.email }, "foodlab");
  return res.status(200).json({ token });
};

userService.generateOtp = async (res) => {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);
  const randomnumber = Math.floor(Math.random() * 90000) + 10000;
  client.messages
    .create({
      body: `your otp is ${randomnumber}`,
      from: "+15076323349",
      to: "+918630760149",
    })
    .then(() => {
      const newotp = new Otp({
        otp: randomnumber,
      });
      const savePromise = newotp.save();
      savePromise
        .then(() => {
          res.status(201).json({ message: "otp send successfully" });
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
      console.log(`Saved order item with ID ${savedOrderItem._id}`);
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
          console.log("data", data);
          const savePromise = order.findOneAndUpdate(
            { _id: savedOrderItem._id },
            { items: data }
          );
          savePromise
            .then(() => {
              res.status(201).json({ message: "Order placed Successfully" });
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
  // console.log("aaaaa");
  const query = order
    .find()
    .populate("items")
    .populate("items.product");

  const docs = await query.exec();

  res.status(200).json({ data: docs });

  // const query =  order.find()
  //   .populate("items") // populate the `items` field with the `Item` model
  //   .populate("items.products")
  // try {
  //   const docs = await query.exec();
  //   res.status(401).json({ data: docs });
  // } catch (err) {
  //   console.error(err);
  // }
};

module.exports = userService;
