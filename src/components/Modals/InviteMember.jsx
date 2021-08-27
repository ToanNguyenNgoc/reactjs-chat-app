import React, { useContext, useState } from 'react';
import {Modal, Form, Select, Spin, Avatar} from 'antd'
import { AppContext } from '../../Context/AppProvider';
import { useForm } from 'antd/lib/form/Form';
import {debounce} from 'lodash'
import { db } from '../../firebase/config';
import './InviteMember.css'

function DebounceSelect({
      fetchOptions,
      debounceTimeout = 300,
      curMembers,
      ...props
}) {
      // Search: abcddassdfasdf

      const [fetching, setFetching] = useState(false);
      const [options, setOptions] = useState([]);

      const debounceFetcher = React.useMemo(() => {
            const loadOptions = (value) => {
                  setOptions([]);
                  setFetching(true);

                  fetchOptions(value, curMembers ).then((newOptions) => {
                        setOptions(newOptions);
                        setFetching(false);
                  });
            };
            return debounce(loadOptions, debounceTimeout);
      }, [debounceTimeout, fetchOptions, curMembers ]);
      React.useEffect(() => {
            return () => {
                  // clear when unmount
                  setOptions([]);
            };
      }, []);
      return (
            <Select
                  labelInValue
                  filterOption={false}
                  onSearch={debounceFetcher}
                  notFoundContent={fetching ? <Spin size='small' /> : null}
                  {...props}
            >
                  {options.map((opt) => (
                        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                              <Avatar size='small' src={opt.photoURL}>
                                    {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                              </Avatar>
                              {` ${opt.label}`}
                        </Select.Option>
                  ))}
            </Select>
      );
}

async function fetchUserList(search, curMembers ){
      return db
            .collection('users')
            .where('keywords','array-contains', search)
            .orderBy('displayName')
            .limit(20)
            .get()
            .then(snapshot => {
                  return snapshot.docs.map(doc => ({
                        label: doc.data().displayName,
                        value: doc.data().uid,
                        photoURL: doc.data().photoURL
                  })).filter(opt => !curMembers.includes(opt.value))
            })
}

function InviteMember(props) {
      const {
            isInviteMemberVisible, 
            setIsInviteMemberVisible, 
            selectedRoomId,
            selectedRoom} = useContext(AppContext);
      const [form]= useForm();
      const [value, setValue] = useState([])
      const handleOk=()=>{
            //update members to room
            const roomRef = db.collection('rooms').doc(selectedRoomId);
            roomRef.update({
                  members:[...selectedRoom.members, ...value.map((val) => val.value)]
            })
            form.resetFields();
            setIsInviteMemberVisible(false);
      }
      const handleCancel=()=>{
            form.resetFields();
            setIsInviteMemberVisible(false)
      }
      return (
            <Modal
                  title='Thêm mới thành viên'
                  visible={isInviteMemberVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
            >
                  <Form form={form} layout='vertical'>
                        <DebounceSelect
                              mode='multiple'
                              name='search-user'
                              label='Members names'
                              value={value}
                              placeholder='Enter member...'
                              fetchOptions={fetchUserList}
                              onChange={(newValue) => setValue(newValue)}
                              style={{ width: '100%' }}
                              curMembers={selectedRoom.members}
                        />
                  </Form>
            </Modal>
      );
}

export default InviteMember;