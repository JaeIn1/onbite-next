import style from "./book-item-skeleton.module.css";

export default function BookItem() {
  return (
    <div className={style.container}>
      <div className={style.cover_img} />
      <div className={style.info_container}>
        <div className={style.title} />
        <div className={style.subtitle} />
        <div className={style.author} />
      </div>
    </div>
  );
}
