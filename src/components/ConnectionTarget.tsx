import {useCallback} from "react";
import { Entity, finishConnection } from "../store/workingSpace.slice";
import { ConsumerElement, EntityContainer, ProducerElement } from "./Entity";
import {useAppDispatch} from "../store/hooks";

const ConnectionTarget = ({ id, kind, x, y }: Entity) => {
  const dispatch = useAppDispatch()

  const handleClick = useCallback(() => {
    dispatch(finishConnection(id));
  }, [dispatch, id])

  return (
    <EntityContainer $x={x} $y={y} onClick={handleClick}>
      {kind === "consumer" ? <ConsumerElement /> : <ProducerElement />}
    </EntityContainer>
  );
};

export default ConnectionTarget;
