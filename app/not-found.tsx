import S from "@/style/commons/commons.module.css";
import Image from "next/image";
import Link from "next/link";
import SorryImage from "@/assets/images/sorry_image.avif";

const NotFoundPage = () => {
  return (
    <section className={S.mainSection}>
      <Image src={SorryImage} alt="sorry image" />
      <h2>죄송합니다. 이 콘텐츠는 없거나 삭제되었습니다.</h2>
      <h3>다른 콘텐츠를 찾아보세요.</h3>
      <Link href="/main">홈으로 가기</Link>
    </section>
  );
};
export default NotFoundPage;
