import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";

export async function addProperty(req: Request, res: Response) {
  try {
    // the attached imagesFiles in the request object come from middleware
    const imagesFiles = req.files as Express.Multer.File[];
    const newProperty = req.body;
    //* 1. upload the images to cloudinary
    // Only upload 1 image file at a time to cloudinary -
    // return a promise array of type string
    const uploadPromises = imagesFiles.map(async (image) => {
      // encode image as base64 to handle binary data formats
      const base64 = Buffer.from(image.buffer).toString("base64");
      // Tell type of the image is
      let dataURI = "data:" + image.mimetype + ";base64," + base64;
      // Get Upload Api Response
      const cloudinaryRes = await cloudinary.uploader.upload(dataURI);
      return cloudinaryRes.url;
    });
    // Wait for all the images to be uploaded before getting back a string array
    const imageUrls = await Promise.all(uploadPromises);
    //* 2. if upload was successful, add the URLs to the new property
    //* 3. save the new property in the mongoDB Atlas database
    //* 4. return a 201 status
  } catch (error) {
    console.log("Error creating hotel: ", error);
    res.status(500).json({ message: "Something went wrong with the server" });
  }
}
