import type { NextPage } from 'next'
import Image from 'next/image';
import styles from './index.module.scss';
import background from '../../assets/background.svg';
import logo from '../../assets/logo.svg';
import Head from 'next/head';
import { FiArrowRight } from 'react-icons/fi'

const Home: NextPage = () => {
  return (
    <div className={styles.container} >
      <Head>
        <title>Anydoro | Home</title>
      </Head>
      <aside className={styles.presentation}>
        <Image src={logo} alt="anydoro-logo" />
        <span>Aumente sua produtividade com trabalho em grupo</span>
      </aside>
      <main className={styles.createRoom} >
        <h1>Bem-vindo</h1>
        <button>criar nova sala</button>
        <span>Ou entre em uma sala já existente</span>
        <div>
          <input placeholder='Digitar código da sala...' />
          <button>
            <FiArrowRight size={30} />
          </button>
        </div>
      </main>
    </div>
  )
}

export default Home
