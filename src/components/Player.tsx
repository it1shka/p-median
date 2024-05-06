import styled from "styled-components";
import { memo, useCallback, useMemo, useState } from "react";
import { useAppSelector } from "../store/hooks";
import algorithms, {
  AlgorithmContext,
  AlgorithmFunction,
  ID,
} from "../algorithms";
import { useAsync, withCache } from "../lib";
import { Entity, Position } from "../store/workingSpace.slice";

type ContextAction = Readonly<
  | { action: "accept"; producer: ID }
  | { action: "reject"; producer: ID }
  | { action: "connect"; producer: ID; consumer: ID }
  | { action: "disconnect"; producer: ID; consumer: ID }
>;

class PlayerAgent implements AlgorithmContext {
  private readonly history = new Array<ContextAction>();
  private positions: { [key: ID]: Readonly<Position> } = {};

  constructor(
    readonly p: number,
    readonly producers: Array<ID>,
    readonly consumers: Array<ID>,
  ) {}

  private dump = (action: ContextAction) => {
    this.history.push(Object.freeze(action));
  };

  loadPositions = (entities: Entity[]) => {
    for (const { id, x, y } of entities) {
      this.positions[id] = Object.freeze({ x, y });
    }
  };

  getHistory = () => Object.freeze([...this.history]);

  distance = withCache((id1: ID, id2: ID) => {
    if (!this.positions[id1] || !this.positions[id2]) {
      throw new Error("Failed to compute distance");
    }
    const { x: x1, y: y1 } = this.positions[id1];
    const { x: x2, y: y2 } = this.positions[id2];
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  });

  accept = (producer: ID) =>
    this.dump({
      action: "accept",
      producer,
    });

  reject = (producer: ID) =>
    this.dump({
      action: "reject",
      producer,
    });

  connect = (producer: ID, consumer: ID) =>
    this.dump({
      action: "connect",
      producer,
      consumer,
    });

  disconnect = (producer: ID, consumer: ID) =>
    this.dump({
      action: "disconnect",
      producer,
      consumer,
    });
}

const Player = () => {
  const chosenAlgorithm = useAppSelector((state) =>
    state.sidePanel.chosenAlgorithm
  );

  const executor: AlgorithmFunction = useMemo(() => {
    const target = algorithms.find(({ algorithmID }) =>
      algorithmID === chosenAlgorithm
    );
    if (!target) return () => {};
    return target.algorithmFunction;
  }, [chosenAlgorithm]);

  const pValue = useAppSelector((state) => state.sidePanel.pValue);
  const entities = useAppSelector((state) => state.workingSpace.entities);

  const getAlgorithmHistory = useCallback(() => {
    const producers = entities
      .filter(({ kind }) => kind === "producer")
      .map(({ id }) => id);
    const consumers = entities
      .filter(({ kind }) => kind === "consumer")
      .map(({ id }) => id);
    const agent = new PlayerAgent(pValue, producers, consumers);
    agent.loadPositions(entities);
    executor(agent);
    return agent.getHistory();
  }, [pValue, entities, executor]);

  const history = useAsync(getAlgorithmHistory);

  return history ? (
    <Controls history={history} />
  ) : <></>;
};

export default memo(Player);

type AlgorithmHistory = Readonly<Array<ContextAction>>
const Controls = memo(({ history }: { history: AlgorithmHistory }) => {
  const [pointer, setPointer] = useState(0)
  // TODO: 
  return (
    <PlayerContainer>

    </PlayerContainer>
  );
});

const PlayerContainer = styled.div`
  position: fixed;
`;
