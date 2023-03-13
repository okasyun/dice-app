import { useAuthState } from "@/hooks/useAuthState";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import CommonLoading from "../common/CommonLoading";

/*———————————–
  これで囲んだコンテンツは非メンバーに見えない
———————————–*/
type Props = {
  children: ReactNode;
  adminOnly?: boolean;
  memberOnly?: boolean;
};

const Auth: FC<Props> = ({
  children,
  memberOnly = true,
  adminOnly = false,
}: Props) => {
  const { isLoading, isSignedIn, userInfo } = useAuthState();

  if (isLoading) return <CommonLoading />;

  const isAuthenticated =
    isSignedIn &&
    (!adminOnly || userInfo.isAdmin) &&
    (!memberOnly || userInfo.isMember);

  //認証だめやろがい！の場合
  if (!isAuthenticated) {
    const router = useRouter();
    router.replace("/login");
    return <CommonLoading />;
  }

  //何もなければ次へ（そのまま処理）
  return <>{children}</>;
};

export default Auth;
