import { AlgorithmData, ID } from ".";
import { minBy, sortedBy } from "../lib";

const greedyAlgorithms: Array<AlgorithmData> = [
  {
    name: "Two-Stage Greedy Algorithm",
    source: new URL(
      "https://aswani.ieor.berkeley.edu/teaching/FA16/151/lecture_notes/ieor151_lec13.pdf",
    ),
    description:
      "Simple yet effective greedy algorithm that uses 1-median problem",
    algorithmFunction: (ctx) => {
      const producerDistance = (producer: ID, consumers?: Array<ID>) => {
        return (consumers ?? ctx.consumers).map((consumer) => {
          return ctx.distance(consumer, producer);
        }).reduce((a, b) => a + b, 0);
      };

      // running our first stage
      const firstStageProducers = sortedBy(producerDistance, ctx.producers)
        .slice(0, ctx.p);
      firstStageProducers.forEach(ctx.accept);

      // getting our neighborhoods
      type Neighborhoods = { [producer: ID]: Array<ID> };
      const neighborhoods: Neighborhoods = {};
      for (const consumer of ctx.consumers) {
        const nearestProducer = minBy((producer) => {
          return ctx.distance(producer, consumer);
        }, firstStageProducers);
        if (!nearestProducer) return;
        if (nearestProducer in neighborhoods) {
          neighborhoods[nearestProducer].push(consumer);
        } else {
          neighborhoods[nearestProducer] = [consumer];
        }
        ctx.connect(nearestProducer, consumer);
      }

      // second stage
      // TODO: 
    },
  },
  {
    name: "Test algorithm",
    algorithmFunction: (ctx) => {

    }
  },
  {
    name: "Test algorithm",
    algorithmFunction: (ctx) => {

    }
  },
  {
    name: "Test algorithm",
    algorithmFunction: (ctx) => {

    }
  },
  {
    name: "Test algorithm",
    algorithmFunction: (ctx) => {

    }
  },
];

export default greedyAlgorithms;
