import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { NextPage, GetStaticProps } from "next";
import { kanaParams } from "@/utils/data";

interface IProps {
  libraryData: {
    headword: string;
    content: string;
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
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: kanaParams,
    fallback: false, // true, false or "blocking"
  };
};

interface IParams extends ParsedUrlQuery {
  content: string;
  headword: string;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = ctx.params as IParams;

  return {
    props: {
      libraryData: data,
    },
  };
};

export default LibraryPage;
