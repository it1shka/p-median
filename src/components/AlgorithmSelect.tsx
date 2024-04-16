import { memo, useCallback } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import { useAppDispatch } from "../store/hooks";
import { setAlgorithmChoose } from "../store/sidePanel.slice";
import algorithms from "../algorithms";
import AlgorithmCard from "./AlgorithmCard";

const AlgorithmSelect = () => {
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(setAlgorithmChoose(false));
  }, [dispatch]);

  return createPortal(
    <OverlayContainer>
      <CloseButton onClick={handleClose} />
      <CardsContainer>
        {algorithms.map((algorithm, index) => (
          <AlgorithmCard
            key={index}
            {...algorithm}
          />
        ))}
      </CardsContainer>
    </OverlayContainer>,
    document.body,
  );
};

export default memo(AlgorithmSelect);

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 20px; top: 10px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  &::before {
    color: white;
    font-size: 40px;
    content: '×';
  }
`;

const enterKeyframes = keyframes`
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
`;

const OverlayContainer = styled.div`
  position: fixed;
  top: 0; bottom: 0;
  left: 0; right: 0;
  background-color: #020a29;
  animation: 1s ${enterKeyframes} ease-in-out;
  padding: 2em 3em;
`;
