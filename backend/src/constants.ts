export const mongoConnectionString = process.env.MONGO_CONNECTION_STRING as string;

export const port = (process.env.PORT as string) || (7001 as number);

export const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

export const nodeEnv = process.env.NODE_ENV as string;

export const mongoConnectionStringTest = process.env
  .MONGO_CONNECTION_STRING_TEST as string;

export const frontendUrl = process.env.FRONTEND_URL as string;

// Cloudinary
export const cloudinary_cloud_name = process.env.CLOUD_NAME as string;
export const cloudinary_api_key = process.env.API_KEY as string;
export const cloudinary_api_secret = process.env.API_SECRET as string;
