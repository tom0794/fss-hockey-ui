import React, { useState } from 'react'
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
    Text
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from '@chakra-ui/icons'
import { format, addDays, subDays } from 'date-fns'

const DateSelector: React.FC = () => {
    var startDate = "2024-10-01";
    const [selectedDate, setSelectedDate] = useState<Date>(() => {
        const parts = startDate.split('-')
        return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
    })

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(event.target.value)
        if (!isNaN(date.getTime())) {
            setSelectedDate(date)
            onClose()
        }
    }

    const goToPreviousDay = () => {
        setSelectedDate(prev => subDays(prev, 1))
    }

    const goToNextDay = () => {
        setSelectedDate(prev => addDays(prev, 1))
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
