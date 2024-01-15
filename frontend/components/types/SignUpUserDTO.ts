import User from "./User";

export default interface SignUpUserDTO extends Omit<User,"id"> {
    password: string
}