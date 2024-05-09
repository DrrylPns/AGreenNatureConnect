import prisma from '@/lib/db/db'
import { BarChart, Card, Col, Grid, Tab, TabGroup, TabList, TabPanel, TabPanels, Title } from '@tremor/react'
import { fetchMostSoldProduct, fetchSalesByDate } from '../../../actions/sales'
import { getAuthSession } from '../../lib/auth'
import CntSales from '../admin/_components/CntSales'
import SearchEmployees from '../admin/_components/SearchEmployees'
import { CntEmployeesCard } from './_components/CntEmployeesCard'
import { CntUserCard } from './_components/CntTopicCard'
import PPSCard from './_components/PPSCard'
import { ProductWithOrderdProducts, ProductWithOrderedVariant } from '@/lib/types'
import CntProducts from '../admin/_components/CntProducts'
import { SalesByBar } from '../admin/_components/SalesByBar'
import { HotProducts } from '../admin/_components/HotProducts'
import { SalesReportTable } from './_components/SalesReportTable'

const page = async () => {

    const session = await getAuthSession()

    const loggedInUser = await prisma.user.findFirst({
        where: {
            id: session?.user.id
        },
        include: {
            Community: true
        }
    })

    const employees = await prisma.user.findMany({
        where: {
            role: 'EMPLOYEE',
            Community: {
                id: loggedInUser?.Community?.id
            }
        },
        include: {
            Community: true
        }
    })

    // const salesByDate = await fetchSalesByDate()

    // if (!salesByDate) return <>Error fetching Sales</>

    const products = await fetchMostSoldProduct() as ProductWithOrderdProducts[]

    if (!products) return <>Error fetching products</>

    return (
        <main className='flex flex-col gap-2 h-screen bg-[#E3E1E1]'>
            {/* <Sidebar name={community?.name} /> */}
            {/* TODO: TREMOR GRAPHS */}
            <Title>{loggedInUser?.Community?.name} Dashboard</Title>

            <TabGroup className="mt-6">
                <TabList>
                    <Tab>Overview</Tab>
                    {/* IF EVER LANG MAY MAILALAGAY IF WALA DELETE TAB */}
                    <Tab>Farmers</Tab>
                    <Tab>Reports</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Grid numItemsMd={4} numItemsLg={4} className="gap-6 mt-6">

                            <CntUserCard />

                            <CntEmployeesCard />

                            <CntSales />

                            <CntProducts />

                        </Grid>

                        <Grid className="gap-6 mt-6" numItems={1} numItemsLg={3}>
                            <Col numColSpanLg={2}>
                                <Card>
                                    <SalesByBar />
                                </Card>
                            </Col>

                            <PPSCard />
                        </Grid>

                        <Grid className='gap-6 mt-6' numItems={1} >
                            <Card>
                                <div className='h-full'>
                                    <Title>Top 10 sold products</Title>
                                    <HotProducts products={products} />
                                </div>
                            </Card>
                        </Grid>
                    </TabPanel>

                    {/* code of list of employees */}
                    <TabPanel>
                        <div className="mt-6">
                            <Card>

                                <Title>List of Farmers</Title>

                                <SearchEmployees employees={employees} />

                            </Card>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <SalesReportTable />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </main>
    )
}

export default page