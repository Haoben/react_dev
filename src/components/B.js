import React from "react";
import C from "./C";

  const B = (props) => {
  // 如果没有传入任何参数  直接return 停止后续的渲染操作
  if (!Object.keys(props).length)
    return (
      <div style={{ border: "1px solid #666", margin: "30px 0" }}>
        <p>这是B组件</p>
        父组件没有向B传递任何数据
      </div>
    );

  const { list } = props.msg;
  // list开始去重
  const temp = {},
    result = [];
  list.forEach((item) => {
    // 因为obj内的key是不可重复的 所以把每一项放到temp内
    !temp[item.name] &&
      (temp[item.name] = "随便一个true值，只是为了temp的这一项为true") &&
      result.push(item);
  });
  // console.log(result);
  return (
    <div
      style={{ border: "1px solid #666", margin: "30px 0" }}
      onClick={() => {
        props.click(Math.random().toString(16).substring(2));
      }}
    >
      <p>这是B组件，点击改变父组件的数据</p>
      <div>父组件向B传递了一个对象</div>
      <ul>
        {result.map((item) => (
          <li key={item.name}>name:{item.name}</li>
        ))}
      </ul>
      <C />
    </div>
  );
};
export default B;
