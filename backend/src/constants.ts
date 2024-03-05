export const mongoConnectionString = process.env.MONGO_CONNECTION_STRING as string;

export const port = (process.env.PORT as string) || (7001 as number);
