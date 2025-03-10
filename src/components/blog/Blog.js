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
import MyInput from "../custom/myInput/MyInput"
import { Button } from "react-bootstrap"
import MyComment from "../custom/myComment/MyComment"

export default function Blog() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [like, setLike] = useState(false)
  const [comment, setComment] = useState("")
  const [listComment, setListComment] = useState([])
  const [reply, setReply] = useState(null)
  const { state } = useAuth()
  const { showError } = useError()
  const navigate = useNavigate()

  const getBlogDetail = async () => {
    await api
      .get(`/api/blog-post/${slug}`)
      .then((data) => data.data)
      .then((data) => {
        setBlog(data)
        setLike(data.isLike)
      })
  }

  const getBlogComment = async () => {
    await api
      .get(`/api/blog-comment/${slug}`)
      .then((data) => setListComment(data.data))
  }
  useEffect(() => {
    if (slug == undefined) {
      showError("Không tìm thấy bài viết")
      return
    }
    getBlogDetail()
    getBlogComment()
  }, [])

  const handleLike = async () => {
    if (state.isAuthenticated === false) {
      navigate("/login")
      return
    }
    if (blog.isLike === false) {
      await api.post(`/api/blogs-statistic/${blog.id}`)
    } else {
      await api.delete(`/api/blogs-statistic/${blog.id}`)
    }
    getBlogDetail()
  }

  const handleSendComment = async (parentId) => {
    if (comment) {
      await api.post(`/api/blog-comment`, {
        blogId: blog.id,
        parentId: parentId,
        content: comment,
      })
      setComment("")
      setReply(null)
      getBlogDetail()
      getBlogComment()
    }
  }

  const trigger = () => {
    getBlogDetail()
    getBlogComment()
  }

  return (
    <div className="pb-5 mb-5">
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

      <div className="w-50 h-50 ms-5 ps-5">
        <MyInput
          type="textarea"
          name="Comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button className="mt-3" onClick={() => handleSendComment()}>
          Send
        </Button>
      </div>
      <h4 className="fw-bold border-top mt-5 pt-5 ms-5 ps-5">
        {blog && blog.commentsCount} comments
      </h4>
      <div className="ms-5 mx-5 ps-5 mt-3">
        {listComment.map((cmt) => (
          <>
            <MyComment comment={cmt} trigger={trigger} />
          </>
        ))}
      </div>
    </div>
  )
}
