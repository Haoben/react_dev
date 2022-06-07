import { createRef, useContext } from "react";
import { MyContext } from "./A";

const C = () => {
  const ref = createRef();
  const context = useContext(MyContext);
  return (
    // <MyContext.Consuer>
    <div
      ref={ref}
      onClick={(e) => {
        context.callBack('c组件内随意穿的一个参数');
      }}
    >
      这是B组件内的C组件------
      {context.msg}
    </div>
    // </MyContext.Consuer>
  );
};
export default C;
