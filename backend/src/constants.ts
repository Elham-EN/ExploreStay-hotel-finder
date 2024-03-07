export const mongoConnectionString = process.env.MONGO_CONNECTION_STRING as string;

export const port = (process.env.PORT as string) || (7001 as number);

export const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

export const nodeEnv = process.env.NODE_ENV as string;

export const mongoConnectionStringTest = process.env
  .MONGO_CONNECTION_STRING_TEST as string;
