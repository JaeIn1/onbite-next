"use client";

import { DeleteReviewAction } from "@/actions/delete-review.action";
import { useActionState, useEffect, useRef } from "react";

export default function DeleteReviewButton({
  reviewId,
  bookId,
}: {
  reviewId: string;
  bookId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    DeleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} ref={formRef}>
      <input name="reviewId" value={reviewId} hidden readOnly />
      <input name="bookId" value={bookId} hidden readOnly />
      <div onClick={() => formRef.current?.requestSubmit()}>
        {isPending ? "..." : "삭제하기"}
      </div>
    </form>
  );
}
