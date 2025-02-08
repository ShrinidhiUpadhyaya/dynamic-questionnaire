interface InvalidComponentProps {
  subType: string;
  supportedTypes: string;
}

const InvalidComponent = ({
  subType,
  supportedTypes,
}: InvalidComponentProps) => {
  return (
    <div className="p-4 bg-red-100 border border-red-500 text-red-700 rounded-lg">
      <p className="font-semibold">Error: Unsupported question type</p>
      <p>
        The provided question type{" "}
        <strong className="text-red-600">{subType}</strong> is not valid.
      </p>
      <p>
        Supported types: <strong>{supportedTypes}</strong>
      </p>
    </div>
  );
};

export default InvalidComponent;
