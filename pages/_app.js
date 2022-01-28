import '../styles/style.css'
import '../styles/main.css'
import Head from 'next/head'
import Header from './common/header'
import { useRouter } from "next/router";
import "../node_modules/react-datepicker/dist/react-datepicker.css";


function MyApp({ Component, pageProps }) {

  const router = useRouter();

  if (router.pathname != "/") {
    return (
      <>
        <Head>
          <link rel='shortcut icon' href='/image/celect-logo.png' />
        </Head>
  
        <Header />
  
        <Component {...pageProps} />
      </>
    )
  }
  else {
    return (
      <>
        <Head>
          <link rel='shortcut icon' href='/image/celect-logo.png' />
        </Head>
  
  
        <Component {...pageProps} />
      </>
    )
  }



  
}

export default MyApp



