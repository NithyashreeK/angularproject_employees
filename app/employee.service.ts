import { Injectable } from '@angular/core';
import { Employee } from './employee';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private log(message: string) {
    this.messageService.add(`EmployeeService: ${message}`);
  }

  private employeesUrl = 'api/employees';

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient,
  private messageService: MessageService) { }

  getEmployees(): Observable<Employee[]> {
  	return this.http.get<Employee[]>(this.employeesUrl)
    .pipe(
      tap(_ => this.log('Fetched employee(s)')),
      catchError(this.handleError('getEmployees', []))
    );
  }

  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap(_ => this.log(`Fetched employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }

  updateEmployee (employee: Employee): Observable<any> {
    return this.http.put(this.employeesUrl, employee, httpOptions).pipe(
      tap(_ => this.log(`Updated employee id=${employee.id}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  addEmployee (employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, employee, httpOptions).pipe(
    tap((employee: Employee) => this.log(`Added employee with id=${employee.id}`)),
    catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  deleteEmployee (employee: Employee | number): Observable<Employee> {
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.employeesUrl}/${id}`;

    return this.http.delete<Employee>(url, httpOptions).pipe(
    tap(_ => this.log(`Deleted employee id=${id}`)),
    catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

}
