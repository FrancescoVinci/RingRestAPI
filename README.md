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
  ```bash
  {
    seq_sep: Unsigned int,
    bond_control: ['strict','weak'],
    interaction_type: ['all','multiple','one'],
    net_policy: ['closest','ca','cb'],
    h_bond: Float,
    vdw_bond: Float,
    ionic_bond: Float,
    generic_bond: Float,
    pication_bond: Float,
    pipistack_bond: Float,
    force: Boolean
  }
  ```
