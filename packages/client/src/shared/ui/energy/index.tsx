type EnergyProps = {
  width?: number
  height?: number
  className?: string
}

export const Energy = ({ className, height, width }: EnergyProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 26 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5235 2.15998C11.2271 0.98895 12.5268 0.267012 13.9339 0.265625L13.9537 0.303512C16.1312 0.303512 17.8964 1.99978 17.8964 4.09222V11.878H21.9179C23.3745 11.8736 24.7149 12.6412 25.404 13.8743C26.093 15.1074 26.0185 16.6052 25.2101 17.7695L16.2404 30.7647C15.274 32.1467 13.4818 32.7604 11.8237 32.2772C10.1655 31.794 9.03003 30.3271 9.02526 28.662V23.2631H4.80655C3.39515 23.2685 2.08842 22.5485 1.38029 21.3753C0.67216 20.2021 0.670672 18.7546 1.37639 17.58L10.5235 2.15998ZM14.6437 3.37779C14.4546 3.19961 14.1988 3.10207 13.9339 3.10716C13.573 3.10833 13.2442 3.30673 13.0863 3.61863L3.93915 19.0008C3.77182 19.2947 3.77847 19.6516 3.95663 19.9395C4.13479 20.2274 4.45796 20.4035 4.80655 20.4026H10.0109C11.0997 20.4026 11.9823 21.2507 11.9823 22.297V28.6431C11.9875 29.0546 12.2687 29.4157 12.678 29.5367C13.0873 29.6578 13.5312 29.511 13.7762 29.1735L22.7853 16.1593C22.9907 15.8673 23.0105 15.49 22.8366 15.1797C22.6628 14.8695 22.324 14.6776 21.9574 14.6817H16.9107C15.8219 14.6817 14.9393 13.8335 14.9393 12.7873V4.05433C14.9394 3.79981 14.8328 3.55598 14.6437 3.37779Z"
        fill="currentColor"
      />
    </svg>
  )
}
