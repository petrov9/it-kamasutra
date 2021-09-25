let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi", likesCount: 12},
                {id: 2, message: "My first post", likesCount: 2}
            ],
            newPostText: 'it-kamasutra'
        },
        dialogsPage: {
            dialogs: [
                {
                    id: 1,
                    name: 'Dima',
                    avatarImage: 'data:image/png;base64,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'
                },
                {
                    id: 2,
                    name: 'Vasya',
                    avatarImage: 'data:image/jpeg;base64,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'
                },
                {
                    id: 3,
                    name: 'Kolya',
                    avatarImage: 'data:image/jpeg;base64,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'
                },
                {
                    id: 4,
                    name: 'Olya',
                    avatarImage: 'data:image/jpeg;base64,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'
                }
            ],
            messages: [
                {id: 1, message: "Hi", isMyMessage: true},
                {id: 2, message: "How are you?", isMyMessage: false},
                {id: 3, message: "Not bad", isMyMessage: true},
            ]
        },
        sidebarPage: {
            friends: [
                {
                    id: 1,
                    name: 'Dima',
                    avatarImage: 'data:image/png;base64,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'
                },
                {
                    id: 2,
                    name: 'Vasya',
                    avatarImage: 'data:image/jpeg;base64,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'
                },
                {
                    id: 3,
                    name: 'Kolya',
                    avatarImage: 'data:image/jpeg;base64,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'
                },
            ]
        }
    },

    getState() {
        return this._state;
    },

    addPost() {
        let newPost = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likesCount: 0
        };
        this._state.profilePage.posts.push(newPost);
        this._callSubscriber(this._state);
    },

    updateNewPostText(newText) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber(this._state);
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    _callSubscriber() {
        console.log("State changed")
    }
}

export default store;
window.store = store;