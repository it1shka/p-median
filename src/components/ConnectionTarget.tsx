import { Entity } from "../store/workingSpace.slice";
import { ConsumerElement, EntityContainer, ProducerElement } from "./Entity";

const ConnectionTarget = ({ id, kind, x, y }: Entity) => {
  return (
    <EntityContainer $x={x} $y={y}>
      {kind === "consumer" ? <ConsumerElement /> : <ProducerElement />}
    </EntityContainer>
  );
};

export default ConnectionTarget;
