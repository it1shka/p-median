import styled, { keyframes } from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { memo, useCallback, useMemo } from "react";
import {
  Entity,
  removeEntity,
  setConnectionTarget,
  setMenuAt,
  swapEntity,
} from "../store/workingSpace.slice";

const Menu = () => {
  const menuAt = useAppSelector((state) => state.workingSpace.menuAt!);
  const entities = useAppSelector((state) => state.workingSpace.entities);

  const target = useMemo(() => {
    return entities.filter(({ id }) => id === menuAt).pop()!;
  }, [menuAt, entities]);

  const dispatch = useAppDispatch();

  const handleDelete = useCallback(() => {
    dispatch(setMenuAt(null));
    dispatch(removeEntity(menuAt));
  }, [menuAt, dispatch]);

  const handleSwap = useCallback(() => {
    dispatch(swapEntity(menuAt));
  }, [menuAt, dispatch]);

  const handleConnectTo = useCallback(() => {
    dispatch(setConnectionTarget(target));
  }, [target, dispatch]);

  const interceptClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  return (
    <MenuContainer
      onClick={interceptClick}
      $x={target.x}
      $y={target.y}
    >
      <KindStatus $kind={target.kind}>
        {target.kind.replace(/^./, (c) => c.toUpperCase())}
      </KindStatus>
      <Button onClick={handleConnectTo}>Connect to...</Button>
      <Button onClick={handleSwap}>Swap</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </MenuContainer>
  );
};

export default memo(Menu);

const KindStatus = styled.p<{
  $kind: Entity["kind"];
}>`
  margin-bottom: 0.5em;
  color: ${({ $kind }) => $kind === "producer" ? "green" : "red"};
`;

const Button = styled.button`
  border: none;
  padding: 0.25em 0.5em;
  &:hover {
    background-color: #ddd;
  }
`;

const updateAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate(45px, calc(-50% - 40px));
  }
  100% {
    opacity: 1;
    transform: translate(45px, calc(-50% - 20px));
  }
`;

const MenuContainer = styled.div.attrs<{
  $x: number;
  $y: number;
}>(({ $y, $x }) => ({
  style: {
    top: $y,
    left: $x,
  },
}))`
  position: absolute;
  z-index: 25;
  background-color: white;
  user-select: none;
  transform: translate(45px, calc(-50% - 20px));
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  width: 150px;
  animation: ${updateAnimation} 0.2s ease-in-out;
  transition: 0.5s all ease-in-out;
  & > * + * {
    margin-top: 0.25em;
  }
`;
