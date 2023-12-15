/*
 * @Description:
 * @Version: 1.0
 * @Autor: laikt
 * @Date: 2023-09-15 15:09:46
 * @LastEditors: laikt
 * @LastEditTime: 2023-09-28 11:22:53
 */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../@generated/prisma-nestjs-graphql/user/user.model';
import {
  UserCreateInput,
  UserUncheckedUpdateInput,
} from '../@generated/prisma-nestjs-graphql/user';
import { AuthService } from '@app/common';
import { Public } from '@app/common/decorator';
import { RegisterInput } from './register.input';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Mutation(() => User)
  createUser(@Args('UserCreateInput') userCreateInput: UserCreateInput) {
    return this.userService.create(userCreateInput);
  }

  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  // @UseGuards(AuthGuard)
  @Public()
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UserUncheckedUpdateInput,
  ) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  /**
   * Login function.
   *
   * @param {string} phone - The phone number of the user.
   * @param {string} password - The password of the user.
   * @return {any} The result of the login operation.
   */
  @Mutation(() => User)
  login(@Args('phone') phone: string, @Args('password') password: string) {
    return this.authService.login(phone, password);
  }

  @Mutation(() => User)
  register(@Args('updateUserInput') updateUserInput: RegisterInput) {
    return this.userService.create(updateUserInput);
  }
}
