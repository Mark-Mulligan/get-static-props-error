import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { NextPage, GetStaticProps } from "next";
import { KanaParams } from "@/utils/data";

// Components
import NewAudioButton from "@/components/NewAudioButton";

interface IProps {
  libraryData: {
    headword: string;
    content: string;
    audio: string;
  };
}

const LibraryPage: NextPage<IProps> = ({ libraryData }) => {
  return (
    <>
      <Head>
        <title>{`Fluency Forge - Library - ${libraryData?.headword}`}</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <div className="text-center pt-4">
        <p className="text-2xl mb-4">{libraryData.headword}</p>
        <p className="text-2xl">{libraryData.content}</p>
        <NewAudioButton audioURL={libraryData.audio} />
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: KanaParams,
    fallback: false, // true, false or "blocking"
  };
};

interface IParams extends ParsedUrlQuery {
  content: string;
  headword: string;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = ctx.params as IParams;
  const audio = "audio/courses/plus-one/kana/hiragana/row/POKana_hira_a.mp3";
  const libraryData = { ...data, audio };

  return {
    props: {
      libraryData,
    },
  };
};

export default LibraryPage;
