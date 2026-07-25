import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

const Accordion = ({ groups }) => {
  const [openId, setOpenId] = useState(`${groups[0]?.category}-0`);

  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <section key={group.category} id={group.category}>
          <h2 className="mb-4 text-xl md:text-2xl">{group.category}</h2>
          <div className="space-y-3">
            {group.items.map((item, index) => {
              const id = `${group.category}-${index}`;
              return (
                <AccordionItem
                  key={id}
                  id={id}
                  item={item}
                  isOpen={openId === id}
                  onClick={() => setOpenId(openId === id ? null : id)}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Accordion;
