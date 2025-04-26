
interface User {
  new(): User; // Error: Interfaces cannot have constructors
  name: string;
}

interface Post {
  new(id: number): Post; // Error: Interfaces cannot have constructors
  title: string;
}

class Comment {
  constructor(public text: string) {}
}

class Reply {
  new(): Reply { // Error: Class methods cannot be named 'new'
    return new Reply();
  }
}
