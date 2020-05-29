import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
const dbUri = Deno.env.toObject().MONGODB_URI || 'mongodb://localhost:27017';

const client = new MongoClient();
client.connectWithUri(dbUri);

export const db = client.database("deno_chat");