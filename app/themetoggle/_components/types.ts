export type AnimationVariant = "circle" | "rectangle" | "polygon" | "gif";

export type AnimationStart =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center"
  | "bottom-up"
  | "top-down"
  | "left-right"
  | "right-left";

export interface Animation {
  name: string;
  css: string;
}