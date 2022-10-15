import Footer from "./footer";

import Header from "./header";

interface Props {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen">
      <Header />
      <>{children}</>
      <Footer />
    </div>
  );
};
export default DefaultLayout;
