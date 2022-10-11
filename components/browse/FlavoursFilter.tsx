import { useState } from "react";
import { Flavour } from "../../types/categoriesTypes";

interface Props {
  flavours: Flavour[];
  selectedFlavours: string[];
  onSelect: (flavours: string[]) => void;
}
const FlavoursFilter = ({ flavours, onSelect, selectedFlavours }: Props) => {
  const [showMore, setShowMore] = useState(false);

  let _selectedFlavours = [...selectedFlavours];
  let _flavours = showMore ? flavours.slice(0) : flavours.slice(0, 8);

  const handleChange = (id: string, checked: Boolean): void => {
    if (checked) {
      _selectedFlavours.push(id);
      onSelect(_selectedFlavours);
    } else {
      let _selected = _selectedFlavours.filter((_flavour) => id !== _flavour);
      onSelect(_selected);
    }
  };

  const checkIfSelected = (id: string) => {
    const selected = selectedFlavours.find((_selected) => _selected === id);
    if (selected) return true;
    else return false;
  };

  return (
    <div>
      <h4 className="font-semibold text-gray-700">Flavours</h4>
      <div className="mt-1 space-y-1">
        {_flavours.map((flavour) => (
          <div key={flavour._id} className="flex items-center">
            <input
              value={flavour._id}
              type="checkbox"
              defaultChecked={checkIfSelected(flavour._id)}
              id={flavour._id}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              onChange={(e) => handleChange(e.target.value, e.target.checked)}
            />
            <label className="ml-2 block text-sm text-gray-900" htmlFor={flavour._id}>
              {flavour.name}
            </label>
          </div>
        ))}
        <button className="text-sm cursor-pointer mt-1 text-gray-900" onClick={() => setShowMore((more) => !more)}>
          {showMore ? "Show Less..." : "Show More..."}
        </button>
      </div>
    </div>
  );
};
export default FlavoursFilter;
