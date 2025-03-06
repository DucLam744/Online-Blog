import { useEffect, useState } from "react"
import api from "../../api/api"
import { useNavigate, useParams } from "react-router-dom"
import "./blog.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faComments,
  faEye,
  faHeart as solidheart,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"
import { useAuth } from "../../context/AuthContext"
import { useError } from "../../context/ErrorContext"

export default function Blog() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [like, setLike] = useState(false)
  const { state } = useAuth()
  const { error, showError } = useError()
  const navigate = useNavigate()
  useEffect(() => {
    if (slug == undefined) {
      showError("Không tìm thấy bài viết")
      return
    }
    api
      .get(`/api/blog-post/${slug}`)
      .then((data) => data.data)
      .then((data) => {
        setBlog(data)
        setLike(data.isLike)
      })
  }, [like])

  const handleLike = () => {
    if (state.isAuthenticated === false) {
      navigate("/login")
      return
    }
    if (blog.isLike === false) {
      api.post(`/api/blogs-statistic/${blog.id}`)
    } else {
      api.delete(`/api/blogs-statistic/${blog.id}`)
    }
    setLike(!like)
  }

  return (
    <>
      {blog && (
        <div className="blog">
          <h1 className="title">{blog.title}</h1>
          <ul className="statistic">
            <li className="account stat">
              <FontAwesomeIcon className="icon" icon={faUser} />
              <h5>{blog.accountResponse.email}</h5>
            </li>
            <li className="view stat">
              <FontAwesomeIcon className="icon" icon={faEye} />
              <h5>{blog.viewsCount}</h5>
            </li>
            <li className="comment stat">
              <FontAwesomeIcon className="icon" icon={faComments} />
              <h5>{blog.commentsCount}</h5>
            </li>
            <li className="like stat" onClick={handleLike}>
              <FontAwesomeIcon
                className="icon"
                icon={like === true ? solidheart : regularHeart}
                style={like === true ? { color: "red" } : ""}
              />
              <h5>{blog.likesCount}</h5>
            </li>
          </ul>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          <ul className="tags">
            <h5>Tags: </h5>
            {blog.tagResponses.map((tag) => (
              <li className="tag">{tag.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
