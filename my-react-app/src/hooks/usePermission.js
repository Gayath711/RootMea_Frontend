import React from "react";

import { useSelector } from "react-redux";

function usePermission() {
  const userInfo = useSelector((state) => state.userInfo);

  const IS_ENCOUNTER_ADMIN = userInfo.userType === "encounter_notes_admin";
  const IS_STAFF = userInfo.userType === "staff";
  const IS_CARE_PLAN_ADMIN = userInfo.userType === "care_plan_admin";
  const IS_PRIORITY_LIST_ADMIN = userInfo.userType === "priority_list_admin";

  return {
    isUserInfoLoading: userInfo.loading,
    isUserInfoError: userInfo.error,
    IS_CARE_PLAN_ADMIN,
    IS_ENCOUNTER_ADMIN,
    IS_PRIORITY_LIST_ADMIN,
    IS_STAFF,
  };
}

export default usePermission;
