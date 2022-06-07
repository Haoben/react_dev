import "./index.scss";
import React from "react";
import { Input, Select, Button, message, Popconfirm, Modal } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
const { Option } = Select;

const TodoList = () => {
  // 现有的全部列表数据
  const [list, handleList] = React.useState([]);
  // 搜索出的全部数据
  const [searchList, handleSearchList] = React.useState([
    "请输入需要搜索的数据",
  ]);
  // 输入框内容
  const [inputContent, setInputContent] = React.useState("");
  const [modalContent, setModalContent] = React.useState("");
  const [modalContentSource, setModalContentSource] = React.useState("");
  // 现在的的模式 新增/编辑
  const [mode, setMode] = React.useState("create");
  const source = mode === "history" ? searchList : list;
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  // 新增或搜索列表
  const handleSearchAndCreaete = () => {
    if (!inputContent.trim()) return message.warning("输入框内容不能为空");
    const listSource = [...list];
    // 新增
    if (mode === "create") {
      if (listSource.includes(inputContent.trim())) {
        return message.warning("请勿重复添加");
      }
      listSource.push(inputContent);
      handleList(listSource);
      setInputContent("");
      return;
    }
    // 搜索
    const searchList_ = listSource.filter((item) =>
      item.includes(inputContent)
    );
    if (searchList_.length) return handleSearchList(searchList_);
    handleSearchList(["未查询到该关键词"]);
  };

  return (
    <div className="list_box">
      <div className="title">TodoList</div>
      <Input.Group compact>
        <Select
          defaultValue={mode}
          onChange={(e) => {
            setMode(e);
            setInputContent("");
            handleSearchList([]);
          }}
        >
          <Option value="create">新建列表</Option>
          <Option value="history">查询列表</Option>
        </Select>
        <Input
          value={inputContent}
          allowClear
          style={{ width: "50%" }}
          onChange={({ target }) => {
            setInputContent(target.value);
          }}
        />
        {/* button-click ⬇ */}
        <Button
          type="primary"
          shape="circle"
          onClick={() => {
            handleSearchAndCreaete();
          }}
          icon={mode === "history" ? <SearchOutlined /> : <PlusOutlined />}
        />
      </Input.Group>
      <div className="list_content">
        {!source.length
          ? mode === "history"
            ? "请输入关键词进行搜索"
            : "暂无数据"
          : (function () {
              // 判断循环哪个列表
              return source.map((item, index) => (
                <div className="item" key={item}>
                  {item}
                  <span className="icon">
                    <Popconfirm
                      placement="top"
                      title={"是否确认删除"}
                      onConfirm={() => {
                        const listSource = [...list];
                        const listSource_ = [...searchList];
                        const index = listSource.findIndex(
                          (_item) => _item === item
                        );
                        const index_ = listSource_.findIndex(
                          (_item) => _item === item
                        );
                        listSource.splice(index, 1);
                        listSource_.splice(index_, 1);
                        handleList(listSource);
                        handleSearchList(listSource_);
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{ marginRight: "10px", cursor: "pointer" }}
                      />
                    </Popconfirm>
                    <FormOutlined
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        console.log(mode);
                        setModalContent(item);
                        setModalContentSource(item);
                        setIsModalVisible(true);
                      }}
                    />
                  </span>
                </div>
              ));
            })()}
      </div>
      <Modal
        title="修改"
        visible={isModalVisible}
        okText="确认"
        cancelText="取消"
        onOk={() => {
          if (!modalContent.trim())
            return message.warning("输入框内容不能为空");
          // const listSource = mode === "create" ? [...list] : [...searchList];
          for (const i in list) {
            if (list[i] == modalContent) return message.warning("该内容已存在");
          }
          const listSource = [...list];
          const listSource_ = [...searchList];
          const index = listSource.findIndex(
            (item) => item === modalContentSource
          );
          const index_ = listSource_.findIndex(
            (item) => item === modalContentSource
          );
          listSource[index] = modalContent;
          console.log(listSource);
          listSource_[index_] = modalContent;
          handleList(listSource);
          handleSearchList(listSource_);
          setModalContent("");
          setIsModalVisible(false);
        }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      >
        <Input
          value={modalContent}
          allowClear
          style={{ width: "50%" }}
          onChange={({ target }) => {
            setModalContent(target.value);
          }}
        />
      </Modal>
    </div>
  );
};

export default TodoList;
