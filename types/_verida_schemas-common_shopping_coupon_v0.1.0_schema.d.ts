/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Coupon = BaseSchema & {
  title: Title;
  description?: Description;
  value: Value;
  valueType?: ValueType;
  currency?: Currency;
  barcode?: BarCode;
  [k: string]: unknown;
};
/**
 * Name of the item within card list and details
 */
export type Name = string;
/**
 * Brief summary of item
 */
export type Summary = string;
/**
 * Is this record archived?
 */
export type Archived = boolean;
/**
 * URI of the schema for this record
 */
export type Schema = string;
/**
 * Name of the application this data was sourced from
 */
export type SourceApplication = string;
/**
 * ID of the account from the original data source
 */
export type SourceAccountID = string;
/**
 * ID from the original data source
 */
export type SourceID = string;
/**
 * URL of an icon for this record. Must be square, prefer SVG, otherwise minimum 50p x 50p
 */
export type Icon = string;
/**
 * Additional text that should be indexed for search purposes
 */
export type IndexableText = string;
/**
 * Date/time this record was inserted
 */
export type Inserted = string;
/**
 * Date/time this record was modified
 */
export type Modified = string;
export type Title = string;
export type Description = string;
export type Value = string;
export type ValueType = string;
export type Currency = string;
export type BarCode = string;

/**
 * A base schema
 */
export interface BaseSchema {
  name?: Name;
  summary?: Summary;
  archived?: Archived;
  schema: Schema;
  signatures?: Signatures;
  sourceApplication?: SourceApplication;
  sourceAccountId?: SourceAccountID;
  sourceId?: SourceID;
  sourceData?: SourceData;
  icon?: Icon;
  indexableText?: IndexableText;
  insertedAt?: Inserted;
  modifiedAt?: Modified;
  [k: string]: unknown;
}
/**
 * Signatures verifying this data has been signed
 */
export interface Signatures {
  [k: string]: unknown;
}
/**
 * Raw data from the original source
 */
export interface SourceData {
  [k: string]: unknown;
}
