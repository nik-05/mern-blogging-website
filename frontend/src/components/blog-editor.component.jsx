import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs//blog banner.png";
import { uploadImage } from "../common/aws";
import { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const BlogEditor = () => {
  let blogBannerRef = useRef();

  const handleBannerUpload = (e) => {
    console.log(e);
    let image = e.target.files[0];
    if (image) {
      let loadingToast = toast.loading("Uploading...");
      uploadImage(image)
        .then((url) => {
          if (url) {
            toast.dismiss(loadingToast);
            toast.success("Uploaded 👍");
            blogBannerRef.current.src = url;
          }
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          return toast.error("err");
        });
    }
  };
  // Prevent the use of Enter key. the key code for the Enter is 13 and prevent default just prevents it.
  const handleTitleKeyDown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e) => {
    let input = e.target;

    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
  };

  return (
    <>
      <nav className="navbar">
        <Link to={"/"} className="flex-none w-10">
          <img src={logo} alt="logo" />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">New Blog</p>

        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">Publish</button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>
      <Toaster />
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner">
                <img
                  ref={blogBannerRef}
                  src={defaultBanner}
                  alt="banner image"
                  className="z-20"
                />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>
          </div>

          <textarea
            placeholder="Blog Title"
            className="text-4xl font-medium w-full h-20 outline-none resize-none  mt-10 leading-tight placeholder:opacity-40"
            onKeyDown={handleTitleKeyDown}
            onChange={handleTitleChange}
          ></textarea>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
