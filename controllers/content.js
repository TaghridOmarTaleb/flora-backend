import Model from "../models/content.js";

// create a new content
export async function post(req, res, next) {
  let body = req.body;
  // console.log("req.body:", req.body);
  // console.log("req.file:", req.file);
  let image = req.file.path;
  let doc = new Model({
    ...body,
    image: image,
  });
  try {
    await doc.save();
    res.status(200).send(doc);
  } catch (err) {
    res.status(400).send(err);
  }
}



//update a content
export function put(req, res) {
  let { id } = req.params;
  let body = req.body;
  let image = req.file.path;
  // console.log(body);
  Model.findOneAndUpdate({ _id: id }, { ...body, image }, { new: true })
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
}

//delete a content
export function remove(req, res) {
  const { id } = req.params;
  const { title, content, description } = req.body;
  const image = req.file;

  const update = {};
  if (title) update.title = "";
  if (content) update.content = "";
  if (description) update.description = "";
  if (image) update.image = "";

  Model.findByIdAndUpdate(id, update, { new: true })
    .then((response) => {
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

const controller = { remove, put, post };
export default controller;
