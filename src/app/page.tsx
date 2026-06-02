import styles from './page.module.css';
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
      <div className={styles.hero}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload='auto'
          id='video_pagina_inicial'
          className={styles.video}
        >
          <source src={home.video} type='video/mp4' />
        </video>
      </div>
      <div className={styles.text}>{home.text}</div>
    </>
  );
}
