import { Drawer} from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeEditModalAction } from "../../store/actions/modalEditAction";

export default function ModalProject() {
  const { visible, componentModalContent, title } = useSelector(
    (state) => state.modalEditProjectReducer
  );
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(closeEditModalAction());
  };

  return (
    <>
      <Drawer
        title={title}
        width={"50%"}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        {componentModalContent}
      </Drawer>
    </>
  );
}
