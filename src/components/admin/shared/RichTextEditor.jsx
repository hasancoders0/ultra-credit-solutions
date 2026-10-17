
"use client";

import { useEffect, useState } from "react";
import {
  useEditor,
  EditorContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code2,
  Heading1,
  Heading2,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Plus,
  Quote,
  Redo2,
  Strikethrough,
  Table as TableIcon,
  Underline as UnderlineIcon,
  Undo2,
  Unlink,
  X,
} from "lucide-react";

const buttonClass =
  "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-[#444444] transition hover:bg-[#EEF2F8] hover:text-[#2852A0] disabled:cursor-not-allowed disabled:opacity-35";

function ToolbarButton({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={`${buttonClass} ${
        active ? "bg-[#E8EEF9] text-[#2852A0]" : ""
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-5 w-px shrink-0 bg-[#EEEEEE]" />;
}

export default function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Write your content...",
  minHeight = 220,
  className = "",
  disabled = false,
}) {
  const [sourceMode, setSourceMode] = useState(false);
  const [source, setSource] = useState(value || "");
  const [linkDialog, setLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [imageDialog, setImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    editable: !disabled,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          rel: "noopener noreferrer",
          class: "text-[#2852A0] underline underline-offset-2",
        },
      }),
      Image.configure({
        allowBase64: false,
        HTMLAttributes: {
          class: "my-4 h-auto max-w-full rounded-lg",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({ placeholder }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "w-full border-collapse",
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || "",
    onUpdate({ editor: currentEditor }) {
      const html = currentEditor.getHTML();
      setSource(html);
      onChange?.(html);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none px-4 py-3 text-[#081828] focus:outline-none " +
          "[&_h1]:mb-3 [&_h1]:mt-5 [&_h1]:text-2xl [&_h1]:font-bold " +
          "[&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-xl [&_h2]:font-semibold " +
          "[&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-lg [&_h3]:font-semibold " +
          "[&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 " +
          "[&_ol]:list-decimal [&_ol]:pl-6 " +
          "[&_blockquote]:border-l-4 [&_blockquote]:border-[#D9E2F2] " +
          "[&_blockquote]:pl-4 [&_blockquote]:text-[#666666] " +
          "[&_table]:my-4 [&_td]:border [&_td]:border-[#DDDDDD] " +
          "[&_td]:p-2 [&_th]:border [&_th]:border-[#DDDDDD] [&_th]:p-2",
      },
    },
  });

  useEffect(() => {
    if (!editor || sourceMode) return;

    const current = editor.getHTML();
    const incoming = value || "";

    if (incoming !== current) {
      editor.commands.setContent(incoming, { emitUpdate: false });
      setSource(incoming);
    }
  }, [value, editor, sourceMode]);

  useEffect(() => {
    if (editor) editor.setEditable(!disabled);
  }, [editor, disabled]);

  if (!editor) {
    return (
      <div
        className={`animate-pulse rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] ${className}`}
        style={{ minHeight }}
      />
    );
  }

  function toggleSourceMode() {
    if (!sourceMode) {
      setSource(editor.getHTML());
      setSourceMode(true);
      return;
    }

    try {
      editor.commands.setContent(source || "", {
        emitUpdate: false,
      });
      onChange?.(source || "");
      setSourceMode(false);
    } catch {
      // Keep the source editor open if the HTML cannot be parsed.
    }
  }

  function applyLink() {
    const url = linkUrl.trim();

    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setLinkDialog(false);
      return;
    }

    try {
      const parsed = new URL(
        /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(url)
          ? url
          : `https://${url}`
      );

      if (!["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol)) {
        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: parsed.href })
        .run();

      setLinkDialog(false);
      setLinkUrl("");
    } catch {
      // Keep the dialog open for an invalid URL.
    }
  }

  function openLinkDialog() {
    const previous = editor.getAttributes("link").href || "";
    setLinkUrl(previous);
    setLinkDialog(true);
  }

  function insertImage() {
    const url = imageUrl.trim();

    try {
      const parsed = new URL(url);

      if (!["https:", "http:"].includes(parsed.protocol)) return;

      editor
        .chain()
        .focus()
        .setImage({
          src: parsed.href,
          alt: imageAlt.trim(),
        })
        .run();

      setImageDialog(false);
      setImageUrl("");
      setImageAlt("");
    } catch {
      // Keep the dialog open for an invalid URL.
    }
  }

  function insertTable() {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }

  return (
    <div className={`overflow-hidden rounded-lg border border-[#DDDDDD] bg-white focus-within:border-[#2852A0] ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-[#EEEEEE] bg-[#FCFCFC] p-2">
        <ToolbarButton
          label="Toggle HTML source"
          active={sourceMode}
          onClick={toggleSourceMode}
        >
          <Code2 size={17} />
        </ToolbarButton>

        <Divider />

        <select
          aria-label="Text style"
          disabled={disabled || sourceMode}
          value={
            editor.isActive("heading", { level: 1 })
              ? "h1"
              : editor.isActive("heading", { level: 2 })
                ? "h2"
                : editor.isActive("heading", { level: 3 })
                  ? "h3"
                  : "paragraph"
          }
          onChange={(event) => {
            const value = event.target.value;
            const chain = editor.chain().focus();

            if (value === "paragraph") chain.setParagraph().run();
            else chain.toggleHeading({ level: Number(value.slice(1)) }).run();
          }}
          className="h-8 max-w-[130px] rounded-md border-0 bg-transparent px-2 text-xs outline-none"
        >
          <option value="paragraph">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        <Divider />

        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          disabled={disabled || sourceMode}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={16} />
        </ToolbarButton>

        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          disabled={disabled || sourceMode}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} />
        </ToolbarButton>

        <ToolbarButton
          label="Underline"
          active={editor.isActive("underline")}
          disabled={disabled || sourceMode}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={16} />
        </ToolbarButton>

        <ToolbarButton
          label="Strikethrough"
          active={editor.isActive("strike")}
          disabled={disabled || sourceMode}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={16} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          label="Bullet list"
          active={editor.isActive("bulletList")}
          disabled={disabled || sourceMode}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={17} />
        </ToolbarButton>

        <ToolbarButton
          label="Numbered list"
          active={editor.isActive("orderedList")}
          disabled={disabled || sourceMode}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={17} />
        </ToolbarButton>

        <ToolbarButton
          label="Blockquote"
          active={editor.isActive("blockquote")}
          disabled={disabled || sourceMode}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote size={16} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          label="Align left"
          disabled={disabled || sourceMode}
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft size={16} />
        </ToolbarButton>

        <ToolbarButton
          label="Align center"
          disabled={disabled || sourceMode}
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter size={16} />
        </ToolbarButton>

        <ToolbarButton
          label="Align right"
          disabled={disabled || sourceMode}
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight size={16} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          label="Insert or edit link"
          active={editor.isActive("link")}
          disabled={disabled || sourceMode}
          onClick={openLinkDialog}
        >
          <Link2 size={16} />
        </ToolbarButton>

        <ToolbarButton
          label="Remove link"
          disabled={disabled || sourceMode || !editor.isActive("link")}
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          <Unlink size={16} />
        </ToolbarButton>

        <ToolbarButton
          label="Insert image by URL"
          disabled={disabled || sourceMode}
          onClick={() => setImageDialog(true)}
        >
          <ImagePlus size={16} />
        </ToolbarButton>

        <ToolbarButton
          label="Insert table"
          disabled={disabled || sourceMode}
          onClick={insertTable}
        >
          <TableIcon size={16} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          label="Undo"
          disabled={disabled || sourceMode || !editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 size={16} />
        </ToolbarButton>

        <ToolbarButton
          label="Redo"
          disabled={disabled || sourceMode || !editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 size={16} />
        </ToolbarButton>
      </div>

      {/* Editor or HTML source */}
      {sourceMode ? (
        <textarea
          value={source}
          onChange={(event) => setSource(event.target.value)}
          disabled={disabled}
          spellCheck={false}
          aria-label="HTML source"
          className="w-full resize-y bg-[#FCFCFC] p-4 font-mono text-sm leading-6 text-[#243047] outline-none"
          style={{ minHeight }}
        />
      ) : (
        <div style={{ minHeight }} className={disabled ? "opacity-70" : ""}>
          <EditorContent editor={editor} />
        </div>
      )}

      {/* Link dialog */}
      {linkDialog && (
        <div className="border-t border-[#EEEEEE] bg-[#FAFAFA] p-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              autoFocus
              type="text"
              value={linkUrl}
              onChange={(event) => setLinkUrl(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  applyLink();
                }
              }}
              placeholder="https://example.com"
              className="h-10 min-w-0 flex-1 rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm outline-none focus:border-[#2852A0]"
            />
            <button
              type="button"
              onClick={applyLink}
              className="h-10 rounded-lg bg-[#2852A0] px-4 text-sm text-white"
            >
              Apply Link
            </button>
            <button
              type="button"
              onClick={() => setLinkDialog(false)}
              className="h-10 rounded-lg border border-[#EEEEEE] px-3 text-sm"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Image URL dialog */}
      {imageDialog && (
        <div className="space-y-3 border-t border-[#EEEEEE] bg-[#FAFAFA] p-3">
          <input
            autoFocus
            type="url"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://example.com/image.jpg"
            className="h-10 w-full rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm outline-none focus:border-[#2852A0]"
          />
          <input
            type="text"
            value={imageAlt}
            onChange={(event) => setImageAlt(event.target.value)}
            placeholder="Image alt text"
            className="h-10 w-full rounded-lg border border-[#EEEEEE] bg-white px-3 text-sm outline-none focus:border-[#2852A0]"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setImageDialog(false)}
              className="h-9 rounded-lg border border-[#EEEEEE] px-3 text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={insertImage}
              className="h-9 rounded-lg bg-[#2852A0] px-4 text-sm text-white"
            >
              Insert Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
