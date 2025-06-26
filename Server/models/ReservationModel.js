import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipeId: {
      type: Number, // using the  MealDB API
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: String,
    cookTime: String,
    servings: String,
  },
  {
    timestamps: true, 
  }
);

const ReservationModel = mongoose.model("Reservation", reservationSchema);

export default ReservationModel;
