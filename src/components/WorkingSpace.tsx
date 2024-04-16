import React, { memo, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import {
  appendEntity,
  Entity,
  setConnectionTarget,
  setPopup,
} from "../store/workingSpace.slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import EntityComponent from "./Entity";
import Menu from "./Menu";
import ConnectionTarget from "./ConnectionTarget";

const WorkingSpace = () => {
  const popup = useAppSelector((state) => state.workingSpace.popup);
  const menuAt = useAppSelector((state) => state.workingSpace.menuAt);
  const connectionTarget = useAppSelector((state) =>
    state.workingSpace.connectionTarget
  );

  const dispatch = useAppDispatch();

  const togglePopup = useCallback((event: React.MouseEvent) => {
    dispatch(setPopup(
      popup ? null : {
        x: event.clientX,
        y: event.clientY,
      },
    ));
  }, [popup, dispatch]);

  const cancelConnection = useCallback(() => {
    dispatch(setConnectionTarget(null));
  }, [dispatch]);

  const entities = useAppSelector((state) => state.workingSpace.entities);

  return connectionTarget
    ? (
      <SpaceContainer onClick={cancelConnection}>
        {entities
          .map((entity) => (
            <ConnectionTarget
              key={entity.id}
              {...entity}
            />
          ))}
      </SpaceContainer>
    )
    : (
      <SpaceContainer onClick={togglePopup}>
        {popup && <Popup />}
        {menuAt && <Menu />}
        {entities.map((entity) => (
          <EntityComponent
            key={entity.id}
            {...entity}
          />
        ))}
      </SpaceContainer>
    );
};

export default memo(WorkingSpace);

const Popup = memo(() => {
  const { x, y } = useAppSelector((state) => {
    return state.workingSpace.popup!;
  });

  const dispatch = useAppDispatch();
  const createEntity = useCallback((kind: Entity["kind"]) => {
    dispatch(appendEntity({
      id: Date.now(),
      kind,
      x,
      y,
    }));
  }, [x, y, dispatch]);

  return (
    <>
      <PopupPointer
        $x={x}
        $y={y}
      />
      <PopupContainer $x={x} $y={y}>
        <PopupButton
          $color="#ffb69c"
          onClick={() => createEntity("consumer")}
        >
          Consumer
        </PopupButton>
        <PopupButton
          $color="#a8ff9c"
          onClick={() => createEntity("producer")}
        >
          Producer
        </PopupButton>
      </PopupContainer>
    </>
  );
});

const pointerAnimation = keyframes`
  0%, 100% {
    transform: scale(0);
    opacity: 1;
  }
  50% {
    transform: scale(1);
    opacity: 0;
  }
`;

const PopupPointer = styled.div<{
  $x: number;
  $y: number;
}>`
  position: absolute;
  top: ${({ $y }) => $y}px;
  left: ${({ $x }) => $x}px;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
  &::after,
  &::before {
    content: '';  
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #FFF;
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    animation: ${pointerAnimation} 2s ease-in-out infinite;
  }
  &::after {
    animation-delay: -1s;
  }
`;

const PopupButton = styled.button<{
  $color: React.CSSProperties["color"];
}>`
  border: none;
  padding: 0.2em 0.5em;
  background-color: ${({ $color }) => $color};

  transition: 0.2s all ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const popupAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, calc(-100% - 50px));
  }
  100% {
    opacity: 1;
    transform: translate(-50%, calc(-100% - 25px));
  }
`;

const PopupContainer = styled.div<{
  $x: number;
  $y: number;
}>`
  position: absolute;
  z-index: 50;
  top: ${({ $y }) => $y}px;
  left: ${({ $x }) => $x}px;
  background-color: white;
  padding: 0.5em 1em;
  transform: translate(-50%, calc(-100% - 25px));
  & > * + * {
    margin-left: 1em;
  }
  animation: ${popupAnimation} 0.2s ease-in-out;
`;

const SpaceContainer = styled.div`
  position: fixed;
  top: 0; bottom: 0;
  left: 0; right: 0;
`;
