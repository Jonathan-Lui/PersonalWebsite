export default function About() {
  return (
    <div className="flex flex-row items-center justify-center mt-20 mb-20">
      <div className="lg:grid lg:grid-cols-4 w-3/4 lg:w-2/3 max-w-screen-xl">
        <div className="text-2xl font-medium text-black mb-3 lg:mb-0">ABOUT</div>
        <div className="lg:col-span-3 text-xl font-light xl:pr-36">
          <p className="mb-9">
            Hey! I'm <span className="font-medium"> Jonathan </span> - 
          </p>
          <p>
            I like cars
          </p>
        </div>
      </div>
    </div>
  );
}
