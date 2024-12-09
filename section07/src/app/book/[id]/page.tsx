import { notFound } from "next/navigation";
import style from "./page.module.css";
import { BookData, ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import { ReviewEditor } from "@/components/review-editor";
import Image from "next/image";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}book/${bookId}`
  );

  if (!response.ok) {
    if (response.status == 404) {
      return notFound();
    }
    return <div>오류가 발생했습니다.</div>;
  }
  const book = await response.json();

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image
          src={coverImgUrl}
          width={240}
          height={300}
          alt={`도서 ${title}의 표지`}
        />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}review/book/${bookId}`,
    { next: { tags: [`review-${bookId}`] } }
  );

  if (!response.ok) {
    throw new Error(`Request Failed ${response.statusText}`);
  }

  const review: ReviewData[] = await response.json();

  return (
    <section>
      {review.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}book/${id}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const book: BookData = await response.json();

  return {
    title: `${book.title} - 힌입북스`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} - 한입 북스`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className={style.container}>
      <BookDetail bookId={params.id} />
      <ReviewEditor bookId={params.id} />
      <ReviewList bookId={params.id} />
    </div>
  );
}
