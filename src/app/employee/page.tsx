import { Article, Blog, Community, Product, User } from '@prisma/client'
import { Card, Col, Grid, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react'
import React from 'react'
import { CntProductsCard } from './_components/CntProductsCard'
import { CntUserCard } from './_components/CntTopicCard'
import { CntEmployeesCard } from './_components/CntEmployeesCard'
import PPSCard from './_components/PPSCard'
import prisma from '@/lib/db/db'
import { getAuthSession } from '@/lib/auth'
import { formatDate } from '@/lib/utils'

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

    console.log(employees)

    // const data = [
    //     {
    //         name: "Viola Amherd",
    //         Role: "Federal Councillor",
    //         departement: "The Federal Department of Defence, Civil Protection and Sport (DDPS)",
    //         status: "active",
    //     },
    //     {
    //         name: "Simonetta Sommaruga",
    //         Role: "Federal Councillor",
    //         departement:
    //             "The Federal Department of the Environment, Transport, Energy and Communications (DETEC)",
    //         status: "active",
    //     },
    //     {
    //         name: "Alain Berset",
    //         Role: "Federal Councillor",
    //         departement: "The Federal Department of Home Affairs (FDHA)",
    //         status: "active",
    //     },
    //     {
    //         name: "Ignazio Cassis",
    //         Role: "Federal Councillor",
    //         departement: "The Federal Department of Foreign Affairs (FDFA)",
    //         status: "active",
    //     },
    //     {
    //         name: "Karin Keller-Sutter",
    //         Role: "Federal Councillor",
    //         departement: "The Federal Department of Finance (FDF)",
    //         status: "active",
    //     },
    //     {
    //         name: "Guy Parmelin",
    //         Role: "Federal Councillor",
    //         departement: "The Federal Department of Economic Affairs, Education and Research (EAER)",
    //         status: "active",
    //     },
    //     {
    //         name: "Elisabeth Baume-Schneider",
    //         Role: "Federal Councillor",
    //         departement: "The Federal Department of Justice and Police (FDJP)",
    //         status: "active",
    //     },
    // ];


    return (
        <main className='flex flex-col gap-2 h-screen'>
            {/* <Sidebar name={community?.name} /> */}
            {/* TODO: TREMOR GRAPHS */}

            <section className='p-12'>

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

                                <CntProductsCard />



                                {/* <CntPostCard />

                                <CntUserCard />

                                <CntTopicCard />

                                <CntProductCard /> */}

                            </Grid>
                            <Grid className="gap-6 mt-6" numItems={1} numItemsLg={3}>
                                <Col numColSpanLg={2}>
                                    <Card>
                                        <div className='h-40' />
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
                                    <Table className="mt-5">
                                        <TableHead>
                                            <TableRow>
                                                <TableHeaderCell>Employee ID</TableHeaderCell>
                                                <TableHeaderCell>Firstname</TableHeaderCell>
                                                <TableHeaderCell>Lastname</TableHeaderCell>
                                                <TableHeaderCell>Date Joined</TableHeaderCell>
                                                <TableHeaderCell>Email</TableHeaderCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {employees.map((employee) => (
                                                <TableRow key={employee.id}>
                                                    <TableCell>{employee.EmployeeId}</TableCell>
                                                    <TableCell>
                                                        <Text>{employee.name}</Text>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Text>{employee.lastName}</Text>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Text>{formatDate(employee.createdAt)}</Text>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Text>{employee.email}</Text>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                </Card>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </section>
        </main>
    )
}

export default page