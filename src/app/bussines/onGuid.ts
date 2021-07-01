import { Guid } from "guid-typescript";

export function onGuid(){

  let value = Guid.create().toJSON();

  return value.value;
}