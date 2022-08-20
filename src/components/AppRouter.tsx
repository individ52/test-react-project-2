import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/useTypedSelector';
import CalendarPage from '../pages/CalendarPage';
import { privateRoutes, publicRoutes, RouteNames } from '../routes';
interface AppRouterProps {

}

const AppRouter: FC<AppRouterProps> = ({ }) => {
    const isAuth = useAppSelector(state => state.auth.isAuth);
    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route => <Route key={route.path} path={route.path} element={<route.element />} />)}
                <Route path='/*' element={<Navigate to={RouteNames.CALENDAR} replace />} />
            </Routes >
            :
            <Routes>
                {publicRoutes.map(route => <Route key={route.path} path={route.path} element={<route.element />} />)}
                <Route path='/*' element={<Navigate to={RouteNames.LOGIN} replace />} />
            </Routes >
    )
}
export default AppRouter;