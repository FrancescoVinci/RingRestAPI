# RingRestAPI

A Rest API for **RING**.\
The *RingRestAPI* is organized around [REST](https://en.wikipedia.org/wiki/Representational_state_transfer). The API has predictable URLs, accepts *form-encoded* and *JSON-encoded* request bodies, returns JSON-encoded responses, and uses standard HTTP response codes and verbs.\
RingRestAPI is accessible after connecting via [Ca’ Foscari University VPN](https://www.unive.it/pag/41366/) for staff members and students.

## Endpoints
You can use the web service at:
```
http://ring.dais.unive.it:8002/api/{endpoints}
```
- `/ispresent/{pdbname.pdb}` *es. 6a90.pdb*

  | Method     | Parameters required | Description | 
  | ----------- | ----------- | ----------- | 
  | GET | *{pdbname.pdb}* | Check if the .pdb file exists in files.rcsb.org |

  Response:

  | Status Code | Response |
  | ----------- |----------- |
  | 🟢 200 | File exists |
  | 🔴 404 | File does not exist |
  | 🟡 500 | Internal Error |

- `/getpdb/{pdbname.pdb}` *es. 6a90.pdb*
  | Method     | Parameters required | Description | 
  | ----------- | ----------- | ----------- | 
  | GET | *{pdbname.pdb}* | Returns the content of specified .pdb file, if it exists in files.rcsb.org |
  

  Response:

  | Status Code | Response |
  | ----------- |----------- |
  | 🟢 200 | Returns the content of the pdb |
  | 🔴 404 | File does not exist |
  | 🟡 500 | Internal error |

- `/requestxml/fromname`
  | Method     | Parameters required | Description | 
  | ----------- | ----------- | ----------- | 
  | POST | '*pdbname*' | Returns the xml content of the processed .pdb |

  Response:

  | Status Code | Response |
  | ----------- |----------- |
  | 🟢 200 | Returns the xml content |
  | 🔴 404 | File does not exist in rcbs.org |
  | 🟠 400 | Bad request, it is necessary to enter all the required parameters |
  | 🟡 500 | Internal error |

  Other *non-mandatory* parameters:
  ```JavaScript
  {
      seq_sep: Unsigned int,                          //default 3
      bond_control: ['strict','weak'],                //default strict
      interaction_type: ['all','multiple','one'],     //default all
      net_policy: ['closest','ca','cb'],              //default closest
      h_bond: Float,                                  //default 3.5
      vdw_bond: Float,                                //default 0.5
      ionic_bond: Float,                              //default 4
      generic_bond: Float,                            //default 6
      pication_bond: Float,                           //default 5
      pipistack_bond: Float,                          //default 6.5
      force: Boolean                                  //default false
  }
  ```

- `/requestxml/fromcontent`
  | Method     | Parameters required | Description | 
  | ----------- | ----------- | ----------- | 
  | POST | '*pdbname*' , '*content*' | Returns xml content of processed . pdb content |
  

  Response:

  | Status Code | Response |
  | ----------- |----------- |
  | 🟢 200 | Returns an xml |
  | 🟠 400 | Bad request, enter all required parameters |
  | 🟡 500 | Internal error |

  Other *non-mandatory* parameters:
  ```JavaScript
  {
      seq_sep: Unsigned int,                          //default 3
      bond_control: ['strict','weak'],                //default strict
      interaction_type: ['all','multiple','one'],     //default all
      net_policy: ['closest','ca','cb'],              //default closest
      h_bond: Float,                                  //default 3.5
      vdw_bond: Float,                                //default 0.5
      ionic_bond: Float,                              //default 4
      generic_bond: Float,                            //default 6
      pication_bond: Float,                           //default 5
      pipistack_bond: Float,                          //default 6.5
      force: Boolean                                  //default false
  }
  ```
  
## Usage
Some examples of use:
### Post request
  
 - `http://ring.dais.unive.it:8002/api/requestxml/fromname`
 
    Sample Json:
    ```JavaScript
    {
        "pdbname" : "6a90.pdb",
        "seq_sep" : "5",
        "bond_control" : "weak",
        "net_policy" : "ca",
        "h_bond" : "4.5",
        "ionic_bond" : "4.6"
    }

    ```
    Response:
    ```JavaScript
    {
        "response": "success",
        "data": {
            "code": 200,
            "message": "Processing completed successfully",
            "log": "[2021-03-15 20:57:04.728] [main] [info] params summary: {net_policy:\"ca\", generic_bond:7, seq_sep:5, bond_control:\"weak\", interaction_type:\"all\"}\r\n[2021-03-15 20:57:04.777] [main] [info] found 1688 generic bonds\r\n",
            "xml": "<?xml version=\"1.0\"?>\n<!--{net_policy:\"ca\", ... "
        }
    }
    ```
  
 - `http://ring.dais.unive.it:8002/api/requestxml/fromcontent`
  
    Sample Json:
    ```JavaScript
    {
        "pdbname" : "6a90.pdb",
        "content" : "HEADER    MEMBRANE PROTEIN/TOXIN                  11-JUL-18   6A90              \nTITLE     COMPLEX OF VOLTAGE-GATED SODIUM CHANNEL NAVPAS FROM AMERICAN COCKROACH\nTITLE    2 PERIPLANETA AMERICANA AND DC1A                                       \nCOMPND    MOL_ID: 1;...",
        "h_bond" : "4.5",
        "ionic_bond" : "4.6"
    }
    ```
    Response:
    ```JavaScript
    {
        "response": "success",
        "data": {
            "code": 200,
            "message": "Processing completed successfully",
            "log": "[2021-03-27 13:44:10.555] [main] [info] params summary: {net_policy:\"closest\", h_bond:4.5, vdw_bond:0.5, ionic_bond:4.6, pication:5, pipistack:6.5, seq_sep:3, bond_control:\"strict\", interaction_type:\"all\"}\n...,
            "xml": "<?xml version=\"1.0\"?>\n<!--{net_policy:\"closest\", h_bond:4.5, vdw_bond:0.5, ionic_bond:4.6, pication:5, pipistack:6.5, seq_sep:3, bond_control:\"strict\", interaction_type:\"all\"}-->\n<graphml xmlns=\"http://graphml.graphdrawing.org/xmlns\" ..."
        }
    }
    ```
  
  
### Get Request

 - `http://ring.dais.unive.it:8002/api/ispresent/6a90.pdb`
 
    Response:
    ```JavaScript
    {
        "response": "success",
        "data": {
            "code": 200,
             "message": "File exists"
        }
    }
    ```
 - `http://ring.dais.unive.it:8002/api/getpdb/6a90.pdb`
 
    Response:
    ```JavaScript
    {
        "response": "success",
        "data": {
            "code": 200,
            "message": "File exists",
            "pdb": "HEADER    MEMBRANE PROTEIN/TOXIN                  11-JUL-18   6A90              \nTITLE     COMPLEX OF VOLTAGE-GATED SODIUM CHANNEL NAVPAS FROM AMERICAN    COCKROACH\nTITLE    2 PERIPLANETA AMERICANA AND DC1A                                       \nCOMPND    MOL_ID: 1;..."  
        }
    }
    ```

## Error response
Some examples of error:
- **Missing mandatory field**

  - `http://ring.dais.unive.it:8002/api/requestxml/fromname`
  
    Sample Json:
     ```JavaScript
     {
        "h_bond" : "4.5",
        "inic_bond" : "4.6"
     }
     ```
     (*pdbname missing*)

     Response:
     ```Javascript
     {
         "response": "error",
         "error": {
             "code": 400,
             "message": {
                 "pdbname": {
                     "name": "ValidatorError",
                     "message": "File name is required",
                     "properties": {
                         "message": "File name is required",
                         "type": "required",
                         "path": "pdbname"
                     },
                     "kind": "required",
                     "path": "pdbname"
                 }
             }
         }
     }
     ```

## Built With
* [Node.js](https://nodejs.org/it/) 
 
