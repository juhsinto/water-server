# Water Fountain API
Water Fountain API - serves JSON formatted data ; Processed from https://data.melbourne.vic.gov.au/Assets-Infrastructure/Drinking-fountains/h4ih-tzqs/data

## Available API calls

#### jacintomendes.com:3000/getFountains
`POST` request
parameters required - 
param1: longitude
param2: latitude
###### Returns: 
JSON string containing 10 nearest fountains from given GPS coordinates in the format:  "_id", "name", "street", "loc (long, lat)"

###### `Example` 
###### POST:` param1: 144.968714 , param2: -37.847798
###### result:
"_id": "591f9fd55708a512b4baa43d",
"name": "Concrete Drinking Fountain",
"street": "",
"loc": {
    "lon": 144.982561402047,
    "lat": -37.8452141594852 
    }
    


#### jacintomendes.com:3000/getall
`GET` Request
###### Returns: 
JSON string containing ALL (274) fountains in the format:  "_id", "name", "street", "loc (long, lat)"

