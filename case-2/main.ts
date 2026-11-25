import { comments, type IComment } from './data.ts';

const countTotalComments = (data: IComment[]): number => {
  return data.reduce((total, comment) => {
    const repliesCount = comment.replies ? countTotalComments(comment.replies) : 0;
    return total + 1 + repliesCount;
  }, 0);
};

console.log('Total komentar:', countTotalComments(comments));