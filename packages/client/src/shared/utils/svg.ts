import { loadImage } from "@utils/load-image";

export function parseSVGStringToHTMLElement(
  svgString: string
): SVGElement | null {
  // Step 1: Create a container div element
  const containerDiv = document.createElement("div");

  // Step 2: Set the innerHTML of the container div to the SVG string
  containerDiv.innerHTML = svgString.trim();

  // Step 3: Extract the first child of the container div (the SVG element)
  const svgElement = containerDiv.firstChild;

  // Step 4: Return the SVG element as an HTMLElement
  return svgElement as SVGElement;
}

export async function getImageFromSvg(svgElement: SVGElement) {
  const svgXML = new XMLSerializer().serializeToString(svgElement);
  const src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgXML)}`;
  return loadImage(src);
}
