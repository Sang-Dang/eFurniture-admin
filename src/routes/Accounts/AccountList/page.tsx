import Head from '@/common/components/Head'
import RefreshButton from '@/common/components/RefreshButton'
import { AccountListBreadcrumb } from '@/routes/Accounts/AccountList/breadcrumb'
import AllAccountsList from '@/routes/Accounts/AccountList/components/AllAccountsList'
import CreateAccountModal from '@/routes/Accounts/AccountList/modals/CreateAccountModal'
import { DashboardBreadcrumb } from '@/routes/Dashboard/DashboardBreadcrumb'
import { Plus } from '@phosphor-icons/react'
import { Breadcrumb, Button, Flex, Tabs, Typography } from 'antd'
import './style.css'

export default function AccountListPage() {
    return (
        <>
            <Head title='Accounts' />
            <Breadcrumb
                style={{
                    marginBottom: '5px',
                }}
                items={[DashboardBreadcrumb(), AccountListBreadcrumb({ isCurrent: true })]}
            />
            <Flex vertical>
                <Typography.Title
                    level={2}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    Account List
                    <RefreshButton
                        queryKey={['accounts']}
                        isLoading={false}
                        style={{
                            marginLeft: '10px',
                        }}
                    />
                </Typography.Title>
                <Tabs
                    type='line'
                    items={[
                        {
                            key: '1',
                            label: 'Active',
                            children: <AllAccountsList />,
                        },
                    ]}
                    tabBarExtraContent={
                        <CreateAccountModal>
                            {({ handleOpen }) => (
                                <Button type='primary' icon={<Plus />} onClick={handleOpen}>
                                    Add Account
                                </Button>
                            )}
                        </CreateAccountModal>
                    }
                />
            </Flex>
        </>
    )
}
