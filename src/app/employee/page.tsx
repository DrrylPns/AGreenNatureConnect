import { Article, Blog, Community, Product, User } from '@prisma/client'
import { Card, Col, Grid, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Title } from '@tremor/react'
import React from 'react'
import { CntProductsCard } from './_components/CntProductsCard'
import { CntTopicCard } from './_components/CntTopicCard'

const page = async () => {

    // const session = await getAuthSession()

    // const community = await prisma.community.findFirst({
    //     where: {
    //         userId: session?.user.id
    //     },
    //     include: {
    //         user: true,
    //         products: true,
    //         blogs: true,
    //         articles: true,
    //     }
    // })

    return (
        <main className='flex flex-col gap-2 h-screen'>
            {/* <Sidebar name={community?.name} /> */}
            {/* TODO: TREMOR GRAPHS */}

            <section className='p-12'>
                <Title className='text-xl'>Dashboard</Title>
                <Text>
                    Welcome to your community dashboard! This page provides you with a comprehensive overview of your community&apos;s activities and performance. Explore insightful graphs and summaries to stay informed about key metrics such as the number of products, blogs, articles, and more. Keep track of your community's growth and engagement effortlessly.
                </Text>

                <TabGroup className="mt-6">
                    <TabList>
                        <Tab>Overview</Tab>
                        {/* IF EVER LANG MAY MAILALAGAY IF WALA DELETE TAB */}
                        <Tab>More Details</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Grid numItemsMd={2} numItemsLg={2} className="gap-6 mt-6">

                                <CntTopicCard />

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

                                {/* <PostPerTopic /> */}

                            </Grid>
                        </TabPanel>
                        <TabPanel>
                            <div className="mt-6">
                                <Card>
                                    <div className="h-96" />
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