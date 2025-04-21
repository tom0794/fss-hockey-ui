import React, { useEffect, useState } from 'react'
import { Box, Text, VStack, SimpleGrid, Spinner, useToast } from '@chakra-ui/react'
import { endpointGet } from '../api'
import { format } from 'date-fns'
import DateSelector from '../components/DateSelector'
import { useColorModeValue, Button } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'

interface Team {
  teamId: number
  divisionId: number
  city: string
  name: string
  abbreviation: string
  primaryColour: string
  secondaryColour: string
}

interface Game {
  gameId: string
  dayId: number
  homeTeam: Team
  roadTeam: Team
}

interface ScheduleResponse {
  status: number
  content: {
    games?: Game[]
    message?: string
  }
}

const Schedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [scheduleData, setScheduleData] = useState<Game[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const toast = useToast()
  const boxBg = useColorModeValue('gray.300', 'gray.700')
  const boxHoverBg = useColorModeValue('teal', 'gray.600')


  const loadSchedule = async (date: Date) => {
    setLoading(true)
    setError(null)

    try {
      const formattedDate = format(date, 'yyyy-MM-dd')
      const res: ScheduleResponse = await endpointGet(`/schedule/getGamesOnDate/${formattedDate}`)

      if (res.status === 404) {
        setScheduleData([])
        setError('Invalid day')
      } else if (res.status === 200 && res.content?.games) {
        setScheduleData(res.content.games)
      } else {
        setScheduleData([])
        setError('Unexpected response')
      }
    } catch (err: any) {
      console.error('Failed to load schedule:', err)
      setError('Failed to load schedule')
      toast({
        title: 'Error',
        description: 'Could not load schedule',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSchedule(selectedDate)
  }, [selectedDate])

  return (
    <Box p={6}>
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />
        <Button
          colorScheme="teal"
          isDisabled={scheduleData.length === 0}
          leftIcon={<ArrowRightIcon />}
          onClick={() => {
            console.log('Simulate all games')
          }}
        >
          Simulate All Games
        </Button>
      </Box>


      {loading && (
        <Box display="flex" justifyContent="center" mt={8}>
          <Spinner size="xl" thickness="4px" speed="0.65s" color="teal.500" />
        </Box>
      )}

      {!loading && (
        <>
          {error ? (
            <VStack spacing={4} mt={6}>
              <Text color="red.500">{error}</Text>
            </VStack>
          ) : scheduleData.length === 0 ? (
            <VStack spacing={4} mt={6}>
              <Text>No games scheduled for this day.</Text>
            </VStack>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={4} mt={6}>
              {scheduleData.map((game) => (
                <Box
                  key={game.gameId}
                  position="relative"
                  borderWidth="1px"
                  borderRadius="md"
                  p={4}
                  minHeight="100px"
                  maxW="220px"
                  bg={boxBg}
                  _hover={{ bg: boxHoverBg }}
                >
                  <Text
                    position="absolute"
                    top="20px"
                    left="8px"
                    fontWeight="bold"
                    fontSize="lg"
                  >
                    {game.roadTeam.abbreviation}
                  </Text>
                  <Text
                    position="absolute"
                    bottom="20px"
                    left="8px"
                    fontWeight="bold"
                    fontSize="lg"
                  >
                    {game.homeTeam.abbreviation}
                  </Text>

                  <Box
                    position="absolute"
                    top="50%"
                    right="8px"
                    transform="translateY(-50%)"
                    display="flex"
                    alignItems="center"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={<ArrowRightIcon />}
                      onClick={() => {
                        console.log(`Simulate game: ${game.gameId}`)
                      }}
                    >
                      Simulate
                    </Button>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </>
      )}
    </Box>
  )
}

export default Schedule
