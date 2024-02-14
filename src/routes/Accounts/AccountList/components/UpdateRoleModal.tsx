import { Account_Update_Role } from '@/api/account/Account_Update_Role'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { Account, Role } from '@/lib/types/Account'
import { queryClient } from '@/main'
import { useMutation } from '@tanstack/react-query'
import { Form, Input, Modal, Select } from 'antd'
import { ReactNode, useState } from 'react'

type FieldType = {
    role: Role
}

export type UpdateRoleModalProps = {
    children: ({ handleOpen }: { handleOpen: (account: Account) => void }) => ReactNode
}

export default function UpdateRoleModal({ children }: UpdateRoleModalProps) {
    // TODO call api to get account

    const [open, setOpen] = useState(false)
    const [account, setAccount] = useState<Account | null>(null)
    const [form] = Form.useForm<FieldType>()
    const { messageApi } = useMessage()

    const updateRoleMutation = useMutation({
        mutationFn: Account_Update_Role,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['accounts'],
            })
            messageApi.success('Account role updated successfully.')
            setOpen(false)
        },
        onError: error => {
            devLog('Error updating account', error)
            messageApi.error('Error while updating account. Please try again.')
        },
    })

    function handleOpen(account: Account) {
        setOpen(true)
        setAccount(account)
    }

    function handleClose() {
        setOpen(false)
        setAccount(null)
    }

    function handleOk() {
        form.submit()
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal open={open} onCancel={handleClose} title='Update Account Role' onOk={handleOk}>
                {!!account && (
                    <Form<FieldType>
                        name='update-account-in-modal'
                        labelCol={{
                            span: 3,
                        }}
                        form={form}
                        initialValues={{
                            role: account.role,
                        }}
                        style={{
                            marginTop: '10px',
                        }}
                        onFinish={values => {
                            updateRoleMutation.mutateAsync({
                                id: account.id,
                                payload: {
                                    role: values.role,
                                },
                            })
                        }}
                    >
                        <Form.Item label='Email'>
                            <Input value={account.email} disabled />
                        </Form.Item>
                        <Form.Item<FieldType>
                            name='role'
                            label='Role'
                            rules={[
                                {
                                    type: 'enum',
                                    enum: Object.values(Role),
                                },
                            ]}
                        >
                            <Select
                                options={Object.values(Role).map(role => ({
                                    label: (
                                        <span
                                            key={`select-option-${role}`}
                                            style={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {role}
                                        </span>
                                    ),
                                    value: role,
                                }))}
                            />
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </>
    )
}
