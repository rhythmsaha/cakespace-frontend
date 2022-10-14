import { useId } from "react";

interface Props {
  onSelect: (value: number) => void;
}

const priceList = [
  { text: "Under ₹200", value: 199 },
  { text: "Under ₹400", value: 399 },
  { text: "Under ₹500", value: 499 },
  { text: "Under ₹700", value: 699 },
  { text: "Above ₹700", value: 700 },
];

const PriceFilter = ({ onSelect }: Props) => {
  return (
    <div className="">
      <h4 className="font-semibold text-gray-700">Price</h4>
      <div className="mt-1 space-y-1">
        {priceList.map((list, index) => (
          <PriceOption key={index} onSelect={onSelect} priceFilter={list} />
        ))}
      </div>
    </div>
  );
};

interface PriceProps {
  priceFilter: { text: string; value: number };
  onSelect: (value: number) => void;
}

const PriceOption = ({ priceFilter, onSelect }: PriceProps) => {
  const id = useId();

  return (
    <div className="flex items-center gap-1">
      <input
        type="radio"
        className="text-indigo-600 focus:ring-indigo-600"
        name="price"
        id={id}
        value={priceFilter.value}
        onChange={(e) => onSelect(+e.target.value)}
      />
      <label className="ml-1 block text-sm text-gray-900" htmlFor={id}>
        {priceFilter.text}
      </label>
    </div>
  );
};

export default PriceFilter;
