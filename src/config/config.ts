const env = process.env;

export const config = {
 mongodb: {
   host: env.MONGODB_HOST,
   port: env.MONGODB_PORT,
   name: env.MONGODB_NAME,
   user: env.MONGODB_USER,
   password: env.MONGODB_PASSWORD
 }
};
