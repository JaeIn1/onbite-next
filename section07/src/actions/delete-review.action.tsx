"use server";

import { revalidateTag } from "next/cache";

export async function DeleteReviewAction(_: any, formData: FormData) {
  const reviewId = formData.get("reviewId")?.toString();
  const bookId = formData.get("bookId")?.toString();

  if (!reviewId) {
    return {
      status: false,
      error: "삭제에 실해팼습니다.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}review/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag(`review-${bookId}`);
  } catch (err) {
    return {
      status: false,
      error: "리뷰 삭제에 실패했습니다.",
    };
  }
}
