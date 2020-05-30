import { MongoClient } from "../deps.ts";
const dbUri = Deno.env.toObject().MONGODB_URI || 'mongodb://localhost:27017';

const client = new MongoClient();
client.connectWithUri(dbUri);

export const db = client.database("deno_chat");