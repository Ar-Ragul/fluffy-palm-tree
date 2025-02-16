import React from 'react';
import { vs } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Typography } from "@mui/material";

const codeResponse = (text: string) => {
    if (!text || typeof text !== "string") return null;

    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // ✅ Enables tables, lists, etc.
        rehypePlugins={[rehypeRaw]} // ✅ Enables raw HTML rendering
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter style={vs} language={match[1]} PreTag="div" {...props}>
                {String(children).trim()}
              </SyntaxHighlighter>
            ) : (
              <code className={className} style={{ backgroundColor: "#222", padding: "2px 4px", borderRadius: "4px" }}>
                {children}
              </code>
            );
          },
          h1: ({ children }) => <Typography variant="h4" sx={{ mt: 2 }}>{children}</Typography>,
          h2: ({ children }) => <Typography variant="h5" sx={{ mt: 2 }}>{children}</Typography>,
          h3: ({ children }) => <Typography variant="h6" sx={{ mt: 2 }}>{children}</Typography>,
          p: ({ children }) => <Typography sx={{ mb: 1 }}>{children}</Typography>,
          ul: ({ children }) => <ul style={{ paddingLeft: "20px" }}>{children}</ul>,
          ol: ({ children }) => <ol style={{ paddingLeft: "20px" }}>{children}</ol>,
          li: ({ children }) => <li style={{ marginBottom: "5px" }}>{children}</li>,
        }}
      >
        {text}
      </ReactMarkdown>
    );
};

export default codeResponse