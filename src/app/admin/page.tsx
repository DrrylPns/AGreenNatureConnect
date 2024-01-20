import React from 'react'
import CntPostCard from '../components/(admin)/CntPostCard'
import { Card, Col, Grid, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Title } from '@tremor/react'
import CntUserCard from '../components/(admin)/CntUserCard'
import CntTopicCard from '../components/(admin)/CntTopicCard'
import CntProductCard from '../components/(admin)/CntProductCard'
import PostPerTopic from '../components/(admin)/PostPerTopic'

const page = () => {

  return (
    <section className="p-12">
      <Title>Dashboard</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
          {/* IF EVER LANG MAY MAILALAGAY IF WALA DELETE TAB */}
          <Tab>More Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={4} className="gap-6 mt-6">

              <CntPostCard />

              <CntUserCard />

              <CntTopicCard />
              
              <CntProductCard />

            </Grid>
            <Grid className="gap-6 mt-6" numItems={1} numItemsLg={3}>
              <Col numColSpanLg={2}>
                <Card>
                  <div className='h-40'/>
                </Card>
              </Col>

              <PostPerTopic />

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
  )
}

export default page