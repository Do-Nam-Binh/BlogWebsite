import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

type CreatePostFormProps = {
  onChange: (content: string) => void;
};

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onChange }) => {
  const [content, setContent] = useState("");
  const quillRef = useRef<ReactQuill>(null);

  const handleChange = (value: string) => {
    const sanitizedValue = DOMPurify.sanitize(value); // Prevent XSS
    setContent(sanitizedValue);
    onChange(sanitizedValue);
    adjustHeight(); // Adjust height when content changes
  };

  const adjustHeight = () => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const editorContainer = editor.root;
      editorContainer.style.height = "auto"; // Reset height to auto
      editorContainer.style.height = `${editorContainer.scrollHeight}px`; // Set height based on scrollHeight
    }
  };

  useEffect(() => {
    adjustHeight(); // Adjust height on initial render
  }, []);

  return (
    <ReactQuill
      ref={quillRef} // Attach ref to access Quill instance
      className="h-600px overflow-hidden flex-1 rounded-sm" // Use Tailwind for base styling
      theme="snow"
      value={content}
      onChange={handleChange}
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ align: [] }], // Add text alignment options (left, center, right, justify)
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block"],
          [{ font: [] }], // Add font selection
          [{ size: ["small", false, "large", "huge"] }], // Add size options
          [{ color: [] }, { background: [] }], // Add text color and background color
          ["link", "image"],
          ["clean"],
        ],
      }}
    />
  );
};

export default CreatePostForm;
