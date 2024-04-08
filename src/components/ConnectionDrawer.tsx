import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../store/hooks";
import { Entity } from "../store/workingSpace.slice";

const ConnectionDrawer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  type Pair = readonly [number, number];
  const [size, setSize] = useState<Pair>([0, 0]);

  useEffect(() => {
    const resizer = () => {
      const { innerWidth, innerHeight } = window;
      setSize([innerWidth, innerHeight]);
    };
    window.addEventListener("resize", resizer);
    resizer();
    return () => window.removeEventListener("resize", resizer);
  }, []);

  const entities = useAppSelector((state) => state.workingSpace.entities);
  const connections = useAppSelector((state) => state.workingSpace.connections);
  const lines = useMemo(() => {
    const positions: { [key: Entity["id"]]: readonly [number, number] } = {};
    entities.forEach(({ id, x, y }) => {
      positions[id] = [x, y];
    });
    return connections.map(([id1, id2]) =>
      [
        ...positions[id1],
        ...positions[id2],
      ] as const
    );
  }, [entities, connections]);

  const [mousePosition, setMousePosition] = useState<Pair | null>(null);
  const handleMouseMove = useCallback(({ clientX, clientY }: MouseEvent) => {
    setMousePosition([clientX, clientY]);
  }, []);
  const connectionTarget = useAppSelector((state) =>
    state.workingSpace.connectionTarget
  );
  useEffect(() => {
    if (!connectionTarget) {
      setMousePosition(null);
      return;
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [connectionTarget, handleMouseMove]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "black";
    ctx.lineWidth = 4;
    for (const [x1, y1, x2, y2] of lines) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    if (mousePosition && connectionTarget) {
      ctx.beginPath();
      const { x, y } = connectionTarget;
      const [ endX, endY ] = mousePosition;
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
  }, [lines, size, mousePosition, connectionTarget]);

  const [width, height] = size;
  return (
    <Canvas
      ref={canvasRef}
      width={width}
      height={height}
    >
    </Canvas>
  );
};

export default ConnectionDrawer;

const Canvas = styled.canvas`
  position: fixed;
  top: 0; left: 0;
  z-index: -50;
`;
