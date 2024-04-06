import styled, { keyframes } from "styled-components";
import { appendEntity, Entity, removeEntity, toggleMenuAt } from "../store/workingSpace.slice";
import { memo, useCallback } from "react";
import { useAppDispatch } from "../store/hooks";

const EntityComponent = ({ id, kind, x, y }: Entity) => {
  const dispatch = useAppDispatch();

  const handleClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleMenuAt(id));
  }, [id, dispatch]);

  const handleDoubleClick = useCallback(() => {
    dispatch(removeEntity(id))
  }, [id])

  const handleMouseMove = useCallback(
    ({ clientX, clientY }: MouseEvent) => {
      dispatch(appendEntity({
        id,
        kind,
        x: clientX,
        y: clientY,
      }));
    },
    [dispatch],
  );

  const handleDragStart = useCallback(() => {
    window.addEventListener("mousemove", handleMouseMove);
  }, []);

  const handleDragEnd = useCallback(() => {
    window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <EntityContainer
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
`;

const EntityContainer = styled.div.attrs<{
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
