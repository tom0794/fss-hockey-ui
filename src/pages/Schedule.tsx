import React, { useEffect, useState } from 'react'
import { Box, VStack, Text, useToast, Spinner } from '@chakra-ui/react'
import { endpointGet } from '../api'
import DateSelector from '../components/DateSelector'
import { format } from 'date-fns'

interface Game {
  gameId: string
  homeTeam: {
    city: string
    name: string
  }
  roadTeam: {
    city: string
    name: string
  }
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
      <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />

      {loading && (
        <Box display="flex" justifyContent="center" mt={8}>
          <Spinner size="xl" thickness="4px" speed="0.65s" color="teal.500" />
        </Box>
      )}

      {!loading && (
        <VStack spacing={4} mt={6}>
          {error ? (
            <Text color="red.500">{error}</Text>
          ) : (
            <>
              {scheduleData.length === 0 ? (
                <Text>No games scheduled for this day.</Text>
              ) : (
                scheduleData.map((game) => (
                  <Box key={game.gameId} p={4} borderWidth="1px" borderRadius="lg">
                    <Text fontWeight="bold">
                      {game.homeTeam.city} {game.homeTeam.name} @ {game.roadTeam.city} {game.roadTeam.name}
                    </Text>
                  </Box>
                ))
              )}
            </>
          )}
        </VStack>
      )}
    </Box>
  )
}

export default Schedule
