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
 * Render info layout image
 */
const InfoLayoutImage = (props: Props) => {
  return (
    <Root viewBox="0 0 115 205" {...props}>
      <rect x="0.5" y="0.5" width="115" height="205" rx="2.5" fill="#EFF0F1"/>
      <rect width="100" height="22" transform="translate(8 8)" fill="#DADCDE"/>
      <path d="M15.206 25.154H15.43C16.872 25.154 18.23 24.342 18.23 22.326V17.874C18.23 15.83 16.886 15.046 15.43 15.046H15.206C13.764 15.046 12.406 15.83 12.406 17.874V22.326C12.406 24.342 13.778 25.154 15.206 25.154ZM15.36 23.32H15.29C14.66 23.32 14.394 22.942 14.394 22.158V18.084C14.394 17.286 14.66 16.88 15.29 16.88H15.36C15.962 16.88 16.242 17.286 16.242 18.084V22.158C16.242 22.942 15.962 23.32 15.36 23.32ZM20.7615 25.056C21.2095 25.056 21.4755 25.042 21.8255 24.944V23.348H21.4615C21.2095 23.348 21.1255 23.236 21.1255 22.956V18.896H21.8675V17.16H21.1255V15.2H19.2355V17.16H18.7875V18.896H19.2215V23.446C19.2215 24.356 19.7115 25.056 20.7615 25.056ZM24.7955 25.112H25.0755C26.6295 25.112 27.5815 24.342 27.5815 23.068V22.886C27.5815 20.184 24.2915 20.94 24.2915 19.75V19.162C24.2915 18.84 24.5155 18.616 24.9215 18.616H24.9635C25.3695 18.616 25.5515 18.84 25.5515 19.232V20.142H27.4415V19.022C27.4415 17.622 26.3215 17.048 25.0055 17.048H24.7815C23.4515 17.048 22.3455 17.706 22.3455 19.05V19.764C22.3455 22.424 25.6075 21.584 25.6075 22.956V22.984C25.6075 23.362 25.3695 23.558 24.9775 23.558H24.8795C24.4455 23.558 24.2075 23.334 24.2075 22.914V22.48H22.3035V23.04C22.3035 24.58 23.4935 25.112 24.7955 25.112ZM28.4877 15.2V16.488H30.5177V15.2H28.4877ZM28.4877 17.16V25H30.5177V17.16H28.4877ZM31.6323 15.48V25H33.5503V24.006L34.1803 22.41L35.1043 25H37.0643L35.6923 21.094L37.0503 17.16H35.0483L33.5643 21.738L33.5783 15.48H31.6323ZM37.7299 15.48V25H39.6479V24.006L40.2779 22.41L41.2019 25H43.1619L41.7899 21.094L43.1479 17.16H41.1459L39.6619 21.738L39.6759 15.48H37.7299ZM46.0722 25.112H46.3102C47.6542 25.112 48.8582 24.468 48.8582 22.844V19.33C48.8582 17.72 47.6542 17.048 46.3102 17.048H46.0722C44.7422 17.048 43.5382 17.72 43.5382 19.33V22.844C43.5382 24.468 44.7422 25.112 46.0722 25.112ZM46.2402 23.502H46.1562C45.7922 23.502 45.5682 23.278 45.5682 22.802V19.344C45.5682 18.882 45.7782 18.658 46.1562 18.658H46.2402C46.6322 18.658 46.8282 18.882 46.8282 19.344V22.802C46.8282 23.278 46.6182 23.502 46.2402 23.502Z" fill="#7D8287"/>
      <rect width="100" height="160" transform="translate(8 38)" fill="#DADCDE"/>
      <path d="M12.57 43V50H15.48V49.38H13.23V43H12.57ZM17.6242 50.07H17.7242C18.7442 50.07 19.2442 49.47 19.2442 48.71V48.4H18.6142V48.67C18.6142 49.04 18.4242 49.5 17.7142 49.5H17.6242C17.0042 49.5 16.6842 49.11 16.6842 48.52V47.62H19.2742V45.93C19.2742 44.91 18.6342 44.34 17.7242 44.34H17.6042C16.7042 44.34 16.0442 44.9 16.0442 45.99V48.52C16.0442 49.54 16.6942 50.07 17.6242 50.07ZM18.6342 47.05H16.6842V45.91C16.6842 45.38 17.0042 44.91 17.6142 44.91H17.7042C18.3242 44.91 18.6342 45.36 18.6342 45.91V47.05ZM20.3046 43.14V43.85H20.9446V43.14H20.3046ZM20.3046 44.4V50H20.9446V44.4H20.3046ZM22.1115 44.4V51.16H22.7315V48.78H22.7515C22.8415 49.74 23.3915 50.07 24.0015 50.07H24.0615C24.8715 50.07 25.3515 49.5 25.3515 48.66V45.7C25.3515 44.97 24.9715 44.34 24.0915 44.34H24.0315C23.4315 44.34 22.8515 44.67 22.7715 45.62H22.7515L22.7415 44.4H22.1115ZM23.9615 49.5H23.8915C23.2315 49.5 22.7515 48.92 22.7515 47.89V46.51C22.7515 45.49 23.2915 44.91 23.8615 44.91H23.9415C24.4515 44.91 24.7115 45.22 24.7115 45.77V48.64C24.7115 49.22 24.4815 49.5 23.9615 49.5ZM26.9593 43.15V43.91H27.5593V43.15H26.9593ZM28.2793 43.15V43.91H28.8493V43.15H28.2793ZM27.4293 50.06H27.4993C28.2193 50.06 28.7293 49.7 28.8093 48.71H28.8293L28.8593 50H29.4293V45.82C29.4293 44.81 28.8093 44.34 27.9793 44.34H27.8393C27.0493 44.34 26.3193 44.81 26.3193 45.74V46.44H26.9493V45.76C26.9493 45.09 27.4593 44.91 27.8593 44.91H27.9193C28.4793 44.91 28.7893 45.24 28.7893 45.82V47H27.7993C26.8093 47 26.1493 47.44 26.1493 48.49V48.77C26.1493 49.54 26.6193 50.06 27.4293 50.06ZM27.6293 49.49H27.5293C27.0493 49.49 26.7893 49.21 26.7893 48.71V48.51C26.7893 47.84 27.1693 47.57 27.8493 47.57H28.7893V47.86C28.7893 48.9 28.3393 49.49 27.6293 49.49ZM31.5813 50.01C31.7913 50.01 31.9213 50 32.0213 49.98V49.45H31.6613C31.3913 49.45 31.2713 49.28 31.2713 49.01V44.97H32.0513V44.4H31.2713V43.14H30.6313V44.4H30.1513V44.97H30.6313V49.03C30.6313 49.75 31.0613 50.01 31.5813 50.01ZM34.1672 50.07H34.2672C35.2872 50.07 35.7872 49.47 35.7872 48.71V48.4H35.1572V48.67C35.1572 49.04 34.9672 49.5 34.2572 49.5H34.1672C33.5472 49.5 33.2272 49.11 33.2272 48.52V47.62H35.8172V45.93C35.8172 44.91 35.1772 44.34 34.2672 44.34H34.1472C33.2472 44.34 32.5872 44.9 32.5872 45.99V48.52C32.5872 49.54 33.2372 50.07 34.1672 50.07ZM35.1772 47.05H33.2272V45.91C33.2272 45.38 33.5472 44.91 34.1572 44.91H34.2472C34.8672 44.91 35.1772 45.36 35.1772 45.91V47.05ZM36.8576 43.14V50H37.4976V49.14L38.2876 47.7L39.3976 50H40.0876L38.6776 47.08L40.0376 44.4H39.3476L37.4876 48.06L37.4976 43.14H36.8576ZM42.0638 50.07H42.2838C43.1438 50.07 43.7638 49.6 43.7638 48.71V48.63C43.7638 46.85 41.2938 47.32 41.2938 46.07V45.65C41.2938 45.21 41.6338 44.91 42.1638 44.91H42.2238C42.8438 44.91 43.0838 45.29 43.0838 45.7V46.44H43.7138V45.68C43.7138 44.91 43.1838 44.34 42.2438 44.34H42.1438C41.2938 44.34 40.6538 44.83 40.6538 45.66V46.06C40.6538 47.83 43.1238 47.37 43.1238 48.66V48.74C43.1238 49.24 42.7738 49.5 42.2338 49.5H42.0738C41.5738 49.5 41.2038 49.24 41.2038 48.7V48.36H40.5738V48.72C40.5738 49.62 41.2338 50.07 42.0638 50.07ZM45.7805 50.01C45.9905 50.01 46.1205 50 46.2205 49.98V49.45H45.8605C45.5905 49.45 45.4705 49.28 45.4705 49.01V44.97H46.2505V44.4H45.4705V43.14H44.8305V44.4H44.3505V44.97H44.8305V49.03C44.8305 49.75 45.2605 50.01 45.7805 50.01ZM46.9843 43.14V43.85H47.6243V43.14H46.9843ZM46.9843 44.4V50H47.6243V44.4H46.9843Z" fill="#7D8287"/>
      <rect x="0.5" y="0.5" width="115" height="205" rx="2.5" stroke="#DADCDE"/>
    </Root>
  )
}

export default InfoLayoutImage;