import styled from "styled-components";
import { createPortal } from "react-dom";
import { memo, useMemo } from "react";
import { useAppSelector } from "../store/hooks";
import { Entity } from "../store/workingSpace.slice";

const Metrics = () => {
  const connections = useAppSelector((state) => state.workingSpace.connections);
  const entities = useAppSelector((state) => state.workingSpace.entities);

  const totalDistance = useMemo(() => {
    type PositionDict = { [key: Entity["id"]]: readonly [number, number] };
    const positions: PositionDict = {};
    for (const each of entities) {
      positions[each.id] = [each.x, each.y];
    }
    let output = 0;
    for (const [id1, id2] of connections) {
      const [x1, y1] = positions[id1];
      const [x2, y2] = positions[id2];
      output += Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    }
    return Math.round(output * 100) / 100;
  }, [entities, connections]);

  const disconnected = useMemo(() => {
    const connected = new Set(connections.reduce((acc, elem) => [
      ...acc,
      ...elem,
    ], new Array<number>()));
    return entities.length - connected.size;
  }, [entities, connections]);

  const status = useMemo(() => {
    switch (disconnected) {
      case 0:
        return "All consumers are connected";
      case 1:
        return "1 consumer is disconnected";
      default:
        return `${disconnected} consumers are disconnected`;
    }
  }, [disconnected]);

  return createPortal(
    (
      <MetricsContainer>
        <p>Total distance: {totalDistance}</p>
        <p>{status}</p>
      </MetricsContainer>
    ),
    document.body,
  );
};

export default memo(Metrics);

const MetricsContainer = styled.div`
  position: fixed;
  top: 10px; left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.5em 1em;
  border-radius: 8px;
`;
