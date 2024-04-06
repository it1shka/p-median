import styled, { keyframes } from "styled-components";
import { Entity } from "../store/workingSpace.slice";

const EntityComponent = ({ id, kind, x, y }: Entity) => {
  return (
    <EntityContainer $x={x} $y={y}>
      {kind === "consumer" ? <ConsumerElement /> : <ProducerElement />}
    </EntityContainer>
  );
};

export default EntityComponent;

const entityAnimation = keyframes`
  0% {
    opacity: 0;
    scale: 0;
  }
  100% {
    opacity: 1;
    scale: 1;
  }
`;

const ProducerElement = styled.div`
  width: 50px;
  height: 50px;
  background-color: #c9ffb0;
  border: 5px solid black;
  transition: 0.2s all ease-in-out;
  &:hover {
    transform: scale(1.15);
    background-color: #9fff73;
  }
  animation: ${entityAnimation} 0.5s ease-in-out;
`;

const ConsumerElement = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ffb7a3;
  border: 5px solid black;
  border-radius: 100%;
  transition: 0.2s all ease-in-out;
  &:hover {
    transform: scale(1.15);
    background-color: #ff987a;
  }
  animation: ${entityAnimation} 0.5s ease-in-out;
`;

const EntityContainer = styled.div<{
  $x: number;
  $y: number;
}>`
  position: absolute;
  top: ${({ $y }) => $y}px;
  left: ${({ $x }) => $x}px;
  transform: translate(-50%, -50%);
`;
