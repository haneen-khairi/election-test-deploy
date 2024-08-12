/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter } from "react-router-dom";
import { LoginPage, UserVerfication } from "@pages/auth";
import {
  CentersPage,
  DelegatesPage,
  AccountancySystemPage,
  HomePage,
  Layout,
  PreliminaryResultsPage,
  TasksPage,
  TransportationStatistics,
  VotersPage,
  FamilyTree,
} from "@pages/dashboard";
import { GlobeLayout } from "@pages/layout";
import IsAuth from "./IsAuth";
import { useRouteError } from "react-router-dom";
import MessagesPage from "@pages/dashboard/messages/MessagesPage";
import MessageServiceLayout from "@pages/layout/MessageServiceLayout";
import SentMessagesPage from "@pages/Home/SentMessagesPage";
import ProfilePage from "@pages/Home/ProfilePage";
import QRPage from "@pages/public/QRPage";
import SupportersPage from "@pages/public/SupportersPage";
import NamesWithOthersPage from "@pages/dashboard/namesWithOthers/CentersPage";

const ErrorPage = () => {
  const error: any = useRouteError();

  return (
    <div>
      <p>an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <GlobeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: (
          <IsAuth page="dashboard">
            <Layout />
          </IsAuth>
        ),
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/voters",
            element: <VotersPage />,
          },
          {
            path: "/centers",
            element: <CentersPage />,
          },
          {
            path: "/delegates",
            element: <DelegatesPage />,
          },
          {
            path: "/expenses",
            element: <AccountancySystemPage />,
          },
          {
            path: "/tasks",
            element: <TasksPage />,
          },
          {
            path: "/messages",
            element: <MessagesPage />,
          },
          {
            path: "/preliminary-results",
            element: <PreliminaryResultsPage />,
          },
          {
            path: "/transportation-statistics",
            element: <TransportationStatistics />,
          },
          {
            path: "/family-tree",
            element: <FamilyTree />,
          },
          {
            path: "/names-with-others",
            element: <NamesWithOthersPage />,
          },
        ],
      },
      {
        path: "/login",
        element: (
          <IsAuth page="login">
            <LoginPage />
          </IsAuth>
        ),
      },
      {
        path: "/qr/:code",
        element: (
          <IsAuth page="qr">
            <QRPage />
          </IsAuth>
        ),
      },
      {
        path: "/supporter/:id",
        element: (
          <IsAuth page="supporter">
            <SupportersPage />
          </IsAuth>
        ),
      },
      {
        path: "/user-verfication",
        element: (
          <IsAuth page="dashboard">
            <UserVerfication />
          </IsAuth>
        ),
      },
    ],
  },
  {
    element: <MessageServiceLayout />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/sentMessages",
        element: <SentMessagesPage />,
      },
    ],
  },
]);

export default router;
