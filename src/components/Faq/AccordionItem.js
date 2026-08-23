import { BiMinus, BiPlus } from "react-icons/bi";

export default function AccordionItem({ item, id, isOpen, onToggle }) {
  return (
    <div
      className={`bg-white border rounded-card transition-colors ${
        isOpen ? "border-gold-400" : "border-secondary-300"
      }`}
    >
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          onClick={onToggle}
          className="flex items-center justify-between w-full gap-4 px-5 py-4 text-left"
        >
          <span
            className={`text-base font-medium font-sans ${
              isOpen ? "text-gold-700" : "text-primary-900"
            }`}
          >
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className={`flex items-center justify-center flex-shrink-0 border rounded-full w-8 h-8 transition-colors ${
              isOpen
                ? "border-gold-600 bg-gold-600 text-white"
                : "border-secondary-400 text-primary-600"
            }`}
          >
            {isOpen ? <BiMinus /> : <BiPlus />}
          </span>
        </button>
      </h3>

      {/* grid-rows 0fr -> 1fr animates open without measuring heights in JS. */}
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 leading-relaxed text-primary-600">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}
