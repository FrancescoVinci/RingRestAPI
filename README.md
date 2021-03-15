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
  | 200 | File exists |
  | 404 | File does not exist |

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
    "bond_control" : "strict",
    "net_policy" : "one",
    "h_bond" : "4.5",
    "ionic_bond" : "5"
  }
  ```
  Response:
  ```
  {
    "response": "success",
    "data": {
        "code": 200,
        "message": "Processing completed successfully",
        "log": "[2021-03-15 20:41:58.005] [main] [info] params summary: {net_policy:\"ca\", generic_bond:6, seq_sep:5, bond_control:\"strict\",               interaction_type:\"all\"}\r\n[2021-03-15 20:41:58.051] [main] [info] found 693 generic bonds\r\n",
        "xml": "<?xml version=\"1.0\"?>\n<!--{net_policy:\"ca\", generic_bond:6, seq_sep:5, bond_control:\"strict\", interaction_type:\"all\"}-->\n<graphml xmlns=\"http://graphml.graphdrawing.org/xmlns\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd\">\n\t<key id=\"e_Distance\" for=\"edge\" attr.name=\"Distance\" attr.type=\"double\" />\n\t<key id=\"e_Interaction\" for=\"edge\" attr.name=\"Interaction\" attr.type=\"string\" />\n\t<key id=\"e_Angle\" for=\"edge\" attr.name=\"Angle\" attr.type=\"double\" />\n\t<key id=\"e_Orientation\" for=\"edge\" attr.name=\"Orientation\" attr.type=\"string\" />\n\t<key id=\"e_Positive\" for=\"edge\" attr.name=\"Positive\" attr.type=\"string\" />\n\t<key id=\"e_Energy\" for=\"edge\" attr.name=\"Energy\" attr.type=\"double\" />\n\t<key id=\"e_Atom1\" for=\"edge\" attr.name=\"Atom1\" attr.type=\"string\" />\n\t<key id=\"e_Atom2\" for=\"edge\" attr.name=\"Atom2\" attr.type=\"string\" />\n\t<key id=\"e_Cation\" for=\"edge\" attr.name=\"Cation\" attr.type=\"string\" />\n\t<key id=\"e_NodeId1\" for=\"edge\" attr.name=\"NodeId1\" attr.type=\"string\" />\n\t<key id=\"e_NodeId2\" for=\"edge\" attr.name=\"NodeId2\" attr.type=\"string\" />\n\t<key id=\"e_Donor\" for=\"edge\" attr.name=\"Donor\" attr.type=\"string\" />\n\t<key id=\"v_Residue\" for=\"node\" attr.name=\"Residue\" attr.type=\"string\" />\n\t<key id=\"v_Bfactor_CA\" for=\"node\" attr.name=\"Bfactor_CA\" attr.type=\"double\" />\n\t<key id=\"v_Degree\" for=\"node\" attr.name=\"Degree\" attr.type=\"double\" />\n\t<key id=\"v_Chain\" for=\"node\" attr. ...
    }
  }
  ```
  
  
  
  
  
  
