import { useCallback, useMemo } from "react";
import { Entity, finishConnection } from "../store/workingSpace.slice";
import { ConsumerElement, EntityContainer, ProducerElement } from "./Entity";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import styled from "styled-components";

const ConnectionTarget = ({ id, kind, x, y }: Entity) => {
  const dispatch = useAppDispatch();

  const connectionTarget = useAppSelector((state) =>
    state.workingSpace.connectionTarget
  );
  const connections = useAppSelector((state) => state.workingSpace.connections);
  const canBeConnectedTo = useMemo(() => {
    if (!connectionTarget) return false;
    if (connectionTarget.kind === kind) return false;
    return kind !== "consumer" || !connections.some((conn) => {
      return conn.includes(id);
    });
  }, [connections, connectionTarget, kind, id]);

  const handleClick = useCallback((event: React.MouseEvent) => {
    if (!canBeConnectedTo) {
      event.stopPropagation();
      return;
    }
    dispatch(finishConnection(id));
  }, [dispatch, id, canBeConnectedTo]);

  return (
    <OpaqueContainer $opaque={!canBeConnectedTo}>
      <EntityContainer $x={x} $y={y} onClick={handleClick}>
        {kind === "consumer" ? <ConsumerElement /> : <ProducerElement />}
      </EntityContainer>
    </OpaqueContainer>
  );
};

export default ConnectionTarget;

const OpaqueContainer = styled.div<{
  $opaque?: boolean,
}>`
  opacity: ${({ $opaque }) => $opaque ? 0.5 : 1.0};
`;
