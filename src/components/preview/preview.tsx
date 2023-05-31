import wrapTemplate from "../pages/templates/template-wrapper";
import { parseHtmlToDom } from "../../utils/preview-utils";

/**
 * Component props
 */
interface Props {
  htmlString: string;
  width: number;
  height: number;
  scale: number;
}

/**
 * Renders preview component
 *
 * @param props component properties
 */
const Preview = ({ htmlString, width, height, scale }: Props) => {
  return (
    <div style={{ scale: `${scale}`, position: "relative" }}>
      <iframe
        srcDoc={wrapTemplate(parseHtmlToDom(htmlString).outerHTML)}
        title="preview"
        width={width}
        height={height}
        seamless
      />
    </div>
  );
};

export default Preview;
