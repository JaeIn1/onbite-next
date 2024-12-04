import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import style from "./book-item-skeleton.module.css";

export default function BookItemSkeleton() {
  return (
    <div className={style.container}>
      <Skeleton width={80} height={105} />
      <div className={style.info_container}>
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={20} />
      </div>
    </div>
  );
}
