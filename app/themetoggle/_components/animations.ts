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
  blur = false
): Animation => {
  const pos = getClipPosition(start);
  const name = `circle-${start}${blur ? "-blur" : ""}`;

  return {
    name,
    css: `
      ::view-transition-group(root) {
        animation-duration: 2s;
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
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
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: circle(150% at ${pos});
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
    `,
  };
};