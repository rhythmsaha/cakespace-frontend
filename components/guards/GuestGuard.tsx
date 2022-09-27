import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../hooks";
import LoadingScreen from "../layouts/LoadingScreen";

interface Props {
  children: React.ReactNode;
}

function GuestGuard({ children }: Props) {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return <LoadingScreen />;

  return <>{children}</>;
}
export default GuestGuard;
