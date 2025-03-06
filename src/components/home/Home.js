import MyBookmark from "../custom/myBookmark/MyBookmark"
import { useEffect, useState } from "react"
import api from "../../api/api"
import { AVATAR_DEFAULT } from "../../config/env"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import "./home.scss"
import { FormControl, InputGroup } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import InputGroupText from "react-bootstrap/esm/InputGroupText"

function Home() {
  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState({ currentPage: 0, totalPages: 0 })
  const [search, setSearch] = useState("")
  const { state } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const getBlog = () => {
      if (page.currentPage !== 0) {
        api
          .get("/api/blogs", {
            params: { page: page.currentPage, search: search },
          })
          .then((res) => res.data)
          .then((data) => {
            setPage({ currentPage: data.page, totalPages: data.totalPages })
            setBlogs(data.data)
          })
        console.log(blogs)
      } else {
        api
          .get("/api/blogs")
          .then((res) => res.data)
          .then((data) => {
            setPage({ currentPage: data.page, totalPages: data.totalPages })
            setBlogs(data.data)
          })
      }
    }
    const delaySearch = setTimeout(() => {
      getBlog()
    }, 500)

    return () => clearTimeout(delaySearch)
  }, [page.currentPage, search])

  const handleBookmark = (isBookmark, blogId) => {
    if (!state.isAuthenticated) {
      navigate("/login")
      return
    }
    if (isBookmark) {
      api.delete("/api/bookmarks", { data: { blogId } })
    } else {
      api.post("/api/bookmarks", { blogId })
    }
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === blogId ? { ...blog, isBookmark: !isBookmark } : blog
      )
    )
  }

  const handlePage = (i) => {
    setPage({ currentPage: i + 1, totalPages: page.totalPages })
    window.scrollTo({ top: 0, behavior: "auto" })
  }

  const handleOpenBlog = (slug, id) => {
    navigate(`/blog-post/${slug}`)
    api.post(`/api/view-blog/${id}`)
  }

  return (
    <div className="d-flex body">
      <div className="blogs">
        {blogs.map((blog) => (
          <div className="blog" key={blog.id}>
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
                <MyBookmark
                  status={blog.isBookmark}
                  onClick={() => handleBookmark(blog.isBookmark, blog.id)}
                />
              </div>
            </div>
            <div
              className="blog-content"
              onClick={() => {
                handleOpenBlog(blog.slug, blog.id)
              }}>
              <h5 className="fw-normal pt-3">{blog.title}</h5>
              <p>Xem thêm...</p>
            </div>
            <div className="blog-footer">
              <p>{blog.createdAt}</p>
              <ul className="tags"></ul>
            </div>
          </div>
        ))}
        <div>
          <nav aria-label="Page navigation example">
            <ul class="pagination d-flex justify-content-center">
              {Array.from({ length: page.totalPages }, (_, index) => (
                <li class="page-item" onClick={() => handlePage(index)}>
                  <a class="page-link">{index + 1}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div>
        <InputGroup className="search">
          <FormControl
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupText>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </InputGroupText>
        </InputGroup>
      </div>
    </div>
  )
}

export default Home
