module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: String,
      description: String,
    },
    { timestamps: true }
  );

  const HorrorMovies = mongoose.model('horrorMovies', schema);
  return HorrorMovies;
};
