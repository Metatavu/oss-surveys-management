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
})(() => ({
  width: 115,
  height: 205,
  fill: "transparent"
}));

/**
 * Render question + paragraph layout image
 */
const QuestionParagraphLayoutImage = (props: Props) => {
  return (
    <Root viewBox="0 0 115 205" {...props}>
      <rect x="0.5" y="0.5" width="115" height="205" rx="2.5" fill="#EFF0F1" />
      <rect width="100" height="22" transform="translate(8 8)" fill="#DADCDE" />
      <path
        d="M15.206 25.154H15.43C16.872 25.154 18.23 24.342 18.23 22.326V17.874C18.23 15.83 16.886 15.046 15.43 15.046H15.206C13.764 15.046 12.406 15.83 12.406 17.874V22.326C12.406 24.342 13.778 25.154 15.206 25.154ZM15.36 23.32H15.29C14.66 23.32 14.394 22.942 14.394 22.158V18.084C14.394 17.286 14.66 16.88 15.29 16.88H15.36C15.962 16.88 16.242 17.286 16.242 18.084V22.158C16.242 22.942 15.962 23.32 15.36 23.32ZM20.7615 25.056C21.2095 25.056 21.4755 25.042 21.8255 24.944V23.348H21.4615C21.2095 23.348 21.1255 23.236 21.1255 22.956V18.896H21.8675V17.16H21.1255V15.2H19.2355V17.16H18.7875V18.896H19.2215V23.446C19.2215 24.356 19.7115 25.056 20.7615 25.056ZM24.7955 25.112H25.0755C26.6295 25.112 27.5815 24.342 27.5815 23.068V22.886C27.5815 20.184 24.2915 20.94 24.2915 19.75V19.162C24.2915 18.84 24.5155 18.616 24.9215 18.616H24.9635C25.3695 18.616 25.5515 18.84 25.5515 19.232V20.142H27.4415V19.022C27.4415 17.622 26.3215 17.048 25.0055 17.048H24.7815C23.4515 17.048 22.3455 17.706 22.3455 19.05V19.764C22.3455 22.424 25.6075 21.584 25.6075 22.956V22.984C25.6075 23.362 25.3695 23.558 24.9775 23.558H24.8795C24.4455 23.558 24.2075 23.334 24.2075 22.914V22.48H22.3035V23.04C22.3035 24.58 23.4935 25.112 24.7955 25.112ZM28.4877 15.2V16.488H30.5177V15.2H28.4877ZM28.4877 17.16V25H30.5177V17.16H28.4877ZM31.6323 15.48V25H33.5503V24.006L34.1803 22.41L35.1043 25H37.0643L35.6923 21.094L37.0503 17.16H35.0483L33.5643 21.738L33.5783 15.48H31.6323ZM37.7299 15.48V25H39.6479V24.006L40.2779 22.41L41.2019 25H43.1619L41.7899 21.094L43.1479 17.16H41.1459L39.6619 21.738L39.6759 15.48H37.7299ZM46.0722 25.112H46.3102C47.6542 25.112 48.8582 24.468 48.8582 22.844V19.33C48.8582 17.72 47.6542 17.048 46.3102 17.048H46.0722C44.7422 17.048 43.5382 17.72 43.5382 19.33V22.844C43.5382 24.468 44.7422 25.112 46.0722 25.112ZM46.2402 23.502H46.1562C45.7922 23.502 45.5682 23.278 45.5682 22.802V19.344C45.5682 18.882 45.7782 18.658 46.1562 18.658H46.2402C46.6322 18.658 46.8282 18.882 46.8282 19.344V22.802C46.8282 23.278 46.6182 23.502 46.2402 23.502Z"
        fill="#7D8287"
      />
      <rect width="100" height="76" transform="translate(8 38)" fill="#DADCDE" />
      <path
        d="M47.57 73.5V80.5H48.22V79.06L49.09 77.41L50.59 80.5H51.29L49.5 76.82L51.19 73.5H50.48L48.31 77.81L48.21 78L48.22 73.5H47.57ZM51.7592 81.1V81.66H52.2192C52.8092 81.66 53.1392 81.37 53.3392 80.65L54.9792 74.9H54.3192L53.1692 79.1H53.1592L52.0192 74.9H51.3792L52.8692 80.1L52.7492 80.57C52.6592 80.94 52.4692 81.1 52.1192 81.1H51.7592ZM56.9857 80.57H57.2057C58.0657 80.57 58.6857 80.1 58.6857 79.21V79.13C58.6857 77.35 56.2157 77.82 56.2157 76.57V76.15C56.2157 75.71 56.5557 75.41 57.0857 75.41H57.1457C57.7657 75.41 58.0057 75.79 58.0057 76.2V76.94H58.6357V76.18C58.6357 75.41 58.1057 74.84 57.1657 74.84H57.0657C56.2157 74.84 55.5757 75.33 55.5757 76.16V76.56C55.5757 78.33 58.0457 77.87 58.0457 79.16V79.24C58.0457 79.74 57.6957 80 57.1557 80H56.9957C56.4957 80 56.1257 79.74 56.1257 79.2V78.86H55.4957V79.22C55.4957 80.12 56.1557 80.57 56.9857 80.57ZM61.1398 80.57H61.2398C62.2598 80.57 62.7598 79.97 62.7598 79.21V78.9H62.1298V79.17C62.1298 79.54 61.9398 80 61.2298 80H61.1398C60.5198 80 60.1998 79.61 60.1998 79.02V78.12H62.7898V76.43C62.7898 75.41 62.1498 74.84 61.2398 74.84H61.1198C60.2198 74.84 59.5598 75.4 59.5598 76.49V79.02C59.5598 80.04 60.2098 80.57 61.1398 80.57ZM62.1498 77.55H60.1998V76.41C60.1998 75.88 60.5198 75.41 61.1298 75.41H61.2198C61.8398 75.41 62.1498 75.86 62.1498 76.41V77.55ZM64.6002 80.51C64.7102 80.51 64.8302 80.5 64.8702 80.49V79.93H64.7602C64.5502 79.93 64.4602 79.83 64.4602 79.57V73.64H63.8202V79.69C63.8202 80.17 64.0302 80.51 64.6002 80.51ZM65.5092 81.1V81.66H65.9692C66.5592 81.66 66.8892 81.37 67.0892 80.65L68.7292 74.9H68.0692L66.9192 79.1H66.9092L65.7692 74.9H65.1292L66.6192 80.1L66.4992 80.57C66.4092 80.94 66.2192 81.1 65.8692 81.1H65.5092Z"
        fill="#7D8287"
      />
      <rect width="100" height="76" transform="translate(8 122)" fill="#DADCDE" />
      <path
        d="M12.57 127V134H15.48V133.38H13.23V127H12.57ZM17.6242 134.07H17.7242C18.7442 134.07 19.2442 133.47 19.2442 132.71V132.4H18.6142V132.67C18.6142 133.04 18.4242 133.5 17.7142 133.5H17.6242C17.0042 133.5 16.6842 133.11 16.6842 132.52V131.62H19.2742V129.93C19.2742 128.91 18.6342 128.34 17.7242 128.34H17.6042C16.7042 128.34 16.0442 128.9 16.0442 129.99V132.52C16.0442 133.54 16.6942 134.07 17.6242 134.07ZM18.6342 131.05H16.6842V129.91C16.6842 129.38 17.0042 128.91 17.6142 128.91H17.7042C18.3242 128.91 18.6342 129.36 18.6342 129.91V131.05ZM20.3046 127.14V127.85H20.9446V127.14H20.3046ZM20.3046 128.4V134H20.9446V128.4H20.3046ZM22.1115 128.4V135.16H22.7315V132.78H22.7515C22.8415 133.74 23.3915 134.07 24.0015 134.07H24.0615C24.8715 134.07 25.3515 133.5 25.3515 132.66V129.7C25.3515 128.97 24.9715 128.34 24.0915 128.34H24.0315C23.4315 128.34 22.8515 128.67 22.7715 129.62H22.7515L22.7415 128.4H22.1115ZM23.9615 133.5H23.8915C23.2315 133.5 22.7515 132.92 22.7515 131.89V130.51C22.7515 129.49 23.2915 128.91 23.8615 128.91H23.9415C24.4515 128.91 24.7115 129.22 24.7115 129.77V132.64C24.7115 133.22 24.4815 133.5 23.9615 133.5ZM26.9593 127.15V127.91H27.5593V127.15H26.9593ZM28.2793 127.15V127.91H28.8493V127.15H28.2793ZM27.4293 134.06H27.4993C28.2193 134.06 28.7293 133.7 28.8093 132.71H28.8293L28.8593 134H29.4293V129.82C29.4293 128.81 28.8093 128.34 27.9793 128.34H27.8393C27.0493 128.34 26.3193 128.81 26.3193 129.74V130.44H26.9493V129.76C26.9493 129.09 27.4593 128.91 27.8593 128.91H27.9193C28.4793 128.91 28.7893 129.24 28.7893 129.82V131H27.7993C26.8093 131 26.1493 131.44 26.1493 132.49V132.77C26.1493 133.54 26.6193 134.06 27.4293 134.06ZM27.6293 133.49H27.5293C27.0493 133.49 26.7893 133.21 26.7893 132.71V132.51C26.7893 131.84 27.1693 131.57 27.8493 131.57H28.7893V131.86C28.7893 132.9 28.3393 133.49 27.6293 133.49ZM31.5813 134.01C31.7913 134.01 31.9213 134 32.0213 133.98V133.45H31.6613C31.3913 133.45 31.2713 133.28 31.2713 133.01V128.97H32.0513V128.4H31.2713V127.14H30.6313V128.4H30.1513V128.97H30.6313V133.03C30.6313 133.75 31.0613 134.01 31.5813 134.01ZM34.1672 134.07H34.2672C35.2872 134.07 35.7872 133.47 35.7872 132.71V132.4H35.1572V132.67C35.1572 133.04 34.9672 133.5 34.2572 133.5H34.1672C33.5472 133.5 33.2272 133.11 33.2272 132.52V131.62H35.8172V129.93C35.8172 128.91 35.1772 128.34 34.2672 128.34H34.1472C33.2472 128.34 32.5872 128.9 32.5872 129.99V132.52C32.5872 133.54 33.2372 134.07 34.1672 134.07ZM35.1772 131.05H33.2272V129.91C33.2272 129.38 33.5472 128.91 34.1572 128.91H34.2472C34.8672 128.91 35.1772 129.36 35.1772 129.91V131.05ZM36.8576 127.14V134H37.4976V133.14L38.2876 131.7L39.3976 134H40.0876L38.6776 131.08L40.0376 128.4H39.3476L37.4876 132.06L37.4976 127.14H36.8576ZM42.0638 134.07H42.2838C43.1438 134.07 43.7638 133.6 43.7638 132.71V132.63C43.7638 130.85 41.2938 131.32 41.2938 130.07V129.65C41.2938 129.21 41.6338 128.91 42.1638 128.91H42.2238C42.8438 128.91 43.0838 129.29 43.0838 129.7V130.44H43.7138V129.68C43.7138 128.91 43.1838 128.34 42.2438 128.34H42.1438C41.2938 128.34 40.6538 128.83 40.6538 129.66V130.06C40.6538 131.83 43.1238 131.37 43.1238 132.66V132.74C43.1238 133.24 42.7738 133.5 42.2338 133.5H42.0738C41.5738 133.5 41.2038 133.24 41.2038 132.7V132.36H40.5738V132.72C40.5738 133.62 41.2338 134.07 42.0638 134.07ZM45.7805 134.01C45.9905 134.01 46.1205 134 46.2205 133.98V133.45H45.8605C45.5905 133.45 45.4705 133.28 45.4705 133.01V128.97H46.2505V128.4H45.4705V127.14H44.8305V128.4H44.3505V128.97H44.8305V133.03C44.8305 133.75 45.2605 134.01 45.7805 134.01ZM46.9843 127.14V127.85H47.6243V127.14H46.9843ZM46.9843 128.4V134H47.6243V128.4H46.9843Z"
        fill="#7D8287"
      />
      <rect x="0.5" y="0.5" width="115" height="205" rx="2.5" stroke="#DADCDE" />
    </Root>
  );
};

export default QuestionParagraphLayoutImage;
