import express from "express";
import { addProperty } from "../controllers/explorestay.controller";

import multer from "multer";

/**
 * stores the files in memory as Buffer objects. Store any files/images that
 * come from post request in memory.
 * Reason:
 *  - We are not saving these files directly ourselves, straightly upload them
 *    to cloudinary as soon as we get them. (the process should not long)
 */
const storage = multer.memoryStorage();

// Handling multipart/form-data, which is primarily used for uploading files
const upload = multer({
  storage,
  limits: {
    // cannot be larger than 5MB
    fileSize: 5 * 1024 * 1024,
  },
});

const explorestayRouter = express.Router();

// api/my-property/add-property
// imageFiles the name of the form value field that hold these images
explorestayRouter.post("/add-property", upload.array("imagesFiles", 6), addProperty);

export default explorestayRouter;
