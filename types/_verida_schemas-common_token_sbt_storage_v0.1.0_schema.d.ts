/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Self-sovereign storage of Soulbound token metadata
 */
export type SoulboundTokenMetadata = BaseSchema &
  SoulboundTokenCredential & {
    didJwtVc?: DIDJWTVerifiableCredential;
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
/**
 * Self-sovereign Soulbound token (SBT) metadata. Only one SBT exists for a
 */
export type SoulboundTokenCredential = OpenSeaMetadata & {
  did: DID;
  didAddress?: DIDAddress;
  type: Type;
  uniqueAttribute?: UniqueAttribute;
  [k: string]: unknown;
};
/**
 * URL of an image representing this credential
 */
export type ImageURL = string;
/**
 * URL of an image representing this credential
 */
export type ImageURL1 = string;
/**
 * An external URL with more info (ie: twitter account page)
 */
export type ExternalURL = string;
/**
 * Unique name of this credential
 */
export type Name1 = string;
export type TraitType = string;
export type Value = string;
/**
 * Additional attributes for this credential
 *
 * @minItems 0
 */
export type Attributes = {
  trait_type?: TraitType;
  value?: Value;
  [k: string]: unknown;
}[];
/**
 * Description of this credential
 */
export type Description = string;
/**
 * Six character hexadecimal without # prefix
 */
export type BackgroundColor = string;
/**
 * A URL to a multi-media attachment for the item.
 */
export type AnimationURL = string;
/**
 * A URL to a Youtube video
 */
export type YoutubeURL = string;
/**
 * DID that owns this credential
 */
export type DID = string;
/**
 * Address part of the DID that owns this credential
 */
export type DIDAddress = string;
/**
 * Type of credential (ie: 'twitter-10k-followers' or 'linkedin-account')
 */
export type Type = string;
/**
 * An optional unique attribute relevant for this origin / type. ie: Where type=facebook-account, uniqueAttribute may be the Facebook account ID
 */
export type UniqueAttribute = string;
/**
 * DID JWT of this credential
 */
export type DIDJWTVerifiableCredential = string;

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
/**
 * OpenSea metadata standards (https://docs.opensea.io/docs/metadata-standards)
 */
export interface OpenSeaMetadata {
  image?: ImageURL;
  image_data?: ImageURL1;
  external_url?: ExternalURL;
  name: Name1;
  attributes?: Attributes;
  description?: Description;
  background_color?: BackgroundColor;
  animation_url?: AnimationURL;
  youtube_url?: YoutubeURL;
  [k: string]: unknown;
}
