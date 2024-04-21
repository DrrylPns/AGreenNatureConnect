// import { Card, Col, Grid, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Title } from '@tremor/react'
import prisma from '@/lib/db/db'
import { BarChart, Card, Col, Grid, Tab, TabGroup, TabList, TabPanel, TabPanels, Title } from '@tremor/react'
import { fetchSalesByDate } from '../../../actions/sales'
import { getAuthSession } from '../../lib/auth'
import { CntEmployeesCard } from '../employee/_components/CntEmployeesCard'
import { CntUserCard } from '../employee/_components/CntTopicCard'
import PPSCard from '../employee/_components/PPSCard'
import CntSales from './_components/CntSales'
import SearchEmployees from './_components/SearchEmployees'

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

  const salesByDate = await fetchSalesByDate()

  if (!salesByDate) return <>Error fetching Sales</>

  return (
    <main className='flex flex-col gap-2 h-screen bg-[#E3E1E1]'>
      <Title>{loggedInUser?.Community?.name} Dashboard</Title>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
          {/* IF EVER LANG MAY MAILALAGAY IF WALA DELETE TAB */}
          <Tab>Employees</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={3} numItemsLg={3} className="gap-6 mt-6">

              <CntUserCard />

              <CntEmployeesCard />

              <CntSales />

            </Grid>
            <Grid className="gap-6 mt-6" numItems={1} numItemsLg={3}>
              <Col numColSpanLg={2}>
                <Card>
                  <div className='h-full'>
                    <Title>Sales Report</Title>
                    <BarChart
                      className="h-72 mt-4"
                      data={salesByDate as any}
                      index="month"
                      categories={["Others", "Vegetables", "Fruits"]}
                      colors={["indigo", "gray", "lime"]}
                      yAxisWidth={30}
                    />
                  </div>
                </Card>
              </Col>

              <PPSCard />


            </Grid>
          </TabPanel>

          {/* code of list of employees */}
          <TabPanel>
            <div className="mt-6">
              <Card>

                <Title>List of Employees</Title>

                <SearchEmployees employees={employees} />

              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  )
}

export default page