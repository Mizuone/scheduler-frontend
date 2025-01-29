import { Box, Heading } from "@radix-ui/themes";

import { DayHeaderTestId } from "../../../tests/data-test-ids";

interface DayProps {
    day: string;
    dayOfMonth: string;
    currentDay: boolean;
}

export const DayHeader = (props: DayProps) => {
    const { day, dayOfMonth, currentDay } = props;
    const testId = `${DayHeaderTestId}-${day}`;

    return (
        <Box data-testid={testId} width={"100%"}>
            <>
                <Heading style={{ "color": currentDay ? "var(--green-10)" : "var(--gray-6)" }} as="h3" size={"4"} align={"center"}>{day}</Heading>
                <Heading style={{ "color": currentDay ? "var(--white-a11)" : "var(--gray-6)" }} as="h2" size={"6"} align={"center"}>{dayOfMonth}</Heading>
            </>
        </Box>
    )
}