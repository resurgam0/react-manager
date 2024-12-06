import api from '@/api'
import { Dept } from '@/types/api'
import { IAction } from '@/types/modal'
import { formatDate } from '@/utils'
import { Button, Form, Input, message, Modal, Space, Table } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useRef, useState } from 'react'
import CreateDept from './CreateDept'
export default function DeptList() {
  const [form] = useForm()
  const [data, setData] = useState<Dept.DeptItem[]>([])
  const deptRef = useRef<{ open: (type: IAction, data?: Dept.EditParams | { parentId: string }) => void }>()
  useEffect(() => {
    getDeptList()
  }, [])
  const getDeptList = async () => {
    const data = await api.getDeptList(form.getFieldsValue())
    setData(data)
  }
  const handleReset = () => {
    form.resetFields()
  }
  // 新增
  const handleCreate = () => {
    deptRef.current?.open('create')
  }
  // 编辑
  const handleEdit = (record: Dept.DeptItem) => {
    deptRef.current?.open('edit', record)
  }
  // 新增子集
  const handleSubCreate = (id: string) => {
    deptRef.current?.open('create', { parentId: id })
  }
  // 删除
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除吗',
      content: '确认删除该部门吗',
      onOk() {
        handleDelSubmit(id)
      }
    })
  }
  // 删除提交
  const handleDelSubmit = async (_id: string) => {
    await api.deleteDept({ _id })
		message.success('删除成功')
		getDeptList()
  }
  const columns: ColumnsType<Dept.DeptItem> = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName',
      width: 200
    },
    {
      title: '负责人',
      dataIndex: 'userName',
      key: 'userName',
      width: 150
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
			render(updateTime){
				return formatDate(updateTime)
			}
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
			render(createTime){
				return formatDate(createTime)
			}
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleSubCreate(record._id)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' onClick={() => handleDelete(record)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
  return (
    <div>
      <Form className='search-form' layout='inline' form={form}>
        <Form.Item label='部门名称' name='depName'>
          <Input placeholder='部门名称' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' className='mr10' onClick={getDeptList}>
            搜索
          </Button>
          <Button type='default' onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>部门列表</div>
          <div className='action'>
            <Button onClick={handleCreate}>新增</Button>
          </div>
        </div>
        <Table bordered rowKey='_id' columns={columns} dataSource={data} pagination={false} />
      </div>
      <CreateDept mRef={deptRef} update={getDeptList} />
    </div>
  )
}
