import { useState } from "react";
import AccordionItem from "./AccordionItem";

export default function Accordion({ groups = [] }) {
  const [openId, setOpenId] = useState(`${groups[0]?.id}-0`);

  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`}>
          <h2 id={`${group.id}-heading`} className="mb-4 text-h3">
            {group.category}
          </h2>

          <div className="space-y-3">
            {group.items.map((item, index) => {
              const id = `${group.id}-${index}`;
              return (
                <AccordionItem
                  key={id}
                  id={id}
                  item={item}
                  isOpen={openId === id}
                  onToggle={() => setOpenId(openId === id ? null : id)}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
