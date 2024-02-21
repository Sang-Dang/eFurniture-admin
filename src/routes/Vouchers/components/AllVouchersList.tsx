import { Voucher_Delete } from '@/api/voucher/Voucher_Delete'
import { queryVoucher_GetAll, queryVoucher_GetAllDisabled } from '@/api/voucher/Voucher_GetAll'
import DeleteModal from '@/common/components/modal/DeleteModal'
import { Voucher } from '@/lib/types/Voucher'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { queryClient } from '@/main'
import CreateOrUpdateVoucherModal from '@/routes/Vouchers/modals/CreateOrUpdateVoucherModal'
import { MoreOutlined } from '@ant-design/icons'
import { Pencil, Trash } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Button, Dropdown, Table } from 'antd'

type AllVouchersListProps = {
    disabled?: boolean
}

export default function AllVouchersList({ disabled = false }: AllVouchersListProps) {
    const { data: vouchers, isLoading, isError } = useQuery(disabled ? queryVoucher_GetAllDisabled() : queryVoucher_GetAll())
    const searchColumnProps = GetColumnSearchProps<Voucher>()

    if (isError) {
        return <div>A fatal error has occurred.</div>
    }

    return (
        <CreateOrUpdateVoucherModal>
            {({ handleOpen: handleOpenUpdate }) => (
                <DeleteModal
                    mutationFn={Voucher_Delete}
                    title='voucher'
                    afterSuccess={() => {
                        queryClient.invalidateQueries({
                            queryKey: ['vouchers'],
                        })
                        queryClient.invalidateQueries({
                            queryKey: ['vouchers-disabled'],
                        })
                    }}
                >
                    {({ handleOpen: handleOpenDelete }) => (
                        <Table
                            dataSource={vouchers ?? []}
                            columns={[
                                {
                                    title: 'Code',
                                    dataIndex: 'code',
                                    key: 'code',
                                    sorter: (a, b) => a.code.localeCompare(b.code),
                                    ...searchColumnProps('code'),
                                },
                                {
                                    title: 'Amount',
                                    dataIndex: 'amount',
                                    key: 'amount',
                                    sorter: (a, b) => a.amount - b.amount,
                                    ...searchColumnProps('amount'),
                                },
                                {
                                    title: 'Limit Total Min',
                                    dataIndex: 'limit_total_min',
                                    key: 'limit_total_min',
                                    sorter: (a, b) => a.limit_total_min - b.limit_total_min,
                                },
                                {
                                    title: 'Limit Total Max',
                                    dataIndex: 'limit_total_max',
                                    key: 'limit_total_max',
                                    sorter: (a, b) => a.limit_total_max - b.limit_total_max,
                                },
                                {
                                    title: 'Discount Percent',
                                    dataIndex: 'discount_percent',
                                    key: 'discount_percent',
                                    sorter: (a, b) => a.discount_percent - b.discount_percent,
                                },
                                {
                                    title: 'Expired Date',
                                    dataIndex: 'expired_date',
                                    key: 'expired_date',
                                    render: date => new Date(date).toLocaleDateString(),
                                    sorter: (a, b) => new Date(a.expired_date).getTime() - new Date(b.expired_date).getTime(),
                                },
                                {
                                    title: disabled ? 'Deleted At' : 'Created At',
                                    dataIndex: disabled ? 'deletedAt' : 'createdAt',
                                    key: disabled ? 'deletedAt' : 'createdAt',
                                    render: date => new Date(date).toLocaleDateString(),
                                    sorter: (a, b) =>
                                        disabled
                                            ? new Date(a.deletedAt!).getTime() - new Date(b.deletedAt!).getTime()
                                            : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
                                    defaultSortOrder: 'descend',
                                },
                                {
                                    title: 'Updated At',
                                    dataIndex: 'updatedAt',
                                    key: 'updatedAt',
                                    render: date => new Date(date).toLocaleDateString(),
                                    sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
                                },
                                {
                                    title: 'Action',
                                    dataIndex: 'action',
                                    key: 'action',
                                    render: (_, record) => (
                                        <Dropdown
                                            menu={{
                                                items: [
                                                    {
                                                        label: 'Update',
                                                        key: 'update-product-dropdown-button',
                                                        icon: <Pencil />,
                                                        onClick: () => handleOpenUpdate(record),
                                                    },
                                                    {
                                                        label: 'Delete',
                                                        key: 'delete-product-dropdown-button',
                                                        icon: <Trash />,
                                                        style: {
                                                            marginTop: '10px',
                                                        },
                                                        danger: true,
                                                        onClick: () => handleOpenDelete(record.id),
                                                        disabled: disabled,
                                                    },
                                                ],
                                            }}
                                        >
                                            <Button icon={<MoreOutlined />} />
                                        </Dropdown>
                                    ),
                                },
                            ]}
                            pagination={{
                                pageSize: 8,
                            }}
                            loading={isLoading}
                        />
                    )}
                </DeleteModal>
            )}
        </CreateOrUpdateVoucherModal>
    )
}
