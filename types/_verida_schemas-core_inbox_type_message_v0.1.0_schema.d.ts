/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Subject = string;
export type Message = string;
export type URL = string;
export type Text = string;
/**
 * ID of an inbox message this is responding to
 */
export type ReplyID = string;

/**
 * Inbox message
 */
export interface GenericInboxMessage {
  subject: Subject;
  message: Message;
  /**
   * Optional link that user can click on for more information
   */
  link?: {
    url?: URL;
    text?: Text;
    [k: string]: unknown;
  };
  replyId?: ReplyID;
  [k: string]: unknown;
}
