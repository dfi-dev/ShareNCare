import {createContext, useReducer} from "react"

const PostList = createContext({
    postList: [],
    addPost: () => console.warn(""),
    deletePost: () => console.warn(""),
})

const postListReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_POST':
            return [action.payload, ...state]
        case 'ADD_INITIAL_POST':{
            return action.payload;
        }
        case 'DELETE_POST':
            return state.filter(post => post.id !== action.payload);
        default:
            return state
    }
}

const PostListProvider = ({children}) => {

    const [postList, dispatchPostList] = useReducer(postListReducer, [])

    const addPost = (post) => {
        dispatchPostList({
            type: "ADD_POST",
            payload: post
        });
    };

    const addPostFromServer = (post) => {
        dispatchPostList({
            type: "ADD_INITIAL_POST",
            payload: post
        });
    };

    const deletePost = (id) => {
        dispatchPostList({
            type: 'DELETE_POST',
            payload: id
        })
    }

    return <PostList.Provider value={
        {
            postList,
            addPost,
            deletePost
        }
    }> {children} </PostList.Provider>
}

export {PostListProvider, PostList}