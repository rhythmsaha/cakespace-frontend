import Footer from "./footer";
import Header from "./header";

interface Props {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="mx-auto w-11/12 lg:w-full overflow-x-hidden overflow-y-auto">{children}</main>
      <Footer />
    </div>
  );
};
export default DefaultLayout;
