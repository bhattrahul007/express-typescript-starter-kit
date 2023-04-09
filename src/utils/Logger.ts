import pino from 'pino';
import pinoPretty from 'pino-pretty';
import dayjs from 'dayjs';

const stream = pinoPretty({
    colorize: true,
    colorizeObjects: true,
});

const logger = pino(
    {
        timestamp: () => `, "time": "${dayjs().format()}`,
    },
    stream
);

export default logger;
