import { Editor } from "@tinymce/tinymce-react";
import { useEffect } from "react";

function RichTextEditor({ editorRef, initialValue }: any) {
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(initialValue || ""); // Set the initial value in the editor
    }
  }, [editorRef, initialValue]);
  return (
    <div>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "table",
            "code",
            "help",
            "wordcount",
            "emoticons",
            "codesample",
            "quickbars",
            "autosave",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic underline strikethrough forecolor backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | " +
            "link image | " +
            "codesample emoticons | " +
            "fullscreen preview | " +
            "removeformat | help",
          quickbars_selection_toolbar:
            "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
          quickbars_insert_toolbar: "image media table hr",
          content_style: `
            body {
              font-family: Helvetica, Arial, sans-serif;
              font-size: 14px;
              background-color: #f0f0f0;
              color: #333;
              border: none;
            }
          `,
          ui_mode: "split",
          skin: "oxide-dark",
          theme: "silver",
          content_css: "dark",
          images_upload_handler: async (
            blobInfo: any,
            success: any,
            failure: any
          ) => {
            try {
              const formData = new FormData();
              formData.append("file", blobInfo.blob(), blobInfo.filename());

              const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
              });

              if (!response.ok) {
                throw new Error("Failed to upload image");
              }

              const data = await response.json();
              success(data.url); // Pass the uploaded image URL to TinyMCE
            } catch (error) {
              console.error("Image upload failed:", error);
              failure("Image upload failed");
            }
          },
        }}
      />
    </div>
  );
}

export default RichTextEditor;
