export const corsOptions = {
    origin: '*', // Set the allowed origin(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Set the allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204, // Set the response status for preflight requests
};