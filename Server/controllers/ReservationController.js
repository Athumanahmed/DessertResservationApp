import ReservationModel from "../models/ReservationModel.js";

// @desc Reserve a meal
export const addReservation = async (req, res) => {
  try {
    const { recipeId, title, image, cookTime, servings } = req.body;
    const userId = req.user._id;

    // Optional: Prevent duplicate reservations
    const existing = await ReservationModel.findOne({ userId, recipeId });
    if (existing)
      return res
        .status(400)
        .json({ message: "You already reserved this meal." });

    const reservation = await ReservationModel.create({
      userId,
      recipeId,
      title,
      image,
      cookTime,
      servings,
    });

    res
      .status(201)
      .json({ success: true, message: "Meal reserved", data: reservation });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Reservation failed", error: error.message });
  }
};

// @desc Get all reservations by user
export const getUserReservations = async (req, res) => {
  try {
    const userId = req.user._id;

    const reservations = await ReservationModel.find({ userId });

    res.json({
      success: true,
      message: "user reservations",
      data: reservations,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get reservations", error: error.message });
  }
};

// @desc Delete a reservation
export const deleteReservation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { recipeId } = req.params;

    await ReservationModel.findOneAndDelete({ userId, recipeId });

    res.json({ success: true, message: "Reservation deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete", error: error.message });
  }
};
