"use client";
import {
  BoldIcon,
  CheckIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheck2Icon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Level } from "@tiptap/extension-heading";
import { type ColorResult, SketchPicker } from "react-color";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [value, setValue] = useState("");

  const onChangeLink = (url: string) => {
    let href = url.trim();
    if (
      href &&
      !/^https?:\/\//i.test(href) &&
      !href.startsWith("/") && // allow internal links
      !href.startsWith("#") && // allow anchor links
      !href.startsWith("blob:") // allow blob URLs
    ) {
      href = "https://" + href;
    }
    editor?.commands.setImage({ src: href });
    setValue("");
  };
  const onUploadImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const value = URL.createObjectURL(file);
        onChangeLink(value);
      }
    };
    input.click();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="px-1.5 overflow-hidden text-sm h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80">
            <ImageIcon className="ml-2 size-4 shrink-0" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onUploadImage}>
            <UploadIcon className="mr-2 size-4" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            <SearchIcon className="mr-2 size-4" />
            Paste image url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Paste Image URL</DialogTitle>
            <Input
              placeholder="Enter image URL"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-2"
            />
            <DialogFooter>
              <Button
                onClick={() => {
                  onChangeLink(value);
                  setIsDialogOpen(false);
                }}
              >
                Add Image
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  const onChangeLink = (url: string) => {
    let href = url.trim();
    if (
      href &&
      !/^https?:\/\//i.test(href) &&
      !href.startsWith("/") && // allow internal links
      !href.startsWith("#") // allow anchor links
    ) {
      href = "https://" + href;
    }
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="px-1.5 overflow-hidden text-sm h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80">
          <Link2Icon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex flex-col items-center gap-x-2">
        <div className="flex items-center gap-x-2 w-full">
          <Input
            placeholder="Enter link"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <DropdownMenuItem>
            <Button onClick={() => onChangeLink(value)}>Add</Button>
          </DropdownMenuItem>
        </div>
        <DropdownMenuItem className="w-full">
          <Button
            variant="secondary"
            onClick={() => {
              editor?.chain().focus().unsetLink().run();
              setValue("");
            }}
            className="w-full"
          >
            Remove Link
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const TextColorButton = () => {
  const { editor } = useEditorStore();
  const currentColor = editor?.getAttributes("textStyle").color || "#000000";
  const onChangeColor = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="px-1.5 overflow-hidden text-sm h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80">
          <span className="text-xs">A</span>
          <div
            className="h-0.5 w-full"
            style={{ backgroundColor: currentColor }}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        <SketchPicker color={currentColor} onChangeComplete={onChangeColor} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightButton = () => {
  const { editor } = useEditorStore();
  const currentHighlight =
    editor?.getAttributes("highlight").color || "#FFFF00";
  const onChangeHighlight = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="px-1.5 overflow-hidden text-sm h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80">
          <HighlighterIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        <SketchPicker
          color={currentHighlight}
          onChangeComplete={onChangeHighlight}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingButton = () => {
  const { editor } = useEditorStore();
  const headings = [
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
    { label: "Paragraph", value: 0, fontSize: "16px" },
  ];
  const currentHeading = editor?.getAttributes("heading").level || 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="px-1.5 overflow-hidden text-sm h-7 w-[120px] flex items-center justify-between rounded-sm hover:bg-neutral-200/80">
          <span className="truncate">
            {headings[currentHeading - 1]
              ? headings[currentHeading - 1].label
              : headings[5].label}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-3">
        {headings.map(({ label, value, fontSize }) => (
          <DropdownMenuItem
            key={value}
            className={cn(
              "text-sm h-7 px-2 flex items-center justify-start rounded-sm cursor-pointer",
              currentHeading === value && "bg-neutral-200/80"
            )}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .setHeading({ level: value as Level })
                  .run();
              }
            }}
            style={{ fontSize }}
          >
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Verdana", value: "Verdana" },
  ];
  const currentFont =
    editor?.getAttributes("textStyle").fontFamily || fonts[0].value;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="px-1.5 overflow-hidden text-sm h-7 w-[120px] flex items-center justify-between rounded-sm hover:bg-neutral-200/80">
          <span className="truncate" style={{ fontFamily: currentFont }}>
            {currentFont}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <DropdownMenuItem
            key={value}
            className={cn(
              "text-sm h-7 px-2 flex items-center justify-start rounded-sm cursor-pointer",
              currentFont === value && "bg-neutral-200/80"
            )}
            onClick={() => {
              editor?.chain().focus().setFontFamily(value).run();
            }}
            style={{ fontFamily: value }}
          >
            {currentFont === value && (
              <CheckIcon className="mr-2 size-4 text-primary" />
            )}
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}
const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

export const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    isActive?: boolean;
    onClick: () => void;
  }[][] = [
    [
      {
        label: "undo",
        icon: Undo2Icon,
        onClick: () => {
          editor?.commands.undo();
        },
      },
      {
        label: "redo",
        icon: Redo2Icon,
        onClick: () => {
          editor?.commands.redo();
        },
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => {
          window.print();
        },
      },
      {
        label: "Spell Check",
        icon: SpellCheck2Icon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "true" ? "false" : "true"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => {
          editor?.chain().focus().toggleBold().run();
        },
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => {
          editor?.chain().focus().toggleItalic().run();
        },
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => {
          editor?.chain().focus().toggleUnderline().run();
        },
      },
    ],
    [
      {
        label: "comment",
        icon: MessageSquarePlusIcon,
        onClick: () => {
          // Placeholder for comment functionality
        },
      },
      {
        label: "list Todo",
        icon: ListTodoIcon,
        onClick: () => {
          editor?.chain().focus().toggleTaskList().run();
        },
      },
      {
        label: "remove formatting",
        icon: RemoveFormattingIcon,
        onClick: () => {
          editor?.chain().focus().unsetAllMarks().run();
        },
      },
    ],
  ];
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolbarButton
          key={item.label}
          isActive={editor?.isActive(item.label.toLowerCase())}
          {...item}
        />
      ))}
      <TextColorButton />
      <HighlightButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <ImageButton />
      <LinkButton />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
