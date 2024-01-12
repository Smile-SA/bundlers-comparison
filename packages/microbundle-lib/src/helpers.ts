import { IObject } from "./types";

export function add(...args: IObject[]): number {
  return args.reduce((a, b) => a + b.value, 0);
}

export function multiply(...args: IObject[]): number {
  return args.reduce((a, b) => a * b.value, 1);
}
