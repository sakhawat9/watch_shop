import { MdAdd, MdRemove } from "react-icons/md";

/**
 * Accessible quantity control. The value is announced via a live region so
 * screen-reader users hear the change after pressing the +/- buttons.
 */
export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label = "Quantity",
}) {
  return (
    <div className="flex items-center border rounded border-primary-200 w-fit">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="flex items-center justify-center w-10 h-11 transition-colors text-primary-700 hover:bg-secondary-100 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <MdRemove className="w-4 h-4" aria-hidden="true" />
      </button>

      <span
        className="w-12 font-medium text-center text-primary-900"
        role="status"
        aria-live="polite"
      >
        <span className="sr-only">{label}: </span>
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="flex items-center justify-center w-10 h-11 transition-colors text-primary-700 hover:bg-secondary-100 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <MdAdd className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
