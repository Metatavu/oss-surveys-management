import { SvgIcon, SvgIconProps, styled } from "@mui/material";

/**
 * Interface representing component properties
 */
interface Props extends SvgIconProps {}

/**
 * Styled SVGIcon container
 */
const Root = styled(SvgIcon, {
  label: "custom-icon-root"
})(({ theme }) => ({
  width: 115,
  height: 205,
  fill: "transparent"
}));

/**
 * Render questionnaire layout image
 */
const QuestionnaireLayoutImage = (props: Props) => {
  return (
    <Root viewBox="0 0 115 205" {...props}>
      <rect x="0.5" y="0.5" width="115" height="205" rx="2.5" fill="#EFF0F1"/>
      <rect width="100" height="22" transform="translate(8 8)" fill="#DADCDE"/>
      <path d="M15.206 25.154H15.43C16.872 25.154 18.23 24.342 18.23 22.326V17.874C18.23 15.83 16.886 15.046 15.43 15.046H15.206C13.764 15.046 12.406 15.83 12.406 17.874V22.326C12.406 24.342 13.778 25.154 15.206 25.154ZM15.36 23.32H15.29C14.66 23.32 14.394 22.942 14.394 22.158V18.084C14.394 17.286 14.66 16.88 15.29 16.88H15.36C15.962 16.88 16.242 17.286 16.242 18.084V22.158C16.242 22.942 15.962 23.32 15.36 23.32ZM20.7615 25.056C21.2095 25.056 21.4755 25.042 21.8255 24.944V23.348H21.4615C21.2095 23.348 21.1255 23.236 21.1255 22.956V18.896H21.8675V17.16H21.1255V15.2H19.2355V17.16H18.7875V18.896H19.2215V23.446C19.2215 24.356 19.7115 25.056 20.7615 25.056ZM24.7955 25.112H25.0755C26.6295 25.112 27.5815 24.342 27.5815 23.068V22.886C27.5815 20.184 24.2915 20.94 24.2915 19.75V19.162C24.2915 18.84 24.5155 18.616 24.9215 18.616H24.9635C25.3695 18.616 25.5515 18.84 25.5515 19.232V20.142H27.4415V19.022C27.4415 17.622 26.3215 17.048 25.0055 17.048H24.7815C23.4515 17.048 22.3455 17.706 22.3455 19.05V19.764C22.3455 22.424 25.6075 21.584 25.6075 22.956V22.984C25.6075 23.362 25.3695 23.558 24.9775 23.558H24.8795C24.4455 23.558 24.2075 23.334 24.2075 22.914V22.48H22.3035V23.04C22.3035 24.58 23.4935 25.112 24.7955 25.112ZM28.4877 15.2V16.488H30.5177V15.2H28.4877ZM28.4877 17.16V25H30.5177V17.16H28.4877ZM31.6323 15.48V25H33.5503V24.006L34.1803 22.41L35.1043 25H37.0643L35.6923 21.094L37.0503 17.16H35.0483L33.5643 21.738L33.5783 15.48H31.6323ZM37.7299 15.48V25H39.6479V24.006L40.2779 22.41L41.2019 25H43.1619L41.7899 21.094L43.1479 17.16H41.1459L39.6619 21.738L39.6759 15.48H37.7299ZM46.0722 25.112H46.3102C47.6542 25.112 48.8582 24.468 48.8582 22.844V19.33C48.8582 17.72 47.6542 17.048 46.3102 17.048H46.0722C44.7422 17.048 43.5382 17.72 43.5382 19.33V22.844C43.5382 24.468 44.7422 25.112 46.0722 25.112ZM46.2402 23.502H46.1562C45.7922 23.502 45.5682 23.278 45.5682 22.802V19.344C45.5682 18.882 45.7782 18.658 46.1562 18.658H46.2402C46.6322 18.658 46.8282 18.882 46.8282 19.344V22.802C46.8282 23.278 46.6182 23.502 46.2402 23.502Z" fill="#7D8287"/>
      <rect width="100" height="160" transform="translate(8 38)" fill="#DADCDE"/>
      <path d="M47.57 115.5V122.5H48.22V121.06L49.09 119.41L50.59 122.5H51.29L49.5 118.82L51.19 115.5H50.48L48.31 119.81L48.21 120L48.22 115.5H47.57ZM51.7592 123.1V123.66H52.2192C52.8092 123.66 53.1392 123.37 53.3392 122.65L54.9792 116.9H54.3192L53.1692 121.1H53.1592L52.0192 116.9H51.3792L52.8692 122.1L52.7492 122.57C52.6592 122.94 52.4692 123.1 52.1192 123.1H51.7592ZM56.9857 122.57H57.2057C58.0657 122.57 58.6857 122.1 58.6857 121.21V121.13C58.6857 119.35 56.2157 119.82 56.2157 118.57V118.15C56.2157 117.71 56.5557 117.41 57.0857 117.41H57.1457C57.7657 117.41 58.0057 117.79 58.0057 118.2V118.94H58.6357V118.18C58.6357 117.41 58.1057 116.84 57.1657 116.84H57.0657C56.2157 116.84 55.5757 117.33 55.5757 118.16V118.56C55.5757 120.33 58.0457 119.87 58.0457 121.16V121.24C58.0457 121.74 57.6957 122 57.1557 122H56.9957C56.4957 122 56.1257 121.74 56.1257 121.2V120.86H55.4957V121.22C55.4957 122.12 56.1557 122.57 56.9857 122.57ZM61.1398 122.57H61.2398C62.2598 122.57 62.7598 121.97 62.7598 121.21V120.9H62.1298V121.17C62.1298 121.54 61.9398 122 61.2298 122H61.1398C60.5198 122 60.1998 121.61 60.1998 121.02V120.12H62.7898V118.43C62.7898 117.41 62.1498 116.84 61.2398 116.84H61.1198C60.2198 116.84 59.5598 117.4 59.5598 118.49V121.02C59.5598 122.04 60.2098 122.57 61.1398 122.57ZM62.1498 119.55H60.1998V118.41C60.1998 117.88 60.5198 117.41 61.1298 117.41H61.2198C61.8398 117.41 62.1498 117.86 62.1498 118.41V119.55ZM64.6002 122.51C64.7102 122.51 64.8302 122.5 64.8702 122.49V121.93H64.7602C64.5502 121.93 64.4602 121.83 64.4602 121.57V115.64H63.8202V121.69C63.8202 122.17 64.0302 122.51 64.6002 122.51ZM65.5092 123.1V123.66H65.9692C66.5592 123.66 66.8892 123.37 67.0892 122.65L68.7292 116.9H68.0692L66.9192 121.1H66.9092L65.7692 116.9H65.1292L66.6192 122.1L66.4992 122.57C66.4092 122.94 66.2192 123.1 65.8692 123.1H65.5092Z" fill="#7D8287"/>
      <rect x="0.5" y="0.5" width="115" height="205" rx="2.5" stroke="#DADCDE"/>
    </Root>
  )
}

export default QuestionnaireLayoutImage;