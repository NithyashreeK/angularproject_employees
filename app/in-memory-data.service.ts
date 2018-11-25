import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const employees = [
      { id: 1, name: 'Megumi Nanami', salary: 60520.50, health: 1040, disability: 500, life: 330, accident: 750, retirement: 1500 },
  	  { id: 2, name: 'Alex Cooper', salary: 75032.86, health: 1204.5, disability: 490, life: 400, accident: 802, retirement: 1430 },
  	  { id: 3, name: 'Ben Reed', salary: 80503.41, health: 1100, disability: 580, life: 375, accident: 850, retirement: 1510 },
  	  { id: 4, name: 'Mikan Sakura', salary: 95005, health: 1090.25, disability: 510, life: 325, accident: 795, retirement: 1560 },
  	  { id: 5, name: 'Jenna Marbles', salary: 87561.5, health: 1008.6, disability: 560, life: 328.5, accident: 782.3, retirement: 1590 },
      { id: 6, name: 'Johnny Duncan', salary: 65004.9, health: 1105.5, disability: 450, life: 405.1, accident: 840, retirement: 1497 },
      { id: 7, name: 'Ryan Briggs', salary: 78500, health: 1200, disability: 475, life: 360, accident: 768, retirement: 1499.9 },
      { id: 8, name: 'Benjamin Roberts', salary: 72012.5, health: 1112.3, disability: 530, life: 320.5, accident: 815, retirement: 1516 }
    ];
    return {employees};
  }

  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(employee => employee.id)) + 1 : 1;
  }
  
}
