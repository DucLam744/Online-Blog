import { Button, Dropdown, Menu } from "antd"

function MyDropdown(props) {
  const menu = (
    <Menu>
      {props.menu.map((item, index) => (
        <Menu.Item key={index}>{item}</Menu.Item>
      ))}
    </Menu>
  )

  return (
    <div>
      <Dropdown overlay={menu}>
        <Button>{props.children}</Button>
      </Dropdown>
    </div>
  )
}

export default MyDropdown
