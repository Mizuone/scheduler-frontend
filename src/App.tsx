import { Flex, Theme } from '@radix-ui/themes'

import { Header } from './components/header/Header'
import { Scheduler } from './components/scheduler/Scheduler'

function App() {

  return (
    <>
      <Theme style={{ minHeight: "100%" }} accentColor="green" radius="small" appearance='dark'>
        <Flex direction={"column"} height={"100%"}>
          <Scheduler />
        </Flex>
      </Theme>
    </>
  )
}

export default App
