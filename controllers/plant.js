import Model from "../models/plant.js";

//get all hidden plants ( admin)
export function getHidden(req, res) {
  const pageNumber = req.query.pageNumber || 1;
  const pageSize = req.query.pageSize || 8;

  if (pageNumber < 1 || isNaN(pageNumber)) {
    res.status(404).send("Invalid page number");
    return;
  }
  Model.find({ isDeleted: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

//get all available plants (for admin and user)
export function getAvailable(req, res) {
  const pageNumber = req.query.pageNumber || 1;
  const pageSize = req.query.pageSize || 9;

  if (pageNumber < 1 || isNaN(pageNumber)) {
    res.status(404).send("Invalid pageNumber");
    return;
  }

  Model.find({ isDeleted: false })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

//get a plant by id (even if its not available)
export function getById(req, res, next) {
  console.log("params:", req.params);
  let { id } = req.params;
  Model.findOne({ _id: id })
    .then((plant) => {
      if (!plant) {
        res.status(404).send("plant not found");
      } else {
        res.status(200).send({ success: true, response: plant });
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

// get available plant by id
export function getAvailableById(req, res, next) {
  console.log("params:", req.params);
  let { id } = req.params;
  Model.findOne({ _id: id, isDeleted: false })
    .then((plant) => {
      if (!plant) {
        res.status(404).send("plant not found");
      } else {
        res.status(200).send({ success: true, response: plant });
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

//create a new plant
export async function post(req, res, next) {
  let body = req.body;
  // let image = req.file.path;

  let doc = new Model(body
    // ...body,
    // image: image,
  );
  try {
    await doc.save();
    res.status(200).send(doc);
  } catch (err) {
    res.status(400).send(err);
  }
}

//update a plant
export function put(req, res) {
  const { id } = req.params;
  const body = req.body;
  // const image = req.file.path;
  console.log(body);
  Model.findOneAndUpdate({ _id: id },
    //  { ...body, image }, { new: true }
    { $set: body }, { new: true}
     )
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
}

//hardDelete a plant
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

//softDelete (hide a plant)
export function softDelete(req, res) {
  let { id } = req.params;
  Model.findOneAndUpdate({ _id: id }, { $set: { isDeleted: true } })
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

const controller = {
  remove,
  getAvailable,
  getHidden,
  getById,
  put,
  post,
  softDelete,
  getAvailableById,
};

export default controller;
