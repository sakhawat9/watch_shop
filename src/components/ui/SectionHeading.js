/**
 * Standard section header: eyebrow, title, optional supporting line.
 *
 * Replaces the old <Title> component, which rendered its subtitle as an <h1>
 * and its title as an <h2> — putting several <h1>s on every page. Here the
 * eyebrow is a <p> and the heading level is caller-controlled via `as`.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "center",
  className = "",
  dark = false,
}) {
  const alignment =
    align === "left" ? "text-left items-start" : "text-center items-center mx-auto";

  return (
    <div className={`flex flex-col ${alignment} max-w-2xl mb-10 sm:mb-12 ${className}`}>
      {eyebrow && <p className="mb-3 eyebrow">{eyebrow}</p>}

      <Tag className={dark ? "text-white" : undefined}>{title}</Tag>

      {/* Understated brass rule — the brand's one decorative flourish. */}
      <span
        aria-hidden="true"
        className={`block w-12 h-px mt-5 ${dark ? "bg-gold-500" : "bg-gold-400"} ${
          align === "left" ? "" : "mx-auto"
        }`}
      />

      {description && (
        <p
          className={`mt-5 text-base ${dark ? "text-secondary-400" : "text-primary-500"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
