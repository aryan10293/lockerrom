import React from "react";
 import { HiDotsHorizontal } from "react-icons/hi";

export const Comment = () => {

    // const [openCommentModal, setCommentModal] = useState(false);    // for toggling comment modal
    // const [isEditing, setIsEditing] = useState(false);      // for toggling edit modal
    // const [editCommentData, setEditCommentData] = useState(comment);

    // const {
    //     user: { users },
    //     auth: { token, userData },
    // } = useSelector(state => state);

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getAllPosts());
    // }, [dispatch, token]);

    // const getCurrentCommentedUser = (comment) => {
    //     const currentCommentedUser = users?.filter(user => user?.username === comment?.username)[0];
    //     return currentCommentedUser;
    // }

    // const editBtnHandler = () => {
    //     setIsEditing(prev => !prev);
    //     setCommentModal(false);
    // }

    // const updateCommentHandler = () => {
    //     dispatch(editComment({ postId, token, commentData: editCommentData }));
    //     setIsEditing(false);
    // }

    // const deleteCommentHandler = () => {
    //     dispatch(deleteComment({ postId, token, commentId: comment?._id }));
    // }
    

    return (
        <div className="flex ml-0 sm:mr-0 sm:mx-1 pl-0 pr-1 sm:pr-0 sm:px-1 py-3 border-b">

            <div className="mt-3 w-12 h-12 text-lg flex-none">
                <img src={'https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'} className="flex-none w-12 h-12 rounded-full" alt="avatar" />
            </div>

            <div className="w-full px-4 py-3 relative">

                <div className="w-full flex gap-2 justify-between">
                    <h2 className="font-semibold">
                        {`dfej` }
                        <span className="text-slate-600 pl-2">
                            @{'drej'}
                        </span>
                    </h2>

                    {true && <HiDotsHorizontal className="cursor-pointer pr2" /> }
                </div>

                <div className="flex gap-2">
                    <span className="text-slate-500">
                        replying to
                    </span>
                    <span className="text-blue-600 font-semibold">
                        @{'lebron'}
                    </span>
                </div>

                {true ? 
                (
                    <div className="flex justify-between items-center mt-3 p-3 px-2 border-y-2 w-full focus:outline-none gap-4">

                        <span className="flex-1">
                            <input
                                value=''
                                className="w-full p-2 rounded-[30rem] focus:outline-none bg-slate-100"
                                type="text"
                                placeholder="Add a comment..."
                                
                            />
                        </span>

                        <button
                            className="p-2 rounded-[20rem] bg-blue-600 hover:bg-blue-800 text-white shadow-md 
                            hover:shadow-lg w-20"
                            
                            > Cancel
                        </button>

                        <button
                            className="p-2 rounded-[20rem] bg-blue-600 hover:bg-blue-800 text-white shadow-md 
                            hover:shadow-lg w-20"
                            
                            > Update
                        </button>

                    </div>
                ) : (
                    <div className="mt-3"></div>
                )}


                {/* Edit and Delete Comment Modal */}


                <div
                    className="w-30 h-22 px-1 shadow-xl bg-white border border-slate-300 text-slate-600 font-semibold 
                    absolute right-10 top-2 rounded-xl">
                    <ul className="p-1 cursor-pointer text-center">
                        <li className="my-1 p-1 hover:bg-slate-200 rounded"  >Edit</li>
                        <li className="my-1 p-1 hover:bg-slate-200 rounded"  >Delete</li>
                    </ul>
                </div>


            </div>
        </div>
    )
};
