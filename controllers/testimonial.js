import Model from "../models/testimonial.js";


  //get all testimonials
  export function getAll(req, res, next) {
    Model.find()
      .then((response) => {
        console.log(response);
        res.status(200).send({ success: true, response });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  //get a testimonial by id
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

  //create a new testimonial
  export function post(req, res, next) {
    let body = req.body;
    console.log(body);
    let doc = new Model(body);
    doc
      .save()
      .then((response) => {
        console.log(response);
        res.status(200).send({ success: true, response });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  //update a testimonial
  export function put(req, res) {
    let { id } = req.params;
    let body = req.body;
    Model.findOneAndUpdate({ _id: id }, { $set: body }, { new: true})
      .then((response) => {
        console.log(response);
        res.status(200).send({ success: true, response });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  //delete a testimonial
  export function remove (req, res) {
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
// }

const controller = {remove, getAll, getById, put, post};
export default controller;



