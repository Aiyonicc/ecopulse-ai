/* eslint-disable */
import "@testing-library/jest-dom";

// Mock canvas API for components that render canvas-based assets (like CarbonCalculator)
if (typeof window !== "undefined") {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
    clearRect: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    ellipse: jest.fn(),
    roundRect: jest.fn(),
    createLinearGradient: jest.fn().mockReturnValue({
      addColorStop: jest.fn(),
    }),
    createRadialGradient: jest.fn().mockReturnValue({
      addColorStop: jest.fn(),
    }),
    save: jest.fn(),
    restore: jest.fn(),
    fillRect: jest.fn(),
  }) as any;
}

// Mock canvas-confetti since it relies on canvas/window features not present in JSDOM
jest.mock("canvas-confetti", () => jest.fn());

// Mock IntersectionObserver which is missing in JSDOM but used for scroll tracking
class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock framer-motion to render elements synchronously without animation delays
jest.mock("framer-motion", () => {
  const React = require("react");
  return {
    motion: {
      div: React.forwardRef(({ children, ...props }: any, ref: any) => React.createElement("div", { ...props, ref }, children)),
      button: React.forwardRef(({ children, ...props }: any, ref: any) => React.createElement("button", { ...props, ref }, children)),
      circle: React.forwardRef(({ children, ...props }: any, ref: any) => React.createElement("circle", { ...props, ref }, children)),
    },
    AnimatePresence: ({ children }: any) => children,
  };
});
