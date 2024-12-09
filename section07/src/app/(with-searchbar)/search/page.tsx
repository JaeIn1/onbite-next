import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import Delay from "@/util/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  await Delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}book/search?q=${q}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const { q } = searchParams;
  return {
    title: `${q} : 힌입북스`,
    description: `${q}의 검색 결과입니다`,
    openGraph: {
      title: `${q} 한입 북스`,
      description: `${q} 한입 북스에 등록된 도서를 만나보세요`,
      images: [`/thumbnail.png`],
    },
  };
}

export default function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  return (
    <Suspense
      key={searchParams.q || ""}
      fallback={<BookListSkeleton count={3} />}
    >
      <SearchResult q={searchParams.q || ""} />
    </Suspense>
  );
}
