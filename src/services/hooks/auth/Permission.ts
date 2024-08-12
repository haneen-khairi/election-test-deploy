/* eslint-disable react-hooks/exhaustive-deps */
import useAuthStore from "@store/AuthStore";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const usePermission = (
  page?:
    | "/"
    | "/voters"
    | "/centers"
    | "/expenses"
    | "/tasks"
    | "/delegates"
    | "/messages"
    | "/preliminary-results"
    | "/family-tree",
) => {
  const { data: userData } = useAuthStore();
  const navigate = useNavigate();

  const candidate = useMemo(
    () =>
      userData?.permissions?.filter(
        ({ codename }) => codename === "0005_candidate",
      )[0]?.has_perm || false,
    [userData?.permissions],
  );

  const mainDelegate = useMemo(
    () =>
      userData?.permissions?.filter(
        ({ codename }) => codename === "0002_main_delegate",
      )[0]?.has_perm || false,
    [userData?.permissions],
  );

  const familyTree = useMemo(
    () =>
      userData?.permissions?.filter(
        ({ codename }) => codename === "0008_show_family_tree",
      )[0]?.has_perm || false,
    [userData?.permissions],
  );

  const pdf: boolean = useMemo(
    () =>
      userData?.permissions?.filter(
        ({ codename }) => codename === "0006_download_voters_as_pdf",
      )[0]?.has_perm || false,
    [userData?.permissions],
  );

  const csv: boolean = useMemo(
    () => userData?.user?.group === "مرشح" || false,
    [userData?.user],
  );

  const nationality: boolean = useMemo(
    () =>
      userData?.permissions?.filter(
        ({ codename }) => codename === "0007_show_nationality_id",
      )[0]?.has_perm || false,
    [userData?.permissions],
  );

  const addDelegates: boolean = useMemo(
    () =>
      userData?.permissions?.filter(
        ({ codename }) => codename === "0010_can_add_delegates",
      )[0]?.has_perm || false,
    [userData?.permissions],
  );

  const addMainDelegates: boolean = useMemo(
    () =>
      userData?.permissions?.filter(
        ({ codename }) => codename === "0009_can_add_main_delegate",
      )[0]?.has_perm || false,
    [userData?.permissions],
  );

  useEffect(() => {
    if (page) {
      if (page === "/family-tree" && !familyTree) {
        navigate("/");
        return;
      }

      if (candidate) return;

      if (page === "/delegates" && !addDelegates) {
        navigate("/");
        return;
      }

      if (
        [
          "/expenses",
          "/tasks",
          "/delegates",
          "/messages",
          "/preliminary-results",
        ].includes(page) &&
        !mainDelegate
      ) {
        navigate("/");
        return;
      }
    }
  }, [familyTree, page]);

  return {
    allowList: {
      familyTree,
      candidate,
      mainDelegate,
      pdf,
      csv,
      nationality,
      addDelegates,
      addMainDelegates,
    },
  };
};
