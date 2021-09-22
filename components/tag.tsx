type TagProps = {
  text: string;
};

export default function Tag({ text }: TagProps) {
  return <div className="border border-blue rounded-sm py-0.5 px-1 text-sm font-light font-mono text-blue">{text}</div>;
}
