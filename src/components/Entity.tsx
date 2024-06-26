import styled from "styled-components";
import {
  appendEntity,
  Entity,
  toggleMenuAt,
} from "../store/workingSpace.slice";
import { memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const EntityComponent = ({ id, kind, x, y }: Entity) => {
  const dispatch = useAppDispatch();

  const algorithmPlay = useAppSelector((state) =>
    state.sidePanel.algorithmPlay
  );

  const handleClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  const handleDoubleClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    if (algorithmPlay) return;
    dispatch(toggleMenuAt(id));
  }, [id, algorithmPlay, dispatch]);

  const handleMouseMove = useCallback(
    ({ clientX, clientY }: MouseEvent) => {
      dispatch(appendEntity({
        id,
        kind,
        x: clientX,
        y: clientY,
      }));
    },
    [id, kind, dispatch],
  );

  const handleDragStart = useCallback(() => {
    if (algorithmPlay) return;
    window.addEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, algorithmPlay]);

  const handleDragEnd = useCallback(() => {
    window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <EntityContainer
      draggable={false}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      $x={x}
      $y={y}
    >
      {kind === "consumer" ? <ConsumerElement /> : <ProducerElement />}
    </EntityContainer>
  );
};

export default memo(EntityComponent);

export const ProducerElement = styled.div`
  width: 50px;
  height: 50px;
  background-color: #c9ffb0;
  border: 5px solid black;
  transition: 0.2s all ease-in-out;
  &:hover {
    transform: scale(1.15);
    background-color: #9fff73;
  }
`;

export const ConsumerElement = styled.div`
  width: 40px;
  height: 40px;
  background-color: #ffb7a3;
  border: 5px solid black;
  border-radius: 100%;
  transition: 0.2s all ease-in-out;
  &:hover {
    transform: scale(1.15);
    background-color: #ff987a;
  }
`;

export const EntityContainer = styled.div.attrs<{
  $x: number;
  $y: number;
}>(({ $x, $y }) => ({
  style: {
    top: $y,
    left: $x,
  },
}))`
  position: absolute;
  transform: translate(-50%, -50%);
`;
