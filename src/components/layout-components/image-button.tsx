import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { ReactNode } from "react";

/**
 * Component props
 */
interface Props {
  title: string;
  image: ReactNode;
  selected: boolean;
  disabled?: boolean;
  // TODO: Can remove void when all Image button onclicks are in place.
  onClick(): void | Promise<void>;
}

/**
 * Styled image button
 */
const Root = styled(Button, {
  label: "ImageButton-button-root"
})(({ theme }) => ({
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&.selected": {
    color: "#fff",
    borderColor: theme.palette.primary,
    backgroundColor: theme.palette.primary.light,
    "& p": {
      color: "#fff",
      fontFamily: theme.typography.button
    }
  },
  "&.Mui-disabled": {
    opacity: 0.5,
    "& p": {
      color: theme.palette.text.disabled
    }
  }
}));

/**
 * Styled image component
 */
const ImageContainer = styled(Box, {
  label: "icon-container"
})(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative"
}));

/**
 * Image button component
 *
 * @param props component properties
 */
const ImageButton = ({ title, selected, image, disabled, onClick }: Props) => {
  return (

    <Root
      onClick={ onClick }
      disabled={ disabled}
      className={ selected ? "selected" : "" }
    >
      <Stack gap={2}>
        <ImageContainer>
          { image }
        </ImageContainer>
        <Typography color="primary">{ title }</Typography>
      </Stack>
    </Root>
  )
}

export default ImageButton;