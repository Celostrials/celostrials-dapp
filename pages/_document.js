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
          content="Extraterrestrial NFTs on the Celo blockchain"
        />
        <meta
          property="og:image"
          content={config.HOST_URL + "/images/preview.jpeg"}
        />
        <meta property="twitter:title" content="Celostrials | nfETs on Celo" />
        <meta
          property="twitter:description"
          content="Extraterrestrial NFTs on Celo"
        />
        <meta
          property="twitter:image"
          content={config.HOST_URL + "/images/preview.jpeg"}
        />
        <meta property="twitter:card" content="Extraterrestrial NFTs on Celo" />

        <link
          rel="apple-touch-icon"
          href={config.HOST_URL + "/images/preview.jpeg"}
        />

        <link rel="manifest" href={config.HOST_URL + "/images/preview.jpeg"} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
