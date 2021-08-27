import React, { useContext, useState } from 'react';
import {Modal, Form, Input} from 'antd'
import { AppContext } from '../../Context/AppProvider';
import { useForm } from 'antd/lib/form/Form';
import { AuthContext } from '../../Context';
import { addDocument } from '../../firebase/services';

function AddRoom(props) {
      const {isAddRoomVisible, setIsAddRoomVisible} = useContext(AppContext);
      const [roomName, setRoomName] = useState([]);
      const {user:{uid}} = useContext(AuthContext)
      const [form]= useForm();
      const handleOnChange=(e)=>{
            setRoomName(e.target.value);
      }
      const handleOk=()=>{
            //console.log({formData: form.getFieldValue()});
            addDocument('rooms',{
                  ...form.getFieldValue(),
                  name:[roomName,''],
                  members:[uid],
                  name1:null,
                  addMembers: true,
                  adminRoomId:uid
            });
            form.resetFields();
            setRoomName('')
            setIsAddRoomVisible(false);
      }
      const handleCancel=()=>{
            form.resetFields();
            setIsAddRoomVisible(false)
      }
      return (
            <Modal
                  title='Tạo nhóm mới'
                  visible={isAddRoomVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
            >
                  <Form form={form}>
                        <Form.Item label='Tên nhóm'>
                              <Input onChange={handleOnChange} value={roomName} placeholder='Nhập tên nhóm...'/>
                        </Form.Item>
                        <Form.Item label='Mô tả nhóm' name='description'>
                              <Input placeholder='Nhập mô tả nhóm...'/>
                        </Form.Item>
                  </Form>
            </Modal>
      );
}

export default AddRoom;