import { Animation, AnimationStart } from "./types";

const getClipPosition = (start: AnimationStart) => {
  switch (start) {
    case "top-left":
      return "0% 0%";
    case "top-right":
      return "100% 0%";
    case "bottom-left":
      return "0% 100%";
    case "bottom-right":
      return "100% 100%";
    case "top-center":
      return "50% 0%";
    case "bottom-center":
      return "50% 100%";
    case "center":
    default:
      return "50% 50%";
  }
};

export const createCircleAnimation = (
  start: AnimationStart = "center",
  blur = false,
  duration=0.7
): Animation => {
  const pos = getClipPosition(start);
  const name = `circle-${start}${blur ? "-blur" : ""}`;

  return {
    name,
    css: `
      ::view-transition-group(root) {
        animation-duration: 1s;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      ::view-transition-new(root) {
        animation-name: reveal-${name};
        ${blur ? "filter: blur(2px);" : ""}
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }

      @keyframes reveal-${name} {
        from {
          clip-path: circle(0% at ${pos});
          ${blur ? "filter: blur(4px);" : ""}
        }
        ${blur ? "50% { filter: blur(2px); }" : ""}
        to {
          clip-path: circle(150% at ${pos});
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
    `,
  };
};

const getRectangleClipPath = (direction: AnimationStart) => {
  switch (direction) {
    case "bottom-up":
      return {
        from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      };
    case "top-down":
      return {
        from: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      };
    case "left-right":
      return {
        from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      };
    case "right-left":
      return {
        from: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      };
    default:
      return {
        from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      };
  }
};

export const createRectangleAnimation = (
  start: AnimationStart = "bottom-up",
  blur = false
): Animation => {
  const { from, to } = getRectangleClipPath(start);
  const name = `rectangle-${start}${blur ? "-blur" : ""}`;

  return {
    name,
    css: `
      ::view-transition-group(root) {
        animation-duration: 0.7s;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      ::view-transition-new(root) {
        animation-name: reveal-${name};
        ${blur ? "filter: blur(2px);" : ""}
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }

      @keyframes reveal-${name} {
        from {
          clip-path: ${from};
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: ${to};
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
    `,
  };
};

const getPolygonClipPaths = (position: AnimationStart) => {
  switch (position) {
    case "top-left":
      return {
        from: "polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%)",
        to: "polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%)",
      };
    case "top-right":
      return {
        from: "polygon(150% -71%, 250% 71%, 250% 71%, 150% -71%)",
        to: "polygon(150% -71%, 250% 71%, 50% 171%, -71% 50%)",
      };
    default:
      return {
        from: "polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%)",
        to: "polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%)",
      };
  }
};

export const createPolygonAnimation = (
  start: AnimationStart = "top-left",
  blur = false
): Animation => {
  const { from, to } = getPolygonClipPaths(start);
  const name = `polygon-${start}${blur ? "-blur" : ""}`;

  return {
    name,
    css: `
      ::view-transition-group(root) {
        animation-duration: 0.7s;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      ::view-transition-new(root) {
        animation-name: reveal-${name};
        ${blur ? "filter: blur(2px);" : ""}
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }

      @keyframes reveal-${name} {
        from {
          clip-path: ${from};
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: ${to};
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
    `,
  };
};

export const createGifAnimation = (gifUrl: string): Animation => {
  const name = "gif-reveal";

  return {
    name,
    css: `
      ::view-transition-group(root) {
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      ::view-transition-new(root) {
        mask: url('${gifUrl}') center / 0 no-repeat;
        animation: ${name} 3s;
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: ${name} 3s;
      }

      @keyframes ${name} {
        0% { mask-size: 0; }
        10% { mask-size: 50vmax; }
        90% { mask-size: 50vmax; }
        100% { mask-size: 2000vmax; }
      }
    `,
  };
};