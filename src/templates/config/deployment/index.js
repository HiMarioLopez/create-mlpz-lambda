function getServerlessConfigContent(options) {
    const isTypeScript = options.language === "typescript";

    return `service: ${options.projectName}
  
  frameworkVersion: '3'
  
  provider:
    name: aws
    runtime: nodejs22.x
    stage: \${opt:stage, 'dev'}
    region: \${opt:region, 'us-east-1'}
    memorySize: 256
    timeout: 10
    logRetentionInDays: 14
    environment:
      POWERTOOLS_SERVICE_NAME: \${self:service}
      POWERTOOLS_METRICS_NAMESPACE: \${self:service}
      LOG_LEVEL: INFO
      NODE_OPTIONS: --enable-source-maps
  
  ${isTypeScript ? `plugins:
    - serverless-plugin-typescript
  ` : ""}
  functions:
    hello:
      handler: src/handlers/hello.handler
      events:
        - http:
            path: /hello
            method: get
  
  custom:
    # Add your custom settings here
  `;
}

function getSamTemplateContent(options) {
    const isTypeScript = options.language === "typescript";
    const buildDir = "dist";

    return `AWSTemplateFormatVersion: '2010-09-09'
  Transform: AWS::Serverless-2016-10-31
  Description: ${options.projectName}
  
  Globals:
    Function:
      Runtime: nodejs22.x
      MemorySize: 256
      Timeout: 10
      Environment:
        Variables:
          POWERTOOLS_SERVICE_NAME: ${options.projectName}
          POWERTOOLS_METRICS_NAMESPACE: ${options.projectName}
          LOG_LEVEL: INFO
          NODE_OPTIONS: --enable-source-maps
  
  Resources:
    HelloFunction:
      Type: AWS::Serverless::Function
      Properties:
        CodeUri: ${buildDir}/
        Handler: handlers/hello.handler
        Events:
          HelloAPI:
            Type: Api
            Properties:
              Path: /hello
              Method: GET
  
  Outputs:
    HelloFunction:
      Description: Hello Lambda Function ARN
      Value: !GetAtt HelloFunction.Arn
    HelloFunctionAPI:
      Description: API Gateway endpoint URL for Hello function
      Value: !Sub "https://\${ServerlessRestApi}.execute-api.\${AWS::Region}.amazonaws.com/Prod/hello/"
  `;
}

// Add CDK config if needed

module.exports = {
    getServerlessConfigContent,
    getSamTemplateContent
};
