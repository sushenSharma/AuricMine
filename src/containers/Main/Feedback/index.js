import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Rating,
  TextareaAutosize,
  Container,
  Paper,
  Alert,
  Snackbar,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaPaperPlane } from "react-icons/fa";
import { featuresKey, supabase } from "../../../constants";
import { getUserUUID } from "../../../redux/reducers/public/public-action";
import { userUUID } from "../../../constants/constant";
import { getStorageItem } from "../../../utils/common-utils";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "2rem",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },
});

const Feedback = () => {
  const [formData, setFormData] = useState({
    rating: 0,
    feedback: "",
    user_id: getStorageItem(featuresKey).user_id,
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.rating === 0) {
      newErrors.rating = "Please provide a rating";
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = "Feedback is required";
    }

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);

      sumbitFeedback(formData);
    } else {
      setErrors(newErrors);
    }
  };

  const sumbitFeedback = async (formData) => {
    try {
      const { error: insertError } = await supabase
        .from("feedback")
        .insert(formData);

      setShowSuccess(true);
      setFormData({
        rating: 0,
        feedback: "",
        user_id: "",
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "white",
                mb: 3,
              }}
            >
              We Value Your Feedback
            </Typography>
            <Typography variant="body1" sx={{ mb: 8, color: "white" }}>
              Your feedback helps us improve our services and provide a better
              experience for everyone.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: "white" }}>
              Share your thoughts with us today!
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<FaPaperPlane />}
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                py: 1.5,
                maxWidth: "200px",
                backgroundColor: "#38b88d",
              }}
              onClick={() => document.getElementById("feedbackBox").focus()}
            >
              Start Feedback
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          <StyledPaper>
            <form onSubmit={handleSubmit}>
              <Box sx={{ my: 2 }}>
                <Typography component="legend">Rate your experience</Typography>
                <Rating
                  id="rating"
                  value={formData.rating}
                  onChange={(e, newValue) =>
                    setFormData({ ...formData, rating: newValue })
                  }
                  size="large"
                  aria-label="Rate your experience"
                />
                {errors.rating && (
                  <Typography color="error" variant="caption">
                    {errors.rating}
                  </Typography>
                )}
              </Box>

              <TextareaAutosize
                id="feedbackBox"
                minRows={4}
                placeholder="Share your feedback here..."
                value={formData.feedback}
                onChange={(e) =>
                  setFormData({ ...formData, feedback: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: errors.feedback
                    ? "1px solid #d32f2f"
                    : "1px solid #ccc",
                  marginTop: "16px",
                  fontFamily: "inherit",
                }}
                aria-label="Enter your feedback"
              />
              {errors.feedback && (
                <Typography color="error" variant="caption">
                  {errors.feedback}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 3,
                  borderRadius: "12px",
                  textTransform: "none",
                  py: 1.5,
                  backgroundColor: "#38b88d",
                }}
              >
                Submit Feedback
              </Button>
            </form>
          </StyledPaper>
        </Grid>
      </Grid>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thank you for your feedback!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Feedback;
