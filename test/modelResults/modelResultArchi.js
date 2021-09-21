exports.modelResultArchi = {
    "description": "Test model for Archi Files",
    "label": "Archi Test",
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
            "applicationevent": 1,
            "applicationfunction": 5,
            "applicationinteraction": 1,
            "applicationinterface": 1,
            "applicationprocess": 1,
            "applicationservice": 5,
            "artifact": 1,
            "assessment": 1,
            "businessactor": 3,
            "businesscollaboration": 2,
            "businessevent": 1,
            "businessfunction": 1,
            "businessinteraction": 1,
            "businessinterface": 1,
            "businessobject": 1,
            "businessprocess": 11,
            "businessrole": 3,
            "businessservice": 1,
            "capability": 1,
            "communicationnetwork": 1,
            "constraint": 1,
            "contract": 1,
            "courseofaction": 1,
            "dataobject": 2,
            "deliverable": 1,
            "device": 2,
            "distributionnetwork": 1,
            "driver": 2,
            "equipment": 1,
            "facility": 1,
            "gap": 1,
            "goal": 2,
            "grouping": 1,
            "implementationevent": 1,
            "location": 1,
            "material": 1,
            "meaning": 1,
            "node": 2,
            "orjunction": 1,
            "outcome": 1,
            "path": 1,
            "plateau": 1,
            "principle": 1,
            "product": 1,
            "representation": 1,
            "requirement": 1,
            "resource": 1,
            "stakeholder": 1,
            "systemsoftware": 1,
            "technologycollaboration": 1,
            "technologyevent": 1,
            "technologyfunction": 1,
            "technologyinteraction": 1,
            "technologyinterface": 1,
            "technologyprocess": 1,
            "technologyservice": 2,
            "value": 1,
            "valuestream": 1,
            "workpackage": 1
        },
        "relationshipTypes": {
            "access": 4,
            "aggregation": 1,
            "assignment": 6,
            "association": 3,
            "composition": 4,
            "flow": 3,
            "influence": 1,
            "realization": 6,
            "serving": 5,
            "specialization": 3,
            "triggering": 10,
        }
    },
    "model": {
        "nodes": {
            "resource": [
                {
                    "identifier": "40eb5bd6-4d7c-4c27-98a8-602f935ed405",
                    "name": "Resource",
                    "properties": []
                }
            ],
            "capability": [
                {
                    "identifier": "6be02ba1-0489-4ea4-b62b-a22d302cbefe",
                    "name": "Capability",
                    "documentation": "This is a documentation test",
                    "properties": [
                        {
                            "key": "Description",
                            "value": "Attribute value string"
                        },
                        {
                            "key": "Maturity",
                            "value": "3"
                        },
                        {
                            "key": "Has Owner",
                            "value": "true"
                        }
                    ]
                }
            ],
            "courseofaction": [
                {
                    "identifier": "5382f2ab-3c02-44b3-a26f-ceaff8b4df02",
                    "name": "Course of Action",
                    "properties": []
                }
            ],
            "valuestream": [
                {
                    "identifier": "7d9dd269-b44a-4067-b10c-2c0563f3efea",
                    "name": "Value Stream",
                    "properties": []
                }
            ],
            "businessactor": [
                {
                    "identifier": "35fad4b4-cf0b-46a8-832a-2da1d522b4b5",
                    "name": "Business Actor",
                    "properties": []
                },
                {
                    "identifier": "3a17d18c-78b4-47e1-bf17-0ff3ac741b7a",
                    "name": "Business Actor",
                    "properties": []
                },
                {
                    "identifier": "2d2786e0-cad0-4684-9bb4-efc806502b18",
                    "name": "a",
                    "properties": []
                }
            ],
            "businessrole": [
                {
                    "identifier": "dc41a04d-8386-4300-9aa2-b8d056e6e936",
                    "name": "Business Role",
                    "properties": []
                },
                {
                    "identifier": "cc07d17e-8450-4adf-84d1-ea7d92ec01ab",
                    "name": "Business Role A",
                    "properties": []
                },
                {
                    "identifier": "ba1e731c-ff79-4b07-8f37-bc57a7eea232",
                    "name": "Business Role B",
                    "properties": []
                }
            ],
            "businesscollaboration": [
                {
                    "identifier": "6657839b-3f7f-46e5-87b5-30299fee9e59",
                    "name": "Business Collaboration",
                    "properties": []
                },
                {
                    "identifier": "d0c22546-6ae6-4ba9-a141-222cc6eea16d",
                    "name": "Business Collaboration",
                    "properties": []
                }
            ],
            "businessinterface": [
                {
                    "identifier": "e65afa9e-ef98-4fc0-969b-6d7af4de225e",
                    "name": "Business Interface",
                    "properties": []
                }
            ],
            "businessprocess": [
                {
                    "identifier": "e75e68cf-0ca7-47dd-aeaf-071b69a87b12",
                    "name": "Business Process",
                    "properties": []
                },
                {
                    "identifier": "ce1bdaf3-3759-4df2-b2b9-7e4399042f7e",
                    "name": "Business Process A",
                    "properties": []
                },
                {
                    "identifier": "27d9e8b2-ded2-4eb1-8883-062cd3c8dc14",
                    "name": "Business Process B",
                    "properties": []
                },
                {
                    "identifier": "0e9e5337-c1d5-4465-8966-3c33e7aa9306",
                    "name": "Business Process C",
                    "properties": []
                },
                {
                    "identifier": "04c7398e-14b0-4a69-a61e-b729b94c3488",
                    "name": "Business Process D",
                    "properties": []
                },
                {
                    "identifier": "4ab9baa5-2ebe-4093-a8e8-fbd5b17b87c5",
                    "name": "a",
                    "properties": []
                },
                {
                    "identifier": "513c2b8d-78ab-484c-b9b4-6e8f721f31b0",
                    "name": "b",
                    "properties": []
                },
                {
                    "identifier": "75dfdfeb-77ae-4b35-812a-2eb131ba18df",
                    "name": "c",
                    "properties": []
                },
                {
                    "identifier": "5a22b53b-0f6d-4aae-8e08-51464d63f5ad",
                    "name": "c",
                    "properties": []
                },
                {
                    "identifier": "eeda300f-6a89-4324-a945-b5a3fe74297e",
                    "name": "c1",
                    "properties": []
                },
                {
                    "identifier": "b6c188e2-5026-4a90-816f-b0cb4c0f87fa",
                    "name": "c2",
                    "properties": []
                }
            ],
            "businessfunction": [
                {
                    "identifier": "aef2a0fd-3905-4db2-b527-08bb903d71a3",
                    "name": "Business Function",
                    "properties": []
                }
            ],
            "businessinteraction": [
                {
                    "identifier": "54b6e024-2be6-4686-a5b6-2ac904235db2",
                    "name": "Business Interaction",
                    "properties": []
                }
            ],
            "businessevent": [
                {
                    "identifier": "b359fb3d-fd7b-4752-8241-99b9cbe7d3e3",
                    "name": "Business Event",
                    "properties": []
                }
            ],
            "businessservice": [
                {
                    "identifier": "81be3358-9765-4163-b708-ec082742157f",
                    "name": "Business Service",
                    "properties": []
                }
            ],
            "businessobject": [
                {
                    "identifier": "9b2ba4e7-1dc2-48a2-bd74-0e3ddbb70fd8",
                    "name": "Business Object",
                    "properties": []
                }
            ],
            "contract": [
                {
                    "identifier": "fb5ae095-a556-4a8c-8a36-d7250d518ddb",
                    "name": "Contract",
                    "properties": []
                }
            ],
            "representation": [
                {
                    "identifier": "a7d30fa6-97e1-4d08-b482-c091e6664b00",
                    "name": "Representation",
                    "properties": []
                }
            ],
            "product": [
                {
                    "identifier": "f3b3b99e-31eb-489c-a215-e1f2ed384922",
                    "name": "Product",
                    "properties": []
                }
            ],
            "applicationcomponent": [
                {
                    "identifier": "fcb99b01-9ddd-48d7-92bd-e2f8abc92df6",
                    "name": "Application Component",
                    "properties": []
                },
                {
                    "identifier": "075bb62d-b139-4317-9a86-7ebbe6e1f903",
                    "name": "Application Component A",
                    "properties": []
                },
                {
                    "identifier": "f2c58f23-4d22-4721-96cb-48446b3630e3",
                    "name": "Application Component B",
                    "properties": []
                },
                {
                    "identifier": "800d0c20-463b-4de7-9b9a-eb2d4f1e459c",
                    "name": "Application Component C",
                    "properties": []
                },
                {
                    "identifier": "fdfa517d-8d14-4ce7-96c4-7dbab4002dbf",
                    "name": "a",
                    "properties": []
                },
                {
                    "identifier": "18b75b9f-3939-4432-9117-c461d98c62c0",
                    "name": "APP A",
                    "properties": []
                }
            ],
            "applicationcollaboration": [
                {
                    "identifier": "edfda2a4-44d9-4890-9b47-5f6dc02646f2",
                    "name": "Application Collaboration",
                    "properties": []
                },
                {
                    "identifier": "e0f43547-a404-41bd-9ccb-fbd9911b9605",
                    "name": "Application Collaboration",
                    "properties": []
                }
            ],
            "applicationinterface": [
                {
                    "identifier": "c8c8739c-6129-4a39-a2f7-c9423e42ba3e",
                    "name": "Application Interface",
                    "properties": []
                }
            ],
            "applicationfunction": [
                {
                    "identifier": "dca66cf0-db00-4600-b0ed-9e7b6e7017fc",
                    "name": "Application Function",
                    "properties": []
                },
                {
                    "identifier": "dc730608-6513-4a77-b7bb-deb496d677c3",
                    "name": "b",
                    "properties": []
                },
                {
                    "identifier": "9474f8e3-189e-4038-9aa3-07021dcdcb52",
                    "name": "a",
                    "properties": []
                },
                {
                    "identifier": "af707643-d2f6-427d-945e-fa78ed59b527",
                    "name": "FUNC A",
                    "properties": []
                },
                {
                    "identifier": "31df2412-ab11-41f8-aca0-bb17538761fb",
                    "name": "FUNC B",
                    "properties": []
                }
            ],
            "applicationinteraction": [
                {
                    "identifier": "e3481ac8-6efb-47ed-a1ee-3aa06174bdc8",
                    "name": "Application Interaction",
                    "properties": []
                }
            ],
            "applicationprocess": [
                {
                    "identifier": "f61a8f36-0ad8-4c5d-869b-4dddeb01fe33",
                    "name": "Application Process",
                    "properties": []
                }
            ],
            "applicationevent": [
                {
                    "identifier": "c974cdb4-7b3a-482b-8c48-eabd1a6e44de",
                    "name": "Application Event",
                    "properties": []
                }
            ],
            "applicationservice": [
                {
                    "identifier": "6fa66dd9-df7f-4fa6-86ad-d4f944c4dacc",
                    "name": "Application Service",
                    "properties": []
                },
                {
                    "identifier": "68754756-d593-4e81-bb52-f2f693b85853",
                    "name": "Application Service A",
                    "properties": []
                },
                {
                    "identifier": "34088132-b261-4950-9a83-0edb5b04450e",
                    "name": "c",
                    "properties": []
                },
                {
                    "identifier": "7ab087a8-e6d9-4226-a2ce-42d712b80736",
                    "name": "b",
                    "properties": []
                },
                {
                    "identifier": "4ffb22b7-5260-4b71-ae13-231bed0817f4",
                    "name": "SERV A",
                    "properties": []
                }
            ],
            "dataobject": [
                {
                    "identifier": "144823a3-ecfb-433b-af16-6e60fb4654a1",
                    "name": "Data Object",
                    "properties": []
                },
                {
                    "identifier": "5a3f59c1-46c1-4e55-a7a5-931e29d60a1d",
                    "name": "Data Object",
                    "properties": []
                }
            ],
            "node": [
                {
                    "identifier": "2b9be694-5975-4506-914b-20e022ed877c",
                    "name": "Node",
                    "properties": []
                },
                {
                    "identifier": "f935291b-77c1-4a3a-851e-1d74fbeb658c",
                    "name": "Node A",
                    "properties": []
                }
            ],
            "device": [
                {
                    "identifier": "fb367d58-be33-4236-800d-ee8c4accd067",
                    "name": "Device",
                    "properties": []
                },
                {
                    "identifier": "39c926a3-0000-477e-a917-9a00a49b905b",
                    "name": "Device A",
                    "properties": []
                }
            ],
            "systemsoftware": [
                {
                    "identifier": "3230b23c-151c-4c1d-8419-2c65da684497",
                    "name": "System Software",
                    "properties": []
                }
            ],
            "technologycollaboration": [
                {
                    "identifier": "1a00bda4-abbf-4f77-ad56-dc7cf87647b1",
                    "name": "Technology Collaboration",
                    "properties": []
                }
            ],
            "technologyinterface": [
                {
                    "identifier": "43dadc5f-fe3b-4289-8217-3b12e4aa61d2",
                    "name": "Technology Interface",
                    "properties": []
                }
            ],
            "path": [
                {
                    "identifier": "5e0dfda4-8cb9-4168-9a19-a75701dcf17b",
                    "name": "Path",
                    "properties": []
                }
            ],
            "communicationnetwork": [
                {
                    "identifier": "45c4824f-d318-4102-a6ef-3afedc21d39d",
                    "name": "Communication Network",
                    "properties": []
                }
            ],
            "technologyfunction": [
                {
                    "identifier": "531aa79b-5f86-46a7-b936-2d7ae28ac790",
                    "name": "Technology Function",
                    "properties": []
                }
            ],
            "technologyprocess": [
                {
                    "identifier": "dea8161a-61ea-4bed-ac30-ad7573624d6a",
                    "name": "Technology Process",
                    "properties": []
                }
            ],
            "technologyinteraction": [
                {
                    "identifier": "186f5dff-ec81-442a-b3eb-c0b6b4f5f058",
                    "name": "Technology Interaction",
                    "properties": []
                }
            ],
            "technologyevent": [
                {
                    "identifier": "004aafd7-2516-4bb1-89dd-84259d144bf0",
                    "name": "Technology Event",
                    "properties": []
                }
            ],
            "technologyservice": [
                {
                    "identifier": "12d0c9e2-a5b5-43d9-bbef-c7fd094c3358",
                    "name": "Technology Service",
                    "properties": []
                },
                {
                    "identifier": "25a451a7-dd19-45c8-a704-9c8a4bb6f144",
                    "name": "c",
                    "properties": []
                }
            ],
            "equipment": [
                {
                    "identifier": "215e3008-ec12-477e-a3e7-8faacf946465",
                    "name": "Equipment",
                    "properties": []
                }
            ],
            "facility": [
                {
                    "identifier": "390d68ab-1e1f-4524-92f8-4c0d7ab0322c",
                    "name": "Facility",
                    "properties": []
                }
            ],
            "distributionnetwork": [
                {
                    "identifier": "26b7eda2-fd42-4382-a2f6-ee4e50c239e7",
                    "name": "Distribution Network",
                    "properties": []
                }
            ],
            "material": [
                {
                    "identifier": "cad63317-249b-48f3-89c6-4e229737ddab",
                    "name": "Material",
                    "properties": []
                }
            ],
            "artifact": [
                {
                    "identifier": "7a3905c3-ad99-47be-a33f-a8f99dd0b1e1",
                    "name": "Deploy A",
                    "properties": []
                }
            ],
            "stakeholder": [
                {
                    "identifier": "2403fb49-d671-4a96-8f55-13cb68185e4a",
                    "name": "Stakeholder",
                    "properties": []
                }
            ],
            "driver": [
                {
                    "identifier": "e1b06769-f45a-4866-8db9-d6a9b85866fd",
                    "name": "Driver",
                    "properties": []
                },
                {
                    "identifier": "1493131e-477d-4817-a551-4bb147ec82c1",
                    "name": "Driver",
                    "properties": []
                }
            ],
            "assessment": [
                {
                    "identifier": "e767c36e-8800-494b-b408-829af1c0cfde",
                    "name": "Assessment",
                    "properties": []
                }
            ],
            "goal": [
                {
                    "identifier": "dcaee901-0c56-44de-80e0-a1c2dc0f1d84",
                    "name": "Goal",
                    "properties": []
                },
                {
                    "identifier": "1aef2a19-28fe-4c6a-9273-ea0603ff9a8d",
                    "name": "Goal",
                    "properties": []
                }
            ],
            "outcome": [
                {
                    "identifier": "2a0436c3-e57f-4b50-88a1-798012cef218",
                    "name": "Outcome",
                    "properties": []
                }
            ],
            "principle": [
                {
                    "identifier": "55085a11-fe05-4262-87df-dda8116c037c",
                    "name": "Principle",
                    "properties": []
                }
            ],
            "requirement": [
                {
                    "identifier": "9ff9bda5-55d1-449e-8253-071a6cc0cf71",
                    "name": "Requirement",
                    "properties": []
                }
            ],
            "constraint": [
                {
                    "identifier": "2cef6c30-f227-42c8-8ac0-f98612e478a5",
                    "name": "Constraint",
                    "properties": []
                }
            ],
            "meaning": [
                {
                    "identifier": "1d954579-af9d-4e98-a7b7-a116935aff76",
                    "name": "Meaning",
                    "properties": []
                }
            ],
            "value": [
                {
                    "identifier": "6ab7f2ae-0028-4f6a-95ea-bc98cb691329",
                    "name": "Value",
                    "properties": []
                }
            ],
            "workpackage": [
                {
                    "identifier": "9babecb9-3ddf-4b7e-a2b1-80cea14f714d",
                    "name": "Work Package",
                    "properties": []
                }
            ],
            "deliverable": [
                {
                    "identifier": "4043fbcf-7b03-43ea-b584-7dd66ece4e7d",
                    "name": "Deliverable",
                    "properties": []
                }
            ],
            "implementationevent": [
                {
                    "identifier": "6b1112e8-2b2f-47f1-bb83-4948ca1099f2",
                    "name": "Implementation Event",
                    "properties": []
                }
            ],
            "plateau": [
                {
                    "identifier": "30301dbd-300b-4657-b633-44ddea33d1ec",
                    "name": "Plateau",
                    "properties": []
                }
            ],
            "gap": [
                {
                    "identifier": "5358184a-b360-4465-993e-a079af1f7bc9",
                    "name": "Gap",
                    "properties": []
                }
            ],
            "location": [
                {
                    "identifier": "8ab8d668-3852-4bf8-a43e-2fcc89c01c79",
                    "name": "Location",
                    "properties": []
                }
            ],
            "andjunction": [
                {
                    "identifier": "bc0948ad-1881-4415-a09c-054d92b3e54b",
                    "name": "bc0948ad-1881-4415-a09c-054d92b3e54b"
                }
            ],
            "grouping": [
                {
                    "identifier": "321beea6-1381-42b9-8657-d1cbd99e8afc",
                    "name": "Grouping",
                    "properties": []
                }
            ],
            "orjunction": [
                {
                    "identifier": "2ab6d200-8f6a-4185-b0a4-4f6828107951",
                    "name": "2ab6d200-8f6a-4185-b0a4-4f6828107951"
                }
            ]
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
                },
                {
                    "identifier": "ac73d061-b81f-4768-b24a-575804b8f552",
                    "sourceId": "fdfa517d-8d14-4ce7-96c4-7dbab4002dbf",
                    "targetId": "dc730608-6513-4a77-b7bb-deb496d677c3"
                },
                {
                    "identifier": "d4300339-9514-42c6-a740-af360f8643c2",
                    "sourceId": "2d2786e0-cad0-4684-9bb4-efc806502b18",
                    "targetId": "513c2b8d-78ab-484c-b9b4-6e8f721f31b0"
                },
                {
                    "identifier": "6bdd8c51-3590-4b1f-b116-e389622c0f55",
                    "sourceId": "18b75b9f-3939-4432-9117-c461d98c62c0",
                    "targetId": "af707643-d2f6-427d-945e-fa78ed59b527"
                },
                {
                    "identifier": "450e3213-0e19-4138-b686-25a9efa04655",
                    "sourceId": "18b75b9f-3939-4432-9117-c461d98c62c0",
                    "targetId": "31df2412-ab11-41f8-aca0-bb17538761fb"
                },
                {
                    "identifier": "c80974d3-e8c1-4f0b-ac85-47105a5f2756",
                    "sourceId": "39c926a3-0000-477e-a917-9a00a49b905b",
                    "targetId": "7a3905c3-ad99-47be-a33f-a8f99dd0b1e1"
                }
            ],
            "triggeringrelationship": [
                {
                    "identifier": "4d23b33a-7250-44a0-b47d-0b1f010257d1",
                    "sourceId": "3a17d18c-78b4-47e1-bf17-0ff3ac741b7a",
                    "targetId": "ce1bdaf3-3759-4df2-b2b9-7e4399042f7e"
                },
                {
                    "identifier": "5a3049be-7f58-4bee-aa6d-1d912d63f2e6",
                    "sourceId": "ce1bdaf3-3759-4df2-b2b9-7e4399042f7e",
                    "targetId": "bc0948ad-1881-4415-a09c-054d92b3e54b"
                },
                {
                    "identifier": "48a5a7b5-653e-4704-9a33-af61a331ea04",
                    "sourceId": "bc0948ad-1881-4415-a09c-054d92b3e54b",
                    "targetId": "27d9e8b2-ded2-4eb1-8883-062cd3c8dc14"
                },
                {
                    "identifier": "09b31573-096b-45c9-91b7-9d1d0cbee1b4",
                    "sourceId": "bc0948ad-1881-4415-a09c-054d92b3e54b",
                    "targetId": "0e9e5337-c1d5-4465-8966-3c33e7aa9306"
                },
                {
                    "identifier": "f22af369-f103-484a-877e-e5da26651743",
                    "sourceId": "27d9e8b2-ded2-4eb1-8883-062cd3c8dc14",
                    "targetId": "2ab6d200-8f6a-4185-b0a4-4f6828107951"
                },
                {
                    "identifier": "18efad41-dcba-41a8-a013-ace3080c0a64",
                    "sourceId": "2ab6d200-8f6a-4185-b0a4-4f6828107951",
                    "targetId": "04c7398e-14b0-4a69-a61e-b729b94c3488"
                },
                {
                    "identifier": "50312aeb-a38d-47ce-aa0b-644a08515a68",
                    "sourceId": "0e9e5337-c1d5-4465-8966-3c33e7aa9306",
                    "targetId": "2ab6d200-8f6a-4185-b0a4-4f6828107951"
                },
                {
                    "identifier": "fb81c5f0-efa0-43cd-bbce-85f86d78f319",
                    "sourceId": "fdfa517d-8d14-4ce7-96c4-7dbab4002dbf",
                    "targetId": "dc730608-6513-4a77-b7bb-deb496d677c3"
                },
                {
                    "identifier": "1242e164-ab02-43b0-bc1b-1b2bf55c2e9e",
                    "sourceId": "4ab9baa5-2ebe-4093-a8e8-fbd5b17b87c5",
                    "targetId": "513c2b8d-78ab-484c-b9b4-6e8f721f31b0"
                },
                {
                    "identifier": "e29153ad-45c8-44c2-a532-2d15a200c733",
                    "sourceId": "513c2b8d-78ab-484c-b9b4-6e8f721f31b0",
                    "targetId": "75dfdfeb-77ae-4b35-812a-2eb131ba18df"
                }
            ],
            "servingrelationship": [
                {
                    "identifier": "ac9f5c9f-fddd-45c6-9234-4768c0854028",
                    "sourceId": "075bb62d-b139-4317-9a86-7ebbe6e1f903",
                    "targetId": "3a17d18c-78b4-47e1-bf17-0ff3ac741b7a"
                },
                {
                    "identifier": "cd07759c-1068-4de5-9de6-aa65da2ee9a5",
                    "sourceId": "7ab087a8-e6d9-4226-a2ce-42d712b80736",
                    "targetId": "5a22b53b-0f6d-4aae-8e08-51464d63f5ad"
                },
                {
                    "identifier": "e0e4ad30-7633-49a8-a267-e35d48a0dac4",
                    "sourceId": "25a451a7-dd19-45c8-a704-9c8a4bb6f144",
                    "targetId": "dc730608-6513-4a77-b7bb-deb496d677c3"
                },
                {
                    "identifier": "712bbba6-0e43-4ca2-949c-ece39f949a1a",
                    "sourceId": "68754756-d593-4e81-bb52-f2f693b85853",
                    "targetId": "800d0c20-463b-4de7-9b9a-eb2d4f1e459c"
                },
                {
                    "identifier": "2c321e38-fa96-451b-acc7-76d38eebef33",
                    "sourceId": "075bb62d-b139-4317-9a86-7ebbe6e1f903",
                    "targetId": "68754756-d593-4e81-bb52-f2f693b85853"
                }
            ],
            "flowrelationship": [
                {
                    "identifier": "77bbbe2d-025d-42ee-b98a-38a34add320e",
                    "sourceId": "e0f43547-a404-41bd-9ccb-fbd9911b9605",
                    "targetId": "075bb62d-b139-4317-9a86-7ebbe6e1f903"
                },
                {
                    "identifier": "d45aaefe-6386-41a9-bb0a-6ebb400dc8ec",
                    "sourceId": "513c2b8d-78ab-484c-b9b4-6e8f721f31b0",
                    "targetId": "eeda300f-6a89-4324-a945-b5a3fe74297e"
                },
                {
                    "identifier": "e65bf3dd-9978-4a8f-8a14-847e9b5f074b",
                    "sourceId": "b6c188e2-5026-4a90-816f-b0cb4c0f87fa",
                    "targetId": "513c2b8d-78ab-484c-b9b4-6e8f721f31b0"
                }
            ],
            "accessrelationship": [
                {
                    "identifier": "23f31999-3b71-43b8-a81b-2ed58ffbbdfd",
                    "sourceId": "e0f43547-a404-41bd-9ccb-fbd9911b9605",
                    "targetId": "5a3f59c1-46c1-4e55-a7a5-931e29d60a1d"
                },
                {
                    "identifier": "3761a5af-da92-473a-bb17-4551a8c9eeff",
                    "sourceId": "5a3f59c1-46c1-4e55-a7a5-931e29d60a1d",
                    "targetId": "075bb62d-b139-4317-9a86-7ebbe6e1f903"
                },
                {
                    "identifier": "e9f7c991-0e2b-4d59-a99b-9426f09ac3d4",
                    "sourceId": "800d0c20-463b-4de7-9b9a-eb2d4f1e459c",
                    "targetId": "5a3f59c1-46c1-4e55-a7a5-931e29d60a1d",
                    "isBidirectional": true
                },
                {
                    "identifier": "b8de732e-2ac2-4972-9e0e-8accc815ecfa",
                    "sourceId": "f2c58f23-4d22-4721-96cb-48446b3630e3",
                    "targetId": "5a3f59c1-46c1-4e55-a7a5-931e29d60a1d",
                    "isBidirectional": true
                }
            ],
            "associationrelationship": [
                {
                    "identifier": "25cfe97b-0b18-4d97-8780-f6ed8f54ecc1",
                    "sourceId": "5a3f59c1-46c1-4e55-a7a5-931e29d60a1d",
                    "targetId": "77bbbe2d-025d-42ee-b98a-38a34add320e",
                    "isBidirectional": true
                },
                {
                    "identifier": "746fbbce-0f72-467b-a524-f4c9cdfe0d57",
                    "sourceId": "ce1bdaf3-3759-4df2-b2b9-7e4399042f7e",
                    "targetId": "f2c58f23-4d22-4721-96cb-48446b3630e3",
                    "isBidirectional": true
                },
                {
                    "identifier": "95562b72-613c-4193-842c-0b842384496a",
                    "sourceId": "f2c58f23-4d22-4721-96cb-48446b3630e3",
                    "targetId": "075bb62d-b139-4317-9a86-7ebbe6e1f903"
                }
            ],
            "compositionrelationship": [
                {
                    "identifier": "d9f63e5b-20d7-41d2-8b03-f0a3f1838494",
                    "sourceId": "f2c58f23-4d22-4721-96cb-48446b3630e3",
                    "targetId": "800d0c20-463b-4de7-9b9a-eb2d4f1e459c"
                },
                {
                    "identifier": "786fcaf9-484b-43ec-a895-1ee92ab87135",
                    "sourceId": "321beea6-1381-42b9-8657-d1cbd99e8afc",
                    "targetId": "1493131e-477d-4817-a551-4bb147ec82c1"
                },
                {
                    "identifier": "7468c05e-b2d2-4f16-bc88-787a7f086fc8",
                    "sourceId": "321beea6-1381-42b9-8657-d1cbd99e8afc",
                    "targetId": "1aef2a19-28fe-4c6a-9273-ea0603ff9a8d"
                },
                {
                    "identifier": "5889e74c-e4c7-40e5-b1e7-0883d7e5d5e6",
                    "sourceId": "f935291b-77c1-4a3a-851e-1d74fbeb658c",
                    "targetId": "39c926a3-0000-477e-a917-9a00a49b905b"
                }
            ],
            "realizationrelationship": [
                {
                    "identifier": "6c7e4334-6d96-48ca-acbe-d25a7c7a119c",
                    "sourceId": "f2c58f23-4d22-4721-96cb-48446b3630e3",
                    "targetId": "68754756-d593-4e81-bb52-f2f693b85853"
                },
                {
                    "identifier": "33c89587-816c-42a3-aba1-13e6c2e0b03e",
                    "sourceId": "dc730608-6513-4a77-b7bb-deb496d677c3",
                    "targetId": "34088132-b261-4950-9a83-0edb5b04450e"
                },
                {
                    "identifier": "5ed0815a-fe4e-4fd4-a732-13260b699d61",
                    "sourceId": "9474f8e3-189e-4038-9aa3-07021dcdcb52",
                    "targetId": "7ab087a8-e6d9-4226-a2ce-42d712b80736"
                },
                {
                    "identifier": "726bbbc5-80b7-4159-b717-860383f399cc",
                    "sourceId": "af707643-d2f6-427d-945e-fa78ed59b527",
                    "targetId": "4ffb22b7-5260-4b71-ae13-231bed0817f4"
                },
                {
                    "identifier": "2db6ba73-6d53-471a-aa3b-08c39b806aa7",
                    "sourceId": "31df2412-ab11-41f8-aca0-bb17538761fb",
                    "targetId": "4ffb22b7-5260-4b71-ae13-231bed0817f4"
                },
                {
                    "identifier": "8c71da69-809c-4bd7-8635-5158ae1f4932",
                    "sourceId": "7a3905c3-ad99-47be-a33f-a8f99dd0b1e1",
                    "targetId": "075bb62d-b139-4317-9a86-7ebbe6e1f903"
                }
            ],
            "influencerelationship": [
                {
                    "identifier": "d8fea24c-3d1b-49e3-ae0a-86a123da1470",
                    "sourceId": "1493131e-477d-4817-a551-4bb147ec82c1",
                    "targetId": "1aef2a19-28fe-4c6a-9273-ea0603ff9a8d"
                }
            ],
            "specializationrelationship": [
                {
                    "identifier": "13de200f-2a49-4639-9b0b-827dd67b522d",
                    "sourceId": "ba1e731c-ff79-4b07-8f37-bc57a7eea232",
                    "targetId": "cc07d17e-8450-4adf-84d1-ea7d92ec01ab"
                },
                {
                    "identifier": "3dc40049-e8ec-4488-8e19-a3ba4c05e161",
                    "sourceId": "4ab9baa5-2ebe-4093-a8e8-fbd5b17b87c5",
                    "targetId": "513c2b8d-78ab-484c-b9b4-6e8f721f31b0"
                },
                {
                    "identifier": "59248101-be63-4fb2-962c-342d0ae87c19",
                    "sourceId": "513c2b8d-78ab-484c-b9b4-6e8f721f31b0",
                    "targetId": "75dfdfeb-77ae-4b35-812a-2eb131ba18df"
                }
            ]
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
                        "modelNodeId": "35fad4b4-cf0b-46a8-832a-2da1d522b4b5",
                        "viewNodeId": "09319d46-309b-41e8-b3ed-464e441cbae7",
                        "name": "Business Actor",
                        "type": "businessactor",
                        "x": 168,
                        "y": 25,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "dc41a04d-8386-4300-9aa2-b8d056e6e936",
                        "viewNodeId": "e1ca4331-f457-4a70-bdfc-c8930e07a802",
                        "name": "Business Role",
                        "type": "businessrole",
                        "x": 300,
                        "y": 25,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "6657839b-3f7f-46e5-87b5-30299fee9e59",
                        "viewNodeId": "f21ee829-b457-463d-93d1-1a0f9b471fa2",
                        "name": "Business Collaboration",
                        "type": "businesscollaboration",
                        "x": 432,
                        "y": 25,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "e65afa9e-ef98-4fc0-969b-6d7af4de225e",
                        "viewNodeId": "5d4e9d36-9cc1-4a51-89b9-0af437648b17",
                        "name": "Business Interface",
                        "type": "businessinterface",
                        "x": 564,
                        "y": 25,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "e75e68cf-0ca7-47dd-aeaf-071b69a87b12",
                        "viewNodeId": "dc337aa5-a716-4d90-8a0e-62a583851927",
                        "name": "Business Process",
                        "type": "businessprocess",
                        "x": 696,
                        "y": 24,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "aef2a0fd-3905-4db2-b527-08bb903d71a3",
                        "viewNodeId": "c394f278-8f25-4600-acf8-1da10978a094",
                        "name": "Business Function",
                        "type": "businessfunction",
                        "x": 828,
                        "y": 25,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "54b6e024-2be6-4686-a5b6-2ac904235db2",
                        "viewNodeId": "70c7ee93-7d9a-4b28-8623-697061cababd",
                        "name": "Business Interaction",
                        "type": "businessinteraction",
                        "x": 960,
                        "y": 25,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "b359fb3d-fd7b-4752-8241-99b9cbe7d3e3",
                        "viewNodeId": "45a88db4-2204-4d96-be8b-0188e2198602",
                        "name": "Business Event",
                        "type": "businessevent",
                        "x": 1092,
                        "y": 24,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "81be3358-9765-4163-b708-ec082742157f",
                        "viewNodeId": "6b5e91c1-0fd7-4291-8bbd-ca2c7fdc296d",
                        "name": "Business Service",
                        "type": "businessservice",
                        "x": 38,
                        "y": 96,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "9b2ba4e7-1dc2-48a2-bd74-0e3ddbb70fd8",
                        "viewNodeId": "0ceddcc2-26e3-4a7a-9782-7f6d1191dce8",
                        "name": "Business Object",
                        "type": "businessobject",
                        "x": 168,
                        "y": 96,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "fb5ae095-a556-4a8c-8a36-d7250d518ddb",
                        "viewNodeId": "ae0a3604-9f8a-4530-89d2-6b6bbd94e0e2",
                        "name": "Contract",
                        "type": "contract",
                        "x": 300,
                        "y": 96,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "a7d30fa6-97e1-4d08-b482-c091e6664b00",
                        "viewNodeId": "af979285-e7e2-4eed-bf60-9de338a4cc2e",
                        "name": "Representation",
                        "type": "representation",
                        "x": 432,
                        "y": 96,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "f3b3b99e-31eb-489c-a215-e1f2ed384922",
                        "viewNodeId": "827c4195-28ca-4176-9dba-958ee3019ce8",
                        "name": "Product",
                        "type": "product",
                        "x": 564,
                        "y": 96,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "fcb99b01-9ddd-48d7-92bd-e2f8abc92df6",
                        "viewNodeId": "9ad3067f-0943-4b2b-887c-d83ef22a69b0",
                        "name": "Application Component",
                        "type": "applicationcomponent",
                        "x": 698,
                        "y": 95,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "edfda2a4-44d9-4890-9b47-5f6dc02646f2",
                        "viewNodeId": "5b8800e7-ed4c-4025-9733-0d2222a50218",
                        "name": "Application Collaboration",
                        "type": "applicationcollaboration",
                        "x": 832,
                        "y": 93,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "c8c8739c-6129-4a39-a2f7-c9423e42ba3e",
                        "viewNodeId": "558d054f-fd3d-4d51-9ea8-e81ab7c18dfb",
                        "name": "Application Interface",
                        "type": "applicationinterface",
                        "x": 963,
                        "y": 92,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "dca66cf0-db00-4600-b0ed-9e7b6e7017fc",
                        "viewNodeId": "a461b542-f2a5-4b7e-a99a-a1c1cb52a294",
                        "name": "Application Function",
                        "type": "applicationfunction",
                        "x": 1096,
                        "y": 91,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "e3481ac8-6efb-47ed-a1ee-3aa06174bdc8",
                        "viewNodeId": "42829e17-46dd-48b9-9174-1ce2cd827be0",
                        "name": "Application Interaction",
                        "type": "applicationinteraction",
                        "x": 38,
                        "y": 164,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "f61a8f36-0ad8-4c5d-869b-4dddeb01fe33",
                        "viewNodeId": "73ed9fad-8dbc-4593-bbd7-7e2bf6b610a0",
                        "name": "Application Process",
                        "type": "applicationprocess",
                        "x": 168,
                        "y": 164,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "c974cdb4-7b3a-482b-8c48-eabd1a6e44de",
                        "viewNodeId": "b8ecfe20-4c9a-407e-8a7b-ac62dda48dfc",
                        "name": "Application Event",
                        "type": "applicationevent",
                        "x": 301,
                        "y": 164,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "6fa66dd9-df7f-4fa6-86ad-d4f944c4dacc",
                        "viewNodeId": "90bfe2bb-dbc8-4765-aec7-78b9fe41f81c",
                        "name": "Application Service",
                        "type": "applicationservice",
                        "x": 432,
                        "y": 164,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "144823a3-ecfb-433b-af16-6e60fb4654a1",
                        "viewNodeId": "3a460def-e24a-4dbb-9187-363e0c5d20a8",
                        "name": "Data Object",
                        "type": "dataobject",
                        "x": 564,
                        "y": 164,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "2b9be694-5975-4506-914b-20e022ed877c",
                        "viewNodeId": "4d0cd0d3-6233-4b78-aaab-25800e6e7df9",
                        "name": "Node",
                        "type": "node",
                        "x": 696,
                        "y": 164,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "fb367d58-be33-4236-800d-ee8c4accd067",
                        "viewNodeId": "50675017-c316-496c-b26f-86856a350ae6",
                        "name": "Device",
                        "type": "device",
                        "x": 833,
                        "y": 164,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "3230b23c-151c-4c1d-8419-2c65da684497",
                        "viewNodeId": "dc7c475b-c85c-4b78-8b11-6b9564944d20",
                        "name": "System Software",
                        "type": "systemsoftware",
                        "x": 964,
                        "y": 164,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "1a00bda4-abbf-4f77-ad56-dc7cf87647b1",
                        "viewNodeId": "a2e52388-1bb1-41d5-8300-f5a230b68152",
                        "name": "Technology Collaboration",
                        "type": "technologycollaboration",
                        "x": 1098,
                        "y": 163,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "43dadc5f-fe3b-4289-8217-3b12e4aa61d2",
                        "viewNodeId": "564822af-89af-4465-962d-aa31b2812802",
                        "name": "Technology Interface",
                        "type": "technologyinterface",
                        "x": 41,
                        "y": 232,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "5e0dfda4-8cb9-4168-9a19-a75701dcf17b",
                        "viewNodeId": "57ec2fc2-ae0d-4fe0-97db-7d501d833f4a",
                        "name": "Path",
                        "type": "path",
                        "x": 170,
                        "y": 230,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "45c4824f-d318-4102-a6ef-3afedc21d39d",
                        "viewNodeId": "ec8af5c4-85b3-42c9-9cfe-1f8a7b6b124a",
                        "name": "Communication Network",
                        "type": "communicationnetwork",
                        "x": 300,
                        "y": 229,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "531aa79b-5f86-46a7-b936-2d7ae28ac790",
                        "viewNodeId": "1b57f266-7fd9-4e8b-a791-97009428ca77",
                        "name": "Technology Function",
                        "type": "technologyfunction",
                        "x": 433,
                        "y": 228,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "dea8161a-61ea-4bed-ac30-ad7573624d6a",
                        "viewNodeId": "b47aa354-3196-4019-9e78-0c387d4fe127",
                        "name": "Technology Process",
                        "type": "technologyprocess",
                        "x": 564,
                        "y": 232,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "186f5dff-ec81-442a-b3eb-c0b6b4f5f058",
                        "viewNodeId": "df31db46-d32e-45d8-9f4f-2322bb6588b8",
                        "name": "Technology Interaction",
                        "type": "technologyinteraction",
                        "x": 696,
                        "y": 232,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "004aafd7-2516-4bb1-89dd-84259d144bf0",
                        "viewNodeId": "5540a827-e0bf-4840-b8b8-0e4672c224c2",
                        "name": "Technology Event",
                        "type": "technologyevent",
                        "x": 828,
                        "y": 232,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "12d0c9e2-a5b5-43d9-bbef-c7fd094c3358",
                        "viewNodeId": "95267fde-4680-4bb1-b463-79d7b7951a36",
                        "name": "Technology Service",
                        "type": "technologyservice",
                        "x": 964,
                        "y": 232,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "215e3008-ec12-477e-a3e7-8faacf946465",
                        "viewNodeId": "706a0788-4cf0-45da-b3c1-c4529da03a18",
                        "name": "Equipment",
                        "type": "equipment",
                        "x": 1098,
                        "y": 232,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "390d68ab-1e1f-4524-92f8-4c0d7ab0322c",
                        "viewNodeId": "c8aefb5d-d9b8-4049-8e38-584fa5f72c1c",
                        "name": "Facility",
                        "type": "facility",
                        "x": 41,
                        "y": 300,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "26b7eda2-fd42-4382-a2f6-ee4e50c239e7",
                        "viewNodeId": "7743784f-ba42-4ad6-9910-bcbb89b6fb26",
                        "name": "Distribution Network",
                        "type": "distributionnetwork",
                        "x": 170,
                        "y": 300,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "cad63317-249b-48f3-89c6-4e229737ddab",
                        "viewNodeId": "cef40a9d-7602-48e6-a8e2-92eae710d5e0",
                        "name": "Material",
                        "type": "material",
                        "x": 300,
                        "y": 300,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "2403fb49-d671-4a96-8f55-13cb68185e4a",
                        "viewNodeId": "e9d3f70d-2647-41ac-9365-5b10622aa751",
                        "name": "Stakeholder",
                        "type": "stakeholder",
                        "x": 433,
                        "y": 300,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "e1b06769-f45a-4866-8db9-d6a9b85866fd",
                        "viewNodeId": "baba513c-ddb4-4063-838b-eb2142615b80",
                        "name": "Driver",
                        "type": "driver",
                        "x": 564,
                        "y": 300,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "e767c36e-8800-494b-b408-829af1c0cfde",
                        "viewNodeId": "b9143814-a21b-42cb-aa79-c2b00bb2e730",
                        "name": "Assessment",
                        "type": "assessment",
                        "x": 696,
                        "y": 300,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "dcaee901-0c56-44de-80e0-a1c2dc0f1d84",
                        "viewNodeId": "6835ed97-5f38-4266-b74f-a18efb0ac90c",
                        "name": "Goal",
                        "type": "goal",
                        "x": 828,
                        "y": 300,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "2a0436c3-e57f-4b50-88a1-798012cef218",
                        "viewNodeId": "01dc4590-1d28-4cd1-b012-bb2c49ed32e0",
                        "name": "Outcome",
                        "type": "outcome",
                        "x": 964,
                        "y": 300,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "55085a11-fe05-4262-87df-dda8116c037c",
                        "viewNodeId": "46f94653-553f-451c-acaa-7300281e1045",
                        "name": "Principle",
                        "type": "principle",
                        "x": 1098,
                        "y": 300,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "9ff9bda5-55d1-449e-8253-071a6cc0cf71",
                        "viewNodeId": "a22fb150-c8ef-4476-934b-2e101b3b63f0",
                        "name": "Requirement",
                        "type": "requirement",
                        "x": 41,
                        "y": 372,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "2cef6c30-f227-42c8-8ac0-f98612e478a5",
                        "viewNodeId": "a838ccc5-b669-4761-9331-5d4b7753bdbe",
                        "name": "Constraint",
                        "type": "constraint",
                        "x": 170,
                        "y": 372,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "1d954579-af9d-4e98-a7b7-a116935aff76",
                        "viewNodeId": "33ede383-e21d-4855-a01a-18a9aeaa7dec",
                        "name": "Meaning",
                        "type": "meaning",
                        "x": 300,
                        "y": 372,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "6ab7f2ae-0028-4f6a-95ea-bc98cb691329",
                        "viewNodeId": "ce17eb69-fadf-4248-a4d2-44da10433752",
                        "name": "Value",
                        "type": "value",
                        "x": 432,
                        "y": 372,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "9babecb9-3ddf-4b7e-a2b1-80cea14f714d",
                        "viewNodeId": "026de87a-8657-4617-8354-2a0e08f3c0a1",
                        "name": "Work Package",
                        "type": "workpackage",
                        "x": 571,
                        "y": 376,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "4043fbcf-7b03-43ea-b584-7dd66ece4e7d",
                        "viewNodeId": "708f712f-62d9-49b2-9757-c86f6adfbbf2",
                        "name": "Deliverable",
                        "type": "deliverable",
                        "x": 702,
                        "y": 374,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "6b1112e8-2b2f-47f1-bb83-4948ca1099f2",
                        "viewNodeId": "2684cbce-b014-4a58-874e-f8db69a36f1f",
                        "name": "Implementation Event",
                        "type": "implementationevent",
                        "x": 833,
                        "y": 371,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "30301dbd-300b-4657-b633-44ddea33d1ec",
                        "viewNodeId": "10fc5ff4-0ac1-44df-8ffa-35976e50edfe",
                        "name": "Plateau",
                        "type": "plateau",
                        "x": 964,
                        "y": 370,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "5358184a-b360-4465-993e-a079af1f7bc9",
                        "viewNodeId": "6ad49388-25eb-4d31-89d5-f804b53e5977",
                        "name": "Gap",
                        "type": "gap",
                        "x": 1098,
                        "y": 370,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "40eb5bd6-4d7c-4c27-98a8-602f935ed405",
                        "viewNodeId": "c8a4603d-5da1-405c-b6ad-228aecdfcf74",
                        "name": "Resource",
                        "type": "resource",
                        "x": 41,
                        "y": 442,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "6be02ba1-0489-4ea4-b62b-a22d302cbefe",
                        "viewNodeId": "40bcf194-8134-41f8-ac39-29bfa42a1881",
                        "name": "Capability",
                        "type": "capability",
                        "x": 170,
                        "y": 442,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "5382f2ab-3c02-44b3-a26f-ceaff8b4df02",
                        "viewNodeId": "f77880d3-7a7f-4ac6-b681-b263c123b73e",
                        "name": "Course of Action",
                        "type": "courseofaction",
                        "x": 301,
                        "y": 442,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "7d9dd269-b44a-4067-b10c-2c0563f3efea",
                        "viewNodeId": "6ffc3788-6707-442a-b506-1daa5ff6709c",
                        "name": "Value Stream",
                        "type": "valuestream",
                        "x": 432,
                        "y": 442,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    }
                ],
                "viewRelationships": []
            },
            {
                "bounds": {
                    "vertical": {
                        "min": 36,
                        "max": 829
                    },
                    "horizontal": {
                        "min": 36,
                        "max": 1324
                    }
                },

                "id": "9a578be1-0cde-4e09-91e6-f0742708a0da",
                "name": "Relationships",
                "viewNodes": [
                    {

                        "modelNodeId": "3a17d18c-78b4-47e1-bf17-0ff3ac741b7a",
                        "viewNodeId": "0d48039d-ed53-4e60-8045-1af4f1e5db6f",
                        "name": "Business Actor",
                        "type": "businessactor",
                        "x": 492,
                        "y": 101,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "d0c22546-6ae6-4ba9-a141-222cc6eea16d",
                        "viewNodeId": "aedaf627-eae2-4df1-a27f-7f349d57a094",
                        "name": "Business Collaboration",
                        "type": "businesscollaboration",
                        "x": 36,
                        "y": 101,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "cc07d17e-8450-4adf-84d1-ea7d92ec01ab",
                        "viewNodeId": "1620e51a-453c-411e-8c1c-8bf9d7545c93",
                        "name": "Business Role A",
                        "type": "businessrole",
                        "x": 264,
                        "y": 101,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "ce1bdaf3-3759-4df2-b2b9-7e4399042f7e",
                        "viewNodeId": "c75cd717-81d4-44df-af36-ac7b711359e0",
                        "name": "Business Process A",
                        "type": "businessprocess",
                        "x": 708,
                        "y": 101,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "075bb62d-b139-4317-9a86-7ebbe6e1f903",
                        "viewNodeId": "8e5c27b0-df78-403d-b9fd-4fd260f9f77b",
                        "name": "Application Component A",
                        "type": "applicationcomponent",
                        "x": 492,
                        "y": 300,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "e0f43547-a404-41bd-9ccb-fbd9911b9605",
                        "viewNodeId": "1d7785c3-503f-4f99-b9f8-38ea8fcf791a",
                        "name": "Application Collaboration",
                        "type": "applicationcollaboration",
                        "x": 108,
                        "y": 300,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "5a3f59c1-46c1-4e55-a7a5-931e29d60a1d",
                        "viewNodeId": "e3b31afc-2a37-4918-96a4-25e9366cefb5",
                        "name": "Data Object",
                        "type": "dataobject",
                        "x": 300,
                        "y": 480,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "bc0948ad-1881-4415-a09c-054d92b3e54b",
                        "viewNodeId": "d59b73be-0352-4c10-a232-5ef019b2dfcd",
                        "name": "bc0948ad-1881-4415-a09c-054d92b3e54b",
                        "type": "andjunction",
                        "x": 888,
                        "y": 121,
                        "width": 15,
                        "height": 15,
                        "parent": null
                    },
                    {

                        "modelNodeId": "27d9e8b2-ded2-4eb1-8883-062cd3c8dc14",
                        "viewNodeId": "58c94f63-7400-4e61-95c2-0fca75ba926e",
                        "name": "Business Process B",
                        "type": "businessprocess",
                        "x": 960,
                        "y": 36,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "0e9e5337-c1d5-4465-8966-3c33e7aa9306",
                        "viewNodeId": "c61bbc9c-7895-4fad-b9be-fbe75e08bbac",
                        "name": "Business Process C",
                        "type": "businessprocess",
                        "x": 957,
                        "y": 159,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "f2c58f23-4d22-4721-96cb-48446b3630e3",
                        "viewNodeId": "e6fc57b7-4db1-4104-bd82-c969ed21194f",
                        "name": "Application Component B",
                        "type": "applicationcomponent",
                        "x": 712,
                        "y": 296,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "800d0c20-463b-4de7-9b9a-eb2d4f1e459c",
                        "viewNodeId": "403021ea-285a-4a4f-a59b-27f15dc60bf4",
                        "name": "Application Component C",
                        "type": "applicationcomponent",
                        "x": 720,
                        "y": 432,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "321beea6-1381-42b9-8657-d1cbd99e8afc",
                        "viewNodeId": "4ac2c3f6-739a-4598-9e8f-2600e0964ace",
                        "name": "Grouping",
                        "type": "grouping",
                        "x": 648,
                        "y": 612,
                        "width": 617,
                        "height": 217,
                        "parent": null
                    },
                    {

                        "modelNodeId": "1493131e-477d-4817-a551-4bb147ec82c1",
                        "viewNodeId": "8108d366-2028-4c39-b119-5b249e77647f",
                        "name": "Driver",
                        "type": "driver",
                        "x": 90,
                        "y": 80,
                        "width": 120,
                        "height": 55,
                        "parent": "4ac2c3f6-739a-4598-9e8f-2600e0964ace"
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
                    },
                    {

                        "modelNodeId": "ba1e731c-ff79-4b07-8f37-bc57a7eea232",
                        "viewNodeId": "a5acfe46-c224-4048-b1f7-d0bd79729bfb",
                        "name": "Business Role B",
                        "type": "businessrole",
                        "x": 266,
                        "y": 209,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "04c7398e-14b0-4a69-a61e-b729b94c3488",
                        "viewNodeId": "d33099ed-e34a-4a2c-ab79-d20a0e3d75f1",
                        "name": "Business Process D",
                        "type": "businessprocess",
                        "x": 1176,
                        "y": 101,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "2ab6d200-8f6a-4185-b0a4-4f6828107951",
                        "viewNodeId": "abc2e335-0246-4b25-8697-ec08a2a68bd9",
                        "name": "2ab6d200-8f6a-4185-b0a4-4f6828107951",
                        "type": "orjunction",
                        "x": 1128,
                        "y": 121,
                        "width": 15,
                        "height": 15,
                        "parent": null
                    },
                    {

                        "modelNodeId": null,
                        "viewNodeId": "3ac83fcd-63c0-4f11-948d-d28d9b1fd499",
                        "name": "Teste",
                        "type": "note",
                        "x": 924,
                        "y": 504,
                        "width": 185,
                        "height": 80,
                        "parent": null
                    },
                    {

                        "modelNodeId": null,
                        "viewNodeId": "a4d8bf55-84aa-46f3-bb00-7adf5211a983",
                        "name": "Group",
                        "type": "group",
                        "x": 924,
                        "y": 258,
                        "width": 400,
                        "height": 140,
                        "parent": null
                    },
                    {

                        "modelNodeId": "68754756-d593-4e81-bb52-f2f693b85853",
                        "viewNodeId": "6d187bb4-fc03-44ed-adf8-e08c30b8bf3f",
                        "name": "Application Service A",
                        "type": "applicationservice",
                        "x": 72,
                        "y": 48,
                        "width": 120,
                        "height": 55,
                        "parent": "a4d8bf55-84aa-46f3-bb00-7adf5211a983"
                    },
                    {

                        "modelNodeId": "7a3905c3-ad99-47be-a33f-a8f99dd0b1e1",
                        "viewNodeId": "bb52b314-b14b-4d46-98ed-b967b1941c2b",
                        "name": "Deploy A",
                        "type": "artifact",
                        "x": 504,
                        "y": 564,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "39c926a3-0000-477e-a917-9a00a49b905b",
                        "viewNodeId": "c0d824bc-233b-472b-907b-0e324a82ffae",
                        "name": "Device A",
                        "type": "device",
                        "x": 504,
                        "y": 660,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "f935291b-77c1-4a3a-851e-1d74fbeb658c",
                        "viewNodeId": "a7134b7a-e727-4e5f-a5d7-a7ecb998fc12",
                        "name": "Node A",
                        "type": "node",
                        "x": 504,
                        "y": 756,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    }
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
                    {

                        "modelRelationshipId": "4d23b33a-7250-44a0-b47d-0b1f010257d1",
                        "sourceId": "0d48039d-ed53-4e60-8045-1af4f1e5db6f",
                        "targetId": "c75cd717-81d4-44df-af36-ac7b711359e0",
                        "viewRelationshipId": "fff3616c-8e98-400b-9bb9-be885a99a86d",
                        "type": "triggering",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "bc8c928b-dafb-4e61-91b3-7c3e5b93a900",
                        "sourceId": "aedaf627-eae2-4df1-a27f-7f349d57a094",
                        "targetId": "1620e51a-453c-411e-8c1c-8bf9d7545c93",
                        "viewRelationshipId": "54855c0e-240f-475c-b145-31ffa4dc22ee",
                        "type": "aggregation",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "5a3049be-7f58-4bee-aa6d-1d912d63f2e6",
                        "sourceId": "c75cd717-81d4-44df-af36-ac7b711359e0",
                        "targetId": "d59b73be-0352-4c10-a232-5ef019b2dfcd",
                        "viewRelationshipId": "748eb19a-021d-4ea2-9c99-b74495840536",
                        "type": "triggering",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "746fbbce-0f72-467b-a524-f4c9cdfe0d57",
                        "sourceId": "c75cd717-81d4-44df-af36-ac7b711359e0",
                        "targetId": "e6fc57b7-4db1-4104-bd82-c969ed21194f",
                        "viewRelationshipId": "d06e52c1-7a4e-46bc-9719-79d709f4c4ca",
                        "type": "association",
                        "bendpoints": [],
                        "isBidirectional": true
                    },
                    {

                        "modelRelationshipId": "ac9f5c9f-fddd-45c6-9234-4768c0854028",
                        "sourceId": "8e5c27b0-df78-403d-b9fd-4fd260f9f77b",
                        "targetId": "0d48039d-ed53-4e60-8045-1af4f1e5db6f",
                        "viewRelationshipId": "28200bf4-85e8-4885-b3ff-d62754836c97",
                        "type": "serving",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "3761a5af-da92-473a-bb17-4551a8c9eeff",
                        "sourceId": "8e5c27b0-df78-403d-b9fd-4fd260f9f77b",
                        "targetId": "e3b31afc-2a37-4918-96a4-25e9366cefb5",
                        "viewRelationshipId": "76088728-61ea-4b00-93ee-f71ea51c6f1e",
                        "type": "access",
                        "bendpoints": [
                            {
                                "x": 528,
                                "y": 492
                            }
                        ],
                        "isBidirectional": false
                    },
                    {

                        "modelRelationshipId": "2c321e38-fa96-451b-acc7-76d38eebef33",
                        "sourceId": "8e5c27b0-df78-403d-b9fd-4fd260f9f77b",
                        "targetId": "6d187bb4-fc03-44ed-adf8-e08c30b8bf3f",
                        "viewRelationshipId": "fccc02ce-4a47-40a1-ab9a-756444413107",
                        "type": "serving",
                        "bendpoints": [
                            {
                                "x": 588,
                                "y": 240
                            },
                            {
                                "x": 1044,
                                "y": 240
                            }
                        ]
                    },
                    {

                        "modelRelationshipId": "77bbbe2d-025d-42ee-b98a-38a34add320e",
                        "sourceId": "1d7785c3-503f-4f99-b9f8-38ea8fcf791a",
                        "targetId": "8e5c27b0-df78-403d-b9fd-4fd260f9f77b",
                        "viewRelationshipId": "0f2d99db-610f-427b-acbb-ea6b24d4341f",
                        "type": "flow",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "23f31999-3b71-43b8-a81b-2ed58ffbbdfd",
                        "sourceId": "1d7785c3-503f-4f99-b9f8-38ea8fcf791a",
                        "targetId": "e3b31afc-2a37-4918-96a4-25e9366cefb5",
                        "viewRelationshipId": "5eb5e6bf-60b5-4ca2-b75a-7853f57fb491",
                        "type": "access",
                        "bendpoints": [
                            {
                                "x": 168,
                                "y": 504
                            }
                        ],
                        "isBidirectional": false
                    },
                    {

                        "modelRelationshipId": "25cfe97b-0b18-4d97-8780-f6ed8f54ecc1",
                        "sourceId": "e3b31afc-2a37-4918-96a4-25e9366cefb5",
                        "targetId": "0f2d99db-610f-427b-acbb-ea6b24d4341f",
                        "viewRelationshipId": "790ba733-84e3-499b-8b35-5e3a276ec4a0",
                        "type": "association",
                        "bendpoints": [],
                        "isBidirectional": true
                    },
                    {

                        "modelRelationshipId": "48a5a7b5-653e-4704-9a33-af61a331ea04",
                        "sourceId": "d59b73be-0352-4c10-a232-5ef019b2dfcd",
                        "targetId": "58c94f63-7400-4e61-95c2-0fca75ba926e",
                        "viewRelationshipId": "366054fb-9972-4314-ab2d-d8394494e49a",
                        "type": "triggering",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "09b31573-096b-45c9-91b7-9d1d0cbee1b4",
                        "sourceId": "d59b73be-0352-4c10-a232-5ef019b2dfcd",
                        "targetId": "c61bbc9c-7895-4fad-b9be-fbe75e08bbac",
                        "viewRelationshipId": "078b1584-a236-4b60-b7d1-c5e658ab7542",
                        "type": "triggering",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "f22af369-f103-484a-877e-e5da26651743",
                        "sourceId": "58c94f63-7400-4e61-95c2-0fca75ba926e",
                        "targetId": "abc2e335-0246-4b25-8697-ec08a2a68bd9",
                        "viewRelationshipId": "7ac02dac-9d0d-40b3-9c7f-792836f6623e",
                        "type": "triggering",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "50312aeb-a38d-47ce-aa0b-644a08515a68",
                        "sourceId": "c61bbc9c-7895-4fad-b9be-fbe75e08bbac",
                        "targetId": "abc2e335-0246-4b25-8697-ec08a2a68bd9",
                        "viewRelationshipId": "77e7fe1f-7b7d-4766-a4d0-bd1f2a3d426f",
                        "type": "triggering",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "d9f63e5b-20d7-41d2-8b03-f0a3f1838494",
                        "sourceId": "e6fc57b7-4db1-4104-bd82-c969ed21194f",
                        "targetId": "403021ea-285a-4a4f-a59b-27f15dc60bf4",
                        "viewRelationshipId": "054f274a-d8e8-4f26-8663-944df8615c36",
                        "type": "composition",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "6c7e4334-6d96-48ca-acbe-d25a7c7a119c",
                        "sourceId": "e6fc57b7-4db1-4104-bd82-c969ed21194f",
                        "targetId": "6d187bb4-fc03-44ed-adf8-e08c30b8bf3f",
                        "viewRelationshipId": "82efc5a3-f5e7-4614-bf32-2511b6495c75",
                        "type": "realization",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "95562b72-613c-4193-842c-0b842384496a",
                        "sourceId": "e6fc57b7-4db1-4104-bd82-c969ed21194f",
                        "targetId": "8e5c27b0-df78-403d-b9fd-4fd260f9f77b",
                        "viewRelationshipId": "20ef3565-3ded-4707-81ee-ece8facad128",
                        "type": "association",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "b8de732e-2ac2-4972-9e0e-8accc815ecfa",
                        "sourceId": "e6fc57b7-4db1-4104-bd82-c969ed21194f",
                        "targetId": "e3b31afc-2a37-4918-96a4-25e9366cefb5",
                        "viewRelationshipId": "efac9b51-ca34-4ab3-a254-e4587f003b8a",
                        "type": "access",
                        "bendpoints": [
                            {
                                "x": 672,
                                "y": 336
                            },
                            {
                                "x": 672,
                                "y": 516
                            }
                        ],
                        "isBidirectional": true
                    },
                    {
                        "modelRelationshipId": null,
                        "sourceId": "403021ea-285a-4a4f-a59b-27f15dc60bf4",
                        "targetId": "3ac83fcd-63c0-4f11-948d-d28d9b1fd499",
                        "viewRelationshipId": "214715c8-1818-4bb5-924a-121451a9a099",
                        "type": "connection",
                        "bendpoints": [
                            {
                                "x": 816,
                                "y": 540
                            }
                        ]
                    },
                    {

                        "modelRelationshipId": "e9f7c991-0e2b-4d59-a99b-9426f09ac3d4",
                        "sourceId": "403021ea-285a-4a4f-a59b-27f15dc60bf4",
                        "targetId": "e3b31afc-2a37-4918-96a4-25e9366cefb5",
                        "viewRelationshipId": "d730131e-aba8-46d7-844a-bd20bd507854",
                        "type": "access",
                        "bendpoints": [
                            {
                                "x": 780,
                                "y": 528
                            }
                        ],
                        "isBidirectional": true
                    },
                    {

                        "modelRelationshipId": "786fcaf9-484b-43ec-a895-1ee92ab87135",
                        "sourceId": "4ac2c3f6-739a-4598-9e8f-2600e0964ace",
                        "targetId": "8108d366-2028-4c39-b119-5b249e77647f",
                        "viewRelationshipId": "d45c553a-9a77-4ced-a77b-7b9ebfaa0743",
                        "type": "composition",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "7468c05e-b2d2-4f16-bc88-787a7f086fc8",
                        "sourceId": "4ac2c3f6-739a-4598-9e8f-2600e0964ace",
                        "targetId": "90587bb4-b903-4d1e-af17-ec1deb1a6a3e",
                        "viewRelationshipId": "6ac44a09-fb7a-4d2f-94da-0a45854b63cb",
                        "type": "composition",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "d8fea24c-3d1b-49e3-ae0a-86a123da1470",
                        "sourceId": "8108d366-2028-4c39-b119-5b249e77647f",
                        "targetId": "90587bb4-b903-4d1e-af17-ec1deb1a6a3e",
                        "viewRelationshipId": "dab6674a-d781-44d3-9aa0-c1a7cd224830",
                        "type": "influence",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "13de200f-2a49-4639-9b0b-827dd67b522d",
                        "sourceId": "a5acfe46-c224-4048-b1f7-d0bd79729bfb",
                        "targetId": "1620e51a-453c-411e-8c1c-8bf9d7545c93",
                        "viewRelationshipId": "dcf21a4d-b456-4ae0-ae00-a7326569cf80",
                        "type": "specialization",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "18efad41-dcba-41a8-a013-ace3080c0a64",
                        "sourceId": "abc2e335-0246-4b25-8697-ec08a2a68bd9",
                        "targetId": "d33099ed-e34a-4a2c-ab79-d20a0e3d75f1",
                        "viewRelationshipId": "dc2fd4be-19a0-4624-b801-cd26839ed856",
                        "type": "triggering",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "712bbba6-0e43-4ca2-949c-ece39f949a1a",
                        "sourceId": "6d187bb4-fc03-44ed-adf8-e08c30b8bf3f",
                        "targetId": "403021ea-285a-4a4f-a59b-27f15dc60bf4",
                        "viewRelationshipId": "01a43a71-006a-4bf2-bd19-647c34f274c9",
                        "type": "serving",
                        "bendpoints": [
                            {
                                "x": 1056,
                                "y": 468
                            }
                        ]
                    },
                    {

                        "modelRelationshipId": "8c71da69-809c-4bd7-8635-5158ae1f4932",
                        "sourceId": "bb52b314-b14b-4d46-98ed-b967b1941c2b",
                        "targetId": "8e5c27b0-df78-403d-b9fd-4fd260f9f77b",
                        "viewRelationshipId": "282a1a86-9cae-4b20-9d78-df2b8150263b",
                        "type": "realization",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "c80974d3-e8c1-4f0b-ac85-47105a5f2756",
                        "sourceId": "c0d824bc-233b-472b-907b-0e324a82ffae",
                        "targetId": "bb52b314-b14b-4d46-98ed-b967b1941c2b",
                        "viewRelationshipId": "45dff6d4-80f1-4098-aeb3-265700495e57",
                        "type": "assignment",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "5889e74c-e4c7-40e5-b1e7-0883d7e5d5e6",
                        "sourceId": "a7134b7a-e727-4e5f-a5d7-a7ecb998fc12",
                        "targetId": "c0d824bc-233b-472b-907b-0e324a82ffae",
                        "viewRelationshipId": "20e64c21-ebae-4c8d-a989-c24f0318e626",
                        "type": "composition",
                        "bendpoints": []
                    }
                ]
            },
            {
                "bounds": {
                    "vertical": {
                        "min": 21,
                        "max": 682
                    },
                    "horizontal": {
                        "min": 29,
                        "max": 551
                    }
                },

                "id": "3ea7a490-f9c9-4360-89a1-0cce152d7a90",
                "name": "Derivation Rules",
                "viewNodes": [
                    {

                        "modelNodeId": "4ab9baa5-2ebe-4093-a8e8-fbd5b17b87c5",
                        "viewNodeId": "751b1d74-e293-4da9-a025-f2dd1257c20c",
                        "name": "a",
                        "type": "businessprocess",
                        "x": 34,
                        "y": 144,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "513c2b8d-78ab-484c-b9b4-6e8f721f31b0",
                        "viewNodeId": "df936688-f7ad-4d3c-8c47-0d34b32d5284",
                        "name": "b",
                        "type": "businessprocess",
                        "x": 231,
                        "y": 143,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "75dfdfeb-77ae-4b35-812a-2eb131ba18df",
                        "viewNodeId": "f17a6c96-376e-492c-a7e0-0e76fd906a75",
                        "name": "c",
                        "type": "businessprocess",
                        "x": 420,
                        "y": 144,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "fdfa517d-8d14-4ce7-96c4-7dbab4002dbf",
                        "viewNodeId": "205d1097-af68-4cc5-a1b4-9031063799ad",
                        "name": "a",
                        "type": "applicationcomponent",
                        "x": 34,
                        "y": 362,
                        "width": 120,
                        "height": 49,
                        "parent": null
                    },
                    {

                        "modelNodeId": "dc730608-6513-4a77-b7bb-deb496d677c3",
                        "viewNodeId": "1d8978d8-b0b2-4a04-b2e6-75285d9634a1",
                        "name": "b",
                        "type": "applicationfunction",
                        "x": 237,
                        "y": 362,
                        "width": 120,
                        "height": 49,
                        "parent": null
                    },
                    {

                        "modelNodeId": "34088132-b261-4950-9a83-0edb5b04450e",
                        "viewNodeId": "56628581-47f6-41ba-877c-b30a1f6ad9f9",
                        "name": "c",
                        "type": "applicationservice",
                        "x": 431,
                        "y": 360,
                        "width": 120,
                        "height": 49,
                        "parent": null
                    },
                    {

                        "modelNodeId": "9474f8e3-189e-4038-9aa3-07021dcdcb52",
                        "viewNodeId": "5fffb1d0-98f6-4e08-8daf-e08215c14370",
                        "name": "a",
                        "type": "applicationfunction",
                        "x": 31,
                        "y": 627,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "7ab087a8-e6d9-4226-a2ce-42d712b80736",
                        "viewNodeId": "22124353-791f-49a8-983f-b56612ae3d0c",
                        "name": "b",
                        "type": "applicationservice",
                        "x": 235,
                        "y": 627,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "5a22b53b-0f6d-4aae-8e08-51464d63f5ad",
                        "viewNodeId": "65aab50b-d108-4172-9fb7-70e8f7c8eb62",
                        "name": "c",
                        "type": "businessprocess",
                        "x": 431,
                        "y": 624,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "25a451a7-dd19-45c8-a704-9c8a4bb6f144",
                        "viewNodeId": "9dca3e39-b189-4ec9-a786-3699a7474820",
                        "name": "c",
                        "type": "technologyservice",
                        "x": 237,
                        "y": 506,
                        "width": 120,
                        "height": 49,
                        "parent": null
                    },
                    {

                        "modelNodeId": null,
                        "viewNodeId": "0219c82e-47fa-4415-9b25-6cd7766a3c90",
                        "name": "DR01 e DR08",
                        "type": "note",
                        "x": 30,
                        "y": 21,
                        "width": 185,
                        "height": 40,
                        "parent": null
                    },
                    {

                        "modelNodeId": null,
                        "viewNodeId": "b6e0e73e-2a48-4559-9f53-eefa5112bb2e",
                        "name": "DR02, DR04 e DR07",
                        "type": "note",
                        "x": 36,
                        "y": 309,
                        "width": 185,
                        "height": 40,
                        "parent": null
                    },
                    {

                        "modelNodeId": null,
                        "viewNodeId": "d5c9514c-5316-4a4e-a916-2b9ad35d66db",
                        "name": "DR03",
                        "type": "note",
                        "x": 29,
                        "y": 576,
                        "width": 185,
                        "height": 40,
                        "parent": null
                    },
                    {

                        "modelNodeId": null,
                        "viewNodeId": "038f24e7-fc8a-4d15-805a-6f617c8fa26e",
                        "name": "DR05 e DR06",
                        "type": "note",
                        "x": 228,
                        "y": 21,
                        "width": 185,
                        "height": 40,
                        "parent": null
                    },
                    {

                        "modelNodeId": "2d2786e0-cad0-4684-9bb4-efc806502b18",
                        "viewNodeId": "d1e0b1de-b25c-4e84-8cd6-64fdbd0fbf18",
                        "name": "a",
                        "type": "businessactor",
                        "x": 34,
                        "y": 72,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "eeda300f-6a89-4324-a945-b5a3fe74297e",
                        "viewNodeId": "771addc9-8956-4540-ae5a-b9d743996e7e",
                        "name": "c1",
                        "type": "businessprocess",
                        "x": 237,
                        "y": 255,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "b6c188e2-5026-4a90-816f-b0cb4c0f87fa",
                        "viewNodeId": "f87532ec-8ca9-484e-b693-d54fcac1ef77",
                        "name": "c2",
                        "type": "businessprocess",
                        "x": 420,
                        "y": 72,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    }
                ],
                "viewRelationships": [
                    {

                        "modelRelationshipId": "3dc40049-e8ec-4488-8e19-a3ba4c05e161",
                        "sourceId": "751b1d74-e293-4da9-a025-f2dd1257c20c",
                        "targetId": "df936688-f7ad-4d3c-8c47-0d34b32d5284",
                        "viewRelationshipId": "250ba06c-19ae-452b-b2e5-8b4b3cad4cb0",
                        "type": "specialization",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "1242e164-ab02-43b0-bc1b-1b2bf55c2e9e",
                        "sourceId": "751b1d74-e293-4da9-a025-f2dd1257c20c",
                        "targetId": "df936688-f7ad-4d3c-8c47-0d34b32d5284",
                        "viewRelationshipId": "5144f97f-a6e1-45c9-8c85-2c47a9cb153b",
                        "type": "triggering",
                        "bendpoints": [
                            {
                                "x": 96,
                                "y": 225
                            },
                            {
                                "x": 276,
                                "y": 225
                            }
                        ]
                    },
                    {

                        "modelRelationshipId": "59248101-be63-4fb2-962c-342d0ae87c19",
                        "sourceId": "df936688-f7ad-4d3c-8c47-0d34b32d5284",
                        "targetId": "f17a6c96-376e-492c-a7e0-0e76fd906a75",
                        "viewRelationshipId": "6f4bd98b-d320-44e0-bab1-8dde807cc50d",
                        "type": "specialization",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "e29153ad-45c8-44c2-a532-2d15a200c733",
                        "sourceId": "df936688-f7ad-4d3c-8c47-0d34b32d5284",
                        "targetId": "f17a6c96-376e-492c-a7e0-0e76fd906a75",
                        "viewRelationshipId": "eefdcf13-fb9c-4be3-bf38-e9fa03035605",
                        "type": "triggering",
                        "bendpoints": [
                            {
                                "x": 312,
                                "y": 225
                            },
                            {
                                "x": 480,
                                "y": 225
                            }
                        ]
                    },
                    {

                        "modelRelationshipId": "d45aaefe-6386-41a9-bb0a-6ebb400dc8ec",
                        "sourceId": "df936688-f7ad-4d3c-8c47-0d34b32d5284",
                        "targetId": "771addc9-8956-4540-ae5a-b9d743996e7e",
                        "viewRelationshipId": "07573eaa-f2e9-4098-a4e5-1aa96d52eeba",
                        "type": "flow",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "ac73d061-b81f-4768-b24a-575804b8f552",
                        "sourceId": "205d1097-af68-4cc5-a1b4-9031063799ad",
                        "targetId": "1d8978d8-b0b2-4a04-b2e6-75285d9634a1",
                        "viewRelationshipId": "637c98af-5e14-4b1d-a078-23675fa24176",
                        "type": "assignment",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "fb81c5f0-efa0-43cd-bbce-85f86d78f319",
                        "sourceId": "205d1097-af68-4cc5-a1b4-9031063799ad",
                        "targetId": "1d8978d8-b0b2-4a04-b2e6-75285d9634a1",
                        "viewRelationshipId": "ab68b163-0df6-44a6-b356-df638e4925ee",
                        "type": "triggering",
                        "bendpoints": [
                            {
                                "x": 98,
                                "y": 458
                            },
                            {
                                "x": 266,
                                "y": 458
                            }
                        ]
                    },
                    {

                        "modelRelationshipId": "33c89587-816c-42a3-aba1-13e6c2e0b03e",
                        "sourceId": "1d8978d8-b0b2-4a04-b2e6-75285d9634a1",
                        "targetId": "56628581-47f6-41ba-877c-b30a1f6ad9f9",
                        "viewRelationshipId": "b924bffb-c02a-4ec6-bb73-6adce6bd4ed5",
                        "type": "realization",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "5ed0815a-fe4e-4fd4-a732-13260b699d61",
                        "sourceId": "5fffb1d0-98f6-4e08-8daf-e08215c14370",
                        "targetId": "22124353-791f-49a8-983f-b56612ae3d0c",
                        "viewRelationshipId": "3bab11b4-7df7-45ca-9b2b-63a8faaa77a6",
                        "type": "realization",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "cd07759c-1068-4de5-9de6-aa65da2ee9a5",
                        "sourceId": "22124353-791f-49a8-983f-b56612ae3d0c",
                        "targetId": "65aab50b-d108-4172-9fb7-70e8f7c8eb62",
                        "viewRelationshipId": "7d137ae3-0e39-4393-a7ce-cebf10c9c134",
                        "type": "serving",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "e0e4ad30-7633-49a8-a267-e35d48a0dac4",
                        "sourceId": "9dca3e39-b189-4ec9-a786-3699a7474820",
                        "targetId": "1d8978d8-b0b2-4a04-b2e6-75285d9634a1",
                        "viewRelationshipId": "3471f7a6-7754-49b3-b249-502b03b2490c",
                        "type": "serving",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "d4300339-9514-42c6-a740-af360f8643c2",
                        "sourceId": "d1e0b1de-b25c-4e84-8cd6-64fdbd0fbf18",
                        "targetId": "df936688-f7ad-4d3c-8c47-0d34b32d5284",
                        "viewRelationshipId": "a03f80ae-d6aa-4518-81c7-6a82825d7e15",
                        "type": "assignment",
                        "bendpoints": [
                            {
                                "x": 264,
                                "y": 96
                            }
                        ]
                    },
                    {

                        "modelRelationshipId": "e65bf3dd-9978-4a8f-8a14-847e9b5f074b",
                        "sourceId": "f87532ec-8ca9-484e-b693-d54fcac1ef77",
                        "targetId": "df936688-f7ad-4d3c-8c47-0d34b32d5284",
                        "viewRelationshipId": "48d007e5-803f-40bd-aec1-b7ec039798b8",
                        "type": "flow",
                        "bendpoints": [
                            {
                                "x": 328,
                                "y": 102
                            }
                        ]
                    }
                ]
            },
            {
                "bounds": {
                    "vertical": {
                        "min": 286,
                        "max": 449
                    },
                    "horizontal": {
                        "min": 161,
                        "max": 804
                    }
                },

                "id": "82e9d86e-ff59-4c3d-b59e-d8ef2be26ed8",
                "name": "Derivation with Many Paths",
                "viewNodes": [
                    {

                        "modelNodeId": "18b75b9f-3939-4432-9117-c461d98c62c0",
                        "viewNodeId": "0898db4d-82a6-4f1e-b3b3-49a242b1b75c",
                        "name": "APP A",
                        "type": "applicationcomponent",
                        "x": 161,
                        "y": 286,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "4ffb22b7-5260-4b71-ae13-231bed0817f4",
                        "viewNodeId": "f5e23086-c063-4a6f-b1f2-7d13937b9562",
                        "name": "SERV A",
                        "type": "applicationservice",
                        "x": 684,
                        "y": 288,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "af707643-d2f6-427d-945e-fa78ed59b527",
                        "viewNodeId": "6c79d053-3f59-4f99-b10b-0db646a02e6d",
                        "name": "FUNC A",
                        "type": "applicationfunction",
                        "x": 408,
                        "y": 288,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    },
                    {

                        "modelNodeId": "31df2412-ab11-41f8-aca0-bb17538761fb",
                        "viewNodeId": "713f9588-7194-45bf-af1d-7bcc59b88b22",
                        "name": "FUNC B",
                        "type": "applicationfunction",
                        "x": 406,
                        "y": 394,
                        "width": 120,
                        "height": 55,
                        "parent": null
                    }
                ],
                "viewRelationships": [
                    {

                        "modelRelationshipId": "6bdd8c51-3590-4b1f-b116-e389622c0f55",
                        "sourceId": "0898db4d-82a6-4f1e-b3b3-49a242b1b75c",
                        "targetId": "6c79d053-3f59-4f99-b10b-0db646a02e6d",
                        "viewRelationshipId": "cfcff125-24dc-417a-b03e-f7065935aaa1",
                        "type": "assignment",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "450e3213-0e19-4138-b686-25a9efa04655",
                        "sourceId": "0898db4d-82a6-4f1e-b3b3-49a242b1b75c",
                        "targetId": "713f9588-7194-45bf-af1d-7bcc59b88b22",
                        "viewRelationshipId": "5a5e2113-fbc4-4a3b-8892-34b9c07ebc39",
                        "type": "assignment",
                        "bendpoints": [
                            {
                                "x": 228,
                                "y": 420
                            }
                        ]
                    },
                    {

                        "modelRelationshipId": "726bbbc5-80b7-4159-b717-860383f399cc",
                        "sourceId": "6c79d053-3f59-4f99-b10b-0db646a02e6d",
                        "targetId": "f5e23086-c063-4a6f-b1f2-7d13937b9562",
                        "viewRelationshipId": "936dbdd3-c030-4fd7-a1ce-819425c0bfb9",
                        "type": "realization",
                        "bendpoints": []
                    },
                    {

                        "modelRelationshipId": "2db6ba73-6d53-471a-aa3b-08c39b806aa7",
                        "sourceId": "713f9588-7194-45bf-af1d-7bcc59b88b22",
                        "targetId": "f5e23086-c063-4a6f-b1f2-7d13937b9562",
                        "viewRelationshipId": "b53ba464-f1be-4db8-a763-f3163fe5a784",
                        "type": "realization",
                        "bendpoints": [
                            {
                                "x": 744,
                                "y": 432
                            }
                        ]
                    }
                ]
            }
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
                            {
                                "id": "3ea7a490-f9c9-4360-89a1-0cce152d7a90",
                                "text": "Derivation Rules",
                                "isDirectory": false
                            },
                            {
                                "id": "82e9d86e-ff59-4c3d-b59e-d8ef2be26ed8",
                                "text": "Derivation with Many Paths",
                                "isDirectory": false
                            }
                        ]
                    }
                ],
                "text": "Views",
                "isDirectory": true
            }
        ]
    }
};
