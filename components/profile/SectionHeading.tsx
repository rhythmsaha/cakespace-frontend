interface Props {
  heading: string;
  paragraph: string;
}

const SectionHeading = ({ heading, paragraph }: Props) => {
  return (
    <div className="px-4 sm:px-0">
      <h3 className="text-lg font-medium leading-6 text-gray-900">{heading}</h3>
      <p className="mt-1 text-sm text-gray-600">{paragraph}</p>
    </div>
  );
};

export default SectionHeading;
