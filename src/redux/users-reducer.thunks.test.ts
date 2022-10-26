import {actions, follow, unfollow} from "./users-reducer";
import {UsersAPI} from "../api/users-api";
import {ApiResponseType, ResultCode} from "../api/api";

jest.mock("../api/users-api")
const UsersAPIMock = UsersAPI as jest.Mocked<typeof UsersAPI>
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    UsersAPIMock.follow.mockClear()
    UsersAPIMock.unfollow.mockClear()
})


const result: ApiResponseType = {
    data: {},
    messages: [],
    resultCode: ResultCode.Success
}

test("success follow thunk", async () => {
    const userId = 1;
    const thunk = follow(userId)

    UsersAPIMock.follow.mockReturnValue(Promise.resolve(result))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, userId))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(userId))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, userId))
})

test("success unfollow thunk", async () => {
    const userId = 1;
    const thunk = unfollow(userId)

    UsersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, userId))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(userId))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, userId))
})