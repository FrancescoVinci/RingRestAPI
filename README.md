# RingRestAPI

A Rest API for RING.exe

## Endpoint
- `/ispresent/{pdbname.pdb}`

  | Method     | Parameters required | Description | 
  | ----------- | ----------- | ----------- | 
  | GET | {pdbname.pdb} | Check if the .pdb file exists in files.rcsb.org |

  Response:

  | Status Code | Response |
  | ----------- |----------- |
  | 200 | File exists |
  | 404 | File does not exist |

- `/getpdb/{pdbname.pdb}` (*es. 6a90.pdb*)
  | Method     | Parameters required | Description | 
  | ----------- | ----------- | ----------- | 
  | GET | {pdbname.pdb} | Returns the specified .pdb file, if it exists in files.rcsb.org |

  Response:

  | Status Code | Response |
  | ----------- |----------- |
  | 200 | Returns the content of the pdb |
  | 404 | File does not exist |
  | 500 | Error while getting the file |

- `/requestxml/fromname`
  | Method     | Parameters required | Description | 
  | ----------- | ----------- | ----------- | 
  | POST | 'pdbname' *(required)* | Returns an xml of the specified .pdb |

  Response:

  | Status Code | Response |
  | ----------- |----------- |
  | 200 | Returns an xml |
  | 404 | File does not exist in rcbs.org |
  | 500 | Error while getting the file |

  Other non-mandatory parameters:
  ```json
  {
    seq_sep: Unsigned int (default 3),
    bond_control: ['strict','weak'] (default strict),
    interaction_type: ['all','multiple','one'] (default all),
    net_policy: ['closest','ca','cb'] (default closest),
    h_bond: Float (default 3.5),
    vdw_bond: Float (default 0.5),
    ionic_bond: Float (default 4),
    generic_bond: Float (default 6),
    pication_bond: Float (default 5),
    pipistack_bond: Float (default 6.5),
    force: Boolean (default false)
  }
  ```
