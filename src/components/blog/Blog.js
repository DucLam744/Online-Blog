import "./blog.scss"
import MyBookmark from "../custom/myBookmark/MyBookmark"
import { useEffect, useState } from "react"
import api from "../../api/api"
import { AVATAR_DEFAULT } from "../../config/env"

function Blog() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const response = api
      .get("/api/blogs?page=1")
      .then((res) => res.data)
      .then((data) => setBlogs(data.data))
  }, [])

  return (
    <div className="blogs">
      {blogs.map((blog) => (
        <div className="blog">
          <div className="blog-detail">
            <div className="account">
              {blog.accountResponse.avatar ? (
                <img src={blog.accountResponse.avatar} />
              ) : (
                <img src={AVATAR_DEFAULT} />
              )}
              <h5>{blog.accountResponse.email}</h5>
            </div>
            <div className="actions">
              <MyBookmark status={blog.isBookmark} />
            </div>
          </div>
          <div className="blog-content">
            <h3>{blog.title}</h3>
            <p>Xem thêm...</p>
          </div>
          <div className="blog-footer">
            <p>{blog.createdAt}</p>
            <ul className="tags"></ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Blog
