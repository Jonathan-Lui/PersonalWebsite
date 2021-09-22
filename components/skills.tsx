export default function Skills({ languages, tools }: { languages: string[]; tools: string[] }) {
  return (
    <div className="flex flex-row items-center justify-center mt-36 mb-20">
      <div className="lg:grid lg:grid-cols-4 w-3/4 lg:w-2/3 max-w-screen-xl">
        <div className="text-2xl font-medium text-red mb-3 lg:mb-0">SKILLS</div>
        <div className="lg:col-span-3 grid grid-cols-2 text-lg font-light xl:pr-36">
          <div>
            <ul className="list-disc list-inside">
              {languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="list-disc list-inside">
              {tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
