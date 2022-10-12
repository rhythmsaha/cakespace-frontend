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
        {priceList.map((list, index) => {
          const id = list.text + Math.round(Math.random() * 50);

          return (
            <div className="flex items-center gap-1" key={index}>
              <input
                type="radio"
                className="text-indigo-600 focus:ring-indigo-600"
                name="price"
                id={id}
                value={list.value}
                onChange={(e) => onSelect(+e.target.value)}
              />
              <label className="ml-1 block text-sm text-gray-900" htmlFor={id}>
                {list.text}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PriceFilter;
