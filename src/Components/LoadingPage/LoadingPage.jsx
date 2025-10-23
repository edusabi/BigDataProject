import style from "./LoadingPage.module.css";

const LoadingPage = () => {
  return (
    <div className={style.divLoadingPage}>
      <div className={style.loader}></div>
      <h1 className={style.text}>Carregando...</h1>
    </div>
  );
};

export default LoadingPage;
