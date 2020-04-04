import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Group } from './group';

export class GroupData implements InMemoryDbService {

  createDb() {
    const groups: Group[] = [
    {
      id: 3,
      name: "Developers",
      memberCount: 40,
      description:"computer programming staffs",
      user_id:1
    },
    {
      id: 4,
      name: "Marketing",
      memberCount: 20,
      description:"Digital marking and social media team",
      user_id:1
    },
    {
      id:5,
      name: "Rap Battle",
      memberCount:20,
      description:"persons that rap hiphop",
      user_id:2
    },
    {
      id:6,
      name: "Teacher",
      memberCount:20,
      description:"Persons that teach",
      user_id:2
    },
    {
      id:7,
      name: "Thugs",
      memberCount:21,
      description:"They terrorize the streets",
      user_id:2
    },
  ]
    return { groups };
  }
}
