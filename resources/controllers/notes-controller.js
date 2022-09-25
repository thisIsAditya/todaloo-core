import CustomError from "../utils/CustomError.js";
import handleError from "../utils/handleError.js";
import { Note } from "../models/notes-model.js";

export const addItem = handleError(async (req, res) => {
  if (!req.body.title) throw new CustomError(400, "Require Title");
  const item = new Note({
    ...req.body,
  });
  await item.save();
  res.status(200).send({
    status: "success",
    data: item,
  });
});

export const updateItem = handleError(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new CustomError(400, "Id is required");
  const updateObject = req.body;
  const item = await Note.findOne({ _id: id });
  if (!item) throw new CustomError(404, "Note not found");
  for (const property in updateObject) {
    item[property] = updateObject[property];
  }
  await item.save();
  res.status(200).send({
    status: "success",
    data: item,
  });
});

export const deleteItem = handleError(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new CustomError(400, "Id is required");
  const response = await Note.findByIdAndDelete(id);
  if (!response) throw new CustomError(404, "Note does not exist");
  res.status(200).send({
    status: "success",
    message: "Note Deleted Successfully",
  });
});

export const getItem = handleError(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new CustomError(400, "Id is required");
  const item = await Note.findOne({ _id: id });
  if (!item) throw new CustomError(404, "Note not found");
  res.status(200).send({
    status: "success",
    data: item,
  });
});

export const getItems = handleError(async (req, res) => {
  const { status } = req.query;
  const { limit, startIndex } = req.paginationParams;
  let searchQuery = {};
  if (status) {
    searchQuery = {
      status,
    };
  }
  const items = await Note.find(searchQuery).limit(limit).skip(startIndex);
  res.status(200).send({
    status: "success",
    data: items,
  });
});
