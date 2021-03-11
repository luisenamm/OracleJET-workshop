import * as ko from "knockout";
import { whenDocumentReady } from "ojs/ojbootstrap";
import * as AccUtils from "../accUtils";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import "ojs/ojknockout";
import "ojs/ojlistview";
import "ojs/ojlistitemlayout";
import { ojListView } from "ojs/ojlistview";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojlabel";
import "ojs/ojbutton";
import UserService from '../service/user.service';
import "ojs/ojprogress-bar";

interface UserData{
  name:string;
  title:string;
  email:string;
}

class UsersViewModel {

  public newName:ko.Observable<string>;
  public newTitle:ko.Observable<string>;
  public newEmail:ko.Observable<string>;

  //Service
  public userService =new UserService();

  //Loading
  public dataLoaded: ko.Observable<boolean>;

  //Computed
  public saveDisabled:ko.Computed;
  public saveDisabledCancel:ko.Computed;

  private userDataArray:ko.ObservableArray<UserData>;
  public usersDataProvider: ArrayDataProvider<UserData['name'],UserData>;

  constructor() {

    //Progress
    this.dataLoaded=ko.observable(false);

    //Form section  
    this.newName=ko.observable('');
    this.newTitle=ko.observable('');
    this.newEmail=ko.observable('');

    this.userDataArray=ko.observableArray();
    this.usersDataProvider=new ArrayDataProvider(this.userDataArray,{
      keyAttributes:'name'
    });

    this.getUsers();

    //Computed
    this.saveDisabled = ko.computed(() => {
      return this.newName() === ''||this.newTitle()===''||this.newEmail()==='';
    });

    this.saveDisabledCancel = ko.computed(() => {
      return this.newName() === ''&&this.newTitle()===''&&this.newEmail()==='';
    });
  }

  //Rest
  private getUsers = () => {
    this.userService.getUsers().then(response => {
      console.log(response);
      response.data.users.forEach(user => {
        this.userDataArray.push({ name: user.name, title: user.title, email: user.email });
      });
      this.dataLoaded(true);
    }).catch(error => {
      console.log(error);
    });
  }


  //Actions
  public saveUser=()=>{
    console.log(`New Name: ${this.newName()}`);
    console.log(`New Title: ${this.newTitle()}`);
    console.log(`New Email: ${this.newEmail()}`);

    this.userDataArray.push({name:this.newName(),
      title:this.newTitle(),
      email:this.newEmail()
    })

    /* 
    this.userDataArray.push({name:this.newName(),
      title:this.newTitle(),
      email:this.newEmail()
    })
    this.userDataArray.valueHasMutated();
    */
  }

  public discardChanges=()=>{
    console.log("Cancel");
    this.newName('');
    this.newTitle('');
    this.newEmail('');
  }

  //Handlers
  public handleListSelectionChanged=(event:ojListView.selectedChanged<UserData['name'],UserData>)=>{
    console.log(event);
  }

  /**
   * Optional ViewModel method invoked after the View is inserted into the
   * document DOM.  The application can put logic that requires the DOM being
   * attached here.
   * This method might be called multiple times - after the View is created
   * and inserted into the DOM and after the View is reconnected
   * after being disconnected.
   */
  connected(): void {
    AccUtils.announce("Users page loaded.");
    document.title = "Users";
    // implement further logic if needed
  }

  /**
   * Optional ViewModel method invoked after the View is disconnected from the DOM.
   */
  disconnected(): void {
    // implement if needed
  }

  /**
   * Optional ViewModel method invoked after transition to the new View is complete.
   * That includes any possible animation between the old and the new View.
   */
  transitionCompleted(): void {
    // implement if needed
  }
}

export = UsersViewModel;
