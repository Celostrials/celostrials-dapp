import NextErrorComponent from "next/error"

const MyError = ({ statusCode, hasGetInitialPropsRun, err }) => {
  return <NextErrorComponent statusCode={statusCode} />
}

MyError.getInitialProps = async (context) => {
  const errorInitialProps = await NextErrorComponent.getInitialProps(context)

  const { res, err, asPath } = context

  errorInitialProps.hasGetInitialPropsRun = true

  if (res?.statusCode === 404) {
    return errorInitialProps
  }

  if (err) {
    return errorInitialProps
  }
  return errorInitialProps
}

export default MyError
