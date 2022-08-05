import { BoxProps } from "@chakra-ui/layout"
import { Box, chakra, IconProps, Icon as ChakraIcon } from "@chakra-ui/react"
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import colors from "../styles/theme/foundations/colors"

interface Props extends BoxProps {
  color?: string
  icon: IconProp
  size?: SizeProp
}

export const Icon = ({ icon, size, color, ...rest }: Props) => {
  return (
    <Box {...rest}>
      <FontAwesomeIcon
        size={size}
        icon={icon}
        color={color ?? colors.gray[500]}
      />
    </Box>
  )
}

export const MetaMaskIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 318.6 318.6"
    {...props}
  >
    <style type="text/css">{`
        .st0{fill:#E2761B;stroke:#E2761B;stroke-linecap:round;stroke-linejoin:round;}
        .st1{fill:#E4761B;stroke:#E4761B;stroke-linecap:round;stroke-linejoin:round;}
        .st2{fill:#D7C1B3;stroke:#D7C1B3;stroke-linecap:round;stroke-linejoin:round;}
        .st3{fill:#233447;stroke:#233447;stroke-linecap:round;stroke-linejoin:round;}
        .st4{fill:#CD6116;stroke:#CD6116;stroke-linecap:round;stroke-linejoin:round;}
        .st5{fill:#E4751F;stroke:#E4751F;stroke-linecap:round;stroke-linejoin:round;}
        .st6{fill:#F6851B;stroke:#F6851B;stroke-linecap:round;stroke-linejoin:round;}
        .st7{fill:#C0AD9E;stroke:#C0AD9E;stroke-linecap:round;stroke-linejoin:round;}
        .st8{fill:#161616;stroke:#161616;stroke-linecap:round;stroke-linejoin:round;}
        .st9{fill:#763D16;stroke:#763D16;stroke-linecap:round;stroke-linejoin:round;}
    `}</style>
    <polygon className="st0" points="274.1,35.5 174.6,109.4 193,65.8 " />
    <g>
      <polygon className="st1" points="44.4,35.5 143.1,110.1 125.6,65.8 	" />
      <polygon
        className="st1"
        points="238.3,206.8 211.8,247.4 268.5,263 284.8,207.7 	"
      />
      <polygon
        className="st1"
        points="33.9,207.7 50.1,263 106.8,247.4 80.3,206.8 	"
      />
      <polygon
        className="st1"
        points="103.6,138.2 87.8,162.1 144.1,164.6 142.1,104.1 	"
      />
      <polygon
        className="st1"
        points="214.9,138.2 175.9,103.4 174.6,164.6 230.8,162.1 	"
      />
      <polygon className="st1" points="106.8,247.4 140.6,230.9 111.4,208.1 	" />
      <polygon className="st1" points="177.9,230.9 211.8,247.4 207.1,208.1 	" />
    </g>
    <g>
      <polygon
        className="st2"
        points="211.8,247.4 177.9,230.9 180.6,253 180.3,262.3 	"
      />
      <polygon
        className="st2"
        points="106.8,247.4 138.3,262.3 138.1,253 140.6,230.9 	"
      />
    </g>
    <polygon className="st3" points="138.8,193.5 110.6,185.2 130.5,176.1 " />
    <polygon className="st3" points="179.7,193.5 188,176.1 208,185.2 " />
    <g>
      <polygon className="st4" points="106.8,247.4 111.6,206.8 80.3,207.7 	" />
      <polygon className="st4" points="207,206.8 211.8,247.4 238.3,207.7 	" />
      <polygon
        className="st4"
        points="230.8,162.1 174.6,164.6 179.8,193.5 188.1,176.1 208.1,185.2 	"
      />
      <polygon
        className="st4"
        points="110.6,185.2 130.6,176.1 138.8,193.5 144.1,164.6 87.8,162.1 	"
      />
    </g>
    <g>
      <polygon className="st5" points="87.8,162.1 111.4,208.1 110.6,185.2 	" />
      <polygon className="st5" points="208.1,185.2 207.1,208.1 230.8,162.1 	" />
      <polygon
        className="st5"
        points="144.1,164.6 138.8,193.5 145.4,227.6 146.9,182.7 	"
      />
      <polygon
        className="st5"
        points="174.6,164.6 171.9,182.6 173.1,227.6 179.8,193.5 	"
      />
    </g>
    <polygon
      className="st6"
      points="179.8,193.5 173.1,227.6 177.9,230.9 207.1,208.1 208.1,185.2 "
    />
    <polygon
      className="st6"
      points="110.6,185.2 111.4,208.1 140.6,230.9 145.4,227.6 138.8,193.5 "
    />
    <polygon
      className="st7"
      points="180.3,262.3 180.6,253 178.1,250.8 140.4,250.8 138.1,253 138.3,262.3 106.8,247.4 117.8,256.4 
	140.1,271.9 178.4,271.9 200.8,256.4 211.8,247.4 "
    />
    <polygon
      className="st8"
      points="177.9,230.9 173.1,227.6 145.4,227.6 140.6,230.9 138.1,253 140.4,250.8 178.1,250.8 180.6,253 "
    />
    <g>
      <polygon
        className="st9"
        points="278.3,114.2 286.8,73.4 274.1,35.5 177.9,106.9 214.9,138.2 267.2,153.5 278.8,140 273.8,136.4 
		281.8,129.1 275.6,124.3 283.6,118.2 	"
      />
      <polygon
        className="st9"
        points="31.8,73.4 40.3,114.2 34.9,118.2 42.9,124.3 36.8,129.1 44.8,136.4 39.8,140 51.3,153.5 103.6,138.2 
		140.6,106.9 44.4,35.5 	"
      />
    </g>
    <polygon
      className="st6"
      points="267.2,153.5 214.9,138.2 230.8,162.1 207.1,208.1 238.3,207.7 284.8,207.7 "
    />
    <polygon
      className="st6"
      points="103.6,138.2 51.3,153.5 33.9,207.7 80.3,207.7 111.4,208.1 87.8,162.1 "
    />
    <polygon
      className="st6"
      points="174.6,164.6 177.9,106.9 193.1,65.8 125.6,65.8 140.6,106.9 144.1,164.6 145.3,182.8 145.4,227.6 
	173.1,227.6 173.3,182.8 "
    />
  </svg>
)

export const CeloGlyph = ({ color, ...props }: IconProps) => (
  <ChakraIcon {...props}>
    <chakra.svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      xmlSpace="preserve"
    >
      <desc>Symbol for the Celo Gold currency</desc>
      <path
        d="M50,0L50,0c27.6,0,50,22.4,50,50v0c0,27.6-22.4,50-50,50h0C22.4,100,0,77.6,0,50v0C0,22.4,22.4,0,50,0z"
        fill="#FBCC5C"
      />
      <g>
        <path
          d="M79.4,44c0-13-10.5-23.5-23.5-23.5c-9.6,0-17.9,5.8-21.5,14.1C26.2,38.3,20.5,46.5,20.5,56
		C20.5,69,31,79.5,44,79.5c9.6,0,17.9-5.8,21.5-14.1C73.8,61.8,79.4,53.6,79.4,44z M59.7,59.5c-1.2,0.3-2.4,0.4-3.6,0.4
		c-8.8,0-15.9-7.2-15.9-15.9c0-1.2,0.1-2.3,0.4-3.4c1.2-0.3,2.4-0.4,3.6-0.4c8.8,0,15.9,7.1,15.9,15.9C60,57.3,59.9,58.4,59.7,59.5z
		 M28.2,56.1c0-4.3,1.7-8.1,4.4-11C33.2,57.3,43,67,55.2,67.5c-2.9,2.8-6.8,4.6-11.1,4.6C35.3,72,28.2,64.9,28.2,56.1z M67.6,55
		C67,42.8,57.2,33.1,45,32.6c2.9-2.8,6.8-4.6,11.1-4.6C64.9,28,72,35.1,72,43.9C71.9,48.3,70.2,52.2,67.6,55z"
          fill="#F9B73E"
        />
        <path
          d="M78.6,44c0-12.4-10.1-22.5-22.5-22.5c-9.4,0-17.4,5.7-20.8,13.9c-8,3.4-13.7,11.4-13.7,20.7
		c0,12.4,10.1,22.5,22.5,22.5c9.4,0,17.4-5.7,20.8-13.9C72.8,61.3,78.6,53.3,78.6,44z M44.1,73c-9.3,0-16.9-7.6-16.9-16.9
		c0-5.3,2.5-10.1,6.4-13.2c0,0.4,0,0.8,0,1.1c0,12.4,10.1,22.5,22.5,22.5c0.5,0,0.9,0,1.4,0C54.3,70.5,49.5,73,44.1,73z M60.5,60.3
		c-1.4,0.4-2.9,0.6-4.4,0.6c-9.3,0-16.9-7.6-16.9-16.9c0-1.5,0.2-2.9,0.6-4.2c1.4-0.4,2.9-0.6,4.4-0.6c9.3,0,16.9,7.6,16.9,16.9
		C61,57.6,60.8,59,60.5,60.3z M66.6,57.2c0-0.4,0-0.8,0-1.1c0-12.4-10.1-22.5-22.5-22.5c-0.5,0-0.9,0-1.4,0c3.1-4,7.9-6.5,13.3-6.5
		c9.3,0,16.9,7.6,16.9,16.9C72.9,49.4,70.4,54.1,66.6,57.2z"
          fill="#FFFFFF"
        />
      </g>
    </chakra.svg>
  </ChakraIcon>
)
export const CeloLogo = ({ color, ...props }: BoxProps) => (
  <Box {...props} m="0">
    <chakra.svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 3952 1200"
    >
      <path
        id="Type"
        d="M2817,1089l86-27V350l-86,27ZM1825,657c54,0,104,24,136,64l35-81c-46-44-107-65-171-65-148,0-250,117-249,246,1,140,111,254,249,254,70,0,123-21,163-50V926c-42,42-103,67-156,67-80,0-170-65-170-172C1662,722,1740,657,1825,657Zm572-82c-148,0-234,117-234,246,0,140,111,254,249,254,70,0,123-21,163-50V926c-42,42-103,67-156,67-71,0-149-44-165-137h377V823C2631,685,2540,575,2397,575Zm929,0c-138,0-250,112-250,250s112,250,250,250,250-112,250-250S3464,575,3326,575Zm-928,82c67,0,138,42,144,123H2254C2260,699,2331,657,2398,657Zm928,336a168,168,0,1,1,168-168A167.72,167.72,0,0,1,3326,993Z"
        fill="#2e3338"
      />
      <path
        id="Bottom_Ring"
        data-name="Bottom Ring"
        d="M751,1100c151.88,0,275-123.12,275-275S902.88,550,751,550,476,673.12,476,825,599.12,1100,751,1100Zm0,100c-207.1,0-375-167.9-375-375S543.9,450,751,450s375,167.9,375,375S958.1,1200,751,1200Z"
        fill="#fbcc5c"
      />
      <path
        id="Top_Ring"
        data-name="Top Ring"
        d="M951,900c151.88,0,275-123.12,275-275S1102.88,350,951,350,676,473.12,676,625,799.12,900,951,900Zm0,100c-207.1,0-375-167.9-375-375S743.9,250,951,250s375,167.9,375,375S1158.1,1000,951,1000Z"
        fill="#35d07f"
      />
      <path
        id="Rings_Overlap"
        data-name="Rings Overlap"
        d="M963.3,999.8a274.13,274.13,0,0,0,54.52-108,274.18,274.18,0,0,0,108-54.51,373.33,373.33,0,0,1-29.14,133.35A373.33,373.33,0,0,1,963.31,999.8ZM684.19,558.18a274.18,274.18,0,0,0-108,54.51,373.33,373.33,0,0,1,29.14-133.35A373.33,373.33,0,0,1,738.7,450.2,274.18,274.18,0,0,0,684.19,558.18Z"
        fill="#5ea33b"
      />
    </chakra.svg>
  </Box>
)
