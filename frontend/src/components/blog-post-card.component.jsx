import React from "react";
import { Link } from "react-router-dom";
import { getFullDay } from "../common/date";

const BlogPostCard = ({ content, author }) => {
  let {
    publishedAt,
    blog_id,
    title,
    des,
    tags,
    banner,
    isSensitive,
    activity: { total_likes },
  } = content;
  let {
    personal_info: { username, fullname, profile_img },
  } = author;

  return (
    <Link
      className="flex gap-8 justify-center items-center border-b border-grey mb-4 pb-5"
      to={`/blog/${blog_id}`}
    >
      <div className="w-full">
        <div className="flex gap-3 items-center mb-7">
          <img src={profile_img} alt="" className="w-8 h-8 rounded-full" />
          <div>
            <p className="line-clamp-1 text-black font-medium">{fullname}</p>
            <p className="line-clamp-1 hover:text-dark-grey">@{username}</p>
          </div>

          <p className="min-w-fit text-dark-grey">{getFullDay(publishedAt)}</p>
        </div>
        <h1 className="blog-title">{title}</h1>
        <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
          {des}
        </p>
        <div className="flex items-center gap-4 mt-7 ">
          <span className="btn-light py-1 px-4 capitalize">{tags[0]}</span>
          <span className="ml-3 flex items-center gap-2 text-dark-grey ">
            <i className="fi fi-rs-heart"></i>
            {total_likes}
          </span>
          {/* <span className=" flex items-center gap-2 text-dark-grey ">
            <i className="fi fi-rr-bookmark"></i>
          </span> */}
        </div>
      </div>
      <div className="h-28 aspect-square bg-grey border border-grey">
        <img
          src={banner}
          alt=""
          className="w-full h-full aspect-square object-cover"
          style={{
            filter: isSensitive ? "blur(8px)" : "none",
          }}
        />
      </div>
    </Link>
  );
};

export default BlogPostCard;
