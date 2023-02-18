import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import { useNavigate } from "react-router-dom";

const Editor = ({ onSave, data }) => {
  const navigate = useNavigate();
  const imageRef = useRef();
  const titleRef = useRef();
  const coverImageUrl = data?.image_url;

  const configuration = {
    holder: "editorjs",
    autofocus: true,
    tools: {
      header: {
        class: Header,
        inlineToolbar: true,
      },
      image: {
        class: ImageTool,
        config: {
          endpoints: {
            byFile: "localhost:8000/api/blog/posts/file_upload/",
          },

          uploader: {
            async uploadByFile(file) {
              console.log("UPLOADING");
              try {
                const formData = new FormData();
                formData.append("image", file);
                const response = await fetch(
                  process.env.REACT_APP_API_URL + `blog/posts/file_upload/`,
                  {
                    method: "POST",
                    body: formData,
                  }
                );
                const resData = await response.json();
                console.log("RESDATA: ", resData);
                return resData;
              } catch (err) {
                console.log("ERROR: ", err.message);
              }
            },
          },
        },
      },
    },
    ...(data && { data: JSON.parse(data.text) }),
  };

  const editor = useRef();

  useEffect(() => {
    if (!editor.current) {
      editor.current = new EditorJS(configuration);
    }
  }, []);

  const [file, setFile] = useState();
  const fileChangeHandler = (e) => {
    setFile(Array.from(e.target.files));
  };

  const saveHandler = async () => {
    const outputData = await editor.current.save();
    const text = JSON.stringify(outputData);
    onSave({
      image_url: file?.[0],
      title: titleRef.current.value,
      text,
    });
  };

  let coverImageLabel;
  if (!file?.[0].name && !coverImageUrl) {
    coverImageLabel = "Add cover image";
  } else if (file?.[0].name) {
    coverImageLabel = file?.[0].name;
  } else if (coverImageUrl) {
    coverImageLabel = "Change cover image";
  }

  return (
    <div className="editor">
      {/* <h1 className="editor__title">New Post</h1> */}
      <button
        className="editor__save-btn account-btn"
        onClick={saveHandler}
        type="button"
      >
        Save
      </button>
      <div className="editor__top">
        {coverImageUrl && (
          <img
            src={coverImageUrl}
            alt="Cover image"
            className="editor__cover-img-preview"
          />
        )}
        <input
          className="editor__img-input"
          type="file"
          id="cover_img"
          required
          ref={imageRef}
          onChange={fileChangeHandler}
        />
        <label className="editor__img-label" htmlFor="cover_img">
          {coverImageLabel}
        </label>
        <input
          className="editor__title-input"
          type="text"
          id="title"
          placeholder="Post title..."
          ref={titleRef}
          defaultValue={data ? data.title : ""}
          maxLength="150"
        />
      </div>
      <div id="editorjs" className="editor__editor" />
    </div>
  );
};

export default Editor;