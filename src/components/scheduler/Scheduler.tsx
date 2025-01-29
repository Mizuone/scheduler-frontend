import { Box, Flex } from "@radix-ui/themes";

import { Day } from "./day/Day"
import { DayHeader } from "./day/DayHeader"
import { DayHourLabels } from "./day-hour-labels/DayHourLabels"
import { getCurrentWeekDates } from "../../helpers/helpers";

export const Scheduler = () => {
    const currentWeekDates = getCurrentWeekDates();

    return (
        <>
            <Flex style={{"borderRadius": "0.25rem"}} direction={"column"} my={"2"}>
                <Flex>
                    <Box p={"5"}></Box>
                    <Flex width={"100%"}>
                        {
                            currentWeekDates.map((day) => {
                                const keyId = `day-header-${day.dayOfWeek}`;

                                return <DayHeader
                                    key={keyId}
                                    day={day.dayOfWeek}
                                    dayOfMonth={day.dayOfMonth}
                                    currentDay={day.isCurrentDay}
                                />;
                            })
                        }
                    </Flex>
                </Flex>
                <Flex>
                    <Flex direction={"column"}>
                        <DayHourLabels />
                    </Flex>
                    <Flex width={"100%"}>
                        {
                            currentWeekDates.map((day) => {
                                const keyId = `${day.dayOfWeek}-${day.dayOfMonth}`;

                                return <Day key={keyId} day={day} />
                            })
                        }
                    </Flex>

                </Flex>
            </Flex>
        </>
    )
}