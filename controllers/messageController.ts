import { Context } from "https://deno.land/x/abc/mod.ts";
import { db } from "../config/db.ts";
const messagesCol = db.collection("messages");

interface IMessageParams {
  body: string;
  username: string;
  picture: string;
}

interface IMessage {
  _id: {
    $oid: string;
  };
  body: string;
  username: string;
  picture: string;
}

export const index = async (context: Context) => {
  const messages = await messagesCol.find();
  context.json(messages, 200)
}

export const show = async (context: Context) => {
  const { id } = context.params;
  const message: IMessage = await messagesCol.findOne({ _id: { $oid: id } });
  context.json(message, 200)

}
export const create = async (context: Context) => {
  const bodyParams: IMessageParams = await context.body();
  const { body, username, picture } = bodyParams;
  const messageId = await messagesCol.insertOne({ body, username, picture });
  const message: IMessage = await messagesCol.findOne({ _id: messageId });
  context.json(message, 201)
}

export const update = async (context: Context) => {
  const bodyParams: IMessageParams = await context.body();
  const { id } = context.params;
  const { body } = bodyParams;
  await messagesCol.updateOne({ _id: { $oid: id } }, { body });
  const message: IMessage = await messagesCol.findOne({ _id: { $oid: id } });
  context.json(message, 200)
}

export const destroy = async (context: Context) => {
  const { id } = context.params;
  await messagesCol.deleteOne({ _id: { $oid: id } });
  context.render('deleted', 204)
}