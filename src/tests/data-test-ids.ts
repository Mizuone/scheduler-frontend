/*
    Test Id Style Guide

    ### Component
    
        ReactComponent = () => {
            const testId = `${DataTestIdReference}-<unique value>`

            return (
                <div data-testid={testId}>
                    ...
                </div>
            )
        }

    ######

    ### data-test-id.ts

        export const ComponentNameTestId = "<component name>-test-id";

    ######
*/



// Scheduler

export const DayHeaderTestId = "header-test-id";
export const DayHourTestId = "day-hour-test-id"; 
export const DayTestId = "day-test-id";