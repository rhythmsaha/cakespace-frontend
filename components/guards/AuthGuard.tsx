import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../hooks";
import LoadingScreen from "../layouts/LoadingScreen";

interface Props {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace(`/login`);
    }
  }, [isAuthenticated, isInitialized, router]);

  if (!isInitialized || !isAuthenticated) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};
export default AuthGuard;
