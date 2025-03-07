import React from "react";

import { Button } from "@bigbinary/neetoui";

import authApi from "../../apis/auth";
import { resetAuthTokens } from "../../apis/axios";
import { setToLocalStorage } from "../../utils/storage";

const Logout = () => {
  const handleSubmit = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Button
      className=" bg-black text-white hover:bg-gray-800"
      label="Logout"
      onClick={handleSubmit}
    />
  );
};

export default Logout;
