import json
import boto3
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    try:
        # Connect to DynamoDB resource
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('visitor_count')  # Ensure table name is correct

        # Increment visitor_count for index.html
        response = table.update_item(
            Key={'path': 'index.html'},
            UpdateExpression='ADD visitor_count :inc',
            ExpressionAttributeValues={':inc': 1},
            ReturnValues='UPDATED_NEW'
        )

        visitor_count = response['Attributes']['visitor_count']

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*'  # Ensure CORS is enabled
            },
            'body': str(visitor_count)
        }

    except ClientError as e:
        print(e.response['Error']['Message'])
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': 'Error updating visitor count.'
        }
    except Exception as e:
        print(str(e))
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': 'An unexpected error occurred.'
        }