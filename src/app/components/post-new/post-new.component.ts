import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService  } from '../../services/user.service';
import { CategoryService  } from '../../services/category.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService]
})
export class PostNewComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public post: Post;
  public categories;

  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: global.url+'post/upload',
      headers: {
     "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube tu avatar de usuario'
    
};
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.page_title = 'Crear un nuevo post';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
    
   }

  ngOnInit() {
    this.getCategories();
     this.post = new Post(1,this.identity.sub,1, '', '' ,null,null);

     //console.log(this.post);
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
        response =>{
          if(response.status == 'success'){
            this.categories = response.categories;
            
          }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

  imageUpload(datos){
    let image_data = JSON.parse(datos.response);
    this.post.image = image_data.image;
  }

  onSubmit(form){
    console.log(this.post);
  }

}
