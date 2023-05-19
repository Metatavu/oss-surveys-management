import { Backdrop, CircularProgress } from "@mui/material";

/**
 * Components properties
 */
interface Props {
  loading: boolean;
  children: React.ReactElement;
}

/**
 * Loader wrapper component
 */
const LoaderWrapper = ({ loading, children }: Props) => {
  if (loading)
    return (
      <>
        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {children}
      </>
    );

  return children;
};

export default LoaderWrapper;
