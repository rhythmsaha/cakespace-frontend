import Header from "./header";

interface Props {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <div className="overflow-y-auto overflow-x-hidden min-h-screen">
      <Header />
      <main className="mx-auto w-11/12">{children}</main>
    </div>
  );
};
export default DefaultLayout;
