import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from "./message.service";
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { labType, quizNode } from "./interfaces"

@Injectable({
  providedIn: 'root'
})
export class BackEndServiceService {
  
  constructor(private http: HttpClient, private messageService: MessageService) { }

  labs: any[] = []

  private dataUrl = 'api/vlab';  // URL to web api

  //sample function that does not pull from URL:
  getTestData(): Observable<string[]> {
    let sampleString: string[] = [
      "This",
      "is",
      "from",
      "the",
      "dataService"
    ];
    return of(sampleString);
  }

  getLabs():labType[]{
    return this.labs;
  }

  createLab(name:string, desc:string): labType {
    let lab : labType = ({
    labID: this.labs.length,
    labName: name, //need to check for unique names
    description:desc,
    nodes: [],
    });

    this.labs.push(lab)
    return lab;
  }
  
  getLabID (name:string){
    let retName:string;
    //search by name return id, should be unique names
    for(let i = 0;i < this.labs.length;i++){
      if(this.labs[i].name ===name){
        //lab found, return ID
        retName = this.labs[i].name
      }
      else{
        //not found, don't do anything
      }
    }
    return retName;
  }

  createQuizNode(labID: number, desc:string, name:string, question:string){
    let quizNode: quizNode = ({
      nodeID: this.labs[labID].nodes.length,
      description: desc,
      name:name,
      question:question,
      answers:[],
    })
    this.labs[labID].nodes.push(quizNode)
    return quizNode
  }

  /** GET data from the server */
  getData(): Observable<string[]> {
    return this.http.get<string[]>(this.dataUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<string[]>('getHeroes', []))
      );
  }


    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


    /** Log a back end Service message with the MessageService */
    private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}