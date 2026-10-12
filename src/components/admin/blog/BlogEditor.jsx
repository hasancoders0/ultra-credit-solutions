"use client";

import { useRef } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
} from "lucide-react";

const tools = [
  {
    label: "Heading 2",
    icon: Heading2,
    command: "formatBlock",
    value: "h2",
  },
  {
    label: "Heading 3",
    icon: Heading3,
    command: "formatBlock",
    value: "h3",
  },
  {
    label: "Bold",
    icon: Bold,
    command: "bold",
  },
  {
    label: "Italic",
    icon: Italic,
    command: "italic",
  },
  {
    label: "Bullet List",
    icon: List,
    command: "insertUnorderedList",
  },
  {
    label: "Numbered List",
    icon: ListOrdered,
    command: "insertOrderedList",
  },
  {
    label: "Quote",
    icon: Quote,
    command: "formatBlock",
    value: "blockquote",
  },
];

export default function BlogEditor({
  value,
  onChange,
}) {
  const editorRef = useRef(null);

  function applyCommand(command, commandValue) {
    editorRef.current?.focus();

    document.execCommand(
      command,
      false,
      commandValue || null
    );

    onChange(editorRef.current?.innerHTML || "");
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-[#EEEEEE] bg-[#F9F9F9] p-2">
        {tools.map((tool) => {
          const Icon = tool.icon;

          return (
            <button
              key={tool.label}
              type="button"
              title={tool.label}
              aria-label={tool.label}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() =>
                applyCommand(tool.command, tool.value)
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#666666] transition hover:bg-white hover:text-[#2852A0]"
            >
              <Icon size={17} />
            </button>
          );
        })}
      </div>

      {/* Editable Content */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-label="Blog article content"
        aria-multiline="true"
        onInput={(event) =>
          onChange(event.currentTarget.innerHTML)
        }
        className="min-h-[350px] p-5 text-sm leading-7 text-[#666666] outline-none empty:before:pointer-events-none empty:before:text-[#AAAAAA] empty:before:content-['Start_writing_your_article_here...'] [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[#081828] [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#081828] [&_p]:mb-4 [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-[#2852A0] [&_blockquote]:pl-4 [&_blockquote]:italic [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6"
      />

      <div className="border-t border-[#EEEEEE] px-5 py-3">
        <p className="text-xs text-[#999999]">
          Use the toolbar to format your article.
        </p>
      </div>
    </div>
  );
}