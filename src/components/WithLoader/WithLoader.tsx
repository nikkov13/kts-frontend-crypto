import Loader from "@components/Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

const WithLoader: React.FC<WithLoaderProps> = ({ loading, children }) => {
  return <>{loading ? <Loader loading={loading} /> : children}</>;
};

export default WithLoader;
