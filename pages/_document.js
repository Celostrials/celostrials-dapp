import { Html, Head, Main, NextScript } from "next/document"
import { config } from "../config/config"

export default function Document() {
  return (
    <Html className="tw-dark">
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />

        <meta property="og:title" content="Celostrials | nfETs on Celo" />
        <meta property="og:type" content="NFTs" />
        <meta
          property="og:description"
          content="Celostrials are a collection of 10,000 uniquely generated aliens invading on the Celo Blockchain."
        />
        <meta
          property="og:image"
          content={config.HOST_URL + "/images/preview.png"}
        />
        <meta property="og:image:width" content="3660" />
        <meta property="og:image:height" content="2198" />
        <meta property="twitter:title" content="Celostrials | nfETs on Celo" />
        <meta
          property="twitter:description"
          content="Celostrials are a collection of 10,000 uniquely generated aliens invading on the Celo Blockchain."
        />
        <meta
          property="twitter:image"
          content={config.HOST_URL + "/images/preview.png"}
        />
        <meta
          property="twitter:card"
          content="Celostrials are a collection of 10,000 uniquely generated aliens invading on the Celo Blockchain."
        />

        <link
          rel="apple-touch-icon"
          href={config.HOST_URL + "/images/preview.png"}
        />

        <link rel="manifest" href={config.HOST_URL + "/images/preview.png"} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
