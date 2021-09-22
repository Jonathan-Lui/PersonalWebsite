import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import Landing from '../components/landing';
import About from '../components/about';
import Skills from '../components/skills';
import Experience from '../components/experience';
import Tracker from '../components/tracker';
import { ExperienceDataParsed, getSortedExperienceData } from '../lib/experience';
import { getLanguagesData, getToolsData } from '../lib/skills';

type HomeProps = {
  experienceData: ExperienceDataParsed[];
  languagesList: string[];
  toolsList: string[];
};

export default function Home({ experienceData, languagesList, toolsList }: HomeProps) {
  const router = useRouter();
  const match = router.asPath.match(new RegExp('\\?ref=(.*)'));
  let ref;

  if (match != null) {
    ref = match[1];
  }

  useEffect(() => {
    if (ref != null) {
      router.replace('/', undefined, { shallow: true });
    }
  }, []);

  return (
    <div className="antialiased">
      <Head>
        <title>Jonathan Lui</title>
      </Head>
      <Tracker customReferrer={ref} />
      <Landing />
      <About />
      <Skills languages={languagesList} tools={toolsList} />
      <Experience experienceData={experienceData} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const experienceData = getSortedExperienceData();
  const languagesList = getLanguagesData();
  const toolsList = getToolsData();

  return {
    props: {
      experienceData,
      languagesList,
      toolsList,
    },
  };
};
