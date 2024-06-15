/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter } from "react-router-dom";
import { LoginPage, UserVerfication } from "@pages/auth";
import {
  CentersPage,
  DelegatesPage,
  ExpensesPage,
  HomePage,
  Layout,
  PreliminaryResultsPage,
  TasksPage,
  TransportationStatistics,
  VotersPage,
  VotesPage,
} from "@pages/dashboard";
import { GlobeLayout } from "@pages/layout";
import IsAuth from "./IsAuth";
import { useRouteError } from "react-router-dom";
import MessagesPage from "@pages/dashboard/messages/MessagesPage";

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
            path: "/my-votes",
            element: <VotesPage />,
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
            element: <ExpensesPage />,
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
        path: "/user-verfication",
        element: (
          <IsAuth page="dashboard">
            <UserVerfication />
          </IsAuth>
        ),
      },
    ],
  },
]);

export default router;
