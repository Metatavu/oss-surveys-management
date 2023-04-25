/**
 * Component props
 */
interface Props {
  htmlString: string;
}

/**
 * Renders preview component
 */
const Preview = ({ htmlString }: Props) => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: htmlString
      }}
    />
  )
};

export default Preview;