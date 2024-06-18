import { designer } from "@/public/fonts/fonts";
import { useExitStore } from "@/store/exit-store";
import S from "@/style/commons/commons.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Loading = () => {
  const router = useRouter();
  const { setIsExit } = useExitStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExit(false);
      console.log("Loading 컴포넌트 작동", timer);
      router.replace("/main");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className={`${S.loadingWrapper} ${designer.className}`}>
      <div>IceCraft</div>
      <div>Loading...</div>
      <div>메인페이지로 이동중 입니다.</div>
    </section>
  );
};

export default Loading;
