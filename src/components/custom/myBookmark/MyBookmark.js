import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons"
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons"
import { useState } from "react"

export default function MyBookmark({ status }) {
  const [check, setCheck] = useState(Boolean(status))
  return (
    <>
      {check === true ? (
        <FontAwesomeIcon
          icon={solidBookmark}
          onClick={() => setCheck(!check)}
        />
      ) : (
        <FontAwesomeIcon
          icon={regularBookmark}
          onClick={() => setCheck(!check)}
        />
      )}
      {console.log(check)}
    </>
  )
}
