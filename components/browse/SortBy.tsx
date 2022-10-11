import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface SortObj {
  id: number;
  label: string;
  sortby: string;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  onSelect: (value: SortObj) => void;
  selected: SortObj;
  sortlist: SortObj[];
}
const SortBy = ({ onSelect, selected, sortlist }: Props) => {
  return (
    <Listbox value={selected} onChange={onSelect}>
      {({ open }) => (
        <div className="relative ">
          <Listbox.Button className="relative w-40 cursor-default rounded-md border shadow bg-white py-2 px-1 text-left focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm ">
            <span className="flex items-center">
              <span className="ml-3 block truncate">{selected.label}</span>
            </span>

            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 text-xs mt-1 max-h-56 w-40 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-nonetext-sm ">
              {sortlist.map((item) => (
                <Listbox.Option
                  key={item.id}
                  className={({ active }) =>
                    classNames(
                      active ? "text-white bg-indigo-600" : "text-gray-900",
                      "relative cursor-default select-none py-2 pl-3 pr-9"
                    )
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex items-center">
                        <span className={classNames(selected ? "font-semibold" : "font-normal", "ml-3 block truncate")}>
                          {item.label}
                        </span>
                      </div>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};
export default SortBy;
