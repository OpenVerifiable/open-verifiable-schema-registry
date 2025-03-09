/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Array of data being sent. Must be valid schema data.
 */
export type Data = unknown[];
export type Status = "accept" | "reject";
/**
 * ID of a dataRequest inbox message this is responding to
 */
export type ReplyID = string;

/**
 * An inbox message sending data to a user
 */
export interface DataSend {
  data: Data;
  status: Status;
  replyId?: ReplyID;
  [k: string]: unknown;
}
