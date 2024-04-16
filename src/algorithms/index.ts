import { Entity } from "../store/workingSpace.slice";
import greedy from "./greedy";

export type AlgorithmData = {
  name: string;
  source?: URL;
  description?: string;
  algorithmFunction: AlgorithmFunction;
};

export type AlgorithmFunction = {
  (context: AlgorithmContext): void;
};

export type ID = Entity["id"];

export type AlgorithmContext = {
  p: number;
  producers: Array<ID>;
  consumers: Array<ID>;
  distance: (id1: ID, id2: ID) => number;
  accept: (producer: ID) => void;
  reject: (producer: ID) => void;
  connect: (producer: ID, consumer: ID) => void;
  disconnect: (producer: ID, consumer: ID) => void;
};

const algorithms = [
  ...greedy,
].map((algorithm, index) => Object.freeze({
  ...algorithm,
  algorithmID: index,
}));

export type AlgorithmID = 
  (typeof algorithms)[0]["algorithmID"]

export default algorithms;
