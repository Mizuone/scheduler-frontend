import { Box, Flex } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";

import { CurrentDayDate } from "../../../helpers/helpers";
import { Task } from "../task/Task";
import { normalDayHours } from "../../../helpers/dayHours";

// import { CreateTaskModal } from "../task/modals/CreateTaskModal";


interface DayProps {
    day: CurrentDayDate;
}

export const Day = (props: DayProps) => {
    const { day } = props;

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedStartTime, setSelectedStartTime] = useState<string>('');

    const [modalXY, setModalXY] = useState({ x: '0', y: '0' });

    const modalRef = useRef<HTMLDivElement>(null);

    const isCurrentDayStyles: React.CSSProperties | undefined = day.isCurrentDay
        ? { backgroundColor: "var(--green-5)", borderColor: "var(--green-8)", }
        : { borderColor: "var(--gray-3)"};

    useEffect(() => {
        if (isModalOpen && modalRef.current) {
            const modalWidth = modalRef.current.offsetWidth;

            setModalXY(prevPosition => ({
                x: (Number(prevPosition.x) - modalWidth).toString(),
                y: prevPosition.y,
            }))
        }

    }, [isModalOpen])

    const onTimeRangeClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, startTime: string) => {

        setSelectedStartTime(startTime);

        const target = event.target as HTMLElement;
        const targetRect = target.getBoundingClientRect();
        const offSetPadding = 10;

        setModalXY({
            x: (event.clientX - (event.clientX - (targetRect.left - offSetPadding))).toString(),
            y: (event.clientY).toString()
        });

        openModal();
    };

    const openModal = () => setIsModalOpen(true);
    // const closeModal = () => setIsModalOpen(false);

    return (
        <Box position={"relative"} width={"100%"}>
            {
                normalDayHours.map((dayHour, index) => {
                    const lastElement = index === normalDayHours.length - 1;
                    const hourFromStartTime = (Number(dayHour.hour) + 1).toString();
                    const endTimeAmOrPM = Number(dayHour.hour) + 1 > 11 && dayHour.amOrPM === 'am' ? 'pm' : 'am';

                    const isLastElementStyles: React.CSSProperties | undefined = lastElement ? { borderBottomWidth: "1px" } : { height: "3rem" };
                    const dayHourLabelStyles: React.CSSProperties | undefined = { ...isCurrentDayStyles, ...isLastElementStyles }; 

                    const renderTimeSlot = (minute: string) => {
                        const startTime = `${dayHour.hour}${minute} ${dayHour.amOrPM}`;
                        const endTime = `${hourFromStartTime} ${endTimeAmOrPM}`;

                        return (
                            <Box onClick={(e) => onTimeRangeClicked(e, startTime)} position={"relative"} height={"100%"}>
                                {selectedStartTime === startTime && (
                                    <Box position={"absolute"} width={"100%"} top={"0"}>
                                        <Task startTime={startTime} endTime={endTime} />
                                    </Box>
                                )}
                            </Box>
                        )
                    };

                    return (
                        <Box key={dayHour.label} style={{
                            borderWidth: "1px 1px 0 0",
                            borderStyle: "solid",
                            ...dayHourLabelStyles,
                        }}>
                            <Flex position={"relative"} direction={"column"} height={"100%"}>
                                {renderTimeSlot('')}
                                {renderTimeSlot(':15')}
                                {renderTimeSlot(':30')}
                                {renderTimeSlot(':45')}
                            </Flex>
                        </Box>
                    );
                })
            }
            {/* {isModalOpen && (
                <CreateTaskModal forwardedRef={modalRef} closeModal={closeModal} left={modalXY.x} top={modalXY.y} />
            )} */}
        </Box>
    )
}