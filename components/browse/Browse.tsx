import React, { useState } from "react";

import StickyBox from "react-sticky-box";

export default function App() {
  const [items, setItems] = useState(100);

  return (
    <div className="flex">
      <div>
        <StickyBox offsetTop={0} offsetBottom={0}>
          <div className="p-5  bg-red-200 h-screen border-4">
            <button className="p-5" onClick={() => setItems((prev) => prev + 20)}>
              add
            </button>

            <button className="p-5" onClick={() => setItems((prev) => (prev - 4 >= 0 ? prev - 20 : 0))}>
              remove
            </button>
          </div>
        </StickyBox>
      </div>

      <div className="w-full">
        {[...Array(items)].map((item) => (
          <div className="w-full h-[10vh] bg-gray-100" key={item}>
            page item
          </div>
        ))}
      </div>
    </div>
  );
}
