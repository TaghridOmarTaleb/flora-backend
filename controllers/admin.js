import Model from "../models/admin.js";
import bcrypt from "bcrypt";

//get all admins
export function getAll(req, res, next) {
  Model.find({})
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

// get an admin by id
export function getById(req, res, next) {
  console.log("params:", req.params);
  let { id } = req.params;
  Model.findOne({ _id: id })
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

//identifier a user
export async function get(req, res) {
  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    req.user = decoded;
    const user = await Model.findById(req.user._id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

// create an admin/ register
export async function post(req, res, next) {
  const { adminName, password } = req.body;
  try {
    const admin = await Model.findOne({ adminName });
    if (admin) {
      return res.status(400).send("Admin already registered");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const doc = new Model({
      adminName,
      password: hashedPassword,
    });
    await doc.save();

    const token = doc.generateAuthToken();

    res.header("x-auth-token", token).status(200).send({
      success: true,
      message: "Admin created successfully",
      doc,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "Could not create admin, please try again later" });
  }
}

//delete an admin
export function remove(req, res) {
  let { id } = req.params;
  Model.findOneAndDelete({ _id: id })
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

//login
export async function login(req, res) {
  const { adminName, password } = req.body;

  const admin = await Model.findOne({ adminName });

  if (!admin) {
    return res.status(400).send("Invalid name or password!");
  }
  const validPassword = await bcrypt.compare(password, admin.password);

  if (!validPassword) return res.status(400).send("Invalid email or password!");

  const token = admin.generateAuthToken();

  // Send the JWT as a response to the client
  res.send(token);

  // Store the JWT in the client-side localStorage
  // localStorage.setItem('jwt', token);

  console.log("admin is logged in now!");
}




const controller = {
  remove,
  post,
  get,
  getById,
  getAll,
  login,
};
export default controller;
