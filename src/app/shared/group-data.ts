import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Group } from './group';

export class GroupData implements InMemoryDbService {

  createDb() {
    const groups: Group[] = [
    {
      id: 3,
      name: "Developers",
      description:"computer programming staffs",
      created_by:1
    },
    {
      id: 4,
      name: "Marketing",
      description:"Digital marking and social media team",
      created_by:1
    },
    {
      id:5,
      name: "Rap Battle",
      description:"persons that rap hiphop",
      created_by:2
    },
    {
      id:6,
      name: "Teacher",
      description:"Persons that teach",
      created_by:2
    },
    {
      id:7,
      name: "Thugs",
      description:"They terrorize the streets",
      created_by:2
    },
  ]
    return { groups };
  }
}
