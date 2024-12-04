"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset(): void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // 현재 페이지에서 필요한 서버 컴포넌트들을 다시 불러오는 역할
            reset(); // 에러를 초기화하고 , 다시 렌더링하는 역할
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
