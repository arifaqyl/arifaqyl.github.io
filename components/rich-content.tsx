import { RichContentBlock } from "@/lib/types";

export function RichContent({ blocks }: { blocks: RichContentBlock[] }) {
  return (
    <div className="rich-content">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return <p key={index}>{block.text}</p>;
          case "list":
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return <blockquote key={index}>{block.text}</blockquote>;
          case "code":
            return (
              <div key={index} className="code-card">
                <p className="code-title">{block.title}</p>
                <pre>{block.snippet}</pre>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

