/* eslint-disable */

export interface ActionsAssertionSchema {
    $schema:              string;
    $id:                  string;
    title:                string;
    version:              string;
    type:                 string;
    description:          string;
    properties:           ActionsAssertionSchemaProperties;
    required:             string[];
    $defs:                Defs;
    additionalProperties: boolean;
}

export interface Defs {
    ActionItem: ActionItem;
}

export interface ActionItem {
    type:                 string;
    properties:           ActionItemProperties;
    required:             string[];
    additionalProperties: boolean;
}

export interface ActionItemProperties {
    action:            Action;
    when:              When;
    softwareAgent:     Action;
    digitalSourceType: Action;
    parameters:        Action;
}

export interface Action {
    type:        string;
    description: string;
}

export interface When {
    type:        string;
    format:      string;
    description: string;
}

export interface ActionsAssertionSchemaProperties {
    actions: Actions;
}

export interface Actions {
    type:        string;
    items:       Items;
    description: string;
}

export interface Items {
    $ref: string;
}

export interface CreativeWorkAssertionSchema {
    $schema:              string;
    $id:                  string;
    title:                string;
    version:              string;
    type:                 TypeType;
    description:          string;
    properties:           CreativeWorkAssertionSchemaProperties;
    required:             string[];
    $defs:                Defs;
    additionalProperties: boolean;
}

export interface ContactPoint {
    type:                 TypeType;
    description:          string;
    properties:           ContactPointProperties;
    required:             string[];
    additionalProperties: boolean;
}

export interface ContactPointProperties {
    "@type":     PurpleType;
    contactType: AccessMode;
    telephone:   TelephoneClass;
    email:       Email;
    areaServed:  AccessMode;
}

export interface PurpleType {
    type:  TypeType;
    const: string;
}

export enum TypeType {
    Boolean = "boolean",
    Integer = "integer",
    Object = "object",
    String = "string",
}

export interface AccessMode {
    type:        TypeType;
    description: string;
}

export interface Email {
    type:   TypeType;
    format: string;
}

export interface TelephoneClass {
    type: TypeType;
}

export interface CreativeWorkRef {
    type:        TypeType;
    description: string;
    properties:  CreativeWorkRefProperties;
    required:    string[];
}

export interface CreativeWorkRefProperties {
    "@type": PurpleType;
    url:     DateCreated;
    name:    AccessMode;
}

export interface DateCreated {
    type:        TypeType;
    format:      string;
    description: string;
}

export interface ImageObject {
    type:                 TypeType;
    description:          string;
    properties:           ImageObjectProperties;
    required:             string[];
    additionalProperties: boolean;
}

export interface ImageObjectProperties {
    "@type":              FluffyType;
    url:                  DateCreated;
    caption:              AccessMode;
    height:               Context;
    width:                Context;
    contentUrl:           DateCreated;
    encodingFormat:       AccessMode;
    contentSize:          AccessMode;
    representativeOfPage: AccessMode;
    thumbnail:            ExampleOfWork;
    exifData:             ExifData;
    license:              Context;
    creator:              About;
    name:                 AccessMode;
    description:          AccessMode;
}

export interface FluffyType {
    type:        TypeType;
    const:       string;
    description: string;
}

export interface About {
    description: string;
    oneOf:       AboutOneOf[];
}

export interface AboutOneOf {
    $ref?:  string;
    type?:  AccessModeSufficientType;
    items?: OneOf;
}

export interface OneOf {
    $ref: string;
}

export enum AccessModeSufficientType {
    Array = "array",
}

export interface ExifData {
    description: string;
    oneOf:       AccessMode[];
}

export interface Context {
    type:        string[];
    description: string;
}

export interface ExampleOfWork {
    description: string;
    $ref:        string;
}

export interface Organization {
    type:                 TypeType;
    description:          string;
    properties:           OrganizationProperties;
    required:             string[];
    additionalProperties: boolean;
}

export interface OrganizationProperties {
    "@type":            FluffyType;
    name:               AccessMode;
    legalName:          AccessMode;
    url:                DateCreated;
    identifier:         Context;
    logo:               Image;
    contactPoint:       About;
    sameAs:             SameAs;
    image:              Image;
    email:              DateCreated;
    telephone:          AccessMode;
    foundingDate:       DateCreated;
    founder:            About;
    parentOrganization: ExampleOfWork;
    subOrganization:    About;
}

export interface Image {
    description: string;
    oneOf:       ImageOneOf[];
}

export interface PurpleItems {
    oneOf: ImageOneOf[];
}

export interface ImageOneOf {
    type?:   string;
    format?: string;
    $ref?:   string;
    items?:  PurpleItems;
}

export interface SameAs {
    description: string;
    oneOf:       SameAsOneOf[];
}

export interface SameAsOneOf {
    type:    string;
    format?: string;
    items?:  Email;
}

export interface Person {
    type:                 TypeType;
    description:          string;
    properties:           PersonProperties;
    required:             string[];
    additionalProperties: boolean;
}

export interface PersonProperties {
    "@type":        FluffyType;
    name:           AccessMode;
    givenName:      AccessMode;
    familyName:     AccessMode;
    additionalName: AdditionalName;
    jobTitle:       AccessMode;
    affiliation:    About;
    worksFor:       About;
    url:            DateCreated;
    sameAs:         SameAs;
    birthDate:      DateCreated;
    gender:         AccessMode;
    image:          Image;
    identifier:     Context;
}

export interface AdditionalName {
    type:        string[];
    description: string;
    oneOf:       AdditionalNameOneOf[];
}

export interface AdditionalNameOneOf {
    type:   string;
    items?: TelephoneClass;
}

export interface PersonOrOrg {
    description: string;
    oneOf:       OneOf[];
}

export interface Thing {
    type:        TypeType;
    description: string;
    properties:  ThingProperties;
    required:    string[];
}

export interface ThingProperties {
    "@type":     AccessMode;
    name:        TelephoneClass;
    description: TelephoneClass;
    url:         Email;
}

export interface CreativeWorkAssertionSchemaProperties {
    "@context":           Context;
    "@type":              FluffyType;
    url:                  DateCreated;
    name:                 AccessMode;
    headline:             AccessMode;
    description:          AccessMode;
    creator:              About;
    author:               About;
    publisher:            ExampleOfWork;
    dateCreated:          DateCreated;
    datePublished:        DateCreated;
    dateModified:         DateCreated;
    license:              Context;
    keywords:             Genre;
    genre:                Genre;
    inLanguage:           AccessMode;
    contentRating:        AccessMode;
    isPartOf:             ExampleOfWork;
    exampleOfWork:        ExampleOfWork;
    thumbnailUrl:         DateCreated;
    image:                Image;
    about:                About;
    text:                 AccessMode;
    copyrightHolder:      About;
    copyrightYear:        AccessMode;
    accessMode:           AccessMode;
    accessModeSufficient: AccessModeSufficient;
}

export interface AccessModeSufficient {
    type:        AccessModeSufficientType;
    description: string;
    items:       TelephoneClass;
}

export interface Genre {
    description: string;
    oneOf:       AdditionalNameOneOf[];
}

export interface CustomAssertionSchema {
    $schema:     string;
    $id:         string;
    title:       string;
    version:     string;
    description: string;
    type:        string;
    properties:  Properties;
    required:    string[];
}

export interface Properties {
    label:    Label;
    data:     Data;
    kind:     Kind;
    instance: Data;
}

export interface Data {
    type:        string;
    description: string;
}

export interface Kind {
    type:        string;
    enum:        string[];
    description: string;
}

export interface Label {
    type:        string;
    pattern:     string;
    description: string;
}

export interface DataHashAssertionSchema {
    $schema:              string;
    $id:                  string;
    title:                string;
    version:              string;
    type:                 string;
    description:          string;
    properties:           DataHashAssertionSchemaProperties;
    required:             string[];
    $defs:                Defs;
    additionalProperties: boolean;
}

export interface ExclusionRange {
    type:       string;
    properties: ExclusionRangeProperties;
    required:   string[];
}

export interface ExclusionRangeProperties {
    start:  Length;
    length: Length;
}

export interface Length {
    type: string;
}

export interface DataHashAssertionSchemaProperties {
    alg:        Alg;
    hash:       Alg;
    pad:        Alg;
    pad2:       Alg;
    name:       Alg;
    exclusions: Exclusions;
}

export interface Alg {
    type:        string;
    description: string;
}

export interface Exclusions {
    type:  string;
    items: Items;
}

export interface ExifInformationAssertionSchema {
    $schema:              string;
    $id:                  string;
    title:                string;
    version:              string;
    type:                 string;
    description:          string;
    properties:           Properties;
    required:             string[];
    additionalProperties: boolean;
}

export interface ExifApertureValue {
    type: Type;
}

export enum Type {
    Integer = "integer",
    Number = "number",
    String = "string",
}

export interface ExifDateTimeDigitized {
    type:   Type;
    format: string;
}

export interface Exif {
    type:        Type;
    description: string;
}

export interface ExifGPSImgDirectionRef {
    type: Type;
    enum: string[];
}

export interface ExifGPSTimeStamp {
    type:        Type;
    format:      string;
    description: string;
}

export interface ExifTimeZoneOffset {
    type:        string;
    items:       ExifApertureValue;
    description: string;
}

export interface IPTCPhotoVideoMetadataAssertionSchema {
    $schema:              string;
    $id:                  string;
    title:                string;
    version:              string;
    type:                 string;
    description:          string;
    properties:           IPTCPhotoVideoMetadataAssertionSchemaProperties;
    required:             string[];
    additionalProperties: boolean;
}

export interface IPTCPhotoVideoMetadataAssertionSchemaProperties {
    "@context":                      Context;
    "dc:title":                      Iptc4XmpEXTDigitalSourceType;
    "dc:description":                Iptc4XmpEXTDigitalSourceType;
    "dc:creator":                    Iptc4XmpEXTPersonInImage;
    "dc:rights":                     Iptc4XmpEXTDigitalSourceType;
    "photoshop:DateCreated":         Iptc4XmpEXTDigitalSourceType;
    "photoshop:Credit":              Iptc4XmpEXTDigitalSourceType;
    "photoshop:Headline":            Iptc4XmpEXTDigitalSourceType;
    "photoshop:Source":              Iptc4XmpEXTDigitalSourceType;
    "Iptc4xmpExt:DigitalSourceType": Iptc4XmpEXTDigitalSourceType;
    "Iptc4xmpExt:PersonInImage":     Iptc4XmpEXTPersonInImage;
    "Iptc4xmpExt:LocationCreated":   Iptc4XmpEXTLocationCreated;
    "xmpRights:UsageTerms":          Iptc4XmpEXTPersonInImage;
    "xmpRights:WebStatement":        XmpRightsWebStatement;
    "plus:licensor":                 PlusLicensor;
}

export interface Iptc4XmpEXTDigitalSourceType {
    type:        Type;
    description: string;
}

export enum Type {
    String = "string",
}

export interface Iptc4XmpEXTLocationCreated {
    type:                 string;
    description:          string;
    properties:           Iptc4XmpEXTLocationCreatedProperties;
    additionalProperties: boolean;
}

export interface Iptc4XmpEXTLocationCreatedProperties {
    "Iptc4xmpExt:City":          Iptc4XmpEXTDigitalSourceType;
    "Iptc4xmpExt:Sublocation":   Iptc4XmpEXTDigitalSourceType;
    "Iptc4xmpExt:ProvinceState": Iptc4XmpEXTDigitalSourceType;
    "Iptc4xmpExt:CountryName":   Iptc4XmpEXTDigitalSourceType;
    "Iptc4xmpExt:CountryCode":   Iptc4XmpEXTDigitalSourceType;
}

export interface Iptc4XmpEXTPersonInImage {
    type:        string;
    description: string;
    items:       Iptc4XmpEXTPersonInImageItems;
}

export interface Iptc4XmpEXTPersonInImageItems {
    type: Type;
}

export interface PlusLicensor {
    type:        string;
    description: string;
    items:       PlusLicensorItems;
}

export interface PlusLicensorItems {
    type:                 string;
    properties:           ItemsProperties;
    required:             string[];
    additionalProperties: boolean;
}

export interface ItemsProperties {
    "plus:LicensorName": Iptc4XmpEXTDigitalSourceType;
    "plus:LicensorURL":  XmpRightsWebStatement;
}

export interface XmpRightsWebStatement {
    type:        Type;
    format:      string;
    description: string;
}

export interface ManifestStoreSchema {
    $schema:     string;
    $id:         string;
    title:       string;
    version:     string;
    description: string;
    type:        string;
    required:    string[];
    properties:  ManifestStoreSchemaProperties;
    definitions: Definitions;
}

export interface Definitions {
    Actor:                 Actor;
    AssetType:             AssetType;
    ClaimGeneratorInfo:    ClaimGeneratorInfo;
    Coordinate:            Coordinate;
    DataSource:            DataSource;
    Frame:                 Frame;
    HashedUri:             HashedURI;
    Ingredient:            Ingredient;
    Manifest:              Manifest;
    ManifestAssertion:     ManifestAssertion;
    ManifestAssertionKind: ManifestAssertionKind;
    ManifestData:          ManifestData;
    Metadata:              Metadata;
    Range:                 Range;
    RangeType:             RangeType;
    RegionOfInterest:      RegionOfInterest;
    Relationship:          RelationshipClass;
    ResourceRef:           ResourceRef;
    ReviewRating:          ReviewRating;
    Role:                  RangeType;
    Shape:                 Shape;
    ShapeType:             RangeType;
    SignatureInfo:         SignatureInfo;
    SigningAlg:            RangeType;
    Text:                  Text;
    TextSelector:          TextSelector;
    TextSelectorRange:     TextSelectorRange;
    Time:                  Time;
    TimeType:              RangeType;
    UnitType:              RangeType;
    UriOrResource:         URIOrResource;
    ValidationStatus:      ValidationStatusClass;
}

export interface Actor {
    description: string;
    type:        string;
    properties:  ActorProperties;
}

export interface ActorProperties {
    credentials: ValidationStatus;
    identifier:  ActiveManifest;
}

export interface ValidationStatus {
    description: string;
    type:        ValidationStatusType[];
    items:       AdditionalProperties;
}

export interface AdditionalProperties {
    $ref: string;
}

export enum ValidationStatusType {
    Array = "array",
    Null = "null",
}

export interface ActiveManifest {
    description: string;
    type:        ActiveManifestType[];
}

export enum ActiveManifestType {
    Boolean = "boolean",
    Null = "null",
    String = "string",
}

export interface AssetType {
    type:       string;
    required:   string[];
    properties: AssetTypeProperties;
}

export interface AssetTypeProperties {
    type:    TypeClass;
    version: Version;
}

export interface TypeClass {
    type: ActiveManifestType;
}

export interface Version {
    type: ActiveManifestType[];
}

export interface ClaimGeneratorInfo {
    description:          string;
    type:                 string;
    required:             string[];
    properties:           ClaimGeneratorInfoProperties;
    additionalProperties: boolean;
}

export interface ClaimGeneratorInfoProperties {
    icon:    Icon;
    name:    Name;
    version: ActiveManifest;
}

export interface Icon {
    description: string;
    anyOf:       AnyOfClass[];
}

export interface AnyOfClass {
    $ref?: string;
    type?: ValidationStatusType;
}

export interface Name {
    description: string;
    type:        ActiveManifestType;
}

export interface Coordinate {
    description: string;
    type:        string;
    required:    string[];
    properties:  CoordinateProperties;
}

export interface CoordinateProperties {
    x: X;
    y: X;
}

export interface X {
    description: string;
    type:        XType;
    format:      string;
}

export enum XType {
    Integer = "integer",
    Null = "null",
    Number = "number",
}

export interface DataSource {
    description: string;
    type:        string;
    required:    string[];
    properties:  DataSourceProperties;
}

export interface DataSourceProperties {
    actors:  ValidationStatus;
    details: ActiveManifest;
    type:    Name;
}

export interface Frame {
    description: string;
    type:        string;
    properties:  FrameProperties;
}

export interface FrameProperties {
    end:   End;
    start: End;
}

export interface End {
    description: string;
    type:        XType[];
    format:      string;
    minimum?:    number;
}

export interface HashedURI {
    description: string;
    type:        string;
    required:    string[];
    properties:  HashedURIProperties;
}

export interface HashedURIProperties {
    alg:  Version;
    hash: Hash;
    url:  TypeClass;
}

export interface Hash {
    type:  ValidationStatusType;
    items: Value;
}

export interface Value {
    type:    XType;
    format:  string;
    minimum: number;
}

export interface Ingredient {
    description: string;
    type:        string;
    required:    string[];
    properties:  IngredientProperties;
}

export interface IngredientProperties {
    active_manifest:   ActiveManifest;
    data:              Icon;
    data_types:        ValidationStatus;
    description:       ActiveManifest;
    document_id:       ActiveManifest;
    format:            Format;
    hash:              ActiveManifest;
    informational_URI: ActiveManifest;
    instance_id:       ActiveManifest;
    manifest_data:     Icon;
    metadata:          Icon;
    provenance:        ActiveManifest;
    relationship:      Relationship;
    thumbnail:         Icon;
    title:             Name;
    validation_status: ValidationStatus;
}

export interface Format {
    description: string;
    default:     string;
    type:        ActiveManifestType;
}

export interface Relationship {
    description: string;
    default:     string;
    allOf:       AdditionalProperties[];
}

export interface Manifest {
    description: string;
    type:        string;
    properties:  ManifestProperties;
}

export interface ManifestProperties {
    assertions:           Assertions;
    claim_generator:      Format;
    claim_generator_info: ValidationStatus;
    credentials:          Credentials;
    format:               Format;
    ingredients:          Assertions;
    instance_id:          Format;
    label:                Version;
    metadata:             ValidationStatus;
    redactions:           Redactions;
    signature_info:       Icon;
    thumbnail:            Thumbnail;
    title:                ActiveManifest;
    vendor:               ActiveManifest;
}

export interface Assertions {
    description: string;
    default?:    any[];
    type:        ValidationStatusType;
    items:       AdditionalProperties;
}

export interface Credentials {
    description: string;
    type:        ValidationStatusType[];
    items:       boolean;
}

export interface Redactions {
    description: string;
    type:        ValidationStatusType[];
    items:       TypeClass;
}

export interface Thumbnail {
    anyOf: AnyOfClass[];
}

export interface ManifestAssertion {
    description: string;
    type:        string;
    required:    string[];
    properties:  ManifestAssertionProperties;
}

export interface ManifestAssertionProperties {
    data:     Data;
    instance: End;
    kind:     Icon;
    label:    Name;
}

export interface ManifestAssertionKind {
    description: string;
    type:        ActiveManifestType;
    enum:        string[];
}

export interface ManifestData {
    anyOf: Array<boolean | Hash>;
}

export interface Metadata {
    description:          string;
    type:                 string;
    properties:           MetadataProperties;
    additionalProperties: boolean;
}

export interface MetadataProperties {
    dataSource:       Thumbnail;
    dateTime:         Name;
    reference:        Thumbnail;
    regionOfInterest: Thumbnail;
    reviewRatings:    ReviewRatings;
}

export interface ReviewRatings {
    type:  ValidationStatusType[];
    items: AdditionalProperties;
}

export interface Range {
    description: string;
    type:        string;
    required:    string[];
    properties:  RangeProperties;
}

export interface RangeProperties {
    frame: Icon;
    shape: Icon;
    text:  Icon;
    time:  Icon;
    type:  Data;
}

export interface RangeType {
    description: string;
    oneOf:       ManifestAssertionKind[];
}

export interface RegionOfInterest {
    description: string;
    type:        string;
    required:    string[];
    properties:  RegionOfInterestProperties;
}

export interface RegionOfInterestProperties {
    description: ActiveManifest;
    identifier:  ActiveManifest;
    metadata:    Icon;
    name:        ActiveManifest;
    region:      Assertions;
    role:        Icon;
    type:        ActiveManifest;
}

export interface RelationshipClass {
    type: ActiveManifestType;
    enum: string[];
}

export interface ResourceRef {
    description: string;
    type:        string;
    required:    string[];
    properties:  ResourceRefProperties;
}

export interface ResourceRefProperties {
    alg:        ActiveManifest;
    data_types: ValidationStatus;
    format:     Name;
    hash:       ActiveManifest;
    identifier: Name;
}

export interface ReviewRating {
    description: string;
    type:        string;
    required:    string[];
    properties:  ReviewRatingProperties;
}

export interface ReviewRatingProperties {
    code:        Version;
    explanation: TypeClass;
    value:       Value;
}

export interface Shape {
    description: string;
    type:        string;
    required:    string[];
    properties:  ShapeProperties;
}

export interface ShapeProperties {
    height:   End;
    inside:   ActiveManifest;
    origin:   Data;
    type:     Data;
    unit:     Data;
    vertices: ValidationStatus;
    width:    End;
}

export interface SignatureInfo {
    description: string;
    type:        string;
    properties:  SignatureInfoProperties;
}

export interface SignatureInfoProperties {
    alg:                Icon;
    cert_serial_number: ActiveManifest;
    issuer:             ActiveManifest;
    revocation_status:  ActiveManifest;
    time:               ActiveManifest;
}

export interface Text {
    description: string;
    type:        string;
    required:    string[];
    properties:  TextProperties;
}

export interface TextProperties {
    selectors: Assertions;
}

export interface TextSelector {
    description: string;
    type:        string;
    required:    string[];
    properties:  TextSelectorProperties;
}

export interface TextSelectorProperties {
    end:      End;
    fragment: Name;
    start:    End;
}

export interface TextSelectorRange {
    description: string;
    type:        string;
    required:    string[];
    properties:  TextSelectorRangeProperties;
}

export interface TextSelectorRangeProperties {
    end:      Icon;
    selector: Data;
}

export interface Time {
    description: string;
    type:        string;
    properties:  TimeProperties;
}

export interface TimeProperties {
    end:   ActiveManifest;
    start: ActiveManifest;
    type:  Relationship;
}

export interface URIOrResource {
    anyOf: AdditionalProperties[];
}

export interface ValidationStatusClass {
    description: string;
    type:        string;
    required:    string[];
    properties:  ValidationStatusProperties;
}

export interface ValidationStatusProperties {
    code:        TypeClass;
    explanation: Version;
    url:         Version;
}

export interface ManifestStoreSchemaProperties {
    active_manifest:   ActiveManifest;
    manifests:         Manifests;
    validation_status: ValidationStatus;
}

export interface Manifests {
    description:          string;
    type:                 string;
    additionalProperties: AdditionalProperties;
}

export interface TrainingDataMiningAssertionSchema {
    $schema:              string;
    $id:                  string;
    title:                string;
    version:              string;
    type:                 string;
    description:          string;
    properties:           TrainingDataMiningAssertionSchemaProperties;
    required:             string[];
    $defs:                Defs;
    additionalProperties: boolean;
}

export interface TrainingMiningEntry {
    type:                 string;
    description:          string;
    properties:           TrainingMiningEntryProperties;
    required:             string[];
    additionalProperties: boolean;
}

export interface TrainingMiningEntryProperties {
    use:             Use;
    constraint_info: ConstraintInfo;
}

export interface ConstraintInfo {
    type:        string;
    description: string;
}

export interface Use {
    type: string;
    enum: string[];
}

export interface TrainingDataMiningAssertionSchemaProperties {
    entries: Entries;
}

export interface Entries {
    type:                 string;
    description:          string;
    patternProperties:    { [key: string]: PatternProperty };
    additionalProperties: boolean;
}

export interface PatternProperty {
    $ref: string;
}

export interface EmailAuthenticationCredentialSchema {
    $schema:     string;
    $id:         string;
    version:     string;
    title:       string;
    description: string;
    type:        string;
    required:    string[];
    properties:  EmailAuthenticationCredentialSchemaProperties;
}

export interface EmailAuthenticationCredentialSchemaProperties {
    "@context":        Context;
    type:              Context;
    issuer:            Issuer;
    issuanceDate:      ExpirationDate;
    expirationDate:    ExpirationDate;
    credentialSubject: CredentialSubject;
}

export interface CredentialSubject {
    type:       string;
    properties: CredentialSubjectProperties;
    required:   string[];
}

export interface CredentialSubjectProperties {
    id:                   CredentialInternalID;
    credentialInternalId: CredentialInternalID;
    category:             Items;
    social:               Social;
    type:                 Items;
    name:                 CredentialInternalID;
    description:          CredentialInternalID;
    image:                Image;
    identifier:           CredentialInternalID;
    sameAs:               SameAs;
}

export interface CredentialInternalID {
    type: Type;
}

export interface ExpirationDate {
    type:   Type;
    format: string;
}

export interface Social {
    type:       string;
    properties: SocialProperties;
    Person:     Person;
    required:   string[];
}

export interface PurpleSubjectOf {
    type:       string;
    properties: PurpleProperties;
    required:   string[];
}

export interface PurpleProperties {
    type:        Items;
    name:        CredentialInternalID;
    description: CredentialInternalID;
    image:       Image;
    identifier:  CredentialInternalID;
    sameAs:      SameAs;
}

export interface SocialProperties {
    subjectOf: FluffySubjectOf;
}

export interface FluffySubjectOf {
    type:       string;
    properties: FluffyProperties;
    required:   string[];
}

export interface FluffyProperties {
    type:        Items;
    name:        CredentialInternalID;
    description: CredentialInternalID;
    image:       ExpirationDate;
}

export interface Issuer {
    type:       string;
    properties: IssuerProperties;
    required:   string[];
}

export interface IssuerProperties {
    id:        CredentialInternalID;
    name:      CredentialInternalID;
    handle:    CredentialInternalID;
    subjectOf: FluffySubjectOf;
    url:       ExpirationDate;
}

export interface SocialAuthenticationCredentialSchema {
    $schema:     string;
    $id:         string;
    title:       string;
    description: string;
    type:        string;
    version:     string;
    required:    string[];
    properties:  SocialAuthenticationCredentialSchemaProperties;
}

export interface SocialAuthenticationCredentialSchemaProperties {
    "@context":        Context;
    type:              Context;
    issuer:            Issuer;
    issuanceDate:      ExpirationDate;
    expirationDate:    ExpirationDate;
    credentialSubject: CredentialSubject;
}

export interface CategoryClass {
    type: Type;
    enum: string[];
}

export enum Type {
    String = "string",
}

export interface Platform {
    type:        Type;
    enum:        string[];
    description: string;
}

export interface WebPage {
    type:  string;
    items: WebPageItems;
}

export interface WebPageItems {
    type:       string;
    properties: ItemsProperties;
    required:   string[];
}

export interface AgentConfigurationSchema {
    "@context":           Array<ContextClass | string>;
    $schema:              string;
    $id:                  string;
    title:                string;
    description:          string;
    governanceReference:  string[];
    type:                 string;
    properties:           AgentConfigurationSchemaProperties;
    required:             string[];
    additionalProperties: boolean;
    allOf:                AllOf[];
    examples:             Example[];
}

export interface ContextClass {
    ov:                  string;
    adr:                 string;
    governanceReference: GovernanceReference;
}

export interface GovernanceReference {
    "@id":   string;
    "@type": string;
}

export interface AllOf {
    if:   If;
    then: Then;
}

export interface If {
    properties: IfProperties;
}

export interface IfProperties {
    agentType: AgentType;
}

export interface AgentType {
    const: string;
}

export interface Then {
    required: string[];
}

export interface Example {
    agentType:     string;
    agentId:       string;
    store:         ExampleStore;
    didProviders:  DidProvider[];
    userAgent?:    ExampleUserAgent;
    capabilities:  string[];
    packageAgent?: ExamplePackageAgent;
}

export interface DidProvider {
    method:   string;
    network?: string;
}

export interface ExamplePackageAgent {
    packageJsonPath:    string;
    bundleTracking:     boolean;
    autoPublishRelease: boolean;
}

export interface ExampleStore {
    type:       string;
    encryption: StoreEncryption;
}

export interface StoreEncryption {
    enabled:        boolean;
    keyDerivation?: string;
}

export interface ExampleUserAgent {
    primaryDIDRequired: boolean;
    walletIntegration:  boolean;
}

export interface AgentConfigurationSchemaProperties {
    agentType:    Type;
    agentId:      AgentID;
    store:        PropertiesStore;
    didProviders: DidProviders;
    veramo:       Veramo;
    cheqd:        Cheqd;
    packageAgent: PropertiesPackageAgent;
    userAgent:    PropertiesUserAgent;
    parentAgent:  ParentAgent;
    serviceAgent: ServiceAgent;
    capabilities: Capabilities;
    security:     Security;
}

export interface AgentID {
    type:        string;
    pattern:     string;
    description: string;
}

export interface Type {
    type:        string;
    enum:        string[];
    description: string;
}

export interface Capabilities {
    type:        string;
    items:       MethodClass;
    description: string;
}

export interface MethodClass {
    type: string;
    enum: string[];
}

export interface Cheqd {
    type:       string;
    properties: CheqdProperties;
}

export interface CheqdProperties {
    mainnet: Net;
    testnet: Net;
}

export interface Net {
    type:       string;
    properties: MainnetProperties;
}

export interface MainnetProperties {
    rpcUrl:      URL;
    resolverUrl: URL;
}

export interface URL {
    type:    string;
    format:  string;
    default: string;
}

export interface DidProviders {
    type:     string;
    items:    DidProvidersItems;
    minItems: number;
}

export interface DidProvidersItems {
    type:       string;
    properties: PurpleProperties;
    required:   string[];
}

export interface PackageJSONPath {
    type:        string;
    description: string;
}

export interface PropertiesPackageAgent {
    type:        string;
    description: string;
    properties:  PackageAgentProperties;
}

export interface PackageAgentProperties {
    packageJsonPath:    PackageJSONPath;
    bundleTracking:     AutoPublishRelease;
    autoPublishRelease: AutoPublishRelease;
}

export interface AutoPublishRelease {
    type:        string;
    default:     boolean;
    description: string;
}

export interface ParentAgent {
    type:        string;
    description: string;
    properties:  ParentAgentProperties;
}

export interface ParentAgentProperties {
    organizationDID:   PackageJSONPath;
    delegationEnabled: AutoPublishRelease;
}

export interface Security {
    type:       string;
    properties: SecurityProperties;
}

export interface SecurityProperties {
    keyRotationInterval: KeyRotationInterval;
    requireMFA:          AutoPublishRelease;
    auditLogging:        AutoPublishRelease;
}

export interface KeyRotationInterval {
    type:        string;
    minimum:     number;
    description: string;
}

export interface ServiceAgent {
    type:        string;
    description: string;
    properties:  ServiceAgentProperties;
}

export interface ServiceAgentProperties {
    serviceEndpoints: ServiceEndpoints;
    apiKeys:          PackageJSONPath;
}

export interface ServiceEndpoints {
    type:  string;
    items: ServiceEndpointsItems;
}

export interface ServiceEndpointsItems {
    type:       string;
    properties: FluffyProperties;
    required:   string[];
}

export interface ConnectionStringClass {
    type: string;
}

export interface ServiceEndpoint {
    type:   string;
    format: string;
}

export interface PropertiesStore {
    type:       string;
    properties: StoreProperties;
    required:   string[];
}

export interface StoreProperties {
    type:       Type;
    encryption: PropertiesEncryption;
    database:   Database;
}

export interface Database {
    type:       string;
    properties: DatabaseProperties;
}

export interface DatabaseProperties {
    type:             MethodClass;
    connectionString: ConnectionStringClass;
}

export interface PropertiesEncryption {
    type:       string;
    properties: EncryptionProperties;
}

export interface EncryptionProperties {
    enabled:       Enabled;
    keyDerivation: KeyDerivation;
}

export interface Enabled {
    type:    string;
    default: boolean;
}

export interface KeyDerivation {
    type:    string;
    enum:    string[];
    default: string;
}

export interface PropertiesUserAgent {
    type:        string;
    description: string;
    properties:  UserAgentProperties;
}

export interface UserAgentProperties {
    primaryDIDRequired: AutoPublishRelease;
    walletIntegration:  AutoPublishRelease;
}

export interface Veramo {
    type:       string;
    properties: VeramoProperties;
}

export interface VeramoProperties {
    dbConnection: PackageJSONPath;
    plugins:      Plugins;
}

export interface Plugins {
    type:        string;
    items:       ConnectionStringClass;
    description: string;
}

export interface CommunityGovernanceConfigurationSchema {
    "@context":           Array<ContextClass | string>;
    $schema:              string;
    $id:                  string;
    title:                string;
    description:          string;
    governanceReference:  string[];
    type:                 string;
    properties:           CommunityGovernanceConfigurationSchemaProperties;
    required:             string[];
    additionalProperties: boolean;
    examples:             Example[];
}

export interface ExampleConsensusProtocols {
    primaryProtocol:       string;
    finalizationThreshold: number;
    slashingEnabled:       boolean;
}

export interface ExampleProposalManagement {
    submissionEnabled: boolean;
    categories:        string[];
    requiresStake:     boolean;
    stakeAmount:       number;
    reviewPeriod:      number;
}

export interface ExampleReputationSystem {
    enabled:   boolean;
    algorithm: string;
    factors:   ReputationSystemFactors;
}

export interface ReputationSystemFactors {
    codeContributions:       number;
    governanceParticipation: number;
    communitySupport:        number;
    reviewQuality:           number;
}

export interface ExampleVotingConfiguration {
    enabled:           boolean;
    mechanisms:        string[];
    delegationEnabled: boolean;
    minimumStake:      number;
    votingPeriod:      number;
    quorumThreshold:   number;
}

export interface CommunityGovernanceConfigurationSchemaProperties {
    governanceId:          GovernanceID;
    version:               Version;
    participantRole:       ParticipantRole;
    votingConfiguration:   PropertiesVotingConfiguration;
    proposalManagement:    PropertiesProposalManagement;
    consensusProtocols:    PropertiesConsensusProtocols;
    reputationSystem:      PropertiesReputationSystem;
    identityVerification:  IdentityVerification;
    communicationChannels: CommunicationChannels;
    conflictResolution:    ConflictResolution;
    incentiveStructure:    IncentiveStructure;
    auditAndTransparency:  AuditAndTransparency;
}

export interface AuditAndTransparency {
    type:       string;
    properties: AuditAndTransparencyProperties;
}

export interface AuditAndTransparencyProperties {
    enabled:             AuditTrail;
    publicLedger:        AuditTrail;
    auditTrail:          AuditTrail;
    transparencyReports: AuditTrail;
}

export interface AuditTrail {
    type:        AuditTrailType;
    default:     boolean;
    description: string;
}

export enum AuditTrailType {
    Boolean = "boolean",
}

export interface CommunicationChannels {
    type:       string;
    properties: CommunicationChannelsProperties;
}

export interface CommunicationChannelsProperties {
    enabled:  AuditTrail;
    channels: Channels;
}

export interface Channels {
    type:  string;
    items: ChannelsItems;
}

export interface ChannelsItems {
    type:       string;
    properties: ItemsProperties;
    required:   string[];
}

export interface CredentialsProperties {
    authentication: TypeClass;
    value:          Value;
}

export interface Endpoint {
    type:   string;
    format: string;
}

export interface ConflictResolution {
    type:       string;
    properties: ConflictResolutionProperties;
}

export interface ConflictResolutionProperties {
    enabled:          AuditTrail;
    arbitrationPanel: ArbitrationPanel;
    appealProcess:    AppealProcess;
}

export interface AppealProcess {
    type:       string;
    properties: AppealProcessProperties;
}

export interface AppealProcessProperties {
    enabled:      Enabled;
    appealPeriod: ReviewPeriod;
    appealCost:   ReviewPeriod;
}

export interface ReviewPeriod {
    type:        ReviewPeriodType;
    minimum:     number;
    description: string;
    maximum?:    number;
}

export enum ReviewPeriodType {
    Integer = "integer",
    Number = "number",
}

export interface ArbitrationPanel {
    type:       string;
    properties: ArbitrationPanelProperties;
}

export interface ArbitrationPanelProperties {
    enabled:         Enabled;
    panelSize:       FinalizationThreshold;
    selectionMethod: PrimaryProtocol;
}

export interface FinalizationThreshold {
    type:        ReviewPeriodType;
    minimum:     number;
    maximum:     number;
    default:     number;
    description: string;
}

export interface PrimaryProtocol {
    type:         string;
    enum:         string[];
    default:      string;
    description?: string;
}

export interface PropertiesConsensusProtocols {
    type:       string;
    properties: ConsensusProtocolsProperties;
}

export interface ConsensusProtocolsProperties {
    primaryProtocol:       PrimaryProtocol;
    fallbackProtocol:      ParticipantRole;
    finalizationThreshold: FinalizationThreshold;
    slashingEnabled:       AuditTrail;
}

export interface ParticipantRole {
    type:        string;
    enum:        string[];
    description: string;
}

export interface GovernanceID {
    type:        string;
    description: string;
}

export interface IdentityVerification {
    type:       string;
    properties: IdentityVerificationProperties;
}

export interface IdentityVerificationProperties {
    required:          AuditTrail;
    methods:           Methods;
    minimumTrustLevel: FinalizationThreshold;
}

export interface Methods {
    type:        string;
    items:       TypeClass;
    description: string;
    default?:    string[];
}

export interface IncentiveStructure {
    type:       string;
    properties: IncentiveStructureProperties;
}

export interface IncentiveStructureProperties {
    enabled:            AuditTrail;
    tokenRewards:       TokenRewards;
    nonMonetaryRewards: NonMonetaryRewards;
}

export interface NonMonetaryRewards {
    type:       string;
    properties: NonMonetaryRewardsProperties;
}

export interface NonMonetaryRewardsProperties {
    badges:       AuditTrail;
    recognition:  AuditTrail;
    specialRoles: AuditTrail;
}

export interface TokenRewards {
    type:       string;
    properties: TokenRewardsProperties;
}

export interface TokenRewardsProperties {
    enabled:     Enabled;
    currency:    GovernanceID;
    rewardRates: RewardRates;
}

export interface RewardRates {
    type:       string;
    properties: RewardRatesProperties;
}

export interface RewardRatesProperties {
    voting:             ReviewPeriod;
    proposalSubmission: ReviewPeriod;
    codeReview:         ReviewPeriod;
}

export interface PropertiesProposalManagement {
    type:       string;
    properties: ProposalManagementProperties;
}

export interface ProposalManagementProperties {
    submissionEnabled: AuditTrail;
    categories:        Methods;
    requiresStake:     AuditTrail;
    stakeAmount:       ReviewPeriod;
    reviewPeriod:      ReviewPeriod;
}

export interface PropertiesReputationSystem {
    type:       string;
    properties: ReputationSystemProperties;
}

export interface ReputationSystemProperties {
    enabled:     AuditTrail;
    algorithm:   PrimaryProtocol;
    factors:     PropertiesFactors;
    decayFactor: FinalizationThreshold;
}

export interface PropertiesFactors {
    type:       string;
    properties: FactorsProperties;
}

export interface FactorsProperties {
    codeContributions:       FinalizationThreshold;
    governanceParticipation: FinalizationThreshold;
    communitySupport:        FinalizationThreshold;
    reviewQuality:           FinalizationThreshold;
}

export interface PropertiesVotingConfiguration {
    type:       string;
    properties: VotingConfigurationProperties;
}

export interface VotingConfigurationProperties {
    enabled:           AuditTrail;
    mechanisms:        Methods;
    delegationEnabled: AuditTrail;
    minimumStake:      ReviewPeriod;
    votingPeriod:      ReviewPeriod;
    quorumThreshold:   ReviewPeriod;
}

export interface CredentialTemplateSchema {
    "@context":           Array<ContextClass | string>;
    $schema:              string;
    $id:                  string;
    title:                string;
    description:          string;
    governanceReference:  string[];
    type:                 string;
    properties:           CredentialTemplateSchemaProperties;
    required:             string[];
    additionalProperties: boolean;
    examples:             Example[];
}

export interface ExampleCompliance {
    gdprCompliant:   boolean;
    dataCategories:  string[];
    retentionPeriod: string;
}

export interface ExampleCredentialSchema {
    id:   string;
    type: string;
}

export interface ExampleCredentialStatus {
    enabled: boolean;
    type:    string;
}

export interface ExampleCredentialSubject {
    requiredFields: string[];
    dynamicFields:  DynamicField[];
}

export interface DynamicField {
    name:        string;
    type:        string;
    description: string;
    required:    boolean;
}

export interface ExampleSecurity {
    signatureRequired:       boolean;
    allowedSignatureMethods: string[];
}

export interface ExampleValidUntil {
    required:        boolean;
    defaultDuration: string;
}

export interface CredentialTemplateSchemaProperties {
    templateId:        TemplateID;
    templateVersion:   TemplateID;
    name:              Description;
    description:       Description;
    credentialSchema:  PropertiesCredentialSchema;
    context:           Context;
    type:              RequiredFieldsClass;
    issuer:            Issuer;
    credentialSubject: PropertiesCredentialSubject;
    issuanceDate:      IssuanceDate;
    validFrom:         ValidFrom;
    validUntil:        PropertiesValidUntil;
    credentialStatus:  PropertiesCredentialStatus;
    evidence:          Evidence;
    refreshService:    RefreshService;
    rendering:         Rendering;
    security:          PropertiesSecurity;
    compliance:        PropertiesCompliance;
    metadata:          Metadata;
}

export interface PropertiesCompliance {
    type:       string;
    properties: ComplianceProperties;
}

export interface ComplianceProperties {
    gdprCompliant:   GdprCompliant;
    dataCategories:  DataCategories;
    retentionPeriod: TemplateID;
}

export interface DataCategories {
    type:        string;
    items:       TypeClass;
    description: string;
}

export interface GdprCompliant {
    type:                 string;
    default:              boolean;
    governanceReference?: string;
    description:          string;
}

export interface TemplateID {
    type:        string;
    pattern:     string;
    description: string;
}

export interface ContextItems {
    oneOf: Created[];
}

export interface Created {
    type:    string;
    format?: string;
}

export interface PropertiesCredentialSchema {
    type:       string;
    properties: CredentialSchemaProperties;
    required:   string[];
}

export interface CredentialSchemaProperties {
    id:   ID;
    type: PurpleType;
}

export interface ID {
    type:        string;
    format:      string;
    description: string;
}

export interface PropertiesCredentialStatus {
    type:       string;
    properties: CredentialStatusProperties;
}

export interface CredentialStatusProperties {
    enabled:              GdprCompliant;
    type:                 FluffyType;
    statusListCredential: ID;
}

export interface PropertiesCredentialSubject {
    type:       string;
    properties: CredentialSubjectProperties;
}

export interface DynamicFields {
    type:  string;
    items: DynamicFieldsItems;
}

export interface DynamicFieldsItems {
    type:       string;
    properties: ItemsProperties;
    required:   string[];
}

export interface DescriptionClass {
    type: string;
}

export interface Required {
    type:    string;
    default: boolean;
}

export interface Description {
    type:        string;
    description: string;
}

export interface RequiredFieldsClass {
    type:        string;
    items:       DescriptionClass;
    description: string;
    default?:    string[];
}

export interface Evidence {
    type:       string;
    properties: EvidenceProperties;
}

export interface EvidenceProperties {
    required: Required;
    types:    RequiredFieldsClass;
}

export interface IssuanceDate {
    type:       string;
    properties: IssuanceDateProperties;
}

export interface IssuanceDateProperties {
    required:     Required;
    autoGenerate: GdprCompliant;
}

export interface UsageCount {
    type:        string;
    minimum:     number;
    description: string;
}

export interface RefreshService {
    type:       string;
    properties: RefreshServiceProperties;
}

export interface RefreshServiceProperties {
    enabled:  Required;
    endpoint: ID;
}

export interface Rendering {
    type:       string;
    properties: RenderingProperties;
}

export interface RenderingProperties {
    enabled:  GdprCompliant;
    template: Template;
}

export interface Template {
    type:       string;
    properties: TemplateProperties;
}

export interface TemplateProperties {
    type:     TypeClass;
    template: Description;
}

export interface PropertiesSecurity {
    type:       string;
    properties: SecurityProperties;
}

export interface AllowedSignatureMethods {
    type:    string;
    items:   TypeClass;
    default: string[];
}

export interface PrivacyPreserving {
    type:       string;
    properties: PrivacyPreservingProperties;
}

export interface PrivacyPreservingProperties {
    enabled:             Required;
    selectiveDisclosure: GdprCompliant;
    zeroKnowledgeProofs: GdprCompliant;
}

export interface ValidFrom {
    type:       string;
    properties: ValidFromProperties;
}

export interface ValidFromProperties {
    required:     Required;
    autoGenerate: Required;
}

export interface PropertiesValidUntil {
    type:       string;
    properties: ValidUntilProperties;
}

export interface ValidUntilProperties {
    required:        Required;
    defaultDuration: TemplateID;
}

export interface DeveloperToolingConfigurationSchema {
    "@context":           Array<ContextClass | string>;
    $schema:              string;
    $id:                  string;
    title:                string;
    description:          string;
    governanceReference:  string[];
    type:                 string;
    properties:           DeveloperToolingConfigurationSchemaProperties;
    required:             string[];
    additionalProperties: boolean;
    examples:             Example[];
}

export interface ExampleCodeGeneration {
    enabled:       boolean;
    typescript:    CodeGenerationTypescript;
    documentation: CodeGenerationDocumentation;
}

export interface CodeGenerationDocumentation {
    api:      boolean;
    examples: boolean;
}

export interface CodeGenerationTypescript {
    types:      boolean;
    interfaces: boolean;
    validators: boolean;
}

export interface ExampleDebugging {
    enabled:  boolean;
    logLevel: string;
    tracing:  DebuggingTracing;
}

export interface DebuggingTracing {
    enabled: boolean;
    format:  string;
}

export interface ExampleIDEIntegration {
    enabled: boolean;
    vscode:  IDEIntegrationVscode;
}

export interface IDEIntegrationVscode {
    extensionId: string;
    features:    VscodeFeatures;
}

export interface VscodeFeatures {
    schemaValidation: boolean;
    typeGeneration:   boolean;
    snippets:         boolean;
    debugging:        boolean;
}

export interface ExampleTesting {
    framework:  string;
    automation: TestingAutomation;
    coverage:   TestingCoverage;
}

export interface TestingAutomation {
    unitTests:        boolean;
    integrationTests: boolean;
    e2eTests:         boolean;
}

export interface TestingCoverage {
    threshold: number;
}

export interface DeveloperToolingConfigurationSchemaProperties {
    toolingId:       ID;
    version:         Version;
    ideIntegration:  PropertiesIDEIntegration;
    debugging:       PropertiesDebugging;
    testing:         PropertiesTesting;
    codeGeneration:  PropertiesCodeGeneration;
    linting:         Linting;
    cicdIntegration: CicdIntegration;
    devServer:       DevServer;
}

export interface CicdIntegration {
    type:       string;
    properties: CicdIntegrationProperties;
}

export interface CicdIntegrationProperties {
    enabled:       Enabled;
    githubActions: GithubActions;
    qualityGates:  QualityGates;
}

export interface GithubActions {
    type:       string;
    properties: GithubActionsProperties;
}

export interface GithubActionsProperties {
    workflows: Triggers;
    triggers:  Triggers;
}

export interface Triggers {
    type:    string;
    items:   SeverityClass;
    default: string[];
}

export interface SeverityClass {
    type: string;
    enum: string[];
}

export interface QualityGates {
    type:       string;
    properties: QualityGatesProperties;
}

export interface QualityGatesProperties {
    testCoverage:    Port;
    securityScan:    PerformanceTest;
    performanceTest: PerformanceTest;
}

export interface PerformanceTest {
    type:    Type;
    default: boolean;
}

export interface Port {
    type:         string;
    minimum:      number;
    maximum:      number;
    default:      number;
    description?: string;
}

export interface PropertiesCodeGeneration {
    type:       string;
    properties: CodeGenerationProperties;
}

export interface CodeGenerationProperties {
    enabled:       Enabled;
    typescript:    PropertiesTypescript;
    documentation: PropertiesDocumentation;
}

export interface PropertiesDocumentation {
    type:       string;
    properties: DocumentationProperties;
}

export interface DocumentationProperties {
    api:       Enabled;
    examples:  Enabled;
    tutorials: Enabled;
}

export interface PropertiesTypescript {
    type:       string;
    properties: TypescriptProperties;
}

export interface TypescriptProperties {
    types:      Enabled;
    interfaces: Enabled;
    validators: Enabled;
}

export interface PropertiesDebugging {
    type:       string;
    properties: DebuggingProperties;
}

export interface DebuggingProperties {
    enabled:     Enabled;
    logLevel:    LogLevel;
    tracing:     PropertiesTracing;
    breakpoints: Breakpoints;
}

export interface Breakpoints {
    type:       string;
    properties: BreakpointsProperties;
}

export interface BreakpointsProperties {
    didOperations:    Enabled;
    credentialFlow:   Enabled;
    cryptoOperations: Enabled;
}

export interface LogLevel {
    type:         string;
    enum?:        string[];
    default:      string;
    description?: string;
}

export interface PropertiesTracing {
    type:       string;
    properties: TracingProperties;
}

export interface TracingProperties {
    enabled:  Enabled;
    format:   LogLevel;
    endpoint: Endpoint;
}

export interface DevServer {
    type:       string;
    properties: DevServerProperties;
}

export interface DevServerProperties {
    enabled:      Enabled;
    port:         Port;
    hotReload:    Enabled;
    mockServices: MockServices;
}

export interface MockServices {
    type:       string;
    properties: MockServicesProperties;
}

export interface MockServicesProperties {
    trustRegistry: Enabled;
    didResolver:   Enabled;
    blockchain:    Enabled;
}

export interface PropertiesIDEIntegration {
    type:       string;
    properties: IDEIntegrationProperties;
}

export interface IDEIntegrationProperties {
    enabled:  Enabled;
    vscode:   PropertiesVscode;
    intellij: Intellij;
}

export interface Intellij {
    type:       string;
    properties: IntellijProperties;
}

export interface IntellijProperties {
    pluginId: ID;
    features: PurpleFeatures;
}

export interface PurpleFeatures {
    type:       string;
    properties: PurpleProperties;
}

export interface PropertiesVscode {
    type:       string;
    properties: VscodeProperties;
}

export interface VscodeProperties {
    extensionId: LogLevel;
    features:    FluffyFeatures;
}

export interface FluffyFeatures {
    type:       string;
    properties: FluffyProperties;
}

export interface Linting {
    type:       string;
    properties: LintingProperties;
}

export interface LintingProperties {
    enabled:     Enabled;
    rules:       Rules;
    customRules: CustomRules;
}

export interface CustomRules {
    type:  string;
    items: CustomRulesItems;
}

export interface CustomRulesItems {
    type:       string;
    properties: ItemsProperties;
    required:   string[];
}

export interface Rules {
    type:       string;
    properties: RulesProperties;
}

export interface RulesProperties {
    schemaCompliance:    Enabled;
    securityPatterns:    Enabled;
    performancePatterns: Enabled;
}

export interface PropertiesTesting {
    type:       string;
    properties: TestingProperties;
}

export interface TestingProperties {
    framework:  LogLevel;
    automation: PropertiesAutomation;
    coverage:   PropertiesCoverage;
}

export interface PropertiesAutomation {
    type:       string;
    properties: AutomationProperties;
}

export interface AutomationProperties {
    unitTests:        Enabled;
    integrationTests: Enabled;
    e2eTests:         Enabled;
}

export interface PropertiesCoverage {
    type:       string;
    properties: CoverageProperties;
}

export interface CoverageProperties {
    threshold:       Port;
    excludePatterns: ExcludePatterns;
}

export interface ExcludePatterns {
    type:        string;
    items:       Name;
    description: string;
}

export interface EnhancedValidationConfigurationSchema {
    "@context":           Array<ContextClass | string>;
    $schema:              string;
    $id:                  string;
    title:                string;
    description:          string;
    governanceReference:  string[];
    type:                 string;
    properties:           EnhancedValidationConfigurationSchemaProperties;
    required:             string[];
    additionalProperties: boolean;
    examples:             Example[];
}

export interface ExampleContinuousValidation {
    enabled:       boolean;
    triggers:      string[];
    schedule:      ContinuousValidationSchedule;
    notifications: ContinuousValidationNotifications;
}

export interface ContinuousValidationNotifications {
    enabled:   boolean;
    channels:  string[];
    onFailure: boolean;
    onSuccess: boolean;
}

export interface ContinuousValidationSchedule {
    enabled: boolean;
    cron:    string;
}

export interface ExampleQualityAssurance {
    enabled:          boolean;
    codeQuality:      QualityAssuranceCodeQuality;
    securityScanning: QualityAssuranceSecurityScanning;
}

export interface QualityAssuranceCodeQuality {
    linting:        Ing;
    codeComplexity: CodeQualityCodeComplexity;
}

export interface CodeQualityCodeComplexity {
    enabled:                       boolean;
    cyclomaticComplexityThreshold: number;
    maintainabilityIndex:          number;
}

export interface Ing {
    enabled: boolean;
    tools:   string[];
}

export interface QualityAssuranceSecurityScanning {
    enabled:               boolean;
    vulnerabilityScanning: SecurityScanningVulnerabilityScanning;
    secretsScanning:       Ing;
}

export interface SecurityScanningVulnerabilityScanning {
    enabled:           boolean;
    tools:             string[];
    severityThreshold: string;
}

export interface ExampleReporting {
    enabled:          boolean;
    formats:          string[];
    outputDirectory:  string;
    retentionPeriod:  number;
    dashboardEnabled: boolean;
}

export interface ExampleSchemaValidation {
    enabled:                 boolean;
    strictMode:              boolean;
    validateExamples:        boolean;
    adrGovernanceValidation: SchemaValidationAdrGovernanceValidation;
}

export interface SchemaValidationAdrGovernanceValidation {
    enabled:                    boolean;
    requireGovernanceReference: boolean;
    validateGovernanceLinks:    boolean;
}

export interface ExampleTestAutomation {
    enabled:           boolean;
    testTypes:         string[];
    testFrameworks:    TestAutomationTestFrameworks;
    coverageTargets:   TestAutomationCoverageTargets;
    parallelExecution: TestAutomationParallelExecution;
}

export interface TestAutomationCoverageTargets {
    statements: number;
    branches:   number;
    functions:  number;
    lines:      number;
}

export interface TestAutomationParallelExecution {
    enabled:               boolean;
    maxWorkers:            number;
    testSuiteDistribution: string;
}

export interface TestAutomationTestFrameworks {
    unit:        string;
    integration: string;
    security:    string;
}

export interface EnhancedValidationConfigurationSchemaProperties {
    validationId:         ValidationID;
    version:              Version;
    schemaValidation:     PropertiesSchemaValidation;
    testAutomation:       PropertiesTestAutomation;
    qualityAssurance:     PropertiesQualityAssurance;
    performanceTesting:   PerformanceTesting;
    continuousValidation: PropertiesContinuousValidation;
    reporting:            PropertiesReporting;
}

export interface PropertiesContinuousValidation {
    type:       string;
    properties: ContinuousValidationProperties;
}

export interface ContinuousValidationProperties {
    enabled:       DashboardEnabledClass;
    triggers:      Triggers;
    schedule:      PropertiesSchedule;
    notifications: PropertiesNotifications;
}

export interface DashboardEnabledClass {
    type:        Type;
    default:     boolean;
    description: string;
}

export enum Type {
    Boolean = "boolean",
}

export interface PropertiesNotifications {
    type:       string;
    properties: NotificationsProperties;
}

export interface NotificationsProperties {
    enabled:   OnFailureClass;
    channels:  Triggers;
    onFailure: OnFailureClass;
    onSuccess: OnFailureClass;
}

export interface TriggersItems {
    type: string;
    enum: string[];
}

export interface OnFailureClass {
    type:    Type;
    default: boolean;
}

export interface PropertiesSchedule {
    type:       string;
    properties: ScheduleProperties;
}

export interface ScheduleProperties {
    enabled: OnFailureClass;
    cron:    Version;
}

export interface PerformanceTesting {
    type:       string;
    properties: PerformanceTestingProperties;
}

export interface PerformanceTestingProperties {
    enabled:      DashboardEnabledClass;
    loadTesting:  LoadTesting;
    benchmarking: Benchmarking;
}

export interface Benchmarking {
    type:       string;
    properties: BenchmarkingProperties;
}

export interface BenchmarkingProperties {
    enabled:    OnFailureClass;
    metrics:    Triggers;
    thresholds: Thresholds;
}

export interface Thresholds {
    type:       string;
    properties: ThresholdsProperties;
}

export interface ThresholdsProperties {
    responseTime: ValidationID;
    throughput:   ValidationID;
    memoryUsage:  ValidationID;
}

export interface ValidationID {
    type:        string;
    description: string;
}

export interface LoadTesting {
    type:       string;
    properties: LoadTestingProperties;
}

export interface LoadTestingProperties {
    enabled:   OnFailureClass;
    scenarios: Scenarios;
}

export interface Scenarios {
    type:  string;
    items: ScenariosItems;
}

export interface ScenariosItems {
    type:       string;
    properties: PurpleProperties;
    required:   string[];
}

export interface Duration {
    type:    string;
    pattern: string;
}

export interface VirtualUsers {
    type:    string;
    minimum: number;
}

export interface PropertiesQualityAssurance {
    type:       string;
    properties: QualityAssuranceProperties;
}

export interface QualityAssuranceProperties {
    enabled:              DashboardEnabledClass;
    codeQuality:          PropertiesCodeQuality;
    securityScanning:     PropertiesSecurityScanning;
    accessibilityTesting: AccessibilityTesting;
}

export interface AccessibilityTesting {
    type:       string;
    properties: AccessibilityTestingProperties;
}

export interface AccessibilityTestingProperties {
    enabled:   DashboardEnabledClass;
    standards: Triggers;
    level:     Level;
}

export interface Level {
    type:    string;
    enum:    string[];
    default: string;
}

export interface PropertiesCodeQuality {
    type:       string;
    properties: CodeQualityProperties;
}

export interface CodeQualityProperties {
    linting:        Linting;
    codeComplexity: PropertiesCodeComplexity;
}

export interface PropertiesCodeComplexity {
    type:       string;
    properties: CodeComplexityProperties;
}

export interface CodeComplexityProperties {
    enabled:                       OnFailureClass;
    cyclomaticComplexityThreshold: RetentionPeriod;
    maintainabilityIndex:          RetentionPeriod;
}

export interface RetentionPeriod {
    type:         string;
    minimum:      number;
    maximum?:     number;
    default:      number;
    description?: string;
}

export interface ConfigFiles {
    type:        string;
    items:       Name;
    description: string;
}

export interface PropertiesSecurityScanning {
    type:       string;
    properties: SecurityScanningProperties;
}

export interface SecurityScanningProperties {
    enabled:               DashboardEnabledClass;
    vulnerabilityScanning: PropertiesVulnerabilityScanning;
    secretsScanning:       SecretsScanning;
}

export interface SecretsScanning {
    type:       string;
    properties: SecretsScanningProperties;
}

export interface SecretsScanningProperties {
    enabled: OnFailureClass;
    tools:   Triggers;
}

export interface PropertiesVulnerabilityScanning {
    type:       string;
    properties: VulnerabilityScanningProperties;
}

export interface VulnerabilityScanningProperties {
    enabled:           OnFailureClass;
    tools:             Triggers;
    severityThreshold: Level;
}

export interface PropertiesReporting {
    type:       string;
    properties: ReportingProperties;
}

export interface ReportingProperties {
    enabled:          DashboardEnabledClass;
    formats:          Triggers;
    outputDirectory:  OutputDirectory;
    retentionPeriod:  RetentionPeriod;
    dashboardEnabled: DashboardEnabledClass;
}

export interface OutputDirectory {
    type:        string;
    default:     string;
    description: string;
}

export interface PropertiesSchemaValidation {
    type:       string;
    properties: SchemaValidationProperties;
}

export interface SchemaValidationProperties {
    enabled:                 DashboardEnabledClass;
    strictMode:              DashboardEnabledClass;
    validateExamples:        DashboardEnabledClass;
    customValidators:        CustomValidators;
    adrGovernanceValidation: PropertiesAdrGovernanceValidation;
}

export interface PropertiesAdrGovernanceValidation {
    type:       string;
    properties: AdrGovernanceValidationProperties;
}

export interface AdrGovernanceValidationProperties {
    enabled:                    DashboardEnabledClass;
    requireGovernanceReference: DashboardEnabledClass;
    validateGovernanceLinks:    DashboardEnabledClass;
}

export interface CustomValidators {
    type:  string;
    items: CustomValidatorsItems;
}

export interface CustomValidatorsItems {
    type:       string;
    properties: FluffyProperties;
    required:   string[];
}

export interface PropertiesTestAutomation {
    type:       string;
    properties: TestAutomationProperties;
}

export interface TestAutomationProperties {
    enabled:           DashboardEnabledClass;
    testTypes:         Triggers;
    testFrameworks:    PropertiesTestFrameworks;
    coverageTargets:   PropertiesCoverageTargets;
    parallelExecution: PropertiesParallelExecution;
}

export interface PropertiesCoverageTargets {
    type:       string;
    properties: CoverageTargetsProperties;
}

export interface CoverageTargetsProperties {
    statements: RetentionPeriod;
    branches:   RetentionPeriod;
    functions:  RetentionPeriod;
    lines:      RetentionPeriod;
}

export interface PropertiesParallelExecution {
    type:       string;
    properties: ParallelExecutionProperties;
}

export interface ParallelExecutionProperties {
    enabled:               DashboardEnabledClass;
    maxWorkers:            RetentionPeriod;
    testSuiteDistribution: Level;
}

export interface PropertiesTestFrameworks {
    type:       string;
    properties: TestFrameworksProperties;
}

export interface TestFrameworksProperties {
    unit:        Level;
    integration: Level;
    e2e:         Level;
    security:    Level;
    performance: Level;
}

export interface KeyManagementConfigurationSchema {
    "@context":           Array<ContextClass | string>;
    $schema:              string;
    $id:                  string;
    title:                string;
    description:          string;
    governanceReference:  string[];
    type:                 string;
    properties:           KeyManagementConfigurationSchemaProperties;
    required:             string[];
    additionalProperties: boolean;
}

export interface KeyManagementConfigurationSchemaProperties {
    keyStore:      KeyStore;
    keyGeneration: KeyGeneration;
    keyRotation:   KeyRotation;
    keyUsage:      KeyUsage;
    backup:        Backup;
    security:      Security;
    auditLogging:  AuditLogging;
}

export interface AuditLogging {
    type:       string;
    properties: AuditLoggingProperties;
}

export interface AuditLoggingProperties {
    enabled:   Enabled;
    events:    Events;
    retention: Retention;
}

export interface Events {
    type:    string;
    items:   Items;
    default: string[];
}

export interface Retention {
    type:         string;
    minimum:      number;
    default?:     number;
    description?: string;
    maximum?:     number;
}

export interface Backup {
    type:       string;
    properties: BackupProperties;
}

export interface BackupProperties {
    enabled:         Enabled;
    method:          Method;
    mnemonicOptions: MnemonicOptions;
}

export interface Method {
    type:    string;
    enum:    string[];
    default: string;
}

export interface MnemonicOptions {
    type:       string;
    properties: MnemonicOptionsProperties;
}

export interface MnemonicOptionsProperties {
    wordCount: WordCount;
    language:  Method;
}

export interface WordCount {
    type:    string;
    enum:    number[];
    default: number;
}

export interface KeyGeneration {
    type:       string;
    properties: KeyGenerationProperties;
}

export interface KeyGenerationProperties {
    defaultAlgorithm:    Method;
    supportedAlgorithms: Events;
    randomnessSource:    Method;
}

export interface KeyRotation {
    type:       string;
    properties: KeyRotationProperties;
}

export interface KeyRotationProperties {
    enabled:          Enabled;
    rotationInterval: Retention;
    advanceNotice:    Retention;
    maxKeyAge:        Retention;
}

export interface KeyStore {
    type:       string;
    properties: KeyStoreProperties;
    required:   string[];
}

export interface KeyStoreProperties {
    type:       Type;
    path:       Path;
    encryption: Encryption;
}

export interface Encryption {
    type:       string;
    properties: EncryptionProperties;
    required:   string[];
}

export interface KeyDerivationProperties {
    algorithm:  Method;
    iterations: Retention;
    saltLength: Retention;
}

export interface Path {
    type:        string;
    description: string;
}

export interface KeyUsage {
    type:       string;
    properties: KeyUsageProperties;
}

export interface KeyUsageProperties {
    signingKeys:    Keys;
    encryptionKeys: Keys;
}

export interface Keys {
    type:       string;
    properties: EncryptionKeysProperties;
}

export interface EncryptionKeysProperties {
    algorithm: Method;
    purposes:  Events;
}

export interface BiometricAuth {
    type:                string;
    default:             boolean;
    governanceReference: string;
}

export interface LockoutPolicy {
    type:       string;
    properties: LockoutPolicyProperties;
}

export interface LockoutPolicyProperties {
    enabled:         Enabled;
    maxAttempts:     Retention;
    lockoutDuration: Retention;
}

export interface PerformanceMetricsSchema {
    "@context":           Array<ContextClass | string>;
    $schema:              string;
    $id:                  string;
    title:                string;
    description:          string;
    governanceReference:  string[];
    type:                 string;
    properties:           PerformanceMetricsSchemaProperties;
    required:             string[];
    additionalProperties: boolean;
    examples:             Example[];
}

export interface ExampleOperationMetrics {
    didOperations:        OperationMetricsDidOperations;
    credentialOperations: OperationMetricsCredentialOperations;
}

export interface OperationMetricsCredentialOperations {
    verification: CredentialOperationsVerification;
}

export interface CredentialOperationsVerification {
    averageTime:               number;
    signatureVerificationTime: number;
    trustRegistryTime:         number;
    revocationCheckTime:       number;
}

export interface OperationMetricsDidOperations {
    creation:   DidOperationsCreation;
    resolution: DidOperationsResolution;
}

export interface DidOperationsCreation {
    averageTime: number;
    p95Time:     number;
    successRate: number;
    errorCount:  number;
}

export interface DidOperationsResolution {
    averageTime:  number;
    cacheHitRate: number;
    networkTime:  number;
}

export interface ExampleSystemMetrics {
    memory:  SystemMetricsMemory;
    network: SystemMetricsNetwork;
}

export interface SystemMetricsMemory {
    used: number;
    peak: number;
}

export interface SystemMetricsNetwork {
    requestCount:   number;
    averageLatency: number;
    errorRate:      number;
}

export interface PerformanceMetricsSchemaProperties {
    metricId:          MetricID;
    timestamp:         Timestamp;
    sdkVersion:        SDKVersion;
    environment:       Environment;
    operationMetrics:  PropertiesOperationMetrics;
    systemMetrics:     PropertiesSystemMetrics;
    errorMetrics:      ErrorMetrics;
    carbonMetrics:     CarbonMetrics;
    aggregationPeriod: AggregationPeriod;
}

export interface AggregationPeriod {
    type:       string;
    properties: AggregationPeriodProperties;
}

export interface AggregationPeriodProperties {
    startTime:   EndTimeClass;
    endTime:     EndTimeClass;
    duration:    MetricID;
    sampleCount: MetricID;
}

export interface MetricID {
    type:        Type;
    description: string;
}

export enum Type {
    Integer = "integer",
    Number = "number",
    String = "string",
}

export interface EndTimeClass {
    type:   Type;
    format: string;
}

export interface CarbonMetrics {
    type:       string;
    properties: CarbonMetricsProperties;
}

export interface CarbonMetricsProperties {
    enabled:      Enabled;
    estimatedCO2: MetricID;
    energyUsage:  MetricID;
    methodology:  MetricID;
}

export interface Environment {
    type:        Type;
    enum:        string[];
    description: string;
}

export interface ErrorMetrics {
    type:       string;
    properties: ErrorMetricsProperties;
}

export interface ErrorMetricsProperties {
    totalErrors:     CriticalErrors;
    errorsByType:    ErrorsByType;
    criticalErrors:  CriticalErrors;
    recoveredErrors: CriticalErrors;
}

export interface CriticalErrors {
    type:        Type;
    minimum:     number;
    description: string;
    maximum?:    number;
}

export interface ErrorsByType {
    type:              string;
    patternProperties: PatternProperties;
    description:       string;
}

export interface PatternProperties {
    "^[a-zA-Z][a-zA-Z0-9_]*$": AZAZAZAZ09_$;
}

export interface AZAZAZAZ09_$ {
    type:    Type;
    minimum: number;
}

export interface PropertiesOperationMetrics {
    type:       string;
    properties: OperationMetricsProperties;
}

export interface OperationMetricsProperties {
    didOperations:        PropertiesDidOperations;
    credentialOperations: PropertiesCredentialOperations;
    storageOperations:    StorageOperations;
}

export interface PropertiesCredentialOperations {
    type:       string;
    properties: CredentialOperationsProperties;
}

export interface CredentialOperationsProperties {
    issuance:     Issuance;
    verification: PropertiesVerification;
}

export interface Issuance {
    type:       string;
    properties: IssuanceProperties;
}

export interface IssuanceProperties {
    averageTime:    AverageTimeClass;
    validationTime: MetricID;
    signingTime:    MetricID;
}

export interface AverageTimeClass {
    type: Type;
}

export interface PropertiesVerification {
    type:       string;
    properties: VerificationProperties;
}

export interface VerificationProperties {
    averageTime:               AverageTimeClass;
    signatureVerificationTime: AverageTimeClass;
    trustRegistryTime:         MetricID;
    revocationCheckTime:       MetricID;
}

export interface PropertiesDidOperations {
    type:       string;
    properties: DidOperationsProperties;
}

export interface DidOperationsProperties {
    creation:   PropertiesCreation;
    resolution: PropertiesResolution;
}

export interface PropertiesCreation {
    type:       string;
    properties: CreationProperties;
}

export interface CreationProperties {
    averageTime: MetricID;
    p95Time:     MetricID;
    successRate: CriticalErrors;
    errorCount:  CriticalErrors;
}

export interface PropertiesResolution {
    type:       string;
    properties: ResolutionProperties;
}

export interface ResolutionProperties {
    averageTime:  MetricID;
    cacheHitRate: CriticalErrors;
    networkTime:  MetricID;
}

export interface StorageOperations {
    type:       string;
    properties: StorageOperationsProperties;
}

export interface StorageOperationsProperties {
    readTime:       MetricID;
    writeTime:      MetricID;
    encryptionTime: MetricID;
    storageSize:    MetricID;
}

export interface SDKVersion {
    type:        Type;
    pattern:     string;
    description: string;
}

export interface PropertiesSystemMetrics {
    type:       string;
    properties: SystemMetricsProperties;
}

export interface SystemMetricsProperties {
    memory:  PropertiesMemory;
    cpu:     CPU;
    network: PropertiesNetwork;
}

export interface CPU {
    type:       string;
    properties: CPUProperties;
}

export interface CPUProperties {
    usage:            CriticalErrors;
    cryptoOperations: MetricID;
}

export interface PropertiesMemory {
    type:       string;
    properties: MemoryProperties;
}

export interface MemoryProperties {
    used:   MetricID;
    peak:   MetricID;
    gcTime: MetricID;
}

export interface PropertiesNetwork {
    type:       string;
    properties: NetworkProperties;
}

export interface NetworkProperties {
    requestCount:     MetricID;
    averageLatency:   MetricID;
    errorRate:        CriticalErrors;
    bytesTransferred: MetricID;
}

export interface Timestamp {
    type:        Type;
    format:      string;
    description: string;
}

export interface PrivacyPreservingCredentialSchema {
    "@context":           Array<ContextClass | string>;
    $schema:              string;
    $id:                  string;
    title:                string;
    description:          string;
    governanceReference:  string[];
    type:                 string;
    properties:           PrivacyPreservingCredentialSchemaProperties;
    required:             string[];
    additionalProperties: boolean;
}

export interface PrivacyPreservingCredentialSchemaProperties {
    credentialId:    CredentialID;
    privacyFeatures: PrivacyFeatures;
    gdprCompliance:  GdprCompliance;
}

export interface CredentialID {
    type:        string;
    description: string;
}

export interface GdprCompliance {
    type:       string;
    properties: GdprComplianceProperties;
}

export interface GdprComplianceProperties {
    legalBasis:    LegalBasis;
    dataRetention: DataRetention;
}

export interface DataRetention {
    type:       string;
    properties: DataRetentionProperties;
}

export interface DataRetentionProperties {
    retentionPeriod: CredentialID;
}

export interface LegalBasis {
    type:        string;
    enum:        string[];
    description: string;
    default?:    string;
}

export interface PrivacyFeatures {
    type:       string;
    properties: PrivacyFeaturesProperties;
}

export interface PrivacyFeaturesProperties {
    selectiveDisclosure: SelectiveDisclosure;
    zeroKnowledgeProofs: ZeroKnowledgeProofs;
}

export interface SelectiveDisclosure {
    type:       string;
    properties: SelectiveDisclosureProperties;
}

export interface SelectiveDisclosureProperties {
    enabled: Enabled;
    method:  LegalBasis;
}

export interface ZeroKnowledgeProofs {
    type:       string;
    properties: ZeroKnowledgeProofsProperties;
}

export interface ZeroKnowledgeProofsProperties {
    enabled:         Enabled;
    supportedProofs: SupportedProofs;
}

export interface SupportedProofs {
    type:  string;
    items: Items;
}

export interface SDKConfigurationSchema {
    "@context":              Array<ContextClass | string>;
    $schema:                 string;
    $id:                     string;
    title:                   string;
    description:             string;
    governanceReference:     string[];
    implementationReference: string[];
    standardsCompliance:     string[];
    type:                    string;
    properties:              SDKConfigurationSchemaProperties;
    required:                string[];
    additionalProperties:    boolean;
    examples:                Example[];
}

export interface Nce {
    "@id":   string;
    "@type": string;
}

export interface ExampleLogging {
    level:        string;
    auditEnabled: boolean;
}

export interface ExampleNetworks {
    cheqd: NetworksCheqd;
}

export interface NetworksCheqd {
    network: string;
    rpcUrl:  string;
}

export interface ExampleStorage {
    type:       string;
    encryption: StorageEncryption;
}

export interface StorageEncryption {
    enabled:   boolean;
    algorithm: string;
}

export interface ExampleTrustRegistry {
    enabled:  boolean;
    endpoint: string;
    cacheTtl: number;
}

export interface SDKConfigurationSchemaProperties {
    version:         Version;
    environment:     Environment;
    didMethods:      DidMethods;
    networks:        PropertiesNetworks;
    storage:         PropertiesStorage;
    trustRegistry:   PropertiesTrustRegistry;
    carbonAwareness: CarbonAwareness;
    logging:         PropertiesLogging;
    accessibility:   Accessibility;
}

export interface Accessibility {
    type:       string;
    properties: AccessibilityProperties;
}

export interface AccessibilityProperties {
    enabled:      DidMethods;
    lowBandwidth: DidMethods;
}

export interface DidMethods {
    type:                 string;
    default?:             boolean;
    governanceReference?: string;
    description:          string;
    items?:               Items;
    enum?:                string[];
}

export interface CarbonAwareness {
    type:       string;
    properties: CarbonAwarenessProperties;
}

export interface CarbonAwarenessProperties {
    enabled:  DidMethods;
    tracking: DidMethods;
}

export interface PropertiesLogging {
    type:       string;
    properties: LoggingProperties;
}

export interface LoggingProperties {
    level:        Environment;
    auditEnabled: DidMethods;
}

export interface PropertiesNetworks {
    type:       string;
    properties: NetworksProperties;
}

export interface NetworksProperties {
    cheqd:    PropertiesCheqd;
    ethereum: Ethereum;
}

export interface PropertiesCheqd {
    type:       string;
    properties: CheqdProperties;
    required:   string[];
}

export interface CosmosPayerSeed {
    type:        string;
    description: string;
}

export interface Ethereum {
    type:       string;
    properties: EthereumProperties;
}

export interface EthereumProperties {
    network: Environment;
    rpcUrl:  Endpoint;
}

export interface PropertiesStorage {
    type:       string;
    properties: StorageProperties;
    required:   string[];
}

export interface StorageProperties {
    type:       DidMethods;
    encryption: PropertiesEncryption;
    database:   Database;
}

export interface PropertiesTrustRegistry {
    type:       string;
    properties: TrustRegistryProperties;
}

export interface TrustRegistryProperties {
    enabled:  DidMethods;
    endpoint: Endpoint;
    cacheTtl: CacheTTL;
}

export interface CacheTTL {
    type:        string;
    minimum:     number;
    default:     number;
    description: string;
}

export interface TrustRegistryQuerySchema {
    "@context":           Array<ContextClass | string>;
    $schema:              string;
    $id:                  string;
    title:                string;
    description:          string;
    governanceReference:  string[];
    type:                 string;
    properties:           TrustRegistryQuerySchemaProperties;
    required:             string[];
    additionalProperties: boolean;
}

export interface TrustRegistryQuerySchemaProperties {
    queryId:    QueryID;
    queryType:  Type;
    target:     Target;
    requester:  Requester;
    parameters: Parameters;
    timestamp:  Timestamp;
}

export interface Parameters {
    type:       string;
    properties: ParametersProperties;
}

export interface ParametersProperties {
    trustLevel:        TrustLevel;
    includeTransitive: IncludeTransitive;
}

export interface IncludeTransitive {
    type:    string;
    default: boolean;
}

export interface TrustLevel {
    type:    string;
    enum:    string[];
    default: string;
}

export interface QueryID {
    type:        string;
    description: string;
}

export interface Requester {
    type:       string;
    properties: RequesterProperties;
    required:   string[];
}

export interface RequesterProperties {
    did:     Did;
    purpose: Did;
}

export interface Did {
    type: string;
}

export interface Target {
    type:       string;
    properties: TargetProperties;
    required:   string[];
}

export interface TargetProperties {
    type:       Type;
    identifier: Did;
}

export interface VerificationResultSchema {
    "@context":           Array<ContextClass | string>;
    $schema:              string;
    $id:                  string;
    title:                string;
    description:          string;
    governanceReference:  string[];
    type:                 Type;
    properties:           VerificationResultSchemaProperties;
    required:             string[];
    additionalProperties: boolean;
    examples:             Example[];
}

export interface Check {
    type:    string;
    status:  string;
    message: string;
}

export interface ExampleMetadata {
    verifierDid:         string;
    verificationPurpose: string;
    sdkVersion:          string;
    processingTime:      number;
}

export interface ExampleRevocation {
    checked:     boolean;
    status:      string;
    method:      string;
    lastChecked: Date;
}

export interface ExampleSignature {
    valid:     boolean;
    algorithm: string;
    keyId:     string;
    did:       string;
}

export interface ExampleSubject {
    type: string;
    id:   string;
    hash: string;
}

export interface TrustRegistryIssuerTrust {
    trusted: boolean;
    level:   string;
    reason:  string;
}

export interface VerificationResultSchemaProperties {
    verified:              VerificationMethod;
    verificationTimestamp: VerificationTimestamp;
    verificationType:      VerificationType;
    verificationMethod:    VerificationMethod;
    subject:               PropertiesSubject;
    checks:                Checks;
    trustRegistry:         PropertiesTrustRegistry;
    revocation:            PropertiesRevocation;
    signature:             PropertiesSignature;
    errors:                Errors;
    warnings:              Warnings;
    metadata:              PropertiesMetadata;
}

export interface Checks {
    type:     string;
    items:    ChecksItems;
    minItems: number;
}

export interface ChecksItems {
    type:       Type;
    properties: PurpleProperties;
    required:   string[];
}

export interface VerificationMethod {
    type:        Type;
    description: string;
}

export enum Type {
    Boolean = "boolean",
    Number = "number",
    Object = "object",
    String = "string",
}

export interface Governance {
    type:       Type;
    properties: GovernanceProperties;
}

export interface GovernanceProperties {
    adrReference: VerificationMethod;
    policyId:     VerificationMethod;
}

export interface VerificationPurpose {
    type: Type;
    enum: string[];
}

export interface Errors {
    type:  string;
    items: ErrorsItems;
}

export interface ErrorsItems {
    type:       Type;
    properties: FluffyProperties;
    required:   string[];
}

export interface PropertiesMetadata {
    type:       Type;
    properties: MetadataProperties;
}

export interface CarbonFootprint {
    type:       Type;
    properties: CarbonFootprintProperties;
}

export interface CarbonFootprintProperties {
    estimated:   VerificationMethod;
    methodology: Methodology;
}

export interface Methodology {
    type:                Type;
    governanceReference: string;
}

export interface PropertiesRevocation {
    type:       Type;
    properties: RevocationProperties;
}

export interface RevocationProperties {
    checked:              VerificationMethod;
    status:               VerificationPurpose;
    method:               VerificationPurpose;
    lastChecked:          LastChecked;
    statusListCredential: VerificationTimestamp;
}

export interface LastChecked {
    type:   Type;
    format: string;
}

export interface VerificationTimestamp {
    type:        Type;
    format:      string;
    description: string;
}

export interface PropertiesSignature {
    type:       Type;
    properties: SignatureProperties;
}

export interface SignatureProperties {
    valid:     VerificationMethod;
    algorithm: VerificationMethod;
    keyId:     VerificationMethod;
    publicKey: VerificationMethod;
    did:       VerificationMethod;
}

export interface PropertiesSubject {
    type:       Type;
    properties: SubjectProperties;
    required:   string[];
}

export interface SubjectProperties {
    type: VerificationPurpose;
    id:   VerificationMethod;
    hash: VerificationMethod;
}

export interface PropertiesIssuerTrust {
    type:       Type;
    properties: IssuerTrustProperties;
}

export interface IssuerTrustProperties {
    trusted: CheckType;
    level:   VerificationPurpose;
    reason:  CheckType;
}

export interface CheckType {
    type: Type;
}

export interface SchemaRegistry {
    type:       Type;
    properties: SchemaRegistryProperties;
}

export interface SchemaRegistryProperties {
    validated: CheckType;
    schemaId:  CheckType;
    version:   CheckType;
}

export interface VerificationType {
    type:        Type;
    enum:        string[];
    description: string;
}

export interface Warnings {
    type:  string;
    items: WarningsItems;
}

export interface WarningsItems {
    type:       Type;
    properties: TentacledProperties;
    required:   string[];
}

export interface TentacledProperties {
    code:      CheckType;
    message:   CheckType;
    checkType: CheckType;
}

export interface BasicPersonSchema {
    $metadata:   Metadata;
    $schema:     string;
    $id:         string;
    version:     string;
    description: string;
    title:       string;
    properties:  BasicPersonSchemaProperties;
    required:    string[];
    type:        string;
}

export interface Uris {
    jsonLdContext: string;
}

export interface BasicPersonSchemaProperties {
    "@context":        Context;
    expirationDate:    ExpirationDate;
    id:                ID;
    issuanceDate:      ExpirationDate;
    issuer:            Issuer;
    type:              TypeClass;
    credentialSubject: CredentialSubject;
    credentialSchema:  CredentialSchema;
}

export interface CredentialSchema {
    properties: CredentialSchemaProperties;
    required:   string[];
    type:       string;
}

export interface Addresses {
    description: string;
    title:       string;
    properties:  AddressesProperties;
    required:    any[];
    type:        string;
}

export interface AddressesProperties {
    primaryAddress:  Address;
    homeAddress:     Address;
    businessAddress: Address;
    mailingAddress:  Address;
}

export interface Address {
    description: string;
    title:       string;
    properties:  BusinessAddressProperties;
    required:    any[];
    type:        string;
}

export interface BusinessAddressProperties {
    addressLine1:        AlsoKnownAs;
    addressLine2:        AlsoKnownAs;
    locality:            AlsoKnownAs;
    region:              AlsoKnownAs;
    countryCode:         AlsoKnownAs;
    postalCode:          AlsoKnownAs;
    countryCodeNumber:   AlsoKnownAs;
    unstructuredAddress: AlsoKnownAs;
}

export interface AlsoKnownAs {
    description: string;
    title:       string;
    type:        TypeEnum;
    minLength?:  number;
    format?:     string;
    enum?:       string[];
}

export interface CustomFields {
    description: string;
    title:       string;
    properties:  CustomFieldsProperties;
    required:    any[];
    type:        string;
}

export interface CustomFieldsProperties {
    string1:  AlsoKnownAs;
    string2:  AlsoKnownAs;
    string3:  AlsoKnownAs;
    number1:  AlsoKnownAs;
    number2:  AlsoKnownAs;
    number3:  AlsoKnownAs;
    boolean1: AlsoKnownAs;
    boolean2: AlsoKnownAs;
    boolean3: AlsoKnownAs;
}

export interface NameAndFamilyNameAtBirth {
    description: string;
    title:       string;
    properties:  NameAndFamilyNameAtBirthProperties;
    required:    any[];
    type:        string;
}

export interface NameAndFamilyNameAtBirthProperties {
    firstName:  AlsoKnownAs;
    familyName: AlsoKnownAs;
}

export interface Nationalities {
    description: string;
    title:       string;
    properties:  NationalitiesProperties;
    required:    any[];
    type:        string;
}

export interface NationalitiesProperties {
    nationality1CountryCode:       AlsoKnownAs;
    nationality2CountryCode:       AlsoKnownAs;
    nationality3CountryCode:       AlsoKnownAs;
    nationality1CountryCodeNumber: AlsoKnownAs;
    nationality2CountryCodeNumber: AlsoKnownAs;
    nationality3CountryCodeNumber: AlsoKnownAs;
}

export interface PlaceOfBirth {
    description: string;
    title:       string;
    properties:  PlaceOfBirthProperties;
    required:    any[];
    type:        string;
}

export interface PlaceOfBirthProperties {
    locality:          AlsoKnownAs;
    region:            AlsoKnownAs;
    countryCode:       AlsoKnownAs;
    countryCodeNumber: AlsoKnownAs;
}

export interface ProofOfAgeSchema {
    $metadata:   Metadata;
    $schema:     string;
    $id:         string;
    version:     string;
    description: string;
    title:       string;
    properties:  ProofOfAgeSchemaProperties;
    required:    string[];
    type:        string;
}

export interface ProofOfAgeSchemaProperties {
    "@context":        Context;
    expirationDate:    ExpirationDate;
    id:                ItemsClass;
    issuanceDate:      ExpirationDate;
    issuer:            Issuer;
    type:              Type;
    credentialSubject: CredentialSubject;
    credentialSchema:  CredentialSchema;
    credentialStatus:  CredentialStatus;
}

export interface ItemsClass {
    type: string;
}

export interface CredentialStatus {
    description: string;
    title:       string;
    properties:  CredentialStatusProperties;
    required:    string[];
    type:        string;
}

export interface LevelOfConfidenceClass {
    description: string;
    title:       string;
    format?:     string;
    type:        string;
    enum?:       string[];
}

export interface AgeRange {
    description: string;
    title:       string;
    properties:  AgeRangeProperties;
    required:    string[];
    type:        string;
}

export interface AgeRangeProperties {
    minAgeRange: LevelOfConfidenceClass;
    maxAgeRange: LevelOfConfidenceClass;
}

