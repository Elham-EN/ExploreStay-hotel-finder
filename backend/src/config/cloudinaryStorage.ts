import { v2 as cloudinary } from "cloudinary";
import {
  cloudinary_cloud_name,
  cloudinary_api_key,
  cloudinary_api_secret,
} from "../constants";

// To use the Cloudinary Node.js library,
export function connectCloudinary() {
  cloudinary.config({
    cloud_name: cloudinary_cloud_name,
    api_key: cloudinary_api_key,
    api_secret: cloudinary_api_secret,
  });
}
