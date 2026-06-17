type ErrorPageProps = {
  title: string;
  description: string;
};

const ErrorPage = ({ title, description }: ErrorPageProps) => {
  return (
    <section className="top-sales">
      <h2 className="text-center">{title}</h2>
      <p>{description}</p>
    </section>
  );
};

export default ErrorPage;
