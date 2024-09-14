export const sendSuccessResponse = (context, data) => {
  context.res = {
    status: 200,
    body: { status: true, data },
  };
};

export const sendErrorResponse = (
  e,
  context,
  message = 'Internal server error'
) => {
  console.log(e);
  context.res = {
    status: 500,
    body: { status: false, message },
  };
};
