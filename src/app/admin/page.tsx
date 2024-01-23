import React from 'react'
import CntPostCard from '../components/(admin)/CntPostCard'
// import { Card, Col, Grid, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Title } from '@tremor/react'
import { BarChart, Card, Col, Grid, MultiSelect, MultiSelectItem, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react'
import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/db/db'
import { CntEmployeesCard } from '../employee/_components/CntEmployeesCard'
import { CntProductsCard } from '../employee/_components/CntProductsCard'
import PPSCard from '../employee/_components/PPSCard'
import { formatDate } from '@/lib/utils'
import { CntUserCard } from '../employee/_components/CntTopicCard'
import CntSales from './_components/CntSales'
import SearchEmployees from './_components/SearchEmployees'

const page = async () => {

  const session = await getAuthSession()

  const community = await prisma.community.findFirst({
    where: {
      userId: session?.user.id
    },
    include: {
      user: true,
      products: true,
      blogs: true,
      articles: true,
    }
  })

  // console.log(community)

  const employees = await prisma.user.findMany({
    where: {
      role: 'EMPLOYEE',
      Community: {
        name: community?.name
      }
    },
    include: {
      Community: true
    }
  })

  const chartdata4 = [
    {
      date: "Jan 23",
      "Fruits": 167,
      "Vegetables": 145,
    },
    {
      date: "Feb 23",
      "Fruits": 559,
      "Vegetables": 410,
    },
    {
      date: "Mar 23",
      "Fruits": 156,
      "Vegetables": 149,
    },
    {
      date: "Apr 23",
      "Fruits": 165,
      "Vegetables": 112,
    },
    {
      date: "May 23",
      "Fruits": 153,
      "Vegetables": 138,
    },
    {
      date: "Jun 23",
      "Fruits": 200,
      "Vegetables": 98,
    },
    {
      date: "July 23",
      "Fruits": 124,
      "Vegetables": 23,
    },
    {
      date: "Aug 23",
      "Fruits": 224,
      "Vegetables": 221,
    },
    {
      date: "Sep 23",
      "Fruits": 201,
      "Vegetables": 412,
    },
    {
      date: "Oct 23",
      "Fruits": 213,
      "Vegetables": 316,
    },
    {
      date: "Nov 23",
      "Fruits": 69,
      "Vegetables": 420,
    },
    {
      date: "Dec 23",
      "Fruits": 420,
      "Vegetables": 69,
    },
  ];


  return (
    <main className='flex flex-col gap-2 h-screen bg-[#E3E1E1]'>
      <Title>{community?.name} Dashboard</Title>

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



              {/* <CntPostCard />

                                <CntUserCard />

                                <CntTopicCard />

                                <CntProductCard /> */}

            </Grid>
            <Grid className="gap-6 mt-6" numItems={1} numItemsLg={3}>
              <Col numColSpanLg={2}>
                <Card>
                  <div className='h-full'>
                    <Title>Sales Report</Title>
                    <BarChart
                      className="h-72 mt-4"
                      data={chartdata4}
                      index="date"
                      categories={["Fruits", "Vegetables"]}
                      colors={["indigo", "gray"]}
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
    // <section className="p-12">
    //   <Title>Dashboard</Title>
    //   <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

    //   <TabGroup className="mt-6">
    //     <TabList>
    //       <Tab>Overview</Tab>
    //       {/* IF EVER LANG MAY MAILALAGAY IF WALA DELETE TAB */}
    //       <Tab>More Details</Tab>
    //     </TabList>
    //     <TabPanels>
    //       <TabPanel>
    //         <Grid numItemsMd={2} numItemsLg={4} className="gap-6 mt-6">

    //           <CntPostCard />

    //           <CntUserCard />

    //           <CntTopicCard />

    //           <CntProductCard />

    //         </Grid>
    //         <Grid className="gap-6 mt-6" numItems={1} numItemsLg={3}>
    //           <Col numColSpanLg={2}>
    //             <Card>
    //               <div className='h-40' />
    //             </Card>
    //           </Col>

    //           <PostPerTopic />

    //         </Grid>
    //       </TabPanel>
    //       <TabPanel>
    //         <div className="mt-6">
    //           <Card>
    //             <div className="h-96" />
    //           </Card>
    //         </div>
    //       </TabPanel>
    //     </TabPanels>
    //   </TabGroup>
    // </section>
  )
}

export default page