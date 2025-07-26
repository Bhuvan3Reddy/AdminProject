// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import Dashboard1 from 'src/views/dashboard/Dashboard1';
import AllPlayers from 'src/views/players/allplayers/playerslist';
import CreatePlayer from 'src/views/players/allplayers/playerdetails';
import Commissions from 'src/views/players/Commissions';
import KYCDocuments from 'src/views/players/KYCDocuments';
import { MasterConfigurationPage } from 'src/views/master-config/MasterConfigurationPage';
import { RoleManagementPage } from 'src/views/roles/RoleManagementPage';
import BankDetails from 'src/views/players/bank/bankdetails';
import BankList from 'src/views/players/bank/banklist';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const AgentList = Loadable(lazy(() => import('../views/Agents/agentlist')));
const AgentForm = Loadable(lazy(() => import('../views/Agents/agentform')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', exact: true, element: <Dashboard1 /> },
      { path: '/players/all', element: <AllPlayers /> },
      { path: '/players/create', element: <CreatePlayer /> },
      { path: '/players/create/:userId', element: <CreatePlayer /> },
      { path: '/players/commissions', element: <Commissions /> },
      { path: '/players/kycdocuments', element: <KYCDocuments /> },
      { path: '/players/bankdetails', element: <BankDetails /> },
      { path: '/players/bankdetails/:bankId', element: <BankDetails /> },
      { path: '/players/banklist', element: <BankList /> },
      { path: '/players/master-configuration-page', element: <MasterConfigurationPage /> },
      { path: '/roles', element: <RoleManagementPage /> },
      { path: '/agents/list', element: <AgentList /> },
      { path: '/agents/create', element: <AgentForm /> },
      { path: '/agents/edit/:id', element: <AgentForm /> },
      { path: '404', element: <Error /> },
      { path: '/auth/404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
