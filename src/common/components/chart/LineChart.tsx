/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { MinusOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import ReactApexChart from 'react-apexcharts'

function LineChart() {
    const { Title, Paragraph } = Typography

    return (
        <>
            <div className='linechart'>
                <div>
                    <Title level={5}>Active Users</Title>
                    <Paragraph className='lastweek'>
                        than last week <span className='bnb2'>+30%</span>
                    </Paragraph>
                </div>
                <div className='sales'>
                    <ul>
                        <li>{<MinusOutlined />} Traffic</li>
                        <li>{<MinusOutlined />} Sales</li>
                    </ul>
                </div>
            </div>

            <ReactApexChart
                className='full-width'
                options={{
                    chart: {
                        width: '100%',
                        height: 350,
                        type: 'area',
                        toolbar: {
                            show: false,
                        },
                    },

                    legend: {
                        show: false,
                    },

                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: 'smooth',
                    },

                    yaxis: {
                        labels: {
                            style: {
                                fontSize: '14px',
                                fontWeight: 600,
                                colors: ['#8c8c8c'],
                            },
                        },
                    },

                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '14px',
                                fontWeight: 600,
                                colors: ['#8c8c8c', '#8c8c8c', '#8c8c8c', '#8c8c8c', '#8c8c8c', '#8c8c8c', '#8c8c8c', '#8c8c8c', '#8c8c8c'],
                            },
                        },
                        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                    },

                    tooltip: {
                        y: {
                            formatter: function (val: any) {
                                return val
                            },
                        },
                    },
                }}
                series={[
                    {
                        name: '123',
                        data: [120],
                    },
                    {
                        name: 'Mobile apps',
                        data: [350, 40, 300, 220, 500, 250, 400, 230, 500],
                    },
                    {
                        name: 'Websites',
                        data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
                    },
                ]}
                type='area'
                height={350}
                width={'100%'}
            />
        </>
    )
}

/*

*/

export default LineChart
