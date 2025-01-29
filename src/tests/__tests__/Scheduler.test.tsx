import { DayHeaderTestId, DayHourTestId, DayTestId } from "../data-test-ids";
import { Flex, Theme } from "@radix-ui/themes";
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Scheduler } from "../../components/scheduler/Scheduler";
import { daysOfWeek } from "../../helpers/helpers";
import { normalDayHours } from "../../helpers/dayHours";

describe('Scheduler Snapshot Tests', () => {
    const daysInWeek = daysOfWeek.length;
    const dayHours = normalDayHours.length;

    beforeEach(() => {
        render(
            <Theme style={{ minHeight: "100%" }} accentColor="green" radius="small" appearance='dark'>
                <Flex direction={"column"} height={"100%"}>
                    <Scheduler />
                </Flex>
            </Theme>
        )
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the scheduler component in a default state', async () => {
        const schedulerRender = await act(async () => {
            return {
                dayHeaders: screen.queryAllByTestId(DayHeaderTestId, { exact: false }).length,
                dayHours: screen.queryAllByTestId(DayHourTestId, { exact: false }).length,
                days: screen.queryAllByTestId(DayTestId, { exact: false }).length,
            }
        });

        expect(schedulerRender.dayHeaders).toEqual(daysInWeek);
        expect(schedulerRender.dayHours).toEqual(dayHours); 
        expect(schedulerRender.days).toEqual(daysInWeek);
    });

});