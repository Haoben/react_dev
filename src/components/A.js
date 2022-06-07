import { useState, createContext } from "react";
import B from "@/components/B";

export const MyContext = createContext();

const A = () => {
  const [A_value] = useState({
    name: "c",
    list: [
      { name: 1 },
      { name: 1 },
      { name: 2 },
      { name: 2 },
      { name: 3 },
      { name: 3 },
      { name: 4 },
    ],
  });
  let [A_value2, setValue] = useState(0);

  // 这里直接使用setValue会导致报错 需用函数包裹  这样还可以接收子组件的事件
  // 和vue在computed内操作数据一个道理
  function setValue_(val) {
    console.log(val);
    console.log(`这个事件来自组件：${val}`);
    setValue((A_value2 = val));
  }

  return (
    <MyContext.Provider
      value={{
        msg: "我是A组件内使用context传的值",
        callBack: (e = "回调无传参") => {
          console.log(e);
        },
      }}
    >
      <div>
        <p>这是A组件</p>
        <div>这是点击B组件后，B组件给父组件-A的一个随机uid：{A_value2}</div>
        <B
          msg={A_value}
          click={(son_val) => {
            setValue_(son_val);
          }}
        />
      </div>
    </MyContext.Provider>
  );
};
export default A;
