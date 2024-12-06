"use server";

import Delay from "@/util/delay";
import { revalidateTag } from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "리뷰와 작성자를 입력해주세요!",
    };
  }

  try {
    await Delay(1500);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );

    //revalidatePath(`/book/${bookId}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    revalidateTag(`review-${bookId}`);
    return {
      status: true,
      error: "",
    };
  } catch (err) {
    return {
      status: false,
      error: "리뷰 저장에 실패했습니다.",
    };
  }
}
