import Image from 'next/image';
import styles from './styles.module.scss';

import logo from '../../../public/logo.svg';

export const Loader = () => {
  return (
    <div className={styles.loader} >
      <Image src={logo} alt="Anydoro logo" />
      <span>loading...</span>
    </div>
  )
}
