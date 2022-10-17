declare module "react-image-zoom" {
  interface ReactImageZoomType {
    width: number;
    height?: number | string;
    zoomWidth?: number;
    img?: string;
    scale?: number;
    offset?: {
      vertical: number;
      horizontal: number;
    };
    zoomStyle?: String;
    zoomLensStyle?: string;
    zoomPosition?: "top" | "left" | "bottom" | "right" | "original";
  }

  const ReactImageZoom: React.FC<ReactImageZoomType>;
  export default ReactImageZoom;
}
