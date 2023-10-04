class AppError extends Error{
  constructor(){
    super();
  }
  create (mesage, statusCode, statusText) {
    this.message = mesage;
    this.statusCode = statusCode;
    this.statusText = statusText;
    return this;
  }
}

module.exports = new AppError();