// import { Card, Col, Grid, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Title } from '@tremor/react'
import prisma from '@/lib/db/db'
import { ProductWithOrderedVariant } from '@/lib/types'
import { BarChart, Card, Col, Grid, Tab, TabGroup, TabList, TabPanel, TabPanels, Title } from '@tremor/react'
import Image from 'next/image'
import { fetchMostSoldProduct, fetchSalesByDate } from '../../../actions/sales'
import { getAuthSession } from '../../lib/auth'
import { CntEmployeesCard } from '../employee/_components/CntEmployeesCard'
import { CntUserCard } from '../employee/_components/CntTopicCard'
import PPSCard from '../employee/_components/PPSCard'
import CntSales from './_components/CntSales'
import SearchEmployees from './_components/SearchEmployees'
import CntProducts from './_components/CntProducts'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/Ui/select"
import { SalesByBar } from './_components/SalesByBar'
import { HotProducts } from './_components/HotProducts'

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

  const products = await fetchMostSoldProduct() as ProductWithOrderedVariant[]

  if (!products) return <>Error fetching products</>

  return (
    <main className='flex flex-col gap-2 h-screen bg-[#E3E1E1]'>
      <Title>{loggedInUser?.Community?.name} Dashboard</Title>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
          {/* IF EVER LANG MAY MAILALAGAY IF WALA DELETE TAB */}
          <Tab>Farmers</Tab>
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
        </TabPanels>
      </TabGroup>
    </main>
  )
}

export default page