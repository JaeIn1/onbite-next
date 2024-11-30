import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-layout/book-item";
import SearchableLayout from "@/components/searchable-layout/searchable-layout";
import fetchBooks from "@/lib/fetch-books";
import { InferGetStaticPropsType } from "next";
import fetchRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head";

export const getStaticProps = async () => {
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};
const onClickUpdateBook = async () => {
  try {
    const response = await fetch("/api/revalidate", { method: "POST" });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한 입 북스에 등록된 도서를 만나보세요"
        />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          <button onClick={onClickUpdateBook} className={style.updateBtn}>
            추천도서 업데이트
          </button>
          {recoBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
