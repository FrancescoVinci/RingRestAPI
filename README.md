# RingRestAPI
A Rest API for RING.exe

## Endpoint
- `/ispresent/{pdbname.pdb}`

  | Method     | Parameters required | Description | 
  | ----------- | ----------- | ----------- | 
  | GET | {pdbname.pdb} | check if the .pdb file exists in files.rcsb.org |

  Response:

  | Status Code | Response |
  | ----------- |----------- |
  | 200 | File exists |
  | 404 | File does not exist |

- `/getpdb/{pdbname.pdb}` 
  | Method     | Parameters required | Description | 
  | ----------- | ----------- | ----------- | 
  | GET | {pdbname.pdb} | returns the specified .pdb file, if it exists in files.rcsb.org |

  Response:

  | Status Code | Response |
  | ----------- |----------- |
  | 200 | Returns the content of the pdb |
  | 404 | File does not exist |
  | 500 | Error while getting the file |
