# archimate-model-importer

In memory Archimate model importer compatible with Archi (.archimate), AOEFF and GRAFICO (distributed Archi file).

## Installation

Using npm:

``
npm i --save @arktect-co/archimate-model-importer
``

Using Yarn:

``
yarn add @arktect-co/archimate-model-importer
``

## Usage Example

```js
const {InputProcessingDirector} = require("@arktect-co/archimate-model-importer");

let inputProcessorDirector = new InputProcessorDirector({
    label: "Your Model Name",
    description: "Model Description"
});

await inputProcessorDirector.translateModelFile('./your_model_file.archimate');

let response = inputProcessorDirector.getOutputModel();
```
## Output

The output is in the form of an instance of the Model class. For example, the following illustrates a valid output:

```
{
    "description": "Your Model Name",
    "label": "Model Description",
    "statistics": {
        "totalNodes": 97,
        "totalRelationships": 46,
        "totalViews": 4,
    },
    "totalByType": {
        "nodeTypes": {
            "andjunction": 1,
            "applicationcollaboration": 2,
            "applicationcomponent": 6,
            ...
        },
        "relationshipTypes": {
            "access": 4,
            "aggregation": 1,
            "assignment": 6,
            ...
        }
    },
    "model": {
        "nodes": {
            "resource": [
                {
                    "identifier": "40eb5bd6-4d7c-4c27-98a8-602f935ed405",
                    "name": "Resource"
                }
            ],
            "capability": [
                {
                    "identifier": "6be02ba1-0489-4ea4-b62b-a22d302cbefe",
                    "name": "Capability"
                }
            ],
            ...
        },
        "relationships": {
            "aggregationrelationship": [
                {
                    "identifier": "bc8c928b-dafb-4e61-91b3-7c3e5b93a900",
                    "sourceId": "d0c22546-6ae6-4ba9-a141-222cc6eea16d",
                    "targetId": "cc07d17e-8450-4adf-84d1-ea7d92ec01ab"
                }
            ],
            "assignmentrelationship": [
                {
                    "identifier": "c8eacb29-df66-4c8a-98bf-159b8e894b94",
                    "sourceId": "3a17d18c-78b4-47e1-bf17-0ff3ac741b7a",
                    "targetId": "cc07d17e-8450-4adf-84d1-ea7d92ec01ab"
                }
                ...
            ],
            "associationrelationship": [
                {
                    "identifier": "013254aa",
                    "sourceId": "6eb2e507",
                    "targetId": "3a5ca9b5",
                    "isBidirectional": true
                },
            ],
            ...
        },
        "views": [
            {
                "bounds": {
                    "vertical": {
                        "min": 24,
                        "max": 497
                    },
                    "horizontal": {
                        "min": 38,
                        "max": 1218
                    }
                },
                "id": "57147c58-d2fc-463e-977b-b0812b23500a",
                "name": "Elements",
                "viewNodes": [
                    {
                        "modelNodeId": "8ab8d668-3852-4bf8-a43e-2fcc89c01c79",
                        "viewNodeId": "96f41f9a-44fd-420b-8e81-e669a490fd2d",
                        "name": "Location",
                        "type": "location",
                        "x": 38,
                        "y": 25,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "1aef2a19-28fe-4c6a-9273-ea0603ff9a8d",
                        "viewNodeId": "90587bb4-b903-4d1e-af17-ec1deb1a6a3e",
                        "name": "Goal",
                        "type": "goal",
                        "x": 324,
                        "y": 80,
                        "width": 120,
                        "height": 55,
                        "parent": "4ac2c3f6-739a-4598-9e8f-2600e0964ace"
                    }
                    ...
                ],
                "viewRelationships": [
                    {

                        "modelRelationshipId": "c8eacb29-df66-4c8a-98bf-159b8e894b94",
                        "sourceId": "0d48039d-ed53-4e60-8045-1af4f1e5db6f",
                        "targetId": "1620e51a-453c-411e-8c1c-8bf9d7545c93",
                        "viewRelationshipId": "b370c707-37eb-4f93-b6f4-c54867832ec7",
                        "type": "assignment",
                        "bendpoints": []
                    },
                    ...
                ]
            },
            ...
        ],
        "landscape": [
            {
                "children": [
                    {
                        "text": "New Folder",
                        "isDirectory": true,
                        "children": [
                            {
                                "id": "57147c58-d2fc-463e-977b-b0812b23500a",
                                "text": "Elements",
                                "isDirectory": false
                            },
                            {
                                "id": "9a578be1-0cde-4e09-91e6-f0742708a0da",
                                "text": "Relationships",
                                "isDirectory": false
                            },
                            ...
                        ]
                    }
                ],
                "text": "Views",
                "isDirectory": true
            }
        ]
    }
}
```

## Compatibility

This importer is compatible with File-Based models and Folder Based models.

### File Based
* Archi File (.archimate)
* Archimate Open Exchange File Format

### Folder Based
* GRAFICO (Compatible with CoArchi Plugin)