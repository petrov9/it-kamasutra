import profileReducer, {addPost, deletePost} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: "Hi", likesCount: 12},
        {id: 2, message: "My first post", likesCount: 2}
    ]
};

it("new post should be added", () => {
    let action = addPost("my text");
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(state.posts.length + 1);
});

it("message of a new post should be corrected", () => {
    let action = addPost("my text");
    let newState = profileReducer(state, action);

    expect(newState.posts[state.posts.length].message).toBe("my text");
});

it("length of after deliting should be decremented", () => {
    let action = deletePost(1);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(state.posts.length - 1);
});

it("length of after deliting shouldn't be decremented if id incorrect", () => {
    let action = deletePost(1000);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(state.posts.length);
});