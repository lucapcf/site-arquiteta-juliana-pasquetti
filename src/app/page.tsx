import styles from './page.module.css';
import '../styles/global.css';
import { handleJSONfile } from '@/utils/jsonHandler';
import React from 'react';

interface Home {
  video: string;
  text: string;
}

async function getData(): Promise<{ home: Home }> {
  const home = await handleJSONfile<Home>('./content/pages/home.json');
  return { home };
}

export default async function Home() {
  const { home } = await getData();

  return (
    <>
      <center>
        <div className={styles.hero}>
          <video
            autoPlay
            loop
            muted
            id='video_pagina_inicial'
            className={styles.video}
          >
            <source src={home.video} type='video/mp4' />
          </video>
        </div>
      </center>
      <div className={styles.text}>
        <h1>{home.text}</h1>
      </div>
    </>
  );
}
