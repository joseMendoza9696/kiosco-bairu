import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface Props {
  user: any;
  children: ReactNode;
}

export const ProtectedRoute = ({ user, children }: Props) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
