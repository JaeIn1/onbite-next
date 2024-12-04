import { createReviewAction } from "@/actions/create-review.action";
import style from "./review-editor.module.css";

export function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      <form action={createReviewAction} className={style.form_container}>
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
          <input name="author" placeholder="작성자" />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
}
