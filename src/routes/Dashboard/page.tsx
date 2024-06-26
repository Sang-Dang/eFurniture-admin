import Head from '@/common/components/Head'
import ActiveUsers from '@/routes/Dashboard/components/ActiveUsers'
import LatestBookings from '@/routes/Dashboard/components/LatestBookings'
import LineChart from '@/routes/Dashboard/components/LineChart'
import OrderHistory from '@/routes/Dashboard/components/OrderHistory'
import QuickStats from '@/routes/Dashboard/components/QuickStats'
import { Card, Col, Row } from 'antd'

export default function DashboardPage() {
    return (
        <>
            <Head title='Dashboard' />
            <QuickStats />
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={10} className='mb-24'>
                    <Card
                        bordered={false}
                        className='criclebox h-full'
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                    >
                        <ActiveUsers />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={14} className='mb-24'>
                    <Card
                        bordered={false}
                        className='criclebox h-full'
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <LineChart />
                    </Card>
                </Col>
            </Row>
            <Row
                gutter={[24, 0]}
                style={{
                    marginTop: '24px',
                }}
            >
                <Col xs={24} sm={24} md={12} lg={12} xl={16} className='mb-24'>
                    <Card
                        bordered={false}
                        style={{
                            display: 'flex',
                            gap: '10px',
                            height: '100%',
                        }}
                    >
                        <LatestBookings />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={8} className='mb-24'>
                    <Card
                        bordered={false}
                        className='criclebox h-full'
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                    >
                        <OrderHistory />
                    </Card>
                </Col>
            </Row>
        </>
    )
}
