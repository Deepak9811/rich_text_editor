import '../styles/style.css'
import Head from 'next/head'
import Header from './common/header'


function MyApp({ Component, pageProps }) {
  return(

    <>
      <Head>
      <link rel='shortcut icon' href='/image/celect-logo.png'/>
      </Head>

      <Header />

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
