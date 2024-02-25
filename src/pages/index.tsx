import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { kanaParams } from "@/utils/data";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <ul className="text-center pt-4">
        {kanaParams.map((param) => {
          return (
            <li key={param.params.headword} className="mb-4">
              <Link
                className="inline-block bg-gray-600 p-2 rounded-lg"
                href={`/library/content/${param.params.content}/headword/${param.params.headword}`}
              >
                To {param.params.headword} page
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
