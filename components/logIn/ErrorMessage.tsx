import React from "react";
import S from "@/style/login/login.module.css";

const ErrorMessage = ({ errorMessage }: { errorMessage: string[] }) => {
  return errorMessage.map((item) => {
    const key = crypto.randomUUID();

    return (
      <p key={key} className={S.error}>
        {item}
      </p>
    );
  });
};

export default ErrorMessage;
