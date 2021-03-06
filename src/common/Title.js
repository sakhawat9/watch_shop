const Title = ({ subtitle, title, description }) => {
  return (
    <div className="title">
      <h1 className="title__subtitle">{subtitle}</h1>
      <h2 className={description && "mb-4"}>{title}</h2>
      {description && <p>{description}</p>}
      <div className="section-title-style my-2 md:my-5 mx-auto"></div>
    </div>
  );
};
export default Title;

Title.defaultProps = {
  subtitle: "",
  title: "Master Cleanse Reliac Heirloom",
};
