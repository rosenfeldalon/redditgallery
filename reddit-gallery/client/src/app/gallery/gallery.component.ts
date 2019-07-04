import {StateService} from '@uirouter/angularjs';
import {Component, OnInit} from 'angular-ts-decorators';
import {IScope} from 'angular';
import {ImageService} from '../image.service';
import {RedditImage} from '../redditImage';

@Component({
  selector: 'gallery',
  template: require('./gallery.component.html'),
  styles: [require('./gallery.component.scss')]
})

export class GalleryComponent implements OnInit {
  redditImages: RedditImage[];
  searchParam: string;
  scope;


  /*@ngInject*/
  constructor(
    private imageService: ImageService,
    private $state: StateService,
    private $scope: IScope) {
    this.scope = $scope;
  }

  ngOnInit() {
    this.searchParam = 'cats';
    this.getSubRedditByName(this.searchParam);

    // on new search request
    this.scope.$on('newSubRedditRequest', (event, args) => {
      console.log('broadcast received: ', args);
      this.searchParam = args;
      this.getSubRedditByName(this.searchParam);
    });
  }


  getSubRedditByName(searchParam: string): void {
    this.imageService.getSubRedditByName(searchParam)
      .then(images => this.redditImages = images);
  }


}
