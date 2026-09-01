const postModel = require("../models/posts.model");
const generateCaption = require("../service/ai.service");

const createPostController = async (req, res) => {
  const file = req.file;
  const base64Image = Buffer.from(file.buffer).toString("base64");
  const mimeType = file.mimetype;
  const caption = await generateCaption(base64Image, mimeType);

  console.log(caption);
  
};

module.exports = createPostController;
