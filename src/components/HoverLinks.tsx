interface HoverLinksProps {
  text: string;
  className?: string;
}

export function HoverLinks({ text, className = "" }: HoverLinksProps) {
  return (
    <span className={`hover-link inline-flex ${className}`}>
      <span className="hover-in">
        <span>{text}</span>
        <div aria-hidden="true">{text}</div>
      </span>
    </span>
  );
}

export default HoverLinks;
