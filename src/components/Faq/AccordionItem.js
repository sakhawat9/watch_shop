import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

const AccordionItem = ({ item, id, isOpen, onClick }) => (
  <div
    className={`border rounded-lg transition-colors ${
      isOpen ? "border-gold-400 bg-white" : "border-secondary-400 bg-white"
    }`}
  >
    <h3>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={id}
        className="flex items-center justify-between w-full gap-4 px-5 py-4 text-left"
        onClick={onClick}
      >
        <span
          className={`text-base md:text-lg font-medium ${
            isOpen ? "text-gold-600" : "text-primary-600"
          }`}
        >
          {item.question}
        </span>
        <span
          className={`flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full border transition-colors ${
            isOpen
              ? "border-gold-500 bg-gold-500 text-white"
              : "border-secondary-600 text-primary-600"
          }`}
        >
          {isOpen ? <BiMinus /> : <BiPlus />}
        </span>
      </button>
    </h3>
    {/* Grid-rows trick: animates 0fr -> 1fr, no JS height measurement needed. */}
    <div
      id={id}
      role="region"
      className="grid transition-[grid-template-rows] duration-300 ease-in-out"
      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
    >
      <div className="overflow-hidden">
        <p className="px-5 pb-4 text-gray-600">{item.answer}</p>
      </div>
    </div>
  </div>
);

export default AccordionItem;
