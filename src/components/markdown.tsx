import { default as ReactMarkdown } from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="markdown"
    >
      {children}
    </ReactMarkdown>
  );
}
