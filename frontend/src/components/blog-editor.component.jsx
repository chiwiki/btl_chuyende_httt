import React, { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext, UserAuth } from "../App";
import { TextEditor } from "../pages/editor.page";
import DarkLogo from "../imgs/logo-dark.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import AnimationWrapper from "./page-animation.component";
import Lightbanner from "../imgs/blog banner.png";
import { uploadImg } from "../common/uploadImg";
import { toast, Toaster } from "react-hot-toast";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools.component";
import axios from "axios";
import { tranlate } from "../utils/language";
import * as nsfwjs from "nsfwjs";
import "@tensorflow/tfjs";

const BlogEditor = () => {
  const { blog_id } = useParams();
  const navigate = useNavigate();
  let {
    blog: { title, banner, des, tags, content },
    setBlog,
    textEditor,
    setTextEditor,
    setEditorState,
    blog,
  } = useContext(TextEditor);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSensitive, setIsSensitive] = useState(false);
  const [isWarn, setIsWarn] = useState(false);
  const modelRef = useRef(null);
  const imgRef = useRef(null);

  let {
    userAuth: { access_token },
  } = useContext(UserAuth);
  const { language } = useContext(LanguageContext);

  const handleUploadBanner = async (e) => {
    const file = e.target.files[0];

    const img = new Image();
    img.src = URL.createObjectURL(file);

    let detectedSensitive = false;
    img.onload = async () => {
      if (modelRef.current) {
        const results = await modelRef.current.classify(img);
        const sensitiveClasses = ["Porn", "Hentai", "Sexy"];
        detectedSensitive = results.some(
          (pred) =>
            sensitiveClasses.includes(pred.className) && pred.probability > 0.5
        );
        setIsSensitive(detectedSensitive);
      }
    };

    setLoading(true);
    setBlog({
      ...blog,
      banner: Lightbanner,
      isSensitive: detectedSensitive,
    });
    const toastLoading = toast.loading("Loading...");
    try {
      const url = await uploadImg(file, setProgress);
      setBlog({ ...blog, banner: url, isSensitive: detectedSensitive });
      setLoading(false);
      setProgress(null);
      toast.dismiss(toastLoading);
      toast.success("Upload image to cloud successfully!");
      setIsWarn(detectedSensitive);
    } catch (error) {
      setLoading(false);
      setProgress(null);
      toast.dismiss(toastLoading);
      toast.error(error);
    }
  };
  const handleChangeTitle = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setBlog({ ...blog, title: input.value });
  };
  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handlePublish = () => {
    if (!banner.length) {
      return toast.error("You need to upload a banner");
    }
    if (!title.length) {
      return toast.error("You need to write the title");
    }

    if (blog.isSensitive) {
      const confirmResult = window.confirm(
        "Ảnh bìa hoặc nội dung được đánh dấu là nhạy cảm (NSFW).\nBạn có chắc chắn muốn tiếp tục đăng bài viết này không?"
      );
      if (confirmResult) {
        proceedSave();
      } else {
        toast("Bạn đã hủy đăng bài.");
      }
    } else {
      proceedSave();
    }
  };

  const proceedSave = () => {
    textEditor.save().then((data) => {
      if (data.blocks.length) {
        setBlog({ ...blog, content: data });
        setEditorState("publish");
      } else {
        return toast.error("Write something to publish");
      }
    });
  };

  const handleSaveDraft = (e) => {
    if (e.target.className.includes("disabled")) {
      return;
    }
    e.target.classList.add("disabled");
    if (!title.length) {
      return toast.error("You need to provide the title");
    }
    let toastLoading = toast.loading("Loading");
    console.log(textEditor.isReady);
    if (textEditor.isReady) {
      textEditor.save().then((data) => {
        let blogObj = {
          banner,
          title,
          des,
          tags,
          content: data,
          draft: true,
        };
        axios
          .post(import.meta.env.VITE_SERVER_BLOG, blogObj, {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          })
          .then((blog_id) => {
            toast.dismiss(toastLoading);
            e.target.classList.remove("disabled");
            toast.success("Upload a draft blog ");
            setTimeout(() => {
              navigate("/", { replace: true });
            }, 2000);
          })
          .catch((err) => toast.error(err.message));
      });
    }
  };

  useEffect(() => {
    console.log(blog_id);
    if (blog_id) {
      axios
        .get(import.meta.env.VITE_SERVER + `/blogs/${blog_id}`)
        .then(({ data }) => {
          setBlog(data);
          setIsSensitive(data.isSensitive);
          if (!textEditor.isReady) {
            setTextEditor(
              new EditorJS({
                holderId: "textEditor",
                data: data.content[0],
                tools: tools,
                placeholder: "Let's write story",
              })
            );
          }
        })
        .catch((error) => console.log(error));
    } else {
      if (!textEditor.isReady) {
        setTextEditor(
          new EditorJS({
            holderId: "textEditor",
            data: Array.isArray(content) ? content[0] : content,
            tools: tools,
            placeholder: "Let's write story",
          })
        );
      }
    }
  }, []);

  useEffect(() => {
    const loadModel = async () => {
      try {
        modelRef.current = await nsfwjs.load();
        console.log("OKK");
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi load model NSFW:", err);
      }
    };

    loadModel();
  }, []);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={DarkLogo} alt="" className="w-full" />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {title.length > 0
            ? title
            : `${tranlate.editor_page.new_title[language]}`}
        </p>
        <div className="ml-auto flex gap-2">
          <button className="btn-dark py-2" onClick={handlePublish}>
            {tranlate.editor_page.publish[language]}
          </button>
          <button className="btn-light py-2" onClick={handleSaveDraft}>
            {tranlate.editor_page.save_draft[language]}
          </button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video bg-white border-4 border-grey hover:opacity-80">
              <label htmlFor="uploadBanner">
                {!banner ? (
                  !loading ? (
                    <img src={Lightbanner} alt="" />
                  ) : (
                    ""
                  )
                ) : (
                  <div>
                    <img
                      ref={imgRef}
                      className="max-h-[400px] object-contain aspect-video"
                      src={banner}
                      alt="banner"
                      style={{
                        filter: isSensitive ? "blur(20px)" : "none",
                      }}
                    />
                    {isWarn && (
                      <div
                        style={{ color: "red", fontWeight: "bold" }}
                        className="w-full flex items-center justify-center"
                      >
                        <span>⚠ Ảnh chứa nội dung không phù hợp!</span>
                      </div>
                    )}
                  </div>
                )}
                {progress && (
                  <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 font-bold text-black text-2xl">
                    {`${progress} %`}
                  </p>
                )}
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".jpg, .png, .jpeg"
                  hidden
                  onChange={handleUploadBanner}
                />
              </label>
            </div>

            <textarea
              defaultValue={title}
              placeholder={tranlate.editor_page.title[language]}
              className="text-4xl w-full h-20 bg-white resize-none placehodler:opacity-40 mt-10 font-medium leading-tight"
              onChange={handleChangeTitle}
              onKeyDown={handleOnKeyDown}
            ></textarea>
            <hr className="w-full opacity-40 my-5" />
            <div id="textEditor" className="text-gelasio"></div>
          </div>
        </section>
        {/* <Toaster /> */}
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
