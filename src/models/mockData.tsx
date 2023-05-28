export type UserDetails = {
  userId: string;
  firstName: string;
  lastName: string;
  followers: number;
  dateOfBirth: Date;
  accountCreated: Date;
  lastLoggedIn: Date;
  accountType: "Professional" | "Amateur";
};
