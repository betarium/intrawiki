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

    user = await ServerContext.dataSource.manager.save(user)

    const output = { id: user.id, account: user.account, email: user.email, userName: user.userName, userType: user.userType } as User
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

    const output = { id: user.id, account: user.account, email: user.email, userName: user.userName, userType: user.userType } as User
    return output
  }

  async getUserList(): Promise<UserListResponse> {
    const users = await ServerContext.dataSource.manager.find(UserEntity)
    const items = users.map(p => ({ id: p.id, account: p.account, email: p.email, userName: p.userName, userType: p.userType } as User))
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

    user = await ServerContext.dataSource.manager.save(user)

    const output = { id: user.id, account: user.account, email: user.email, userName: user.userName, userType: user.userType } as User
    return output
  }
}
