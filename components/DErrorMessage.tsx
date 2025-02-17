interface DErrorMessageProps {
  message: string;
}

const DErrorMessage = ({ message }: DErrorMessageProps) => {
  return <p className="text-center text-2xl text-red-500">{message}</p>;
};

export default DErrorMessage;
