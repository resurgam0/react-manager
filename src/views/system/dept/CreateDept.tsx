import api from '@/api'
import { Dept, User } from '@/types/api'
import { IAction, IModalProp } from '@/types/modal'
import { Modal, Form, Input, Select, TreeSelect, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useImperativeHandle, useState } from 'react'

export default function CreateDept(props: IModalProp) {
	const [form] = useForm()
  const [action, setAction] = useState<IAction>('create')
	const [visible, setVisbile] = useState(false)
	const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])
	const [userList, setUserList] = useState<User.UserItem[]>([])
	useEffect(()=>{
		// getDeptList()
		getAllUserList()
	},[])
	const getDeptList = async()=>{
		const data = await api.getDeptList()
		setDeptList(data)
	}
	const getAllUserList = async()=>{
		const data = await api.getAllUserList()
		setUserList(data)
	}
	// 部门提交
  const handleSubmit = async() => {
		const valid = await form.validateFields()
		if(valid){
			if(action==='create'){
				await api.createDept(form.getFieldsValue())
			}else{
				await api.eidtDept(form.getFieldsValue())
			}
			message.success('操作成功')
			handleCancel()
			props.update()
		}
	}
	// 关闭和重置表单
  const handleCancel = () => {
		setVisbile(false)
		form.resetFields()
	}
	useImperativeHandle(props.mRef,()=>({
		open
	}))
	// 打开弹窗函数
	const open = (type:IAction, data?: Dept.EditParams | {parentId: string})=>{
		setAction(type)
		setVisbile(true)
		getDeptList()
		if(data){
			form.setFieldsValue(data)
		}
	}
  return (
    <Modal
      title={action === 'create' ? '创建部门' : '编辑部门'}
      width={800}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign="right" labelCol={{span: 4}}>
				<Form.Item hidden name="_id">
					<Input/>
				</Form.Item>
        <Form.Item label='上级部门' name='parentId'>
          <TreeSelect
            placeholder='请选择上级部门'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'deptName', value: '_id' }}
						treeData={deptList}
          />
        </Form.Item>
				<Form.Item label='部门名称' name='deptName' rules={[{required: true, message: "请输入部门名称"}]}>
          <Input placeholder='请输入部门名称'/>
        </Form.Item>
				<Form.Item label='负责人' name='userName' rules={[{required: true, message: "请选择负责人"}]}>
          <Select>
						{
							userList.map(item=>{
								return <Select.Option value={item.userName} key={item._id}>
								{item.userName}
							</Select.Option>
							})
						}

					</Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
