import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { v4 as uuid } from 'uuid'

type Props = {
  tabs: {
    labels: string
    component: React.ReactNode
  }[]
}

export function Tabs({ tabs }: Props) {
  const [value, setValue] = React.useState('0')

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {tabs.map((tab, index) => (
              <Tab key={uuid()} label={tab.labels} value={index.toString()} />
            ))}
          </TabList>
        </Box>
        {tabs.map((tab, index) => (
          <TabPanel key={uuid()} value={index.toString()}>
            {tab.component}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  )
}
