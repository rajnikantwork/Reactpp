import SvgIcon from "@material-ui/core/SvgIcon";
export default function CheckedFilledIcon(props:any) {
  return (
    <SvgIcon {...props}>
      <path
        fill="#2AAEBC"
        fill-rule="evenodd"
        d="M9.778 2.898c-4.475 0-8.102 3.628-8.102 8.102s3.627 8.102 8.102 8.102c4.474 0 8.101-3.628 8.101-8.102h1.677c0 5.4-4.378 9.778-9.778 9.778S0 16.4 0 11c0-5.4 4.378-9.778 9.778-9.778 1.936 0 3.744.564 5.264 1.537.39.25.504.767.254 1.157s-.768.504-1.158.255c-1.258-.806-2.753-1.273-4.36-1.273zm8.248 2.849c-.25-.39-.768-.505-1.158-.256-.39.249-.504.768-.255 1.158.802 1.256 1.266 2.747 1.266 4.35h1.677c0-1.931-.561-3.735-1.53-5.252z"
        clip-rule="evenodd"
      />
      <g filter="url(#filter0_d)">
        <path
          fill="#2AAEBC"
          fill-rule="evenodd"
          d="M20.811 2.733c.352.37.337.956-.033 1.309L9.415 14.509c-.364.346-.937.339-1.292-.016L5.16 11.53c-.362-.362-.362-.948 0-1.31.361-.361.948-.361 1.31 0l2.324 2.325L19.502 2.7c.37-.352.957-.337 1.31.034z"
          clip-rule="evenodd"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          width="20.177"
          height="16.32"
          x="2.889"
          y="1.444"
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix values="0 0 0 0 0.266667 0 0 0 0 0.337255 0 0 0 0 0.423529 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </SvgIcon>
  );
}
