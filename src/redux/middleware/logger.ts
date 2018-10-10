export default function loggerMiddleware(store) {
  return next => action => {
    console.log("action executed ", action);
    return next(action);
  };
}
