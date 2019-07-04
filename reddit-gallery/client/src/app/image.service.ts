import {IHttpService, IPromise, IQService} from 'angular';
import {Injectable} from 'angular-ts-decorators';
import {RedditImage} from './redditImage';

@Injectable('imageService')
export class ImageService {
  private images: RedditImage[] = [];

  private serverUrl = 'http://localhost:4000/reddit/getSubRedditByName?searchParam=';

  /*@ngInject*/
  constructor(private $http: IHttpService,
              private $q: IQService) {
  }


  getSubRedditByName(searchParam: string): IPromise<RedditImage[]> {
    const deferred = this.$q.defer<RedditImage[]>();
    // go to backend
    this.$http.get<RedditImage[]>(this.serverUrl + searchParam).then(response => {
      console.log('fetched images: ', response);
      this.images = response.data;
      deferred.resolve(response.data);
    }, error => {
      console.error('backend error: ', error);
      if (error.data.includes('403') || error.data.includes('ERR_UNESCAPE')) {
        this.images = [];
        deferred.resolve(this.images);
      }
      deferred.reject(error);
    });
    return deferred.promise;
  }

}
