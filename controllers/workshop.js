import Model from "../models/workshop.js";

//post a new workshop
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

//update a workshop
export function put(req, res) {
  const { id } = req.params;
  const body = req.body;
  // const image = req.file;
  console.log(body);
  Model.findOneAndUpdate({ _id: id },  { $set: body }, { new: true })
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
}

//delete a workshop
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


const controller = { remove, put, post };
export default controller;
