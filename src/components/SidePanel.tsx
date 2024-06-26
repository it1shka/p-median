import React, { memo, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setAlgorithmChoose,
  setGenSampleSize,
  setGenType,
  setPValue,
  toggleAlgorithmPlay,
  toggleSidePanel,
} from "../store/sidePanel.slice";
import {
  appendEntities,
  Entity,
  removeAllEntities,
} from "../store/workingSpace.slice";
import algorithms from "../algorithms";

const SidePanel = () => {
  const dispatch = useAppDispatch();

  const algorithmPlay = useAppSelector((state) =>
    state.sidePanel.algorithmPlay
  );

  const isOpen = useAppSelector((state) => state.sidePanel.isOpen);
  const handleToggle = useCallback(() => {
    dispatch(toggleSidePanel());
  }, [dispatch]);

  const genSampleSize = useAppSelector((state) =>
    state.sidePanel.genSampleSize
  );
  type Change = React.ChangeEvent<HTMLInputElement>;
  const handleSetGenSampleSize = useCallback((event: Change) => {
    const value = Number(event.target.value);
    dispatch(setGenSampleSize(value));
  }, [dispatch]);

  const genType = useAppSelector((state) => state.sidePanel.genType);
  const handleSetGenType = useCallback((kind: Entity["kind"]) => {
    dispatch(setGenType(kind));
  }, [dispatch]);

  const handleGenerate = useCallback(() => {
    if (algorithmPlay) return;
    if (Number.isNaN(genSampleSize) || genSampleSize < 1) {
      return;
    }
    const newEntities = new Array<Entity>(genSampleSize);
    const baseId = Date.now();
    for (let i = 0; i < genSampleSize; i++) {
      newEntities[i] = {
        id: baseId + i,
        kind: genType,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      };
    }
    dispatch(appendEntities(newEntities));
  }, [genSampleSize, genType, algorithmPlay, dispatch]);

  const handleDeleteAll = useCallback(() => {
    if (algorithmPlay) return;
    dispatch(removeAllEntities());
  }, [algorithmPlay, dispatch]);

  const pValue = useAppSelector((state) => state.sidePanel.pValue);
  const handleChangePValue = useCallback((event: Change) => {
    const value = Number(event.target.value);
    dispatch(setPValue(value));
  }, [dispatch]);

  const chosenAlgorithm = useAppSelector((state) =>
    state.sidePanel.chosenAlgorithm
  );
  const chosenAlgorithmName = useMemo(() => {
    if (chosenAlgorithm === null) {
      return "Select algorithm";
    }
    const target = algorithms.find(({ algorithmID }) =>
      algorithmID === chosenAlgorithm
    );
    if (!target) {
      return "Unknown algorithm";
    }
    return target.name;
  }, [chosenAlgorithm]);

  const handleAlgorithmChoose = useCallback(() => {
    dispatch(setAlgorithmChoose(true));
  }, [dispatch]);

  const handleToggleAlgorithmPlay = useCallback(() => {
    dispatch(toggleAlgorithmPlay());
  }, [dispatch]);

  const algorithmChoose = useAppSelector((state) =>
    state.sidePanel.algorithmChoose
  );

  return createPortal(
    (
      <SidePanelContainer $open={isOpen}>
        <OpenButton onClick={handleToggle}>Menu</OpenButton>
        {/* Generator */}
        <GeneratorContainer>
          <Title>Generator</Title>
          <Label>Sample size:</Label>
          <Input
            value={genSampleSize}
            onChange={handleSetGenSampleSize}
            type="number"
            min={1}
            max={100}
            step={1}
            placeholder="Sample size"
          />
          <TypeButtons>
            {(["consumer", "producer"] as const).map((kind, index) => (
              <TypeButton
                $active={kind === genType}
                key={index}
                onClick={() => handleSetGenType(kind)}
              >
                {kind}
              </TypeButton>
            ))}
          </TypeButtons>
          <GenerateButton onClick={handleGenerate} disabled={algorithmPlay}>
            Generate random
          </GenerateButton>
          <GenerateButton onClick={handleDeleteAll} disabled={algorithmPlay}>
            Delete all entities
          </GenerateButton>
        </GeneratorContainer>

        {/*Algorithms*/}
        <GeneratorContainer>
          <Title>Algorithm</Title>
          <Label>P value:</Label>
          <Input
            type="number"
            placeholder="p parameter"
            min={1}
            step={1}
            value={pValue}
            onChange={handleChangePValue}
          />
          <GenerateButton
            disabled={algorithmPlay}
            onClick={handleAlgorithmChoose}
          >
            {chosenAlgorithmName}
          </GenerateButton>
          <GenerateButton
            onClick={handleToggleAlgorithmPlay}
            disabled={!chosenAlgorithm || algorithmChoose}
          >
            {algorithmPlay ? "Stop Algorithm" : "Start Algorithm"}
          </GenerateButton>
        </GeneratorContainer>
      </SidePanelContainer>
    ),
    document.body,
  );
};

export default memo(SidePanel);

const Label = styled.p`
  color: white;
`;

const Title = styled.h1`
  color: white;
`;

const GenerateButton = styled.button`
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
`;

const TypeButton = styled.button<{
  $active?: boolean;
}>`
  flex: 1;
  border: none;
  padding: 0.25em 0.5em;
  transition: 0.2s all ease-in-out;
  ${({ $active }) =>
  $active && css`
    background-color: blue;
    color: white;
  `}
`;

const TypeButtons = styled.div`
  display: flex;
  & > * + * {
    margin-left: 0.5em;
  }
`;

const Input = styled.input`
  outline: none;
  padding: 0.5em 1em;
  width: 100%;
`;

const GeneratorContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > * + * {
    margin-top: 0.5em;
  }
`;

const OpenButton = styled.button`
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translate(calc(25% + 1px), -50%) rotate(270deg);
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border: none;
  color: white;
  padding: 0.5em 1em;
  border-radius: 8px 8px 0 0;
  transition: 0.2s background-color ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const SidePanelContainer = styled.div<{
  $open?: boolean;
}>`
  transform: translateX(100%);
  display: flex;
  flex-direction: column;
  padding: 1em 2em;
  position: fixed;
  right: 0; top: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 360px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  transition: 0.5s transform ease-in-out;
  ${({ $open }) =>
  $open && css`
    transform: translateX(0);
  `}
  & > * + * {
    margin-top: 4em;
  }
`;
