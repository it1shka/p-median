import styled from "styled-components";
import { memo, useMemo } from "react";
import { useAppSelector } from "../store/hooks";
import algorithms, {
  AlgorithmContext,
  AlgorithmFunction,
  ID,
} from "../algorithms";

class PlayerAgent implements AlgorithmContext {
  constructor(
    readonly p: number,
    readonly producers: Array<ID>,
    readonly consumers: Array<ID>,
  ) {}

  distance = (id1: ID, id2: ID): number => {
    // TODO: 
    return NaN
  };

  accept = (producer: ID): void => {
    // TODO: 
  };

  reject = (producer: ID): void => {
    // TODO: 
  };

  connect = (producer: ID, consumer: ID): void => {
    // TODO: 
  };

  disconnect = (producer: ID, consumer: ID): void => {
    // TODO: 
  };
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

  return (
    <PlayerContainer>
    </PlayerContainer>
  );
};

export default memo(Player);

const PlayerContainer = styled.div`
  position: fixed;
`;
