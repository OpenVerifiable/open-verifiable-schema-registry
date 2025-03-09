/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type HaemoglobinTest = IdentifiablePathologyTest & {
  result?: ResultGDL;
  acceptable?: AcceptableRange;
  [k: string]: unknown;
};
export type FullName = string;
/**
 * YYYY-MM-DD
 */
export type DateOfBirth = string;
export type PatientID = string;
export type TestTimestamp = string;
export type ResultGDL = number;
export type AcceptableRange = "Yes" | "No";

export interface IdentifiablePathologyTest {
  fullName: FullName;
  dateOfBirth: DateOfBirth;
  patientId?: PatientID;
  testTimestamp: TestTimestamp;
  [k: string]: unknown;
}
