import React, { memo, useCallback } from "react";
import styled from "styled-components";
import algorithms from "../algorithms";
import { useAppDispatch } from "../store/hooks";
import { setAlgorithm, setAlgorithmChoose } from "../store/sidePanel.slice";

type Algorithm = (typeof algorithms)[0];

const AlgorithmCard = (algorithm: Algorithm) => {
  const handleFollowLink = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!algorithm.source) return;
    window.open(algorithm.source, "_blank")?.focus();
  }, [algorithm.source]);

  const dispatch = useAppDispatch();
  const handleChoose = useCallback(() => {
    dispatch(setAlgorithm(algorithm.algorithmID));
    console.log(algorithm.algorithmID);
    dispatch(setAlgorithmChoose(false));
  }, [dispatch, algorithm.algorithmID]);

  return (
    <CardContainer onClick={handleChoose}>
      <Name>{algorithm.name}</Name>
      {algorithm.source && (
        <Reference onClick={handleFollowLink} href={algorithm.source.href}>
          Read about it on{" "}
          <span>
            {algorithm.source.hostname.replace(/^./, (c) =>
              c.toUpperCase())}
          </span>
        </Reference>
      )}
      {algorithm.description && (
        <Description>
          {algorithm.description}
        </Description>
      )}
    </CardContainer>
  );
};

export default memo(AlgorithmCard);

const Description = styled.p`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1em 3em;
  color: white;
  text-shadow: 2px 2px 0 #403843;
`;

const Reference = styled.a`
  background-color: #282629;
  color: white;
  text-decoration: none;
  padding: 0.25em 0.5em;
  transition: 0.1s transform ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Name = styled.h2`
  color: white;
  padding: 0.5em 0;
  text-shadow: 2px 2px 0 #403843;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #817086;
  width: 400px;
  height: 200px;
  margin: 0.5em;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s transform ease-in-out;
  &:hover {
    transform: translateY(-10px);
  }
`;
