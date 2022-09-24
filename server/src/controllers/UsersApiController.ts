import { ApiResultResponse, CreateUserRequest, DeleteUserRequest, GetUserDetailRequest, UpdateUserRequest, User, UserListResponse, UsersApi } from "api";
import UserEntity from "databases/entities/UserEntity";
import NotFoundError from "web/errors/NotFoundError";
import ServerContext from "web/ServerContext";

export default class UsersApiController implements UsersApi {
  async createUser(requestParameters: CreateUserRequest): Promise<User> {
    const input = requestParameters.user

    let user = new UserEntity()
    user.account = input.account
    user.email = input.email
    user.userName = input.userName
    user.password = input.password
    user.disabled = input.disabled ?? false
    user.userType = input.userType

    user = await ServerContext.dataSource.manager.save(user)

    const output = this.convertUserResponse(user)
    return output
  }

  deleteUser(requestParameters: DeleteUserRequest): Promise<ApiResultResponse> {
    throw new Error("Method not implemented.");
  }

  async getUserDetail(requestParameters: GetUserDetailRequest): Promise<User> {
    const userId = requestParameters.id
    const user = await ServerContext.dataSource.manager.findOneBy(UserEntity, { id: userId })
    if (user === null || user === undefined) {
      throw new NotFoundError()
    }

    const output = this.convertUserResponse(user)
    return output
  }

  async getUserList(): Promise<UserListResponse> {
    const users = await ServerContext.dataSource.manager.find(UserEntity)
    const items = users.map(p => this.convertUserResponse(p))
    const output = { items: items } as UserListResponse
    return output
  }

  async updateUser(requestParameters: UpdateUserRequest): Promise<User> {
    const userId = requestParameters.id
    const input = requestParameters.user

    let user = await ServerContext.dataSource.manager.findOneBy(UserEntity, { id: userId })
    if (user === null || user === undefined) {
      throw new NotFoundError()
    }

    user.email = input.email
    user.userName = input.userName
    user.disabled = input.disabled ?? false
    user.userType = input.userType

    if (input.password !== undefined && input.password.length > 0) {
      user.password = input.password
    }

    user = await ServerContext.dataSource.manager.save(user)

    const output = this.convertUserResponse(user)
    return output
  }

  private convertUserResponse(user: UserEntity): User {
    const output = {
      id: user.id,
      account: user.account,
      email: user.email,
      userName: user.userName,
      userType: user.userType,
      disabled: user.disabled
    } as User
    return output
  }
}
