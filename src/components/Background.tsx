import { memo, useEffect, useRef } from "react";
import styled from "styled-components";

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const animation = new Animation(canvasRef.current);
    animation.start();
    return animation.terminate;
  }, []);

  return <Canvas ref={canvasRef}></Canvas>;
};

const Canvas = styled.canvas`
  position: fixed;
  top: 0; left: 0;
  z-index: -100;
`;

export default memo(Background);

class Animation {
  private readonly delta = 30;
  private readonly cellSize = 50;
  private readonly animationTime = 5000;

  private readonly ctx: CanvasRenderingContext2D;
  private intervalHandle?: ReturnType<typeof setInterval>;

  constructor(
    private readonly canvas: HTMLCanvasElement,
  ) {
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Failed to get 2D rendering context");
    }
    this.ctx = context;
  }

  start = () => {
    this.intervalHandle = setInterval(this.update, this.delta);
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  };

  terminate = () => {
    clearInterval(this.intervalHandle);
    window.removeEventListener("reisze", this.handleResize);
  };

  private update = () => {
    this.ctx.fillStyle = "#ddd";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const start = (Date.now() % this.animationTime) / this.animationTime *
      this.cellSize;
    for (let i = start; i < this.canvas.width; i += this.cellSize) {
      this.drawLine(i, 0, i, this.canvas.height);
    }
    for (let j = start; j < this.canvas.height; j += this.cellSize) {
      this.drawLine(0, j, this.canvas.width, j);
    }
  };

  private handleResize = () => {
    const { innerWidth, innerHeight } = window;
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
  };

  private drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "#ccc";
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  };
}
