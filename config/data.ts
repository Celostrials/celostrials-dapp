import {
  faDiscord,
  faGithub,
  faLinkedin,
  faMedium,
  faReddit,
  faTelegram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons"

const twitter = {
  title: "Twitter",
  href: "https://twitter.com/ReSource_Fi",
  isExternal: true,
  icon: faTwitter,
  ariaLabel: "Twitter page",
  brandColor: "#1DA1F2",
}
const telegram = {
  title: "Telegram",
  href: "https://t.me/theresourcenetwork",
  isExternal: true,
  icon: faTelegram,
  ariaLabel: "Telegram invite",
  brandColor: "#0088cc",
}
const discord = {
  title: "Discord",
  href: "https://discord.io/resource",
  isExternal: true,
  icon: faDiscord,
  ariaLabel: "Discord invite",
  brandColor: "#7289da",
}
const medium = {
  title: "Medium",
  href: "https://re-source.medium.com/",
  isExternal: true,
  icon: faMedium,
  ariaLabel: "Medium blog",
  brandColor: "#00ab6c",
}
const youtube = {
  title: "YouTube",
  href: "https://www.youtube.com/channel/UCphf6BYgfUDccb4OEmj_oqg",
  isExternal: true,
  icon: faYoutube,
  ariaLabel: "YouTube channel",
  brandColor: "#FF0000",
}
const linkedin = {
  title: "LinkedIn",
  href: "https://www.linkedin.com/company/resourcenetwork/",
  isExternal: true,
  icon: faLinkedin,
  ariaLabel: "LinkedIn profile",
  brandColor: "#0077b5",
}
const github = {
  title: "GitHub",
  href: "https://github.com/ReSource-Network/",
  isExternal: true,
  icon: faGithub,
  ariaLabel: "github profile",
  brandColor: "#6cc644",
}
const reddit = {
  title: "Reddit",
  href: "https://www.reddit.com/r/ReSourceFinance",
  isExternal: true,
  icon: faReddit,
  ariaLabel: "reddit page",
  brandColor: "#FF4500",
}

export const socials = [
  discord,
  telegram,
  twitter,
  medium,
  youtube,
  linkedin,
  github,
  reddit,
]
export const featured = [discord, medium, twitter]

// learn more
const learnTitle = {
  title: "Learn more",
  href: "https://resource.finance/",
  isExternal: false,
}
const media = {
  title: "Media",
  href: "/media",
  isExternal: false,
}
const blog = {
  title: "Blog",
  href: "https://blog.resource.finance",
  isExternal: true,
}
const whitepaper = {
  title: "Whitepaper",
  href: "https://resource-network.gitbook.io/resource-technical/",
  isExternal: true,
}
const about = {
  title: "About",
  href: "https://resource.finance/about",
  isExternal: false,
}
const faq = {
  title: "FAQ",
  href: "https://resource.finance/faq",
  isExternal: false,
}
export const learnMore = [learnTitle, about, media, faq, blog, whitepaper]

// join us
const joinTitle = {
  title: "Join us",
  href: "",
  isExternal: false,
}
const careers = {
  title: "Careers",
  href: "https://resource.finance/careers",
  isExternal: false,
}

export const joinUs = [joinTitle, careers]

// resources
const resourcesTitle = {
  title: "Resources",
  href: "",
  isExternal: false,
}
const brandAssets = {
  title: "Brand Assets",
  href: "https://resource.finance/brand",
  isExternal: false,
}
const contact = {
  title: "Contact",
  href: "mailto:hello@resourcenetwork.co",
  isExternal: true,
}
export const resources = [
  resourcesTitle,
  // faq,
  brandAssets,
  contact,
]

const tradeTitle = {
  title: "Trade",
  href: "",
  isExternal: false,
}
const sushi = {
  title: "Sushiswap",
  href: "https://app.sushi.com/swap",
  isExternal: true,
}
const matcha = {
  title: "Matcha",
  href: "https://matcha.xyz/markets/42220/0x74c0c58b99b68cf16a717279ac2d056a34ba2bfe",
  isExternal: true,
}
const uniswap = {
  title: "Uniswap",
  href: "https://uniswap.org",
  isExternal: true,
}
const pancakeswap = {
  title: "Pancakeswap",
  href: "https://pancakeswap.finance/swap",
  isExternal: true,
}
const ubeswap = {
  title: "Ubeswap",
  href: "https://app.ubeswap.org/#/farm/0x74c0C58B99b68cF16A717279AC2d056A34ba2bFe/0x918146359264C492BD6934071c6Bd31C854EDBc3/0xF4662e4E254006939c2198cb6F61635b03fd14Eb",
  isExternal: true,
}
const gateio = {
  title: "Gate.io",
  href: "https://www.gate.io/trade/source_usdt",
  isExternal: true,
}
export const trade = [
  tradeTitle,
  sushi,
  uniswap,
  pancakeswap,
  matcha,
  ubeswap,
  gateio,
]

// contracts
const contractsTitle = {
  title: "Contracts",
  href: "",
  isExternal: false,
}
const celo = {
  title: "CELO", // (0x74c0...2bFe)',
  href: "https://explorer.celo.org/token/0x74c0C58B99b68cF16A717279AC2d056A34ba2bFe/token-transfers",
  isExternal: true,
}
const bsc = {
  title: "BSC", //(0xea13...2a20)',
  href: "https://bscscan.com/token/0xea136fc555e695ba96d22e10b7e2151c4c6b2a20",
  isExternal: true,
}
const ethereum = {
  title: "ETH", // (0x7118...a79e)',
  href: "https://etherscan.io/token/0x7118057ff0f4fd0994fb9d2d94de8231d5cca79e",
  isExternal: true,
}

export const contracts = [contractsTitle, celo, bsc, ethereum]

export const navLinks = [about, media, faq, careers, blog, whitepaper]
