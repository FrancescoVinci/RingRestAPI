# RingRestAPI

A Rest API for RING.exe

## Endpoint
- `/ispresent/{pdbname.pdb}`

  | Method     | Parameters required | Description | 
  | ----------- | ----------- | ----------- | 
  | GET | *{pdbname.pdb}* | Check if the .pdb file exists in files.rcsb.org |

  Response:

  | Status Code | Response |
  | ----------- |----------- |
  | 🟩 200 | File exists |
  | 🟥 404 | File does not exist |
  | 🟨 500 | Internal Error |

- `/getpdb/{pdbname.pdb}` (*es. 6a90.pdb*)
  | Method     | Parameters required | Description | 
  | ----------- | ----------- | ----------- | 
  | GET | *{pdbname.pdb}* | Returns the specified .pdb file, if it exists in files.rcsb.org |

  Response:

  | Status Code | Response |
  | ----------- |----------- |
  | 200 | Returns the content of the pdb |
  | 404 | File does not exist |
  | 500 | Internal error |

- `/requestxml/fromname`
  | Method     | Parameters required | Description | 
  | ----------- | ----------- | ----------- | 
  | POST | '*pdbname*' | Returns an xml of the specified .pdb |

  Response:

  | Status Code | Response |
  | ----------- |----------- |
  | 200 | Returns an xml |
  | 404 | File does not exist in rcbs.org |
  | 400 | Bad request, enter all required parameters|
  | 500 | Internal error |

  Other non-mandatory parameters:
  ```
  {
    seq_sep: Unsigned int,                          //(default 3)
    bond_control: ['strict','weak'],                //(default strict)
    interaction_type: ['all','multiple','one'],     //(default all)
    net_policy: ['closest','ca','cb'],              //(default closest)
    h_bond: Float,                                  //(default 3.5)
    vdw_bond: Float,                                //(default 0.5)
    ionic_bond: Float,                              //(default 4)                                              
    generic_bond: Float,                            //(default 6)
    pication_bond: Float,                           //(default 5)
    pipistack_bond: Float,                          //(default 6.5)
    force: Boolean                                  //(default false)
  }
  ```

- `/requestxml/fromcontent`
  | Method     | Parameters required | Description | 
  | ----------- | ----------- | ----------- | 
  | POST | '*pdbname*' , '*content*' | Returns an xml from the content of a pdb |

  Response:

  | Status Code | Response |
  | ----------- |----------- |
  | 200 | Returns an xml |
  | 400 | Bad request, enter all required parameters |
  | 500 | Internal error |

  Other non-mandatory parameters:
  ```
  {
    seq_sep: Unsigned int,                          //(default 3)
    bond_control: ['strict','weak'],                //(default strict)
    interaction_type: ['all','multiple','one'],     //(default all)
    net_policy: ['closest','ca','cb'],              //(default closest)
    h_bond: Float,                                  //(default 3.5)
    vdw_bond: Float,                                //(default 0.5)
    ionic_bond: Float,                              //(default 4)                                              
    generic_bond: Float,                            //(default 6)
    pication_bond: Float,                           //(default 5)
    pipistack_bond: Float,                          //(default 6.5)
    force: Boolean                                  //(default false)
  }
  ```
  
  ## Usage
  Some examples of use:
  ### Post request
  
  ```
  http://myexamplesite/api/requestxml/fromname
  ```
  Sample Json:
  ```
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
  ```
  {
    "response": "success",
    "data": {
        "code": 200,
        "message": "Processing completed successfully",
        "log": "[2021-03-15 20:57:04.728] [main] [info] params summary: {net_policy:\"ca\", generic_bond:7, seq_sep:5, bond_control:\"weak\", interaction_type:\"all\"}\r\n[2021-03-15 20:57:04.777] [main] [info] found 1688 generic bonds\r\n",
        "xml": "<?xml version=\"1.0\"?>\n<!--{net_policy:\"ca\", ...
    }
  }
  ```
  ### Get Request
  ```
  http://myexamplesite/api/ispresent/6a90.pdb
  ```
  Response:
  ```
  {
    "response": "success",
    "data": {
        "code": 200,
        "message": "File exists"
    }
  }
  ```
  
  
  
  
  
