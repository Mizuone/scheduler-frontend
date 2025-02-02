import { Box, Text } from "@radix-ui/themes";

import { DayHourTestId } from "../../../tests/data-test-ids";
import { normalDayHours } from "../../../helpers/dayHours";

export const DayHourLabels = () => {
    return (
        <>
            {
                normalDayHours.map((dayHour, index) => {
                    const lastElement = index === normalDayHours.length - 1;
                    const testId = `${DayHourTestId}-${dayHour.label}`;

                    const boxStyles: React.CSSProperties | undefined =  lastElement ? {} : { 
                        height: "3rem",
                        borderWidth: "0 1px 0 0",
                        borderStyle: "solid",
                        borderColor: "var(--gray-3)"
                    }

                    return (
                        <Box
                            key={dayHour.label}
                            data-testid={testId}
                            style={{...boxStyles}} position={"relative"} px={"2"} width={"4rem"}
                        >
                            <Text
                                style={{ color: "var(--white-a11)", top: "-0.6rem", position: "absolute" }} align={"right"} as="span" size={"2"}
                            >
                                {dayHour.label}
                            </Text>
                        </Box>
                    )
                })
            }
        </>

    )
}