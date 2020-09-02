exports.calSkip = (page, size) => {
    return (page - 1) * size;
};
  
exports.calPage = (count, size) => {
    return Math.ceil(count / size);
};