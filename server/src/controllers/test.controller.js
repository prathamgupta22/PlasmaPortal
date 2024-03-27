export const testController = (req, res) => {
  try {
    const responseData = {
      message: "Test route",
      success: true,
    };

    // Sending response with status code 200 which means ok and JSON data
    res.status(200).json(responseData);
  } catch (error) {
    // Handling errors if any
    console.error("Error in testController:", error);
    // Sending a generic error response with status code 500
    res.status(500).json({ error: "Internal Server Error" });
  }
};
