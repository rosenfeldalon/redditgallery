import {Component, OnInit} from 'angular-ts-decorators';
import {ImageService} from '../image.service';
import {IRootScopeService} from 'angular';


@Component({
  selector: 'header',
  template: require('./header.component.html'),
  styles: [require('./header.component.scss')]
})
export class HeaderComponent implements OnInit {

  searchName = '';
  rootScope;

  /*@ngInject*/
  constructor(private imageService: ImageService, private $rootScope: IRootScopeService) {
    this.rootScope = $rootScope;
  }

  search(name: string): void {
    this.searchName = name;
    this.rootScope.$broadcast('newSubRedditRequest', this.searchName);
  }

  ngOnInit() {
    this.searchName = '';
  }


}
