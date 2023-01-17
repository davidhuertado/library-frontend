export interface bookWithoutIdInterface {
  title: string;
  author: string;
  year: string;
  read: boolean;
  user: any;
  // | {
  //     username: string;
  //     token: string;
  //     id: string;
  //   }
  // | string;
}

// export interface bookWithIdInterface extends bookWithoutIdInterface {
//   id: string;
//   user: {
//     username: string;
//     token: string;
//     id: string;
//   };
// }

export interface bookWithIdInterface extends bookWithoutIdInterface {
  id: string;
}
