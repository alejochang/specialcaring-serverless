const env = process.env;

export const config = {
 mongodb: {
   host: env.MONGODB_HOST,
   port: env.MONGODB_PORT,
   name: env.MONGODB_NAME,
   user: env.MONGODB_USER,
   password: env.MONGODB_PASSWORD
 },
 openFDA: {
   url: env.OPENFDA_API_URL,
   apiKey: env.OPENFDA_API_KEY
 }
};