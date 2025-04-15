import React, { useState } from 'react'
import {
  Box,
  Button,
  VStack,
  Textarea,
  Heading,
  useToast,
} from '@chakra-ui/react'
import { endpointGet } from '../api'
import DateSelector from "../components/DateSelector"

const Schedule: React.FC = () => {
  const [log, setLog] = useState<string>('')
  const toast = useToast()

  const handleApiCall = async (endpoint: string) => {
    try {
      const res = await endpointGet(endpoint)
      console.log("API Response:", res) // Log the entire response to check its structure
      const msg = `✅ [${endpoint}] Response:\n${JSON.stringify(res, null, 2)}\n`
      setLog(prev => msg + '\n' + prev)
    } catch (err: any) {
      const msg = `❌ [${endpoint}] Error:\n${err.message}\n`
      setLog(prev => msg + '\n' + prev)
      toast({
        title: 'Error',
        description: `Failed to call ${endpoint}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box>
        <DateSelector />
        {/* More UI below */}
    </Box>
  )
}

export default Schedule
