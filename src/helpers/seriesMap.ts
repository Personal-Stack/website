import { IPost } from '@app/components/post/post';
import { IDictionary } from '@app/types/dictionary';

export const seriesMapHelper = (posts: IPost[]) => {
  return posts.reduce((obj: IDictionary, curr: IPost) => {
    const seriesName = curr.series && curr.series.name;

    // Post with no series assigned is just skipped.
    if (!seriesName) {
      return obj;
    }

    if (obj.hasOwnProperty(seriesName)) {
      obj[seriesName].push(curr);
    } else {
      obj[seriesName] = [curr];
    }

    return obj;
  }, {});
};
