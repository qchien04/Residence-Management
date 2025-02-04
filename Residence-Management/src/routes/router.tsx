import { FC, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
// import LayoutDefault from '../Layout/AccountLayoutDefault';
// import AuthGuard from '../containers/auth/AuthGuard';
// import RoleBasedGuard from '../containers/auth/RoleBasedGuard';
// import { ROLE } from '../config';
import { Signup } from '../pages/auth';
import GuestGuard from '../containers/auth/GuestGuard';
import AuthGuard from '../containers/auth/AuthGuard';
import LayoutDefault from '../Layout/AccountLayoutDefault';
import LearnGrid from '../Components/LearnGrid';
import CreateRoom from '../pages/RoomManager/CreateRoom';
import ListMotelRoom from '../pages/RoomManager/ListRoom';
import CreateRoomRentalDetail from '../pages/RoomManager/CreateRoomRentalDetail';
import CreateMonthlyInvoice from '../pages/RoomManager/CreateMonthlyInvoice';
import ListRoomRentalDetail from '../pages/RoomManager/ListRoomRentalDetail';
import ListMonthlyInvoice from '../pages/RoomManager/ListMonthlyInvoice';
import Chat from '../pages/chat';
import ClientLayoutDefault from '../Layout/ClientLayoutDefault';
import Home from '../pages/home';
import SearchPage from '../pages/home/SearchPage';
import ListMotelRoomForTenant from '../pages/CustomerService/ListRoom';
import ListRoomRentalDetailForTenant from '../pages/CustomerService/ListRoomRentalDetail';
import ListMonthlyInvoiceForTenant from '../pages/CustomerService/ListMonthlyInvoice';
import RoomDetail from '../pages/MotelRoomDetail';
const Signin = lazy(() => import('../pages/auth/SigninPage'));


const Router: FC = () => {

  return useRoutes([
    {
      element:<ClientLayoutDefault />,
      children:[
        {
          index: true,
          path: '/',
          element:<Home />,
        },
        {
          path: '/search',
          element:<SearchPage />,
        },
        {
          path: '/motelRoom/:id',
          element:<RoomDetail />,
        }

      ]
    },
    {
      path:"auth",
      element:<GuestGuard></GuestGuard>,
      children: [
        {
          index: true,
          path: 'sign-in',
          element:<Signin />,
        },
        {
          path: 'sign-up',
          element:<Signup />,
        },
      ],
    },
    {
      element:<AuthGuard>
                <LayoutDefault></LayoutDefault>
              </AuthGuard>,
      children:[
        {
            path: 'account',
            children: [
              {
                index: true,
                path:'/account',
                element: <LearnGrid></LearnGrid>,
              },
              {
                path: 'chat',
                element: <Chat/>,
              },
              {
                path: 'rooms',
                children:[
                  {
                    index: true,
                    path: 'create',
                    element:<CreateRoom />,
                  },
                  {
                    index: true,
                    path: 'allRoom',
                    element:<ListMotelRoom/>,
                  },
                  {
                    index: true,
                    path: 'createRoomRentalDetail',
                    element:<CreateRoomRentalDetail />,
                  },
                  {
                    index: true,
                    path: 'allRoomRentalDetail',
                    element:<ListRoomRentalDetail />,
                  },
                  
                  {
                    index: true,
                    path: 'createMonthlyInvoice',
                    element:<CreateMonthlyInvoice/>,
                  },
                  {
                    index: true,
                    path: 'allMonthlyInvoice',
                    element:<ListMonthlyInvoice/>,
                  },
                ]
              },
              {
                path: 'customerService',
                children:[
                  {
                    index: true,
                    path: 'allRoom',
                    element:<ListMotelRoomForTenant/>,
                  },
                  {
                    index: true,
                    path: 'allRoomRentalDetail',
                    element:<ListRoomRentalDetailForTenant />,
                  },
                  {
                    index: true,
                    path: 'allMonthlyInvoice',
                    element:<ListMonthlyInvoiceForTenant/>,
                  },
                ]
              },
              // {
              //   path: 'my-store',
              //   children: [
              //     {
              //       path:"list-product",
              //       element: <RoleBasedGuard accessibleRoles={[ROLE.ADMIN]}><ListRoom/></RoleBasedGuard>,
              //       children:[
              //         {
              //           path:"create",
              //           element:<CreateRoom/>,
              //         }
              //       ] 
              //     },
              //     {
              //       path: 'list',
              //       element: <Navigate to="/account/my-store/category" replace />,
              //     },
              //     {
              //       path: ':id/edit',
              //       element: <Navigate to="/account/my-store/:id/edit" replace />,
              //     },
              //   ],
              // },
            ],
          
        }
      ]

    },

  ]);
};

export default Router;
