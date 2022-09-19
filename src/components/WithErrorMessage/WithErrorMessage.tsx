import ErrorMessage from "@components/ErrorMessage";

export type WithErrorMessageProps = React.PropsWithChildren & {
  isError: boolean;
};

const WithErrorMessage: React.FC<WithErrorMessageProps> = ({
  isError,
  children,
}) => {
  return <>{isError ? <ErrorMessage /> : children}</>;
};

export default WithErrorMessage;
