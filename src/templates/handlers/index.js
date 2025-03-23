function getTypescriptHandlerContent() {
    return `import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Logger } from '@aws-lambda-powertools/logger';
import { Tracer } from '@aws-lambda-powertools/tracer';
import { Metrics, MetricUnit } from '@aws-lambda-powertools/metrics';

const logger = new Logger({ serviceName: 'hello-service' });
const tracer = new Tracer({ serviceName: 'hello-service' });
const metrics = new Metrics({ namespace: 'hello-service' });

export const handler = async (
event: APIGatewayProxyEvent,
context: Context
): Promise<APIGatewayProxyResult> => {
// Log the event
logger.info('Event received', { event });

try {
    // Add business logic here
    const response = {
    message: 'Hello from Lambda!',
    timestamp: new Date().toISOString(),
    requestId: context.awsRequestId
    };
    
    metrics.addMetric('SuccessfulInvocation', MetricUnit.Count, 1);
    
    return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(response)
    };
} catch (error) {
    logger.error('Error in Lambda handler', error as Error);
    metrics.addMetric('ErrorInvocation', MetricUnit.Count, 1);
    
    return {
    statusCode: 500,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Internal Server Error' })
    };
}
};`;
}

function getJavascriptHandlerContent() {
    return `const { Logger } = require('@aws-lambda-powertools/logger');
const { Tracer } = require('@aws-lambda-powertools/tracer');
const { Metrics, MetricUnit } = require('@aws-lambda-powertools/metrics');

const logger = new Logger({ serviceName: 'hello-service' });
const tracer = new Tracer({ serviceName: 'hello-service' });
const metrics = new Metrics({ namespace: 'hello-service' });

exports.handler = async (event, context) => {
// Log the event
logger.info('Event received', { event });

try {
    // Add business logic here
    const response = {
    message: 'Hello from Lambda!',
    timestamp: new Date().toISOString(),
    requestId: context.awsRequestId
    };
    
    metrics.addMetric('SuccessfulInvocation', MetricUnit.Count, 1);
    
    return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(response)
    };
} catch (error) {
    logger.error('Error in Lambda handler', error);
    metrics.addMetric('ErrorInvocation', MetricUnit.Count, 1);
    
    return {
    statusCode: 500,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Internal Server Error' })
    };
}
};`;
}

module.exports = {
    getTypescriptHandlerContent,
    getJavascriptHandlerContent
};
