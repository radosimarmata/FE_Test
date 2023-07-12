export default function Case({ children, ...props }: any) {
  return (
    <div className="grid grid-cols-12">
      <section className="col-span-10 col-start-2" {...props}>
        {children}
      </section>
    </div>
  );
}
