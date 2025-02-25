import React, { useRef, useState, useMemo } from "react";
import JoditEditor from "jodit-react";

function TermsAndCondition() {
  const editor = useRef(null);
  const [content, setContent] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium totam voluptates blanditiis dicta facilis..."
  );

  const config = useMemo(
    () => ({
      theme: "default",
      showCharsCounter: false,
      showWordsCounter: false,
      toolbarAdaptive: true,
      toolbarSticky: false, // Disabled sticky toolbar for better performance
      enableDragAndDropFileToEditor: false,
      allowResizeX: false,
      allowResizeY: false,
      statusbar: false,
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "table",
        "link",
        "|",
        "left",
        "center",
        "right",
        "justify",
        "|",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "fullsize",
      ],
      useSearch: false,
      spellcheck: false,
      iframe: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      toolbarButtonSize: "small",
      readonly: false,
      observer: { timeout: 100 }, // Reduces observer updates
    }),
    []
  );

  const handleSave = () => {
    console.log("Saved Content:", content);
  };

  return (
    <>
      <div className="w-full p-10">
        <h1 className="text-[20px] font-medium">Terms And Condition</h1>
        <div className="w-5/5 bg-black">
          <JoditEditor
            className="my-5 bg-red-300"
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
            config={config}
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            className="bg-gtdandy text-[16px] text-white px-10 py-2.5 mt-5 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default React.memo(TermsAndCondition);
