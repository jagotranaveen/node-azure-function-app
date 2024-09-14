import { AzureFunction, Context, HttpRequest } from "@azure/functions"
const { Client } = require('pg');


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const client = new Client({
        user: "hspadmin",
        host: "gxmdevdb.postgres.database.azure.com",
        database: "gxmuserdb",
        password:"Aug@2024",
        port: "5432",
        ssl: {
                rejectUnauthorized: false // For testing; in production, use the correct CA certificate
            }
       
    });
    context.log('Before Calling Query.');
    try {
        await client.connect();
        const query = 'SELECT * FROM test_companies';
        context.log.info(`After Query Execution `);
        const result = await client.query(query);
        context.log.info(`After result  mapping `);
        context.res = {
            status: 200,
            body: result.rows
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: `Error fetching Comapny::: ${err.message}`
        };
    } finally {
        await client.end();
    }
    
};

export default httpTrigger;