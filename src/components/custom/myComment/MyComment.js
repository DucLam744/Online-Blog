import { Button, Image } from "react-bootstrap"
import { AVATAR_DEFAULT } from "../../../config/env"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical, faReply } from "@fortawesome/free-solid-svg-icons"
import "./myComment.scss"

export default function MyComment({ comment, isChild }) {
  return (
    <div className="ps-3 ms-3">
      <div
        className={
          isChild ? "d-flex mb-5 border-start border-primary" : "d-flex mb-5"
        }>
        <Image className="avatar mx-2" src={AVATAR_DEFAULT} roundedCircle />
        <div className="col-5 rounded p-3 bg-body-secondary">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <h6 className="fw-bold">{comment.accountResponse.email}</h6>
              <p className="fs-6 ms-5 text-black-50">
                {comment.createdAt.substring(0, 10) +
                  " " +
                  comment.createdAt.substring(11, 19)}
              </p>
            </div>
            <div className="dropdown">
              <Button className="bg-transparent border-0 text-black">
                <FontAwesomeIcon className="pt-1" icon={faEllipsisVertical} />
              </Button>
            </div>
          </div>
          <p className="ms-4">{comment.content}</p>
          <div>
            <Button className="bg-transparent border-0 text-primary">
              <FontAwesomeIcon icon={faReply} /> Reply
            </Button>
          </div>
        </div>
      </div>
      {comment.childrenComments.length !== 0 &&
        comment.childrenComments.map((child) => (
          <MyComment comment={child} isChild={true} />
        ))}
    </div>
  )
}
