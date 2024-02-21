import RefreshButton from '@/common/components/RefreshButton'
import { DashboardRoute } from '@/routes/Dashboard'
import { ProductCreateRoute } from '@/routes/Products/ProductCreate'
import { ProductListRoute } from '@/routes/Products/ProductList'
import { tabItems, tabKeys } from '@/routes/Products/ProductList/util/tabItems'
import { HomeFilled } from '@ant-design/icons'
import { Plus } from '@phosphor-icons/react'
import { useNavigate } from '@tanstack/react-router'
import { Breadcrumb, Button, Flex, Tabs, Typography } from 'antd'
import { useState } from 'react'

export default function ProductListPage() {
    const navigate = useNavigate()
    const tab = ProductListRoute.useSearch({
        select: data => data.tab,
    })
    const [currentTab, setCurrentTab] = useState(tab)

    return (
        <Flex vertical gap={0}>
            <Breadcrumb
                items={[
                    {
                        key: 'Home',
                        breadcrumbName: 'Home',
                        title: <HomeFilled />,
                        onClick: () => navigate({ to: DashboardRoute.to }),
                    },
                    {
                        key: 'bc-product_list',
                        breadcrumbName: 'Products',
                        title: 'Products',
                    },
                ]}
            />
            <Typography.Title
                level={2}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                Product List
                <RefreshButton isLoading={false} queryKey={currentTab === 'all' ? ['products'] : ['products-deleted']} />
            </Typography.Title>
            <Tabs
                defaultActiveKey={currentTab}
                activeKey={currentTab}
                items={tabItems}
                onTabClick={tab => {
                    setCurrentTab(tab as tabKeys)
                }}
                tabBarExtraContent={
                    <Button
                        type='primary'
                        icon={<Plus />}
                        onClick={() =>
                            navigate({
                                to: ProductCreateRoute.to,
                            })
                        }
                    >
                        Add Product
                    </Button>
                }
            />
        </Flex>
    )
}
