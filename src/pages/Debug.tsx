import React, { useState } from 'react'
import {
  Box,
  Button,
  VStack,
  Textarea,
  Heading,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'

const Debug: React.FC = () => {
  const [log, setLog] = useState<string>('')
  const toast = useToast()

  const handleApiCall = async (endpoint: string) => {
    try {
      const res = await axios.get(endpoint)
      const msg = `✅ [${endpoint}] Response:\n${JSON.stringify(res.data, null, 2)}\n`
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
    <Box p={6}>
      <Heading mb={4}>Debug API Endpoints</Heading>

      <VStack spacing={4} align="stretch" mb={6}>
        <Button colorScheme="teal" onClick={() => handleApiCall('/api/db/dbController')}>
          GET /db/dbController
        </Button>

        <Button colorScheme="blue" onClick={() => handleApiCall('/api/db/dropDatabase')}>
          GET /db/dropDatabase
        </Button>

        <Button colorScheme="blue" onClick={() => handleApiCall('/api/db/createDatabase')}>
          GET /db/createDatabase
        </Button>

        <Button colorScheme="blue" onClick={() => handleApiCall('/api/db/createSeason')}>
          GET /db/createSeason
        </Button>
      </VStack>

      <Textarea
        value={log}
        readOnly
        height="300px"
        fontFamily="mono"
        bg="gray.50"
        _dark={{ bg: 'gray.900', color: 'gray.100' }}
      />
    </Box>
  )
}

export default Debug
