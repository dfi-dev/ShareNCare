// Reusable thunk wrapper for consistent async handling
export const asyncThunkWrapper = async ({
    dispatch,
    asyncFunc,
    startAction,
    successAction,
    failureAction,
  }) => {
    dispatch(startAction());
  
    try {
      const data = await asyncFunc();
      dispatch(successAction(data));
      return data;
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      dispatch(failureAction(msg));
      throw new Error(msg);
    }
  };
  