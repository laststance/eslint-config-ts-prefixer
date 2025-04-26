
import { User } from './types'; // Should use 'import type'

import type { Post } from './types';

import { Comment, type Reply } from './types'; // Should separate type imports

function processData(user: User, post: Post, comment: Comment, reply: Reply) {
  return { user, post, comment, reply };
}
