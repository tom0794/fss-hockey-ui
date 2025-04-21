import React from 'react'
import {
  Box,
  Flex,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  useDisclosure,
  Text,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from '@chakra-ui/icons'
import { format, addDays, subDays } from 'date-fns'

interface DateSelectorProps {
  selectedDate: Date
  onChange: (newDate: Date) => void
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value)
    if (!isNaN(date.getTime())) {
      onChange(date)
      onClose()
    }
  }

  const goToPreviousDay = () => {
    onChange(subDays(selectedDate, 1))
  }

  const goToNextDay = () => {
    onChange(addDays(selectedDate, 1))
  }

  return (
    <Box p={6}>
      <Flex align="center" justify="center" gap={4}>
        <IconButton
          aria-label="Previous Day"
          icon={<ChevronLeftIcon />}
          onClick={goToPreviousDay}
        />
        <Text fontSize="xl" fontWeight="semibold">
          {format(selectedDate, 'yyyy-MM-dd')}
        </Text>

        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
          <PopoverTrigger>
            <IconButton
              aria-label="Select Date"
              icon={<CalendarIcon />}
              onClick={onOpen}
            />
          </PopoverTrigger>
          <PopoverContent width="auto">
            <PopoverArrow />
            <PopoverBody>
              <input
                type="date"
                value={format(selectedDate, 'yyyy-MM-dd')}
                onChange={handleDateChange}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <IconButton
          aria-label="Next Day"
          icon={<ChevronRightIcon />}
          onClick={goToNextDay}
        />
      </Flex>
    </Box>
  )
}

export default DateSelector
